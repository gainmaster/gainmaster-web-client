#!/usr/bin/env bash

WORKING_DIRECTORY=$(pwd)
PROJECT_DIRECTORY=$(cd "$( dirname "${BASH_SOURCE[0]}" )/../" && pwd)

if [[ ${WORKING_DIRECTORY} != ${PROJECT_DIRECTORY}* ]]; then
    echo "Yo must be executed from within the gainmaster-web-client project folder"
    exit 1
fi

DOCKER_WORKING_DIRECTORY=${WORKING_DIRECTORY#"$PROJECT_DIRECTORY"}

[[ -z "$PS1" ]] && DOCKER_RUN_OPTIONS="-i -t"

if [ $(docker ps -a | grep gainmaster-web-client-data-container | wc -l) -ne 1 ] 
then
    docker run -it --name gainmaster-web-client-data-container \
        -v /home/admin \
        gainmaster/yeoman echo "Data container started"
fi

docker run -it --rm \
    --volumes-from="gainmaster-web-client-data-container" \
    -v /projects/gainmaster-web-client:/project \
    -w="/project${DOCKER_WORKING_DIRECTORY}/" \
    --entrypoint yo \
    gainmaster/yeoman $@