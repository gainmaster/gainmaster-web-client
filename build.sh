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
	$PROJECT_DIRECTORY/utility/gulp.sh test
}

function build_application 
{
	$PROJECT_DIRECTORY/utility/gulp.sh build
}

function build_docker_image 
{
    if [ -z "$NOT_LATEST" ]; then
        docker build -t ${DOCKER_IMAGE_NAME}:latest .
    fi
    if [ -n "$BUILD_NUMBER" ]; then
        docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} .
    fi
}


function test_docker_image
{
    if [ -n "$BUILD_NUMBER" ]; then $version=$BUILD_NUMBER; else $version=latest; fi

    docker history ${DOCKER_IMAGE_NAME}:${version} 2> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant test ${DOCKER_IMAGE_NAME}:${version}, the image is not built"
        exit 2
    fi

    # $SCRIPT_DIRECTORY/utility/bats.sh test/archlinux-base.bats
}

function run_docker_image
{
    if [ -n "$BUILD_NUMBER" ]; then $version=$BUILD_NUMBER; else $version=latest; fi

    docker history ${DOCKER_IMAGE_NAME}:${version} 2> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant run ${DOCKER_IMAGE_NAME}:${version}, the image is not built"
        exit 2
    fi

    docker run --rm -it -p 8080:80 ${DOCKER_IMAGE_NAME}:${version}
}


function push_docker_image 
{
    if [ -n "$BUILD_NUMBER" ]; then
        "Not allowed to push a build without a build number!"
    fi

	docker history $DOCKER_IMAGE_NAME:${BUILD_NUMBER} 2> /dev/null

    if [ $? -eq 1 ]; then
        echo "Cant push ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}, the image is not built"
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
        if [ -z "$NOT_LATEST" ]; then
            sudo docker push $DOCKER_IMAGE_NAME:latest
        fi
        sudo docker push $DOCKER_IMAGE_NAME:${BUILD_NUMBER}
    else
        docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASSWORD
        if [ -z "$NOT_LATEST" ]; then
            docker push $DOCKER_IMAGE_NAME:latest
        fi
        docker push $DOCKER_IMAGE_NAME:${BUILD_NUMBER}
    fi
}


#
# Handle input
#

#GETOPTS_STRING=`getopt -o b:l --long build-number: -n 'build.sh' -- "$@"`
#eval set -- "$GETOPTS_STRING"

while getopts "b:l --long build-number:" opt; do
    case "$1" in
        --build-number)
            case "$2" in
                "")  echo "Option --build-number expected a argument" ; exit 5 ;;
                *) BUILD_NUMBER=$2; shift 2 ;;
            esac ;;
        --not-latest) NOT_LATEST=true ; shift ;;
        --) shift ; break ;;
        *) echo "Option $1 is not valid!"; exit 1 ;;
    esac
done

if [ -z "$BUILD_NUMBER" ] && [ -n "$NOT_LATEST" ]; then
    echo "A build can not have a build number and not be latest"
    exit 5;
fi

shift $((OPTIND-1))
actions=("$@")

if [ ${#actions[@]} -eq 0 ]; then
    actions=(pre-build build post-build test push)
fi

for action in "${actions[@]}"; do 
    case "$action" in
        pre-build)
            echo "Executing pre-build action"
            download_application_dependencies
            test_application
            ;;

        build)
            echo "Executing build action"
            build_application
            build_docker_image
            ;;
        
        post-build)
            echo "Executing post-build action"
            ;;

        test)
            echo "Executing test action"
            test_docker_image
            ;;

        run)
            echo "Executing run action"
            run_docker_image
            ;;

        push)
            echo "Executing push action"
            push_docker_image 
            ;;

        --*) break ;;

        *) echo "Ignoring invalid action ${action}" ;;
    esac
done
