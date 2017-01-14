# warp
<a href="https://github.com/pydanny/cookiecutter-django/">![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg)</a>

Warp is a web based markdown presentation service.

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
