# Moneyballs (moneyballs)

An expense tracker web and desktop app.

Moneyballs is a multi-platform app built to manage expenses.
It is built using Vue 2 and Quasar framework.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
# to launch desktop app in development,
quasar dev -m electron
```


### Build the app for production
```bash
quasar build
```

### Build the desktop app for production
```bash
# for mac
quasar build -m electron
# for windows
quasar build -m electron --target win32
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
