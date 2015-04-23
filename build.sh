#!/usr/bin/env bash

trap 'exit 1' ERR   # Exit script with error if command fails

if [[ -z $(which docker) ]]; then
    echo "Missing docker client which is required for building, testing and pushing"
    exit 3
fi

declare PROJECT_DIRECTORY=$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)
declare DOCKER_IMAGE_NAME="gainmaster/gainmaster-web-client"

cd $PROJECT_DIRECTORY


function download_application_dependencies
{
	$PROJECT_DIRECTORY/utility/bower.sh install
    $PROJECT_DIRECTORY/utility/npm.sh install
}

function test_application
{
	$PROJECT_DIRECTORY/utility/grunt.sh test
}

function build_application 
{
	$PROJECT_DIRECTORY/utility/grunt.sh build
}

function build_docker_image 
{
    docker build -t $DOCKER_IMAGE_NAME:latest .
}


function test_docker_image
{
	docker history $DOCKER_IMAGE_NAME:latest 2> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant test $DOCKER_IMAGE_NAME:latest, the image is not built"
        exit 2
    fi

    # $SCRIPT_DIRECTORY/utility/bats.sh test/archlinux-base.bats
}

function run_docker_image
{
    docker history $DOCKER_IMAGE_NAME:latest &> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant run $DOCKER_IMAGE_NAME:latest, the image is not built"
        exit 2
    fi

    docker run --rm -it -p 8080:80 $DOCKER_IMAGE_NAME:latest
}


function push_docker_image 
{
	docker history $DOCKER_IMAGE_NAME:latest 2> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant test $DOCKER_IMAGE_NAME:latest, the image is not built"
        exit 2
    fi

    [ -z "$DOCKER_EMAIL" ]    && { echo "Need to set DOCKER_EMAIL";    exit 4; }
    [ -z "$DOCKER_USER" ]     && { echo "Need to set DOCKER_USER";     exit 4; }
    [ -z "$DOCKER_PASSWORD" ] && { echo "Need to set DOCKER_PASSWORD"; exit 4; }

    if [[ $EUID -ne 0 ]]; then
        if [[ -z $(which sudo) ]]; then
            echo "Missing sudo client which is required for pushing when not root"
            exit 2
        fi

        sudo docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASSWORD
        sudo docker push $DOCKER_IMAGE_NAME:latest
    else
        docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASSWORD
        docker push $DOCKER_IMAGE_NAME:latest
    fi
}


#
# Handle input
#
versions=()
actions=("$@")

while getopts ":v:" opt; do
  case $opt in
    v)
      versions+=("$OPTARG")
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      ;;
  esac
done

if [ ${#actions[@]} -eq 0 ]; then
    actions=(pre-build build test push)
fi

if [ ${#versions[@]} -eq 0 ]; then
    for version in ${VERSION_DIRECTORY}/*; do
        versions+=($(basename $(echo $version)))
    done
fi

for action in "${actions[@]}"; do 
    case "$action" in
        pre-build)
            download_application_dependencies
            test_application

        build)
            build_application
            build_docker_image
            ;;
         
        test)
            test_docker_image
            ;;

        run)
            run_docker_image
            ;;

        push)
            push_docker_image 
            ;;
    esac
done