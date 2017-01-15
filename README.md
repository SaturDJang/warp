# warp

Warp is a web based markdown presentation service.

## Requirements (Dependencies' versions)

- python >= 3.5
- django == 1.9.9
- node 6.x
- docker >= 1.12
- docker-compose >= 1.9

## Configuring development environment

### 1. Install docker

Get docker for your OS. https://www.docker.com/products/overview

After installation, open terminal and type to check docker was installed successfully or not.

```shell
$ docker-compose --version
docker-compose version: 1.9.0, build 2585387
```

If you can see results above, then both of docker and docker-compose is installed completely.

### 2. Install Node.js (npm) and gulp

Get Node.js for your OS. https://nodejs.org/en/download/

#### macOS

Just install by package.

#### Ubuntu

Maybe, this reference is helpful. https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

```shell
$ npm install -g gulp
```

### 3. Clone our project, and build docker containers.

After installation clone our project, install node dependencies, and build docker.

```shell
$ git clone https://github.com/SaturDJang/warp
Cloning into 'warp'...
...
...
Checking connectivity... done.
$ cd warp
$ npm install
(wait...)
...
$ gulp
$ docker-compose -f docker-compose-dev.yml build --no-cache
Building postgres
(wait...)
Succesfully build f94c7f40714a
```

### 4. Run docker-compose up and check on your browser

```shell
$ docker-compose -f docker-compose-dev.yml up
...
django_1 | Django version 1.9.9, using settings 'config.settings.local'
django_1 | Development server is running at http://0.0.0.8000/
...
```

If you saw that, then open browser and visit http://localhost:8000/

### 5. Use the watch script from next time.

If you followed this guide successful, then just use `watch` script from next time.
```shell
$ ./watch
```

> `watch` will execute both of `docker-compose -f docker-compose-dev.yml` and `gulp watch` in a time.


## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).


## Basic Commands

### Setting Up Your Users

- To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.
- To create an **superuser account**, use this command

  ```shell
  $ python manage.py createsuperuser
  ```

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

## Deployment

The following details how to deploy this application.

### Docker

See detailed [cookiecutter-django Docker documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html).

#### Elastic Beanstalk

See detailed [cookiecutter-django Elastic Beanstalk documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-elastic-beanstalk.html).

## License
See [LICENSE](https://github.com/SaturDJang/warp/blob/master/LICENSE).
