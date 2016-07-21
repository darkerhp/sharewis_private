# ShareWis ACT Mobile Application


## Installation

Follow the [Getting Started documentation](https://facebook.github.io/react-native/docs/getting-started.html)

### Notes for Android

After installing the required packages (android sdk, android studio ...), in
order to run the simulator in linux, you need to create a target and execute it

```
$ android  # open android conf gui, and force https to be fetched using http from settings, then download sdk
$ android list sdk -a -e | grep x86_64  # find an appropriate sdk
$ android update sdk -a -u -t sys-img-x86_64-android-23  # install the sdk
$ android list targets   # Find target and abi values for target
$ android create avd -n react -t android-23 --abi default/x86_64
$ emulator -avd react
```

Then start react-native and run the android app
```
$ react-native start
$ react-native run-android
```

## Scripts

### Linting
Check js and jsx syntax with [eslint](http://eslint.org/)
```
$ npm run lint
```

### Typing
Let's catch typing errors in our js code with [Flow](https://flowtype.org/)
```
$ npm run flow
```

### Unittesting
Check unit tests with [Jest](http://facebook.github.io/jest/)
```
$ npm test
```
