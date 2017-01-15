# warp

Warp is a web based markdown presentation service.

## Configure develop environment 

### OSX

#### 0. If you don't have brew, install brew (only OSX)

open terminal and type.

```shel
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 1. install docker

Get docker for your OS. https://www.docker.com/products/overview

After installation, open terminal and type.

```shell
$ docker-compose --version
docker-compose version: 1.9.0, build 2585387
```

If you saw that. then both of docker and docker-compose is installed completely. 

#### 2. Install nodejs (npm)

Get nodejs for your OS. https://nodejs.org/en/download/

##### OSX

Just install by package.

##### Ubuntu

Maybe, this reference is helpful. https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

#### 3. Clone our project, and build docker.

If you don't have git. then type this on terminal.

##### OSX

``````
$ brew install git
``````

##### Ubuntu

```shell
$ sudo apt-get install git
```

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
$ docker-compose -f docker-compose-dev.yml build --no-cache
Building postgres
(wait...)
Succesfully build f94c7f40714a
```



#### 4. docker-compose up and check on your browser

```shell
$ docker-compose -f docker-compose-dev.yml up
...
django_1 | Django version 1.9.9, using settings 'config.settings.local'
django_1 | Development server is running at http://0.0.0.8000/
...
```

If you saw that, then open browser and visit http://localhost:8000/ 



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

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report.

```shell
$ coverage run manage.py test
$ coverage html
$ open htmlcov/index.html
```


#### Running tests with py.test

```shell
$ py.test
```

### Live reloading and Sass CSS compilation

Moved to [Live reloading and SASS compilation](http://cookiecutter-django.readthedocs.io/en/latest/live-reloading-and-sass-compilation.html).

### Sentry

Sentry is an error logging aggregator service. You can sign up for a free account at  https://getsentry.com/signup/?code=cookiecutter  or download and host it yourself.
The system is setup with reasonable defaults, including 404 logging and integration with the WSGI application.

You must set the DSN url in production.

## Deployment

The following details how to deploy this application.

### Docker

See detailed [cookiecutter-django Docker documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html).

#### Elastic Beanstalk

See detailed [cookiecutter-django Elastic Beanstalk documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-elastic-beanstalk.html).

## License
See [LICENSE](https://github.com/SaturDJang/warp/blob/master/LICENSE).
