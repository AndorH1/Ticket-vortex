<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

<!-- ######################################################################################################################################################################################## -->

## Login and register

# register:

    {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe123",
    "email": "johndoe@example.com",
    "password": "strongPassword123",

    # "role": "admin",

    "phoneNumber": "+1234567890",
    "photo": "https://example.com/photo.jpg",
    "country": "USA",
    "city": "New York",
    "address": "123 Main St, Apt 4B"
    }

# login admin role:

    {
    "username": "johndoe123",
    "password": "strongPassword123strongPassword123"
    }

##### NEWUSER

    {
    "firstName": "asdasd",
    "lastName": "asdasd",
    "username": "asdasd",
    "email": "asdasd@example.com",
    "password": "asdads"

    # "role": "user",

    ,
    "phoneNumber": "+1234567890",
    "photo": "https://example.com/photo.jpg",
    "country": "USA",
    "city": "New York",
    "address": "123 Main St, Apt 4B"
    }

# login: user role

    {
    "username": "asdasdasdasd",
    "password": "asdASDasd"
    }

### Kereses

return users [ {firstName, lastname}]

# create:

{
"firstName": "stringstring",
"lastName": "stringstring",
"username": "stringstring",
"email": "stringstring",
"password": "stringstring",
"phoneNumber": "stringstring",
"photo": "stringstring",
"country": "stringstring",
"city": "stringstring",
"address": "stringstring"
}

# login:

{
"username": "string",
"password": "string"
}

{
"firstName": "Szavuy",
"lastName": "Beata",
"username": "Bea",
"email": "beataszavuy@gmail.com",
"password": "Bea"
}

{
"firstName": "Hegyeli",
"lastName": "Andor",
"username": "Andor",
"email": "hegyeliandor@gmail.com",
"password": "Andor"
}

{
"firstName": "Balint",
"lastName": "Csongor-Tivadar",
"username": "Tsongor",
"email": "balint.csongor@student.ms.sapientia.ro",
"password": "Tsongor"
}
