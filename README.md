# docker-registry-ui

This is a simple web user interface for Docker Registry. It is compatible with
the V2 API of the Registry.

## Build & development

To use this project, you need to configure the Registry specially to allow
connections from browsers.

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

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
