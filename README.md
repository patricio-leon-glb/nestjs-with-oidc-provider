# OIDC-Provider with NestJS POC

Basic implementation of oidc-provider over NestJS. After run the repository point you browser to [Code Request](http://localhost:3000/oidc/auth?code_challenge=AjUjutchD6L4yqcfJTZe7uqamDoB9dVI8v-3dLg1yr8&code_challenge_method=S256&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fv1%2Fclient%2Fcallback&response_type=code&client_id=2dIM1dyAEmHgYQ0C1nx3KRP5DOOtuXm6&scope=openid)

After code generation process success, copy the code and paste in the following post request:

```
POST http://localhost:3000/oidc/token
Header: Content-Type: application/x-www-form-urlencoded
Body: {
  client_id: 2dIM1dyAEmHgYQ0C1nx3KRP5DOOtuXm6,
  client_secret: TUPFhzlvWuNlQ38fUMzg4lYPRXA2DCnxE6TwnvHUq637i5kqktwINHPIHi7vT2Ds,
  grant_type: authorization_code,
  redirect_uri: http://localhost:3000/v1/client/callback,
  code_verifier: 84ac0e9c06852f3723cbfb9f2ce14b0f837ffbf395ebb59aa4124b99,
  code: <paste here>
}
```

Response

```
{
	"access_token": "cXw1Ivw5wfeOg21GnAsZ2sXviPFl8gAA5cKaaw6AB9K",
	"expires_in": 3600,
	"id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiJQYXRyaWNpbyIsImF0X2hhc2giOiItU2JlZ2t6THFKcjZ4STlRZk1PUkJ3IiwiYXVkIjoiMmRJTTFkeUFFbUhnWVEwQzFueDNLUlA1RE9PdHVYbTYiLCJleHAiOjE2OTA0MTE4MjAsImlhdCI6MTY5MDQwODIyMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.btNrlfDNePhdyZewCJcT-eZLUu2TjgkvURlu9tkC0fal_9lfIT0qKJMGdJFO_sYGXbnQtdBb1HMqK1N96fyCclVXyLoDbQt-kohCSTRUfwA1QEFEOEhEyUzj5JkHUeEZ_EdtPVBQJJQwvULy7GF4rrqGIKDHW6aE2O3Lc2muvJLCMUgDMtJZc5nUM8MyfumI3Sx3K7g68OmkXZX-axRtT1hD7SOOTEtSi-Uuc_6LGYRry7jW6g6wJJ46BnSGL38GGukHDV1s6nCjPpgk-NQToHW9W0Wb5FdnyQMpiVaCOnpxCcP0Ma8jA86SjB5SPvTZgetfzuFLY0OLQi5pGqyWQA",
	"scope": "openid",
	"token_type": "Bearer"
}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```

```
