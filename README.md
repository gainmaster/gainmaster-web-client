# Gainmaster Web Client

[![Build Status](http://ci.hesjevik.im/buildStatus/icon?job=gainmaster-web-client)](http://ci.hesjevik.im/job/gainmaster-web-client/) [![Docker Hub](https://img.shields.io/badge/docker-ready-blue.svg?style=plastic)][docker_hub_repository]

This repository contains a **Dockerfile**, and a **Vagrantfile** for local development. This repository is a part of an automated build, published to the [Docker Hub][docker_hub_repository].

**Base image:** [gainmaster/nginx][docker_hub_base_image]

[docker_hub_repository]: https://registry.hub.docker.com/u/gainmaster/gainmaster-web-client/
[docker_hub_base_image]: https://registry.hub.docker.com/u/gainmaster/nginx/

## Structure

```
.
├── app
│   ├── components
│   │   ├── core
│   │   ├── measurementhistory
│   │   ├── measurementregister
│   │   ├── mypage
│   │   ├── navbar
│   │   ├── userlogin
│   │   └── userregister
|   |
│   ├── index.js
│   ├── index.scss
│   ├── main
│   ├── services
│   │   ├── account
│   │   └── measurement
│   └── vendor.scss
|
├── assets
│   └── images
|
├── favicon.ico
└── index.html

```

The app/components folder contains subfolders with the system componenets.
Each of these subfolders contains templates, controllers and tests for the component.

## Running

    $ npm install
    $ bower install
    $ gulp serve

## References

These references have been helpful when creating this repository:

https://github.com/yeoman/generator-angular
