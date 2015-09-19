# docker-registry-ui

This is a simple web user interface for Docker Registry. It is compatible with
the V2 API of the Registry.

## Build & development

This project works with endpoints that use HTTP Basic authentication. To
configure the registry username, password and URL, copy `config/default.yml` to
`config/your_environment.yml` and modify to your liking.

You also need to configure the Registry specially to allow connections from
browsers.

For nginx, the following configuration works:

    location /v2/ {
        auth_basic
        auth_basic_user_file  /etc/nginx/include/docker-registry.htpasswd;
        add_header            'Docker-Distribution-Api-Version' 'registry/2.0' always;
        add_header            'Access-Control-Allow-Origin' '*' always;
        add_header            'Access-Control-Allow-Headers' 'Accept, Authorization' always;
        include               /etc/nginx/include/docker-registry.conf; # Reverse proxy config

        # This is needed because browser preflight requests cannot contain the
        # Authorization header.
        if ($request_method = OPTIONS) {
            return 200;
        }
    }

Run `env NODE_ENV=your_environment grunt` for building and
`env NODE_ENV=your_environment grunt serve` for preview.

## Provided Dockerfile

A build script to create a Docker image is also available.

    ./build.sh your_environment

