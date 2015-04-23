#!/usr/bin/env bash

WORKING_DIRECTORY=$(pwd)
PROJECT_DIRECTORY=$(cd "$( dirname "${BASH_SOURCE[0]}" )/../" && pwd)

if [[ ${WORKING_DIRECTORY} != ${PROJECT_DIRECTORY}* ]]; then
    echo "Grunt must be executed from within the gainmaster-web-client project folder"
    exit 1
fi

DOCKER_WORKING_DIRECTORY=${WORKING_DIRECTORY#"$PROJECT_DIRECTORY"}

[[ $- == *i* ]] && DOCKER_RUN_OPTIONS="-i -t" || DOCKER_RUN_OPTIONS=""

if [ $(docker ps -a | grep gainmaster-web-client-data-container | wc -l) -ne 1 ] 
then
    docker run $DOCKER_RUN_OPTIONS --name gainmaster-web-client-data-container \
        -v /home/admin \
        gainmaster/nodejs:generator-cg-angular echo "Data container started"
fi

docker run $DOCKER_RUN_OPTIONS --rm \
    --volumes-from="gainmaster-web-client-data-container" \
    -v $PROJECT_DIRECTORY:/project \
    -w="/project${DOCKER_WORKING_DIRECTORY}/" \
    --entrypoint bash \
    gainmaster/nodejs:generator-cg-angular $@