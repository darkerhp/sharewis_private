# ShareWis ACT Mobile Application

[![wercker
status](https://app.wercker.com/status/41122a6a18051d09232b2fb51ffc9d57/m/master
"wercker status")](https://app.wercker.com/project/bykey/41122a6a18051d09232b2fb51ffc9d57)

[![VersionEye npm deps](https://www.versioneye.com/user/projects/57bd7376939fc600508e8982/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57bd7376939fc600508e8982?child=summary#dialog_dependency_badge)

![uses js](http://forthebadge.com/images/badges/uses-js.svg)


## Installation

Follow the [Getting Started documentation](https://facebook.github.io/react-native/docs/getting-started.html) for installation on your OS and to support iOS and/or Android.

For this repository specific installation:
```
$ git clone git@github.com:ShareWis/sharewis-act-mobile.git
$ cd sharewis-act-mobile
$ npm install
```

### Notes about Android

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
$ npm start
$ react-native run-android
$ react-native log-android
```

## Facebook

### Android
To authenticate the exchange of information between the app and Facebook,
you need to generate a release key hash and add it to the Android settings
within your Facebook App ID.
```
$ keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```
Add the generated 28-char hash to the Android -> Key Hashes in
[the staging app](https://developers.facebook.com/apps/739140542810010/settings/)

### iOS
[Download](https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip)
the Facebook SDK and unzip it to `~/Documents/FacebookSDK/`


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
**NOTE: We currently disabled Flow rules**

### Unittesting
Check unit tests with [Jest](http://facebook.github.io/jest/)
```
$ npm test
$ npm test -- --watch   # continuous testing
```


## Debugging

### Reactotron
[reactotoron](https://github.com/reactotron/reactotron)

If using Reactotron-cli, remember to run
```
$ adb reverse tcp:9090 tcp:9090
```
In order for the simulator to allow traffic from and to the Reactotron dashboard

### Reset data
By default, data are stored on the device via AsyncStorage (redux-persist).
If you need to reset the data (eg to see the onboarding view), temporarily edit
the `src/store.js` file and set `PURGE_STORAGE = 1` (then revert it after
reloading the simulator)


## Upgrading

1. Install the new version of react-native
   ```
   $ npm install -save react-native@0.32.1
   ```
2. Run upgrade script. Always read the diff when prompted and decided whether to
   override the file or not. When conflicts appear, choose override.
   ```
   $ react-native upgrade
   ```
3. Resolve conflicting files with git add patch. On large chunks, use `s` to
   split chunks further. On smaller chunks that still have conflicts, use `e`
   then remove related `-` or `+` signs.
   ```
   $ git add -p ios/SharewisActMobile.xcodeproj/project.pbxproj
   $ git add -p ios/SharewisActMobile/Info.plist
   $ # ...
   ```
4. Remove unwanted changes
   ```
   $ git checkout -- <files containing unwanted changes>
   ```
5. Linking
   ```
   $ rnpm link
   ```

### For react native video
   - Info.plistの `App Transport Security Settings` に `Allow Arbitrary Loads` を追加してYESを設定する。（For Dev）
