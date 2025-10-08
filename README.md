# YouthRegPortal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

# youth-reg-portal

Developer README — quick start

Requirements
- Node.js (recommended LTS)
- npm

Install

```bash
npm install
```

Development

- Start the dev server (live reload, development environment file):

```bash
npm run dev
# or
npm start
# both run: nx serve (development configuration by default)
```

Notes:
- The development configuration replaces `src/environments/environment.ts` with `src/environments/environment.development.ts` at build-time.
- To run the app on a different port, pass the `--port` flag to nx, e.g.:

```bash
npx nx serve youth-reg-portal --port=4300
```

Production build

- Build for production (this will replace `src/environments/environment.ts` with `src/environments/environment.production.ts`):

```bash
npx nx build youth-reg-portal --configuration=production
```

Server-side rendering (SSR) workflow

1. In terminal A, build in watch mode (development):

```bash
npm run watch
# runs: nx build --watch --configuration development
```

2. In terminal B, run the SSR server from the build output:

```bash
npm run serve:ssr:youth-reg-portal
# runs: node dist/youth-reg-portal/server/server.mjs
```

Environment files

- `src/environments/environment.ts` — base environment file used by default
- `src/environments/environment.development.ts` — development overrides (used with development configuration)
- `src/environments/environment.production.ts` — production overrides (used with production configuration)

These file replacements are configured in `angular.json` so you don't need to change code when switching between dev and prod.

Troubleshooting

- If `nx` commands fail, run them via `npx nx ...` to use the local binary.
- If you see missing dependencies, run `npm install`.
