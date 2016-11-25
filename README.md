# ShareWis ACT Mobile Application


**Table of contents:**

1. [Installation](#installation)
2. [DeployGate](#deploygate)
3. [Facebook](#facebook)
4. [Scripts](#scripts)
5. [Debugging](#debugging)
6. [Upgrading](#upgrading)
7. [Api Specs](#api-specs)


----

[![wercker status](https://app.wercker.com/status/a2e09318afd1ad09ef2a06c419f56bab/s/master "wercker status")](https://app.wercker.com/project/byKey/a2e09318afd1ad09ef2a06c419f56bab)

[![VersionEye npm deps](https://www.versioneye.com/user/projects/57bd7376939fc600508e8982/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57bd7376939fc600508e8982?child=summary#dialog_dependency_badge)

![uses js](http://forthebadge.com/images/badges/uses-js.svg)

----




## Installation

Follow the [Getting Started documentation](https://facebook.github.io/react-native/docs/getting-started.html) for installation on your OS and to support iOS and/or Android.

For this repository specific installation:
```
$ git clone git@github.com:ShareWis/sharewis-act-mobile.git
$ cd sharewis-act-mobile
$ npm install
```

### Notes about iOS

This project use CocoaPods to manage ios libraries.
Please install CocoaPods in your pc. [CocoaPods | GettingStarted](https://guides.cocoapods.org/using/getting-started.html)

```sh
# install cocoapods and dependencies
$ bundle install

$ cd ios

# install libraries 
$ pod install

# update  libraries
$ pod udpate
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
$ android avd # Then clone the 'Galaxy Nexus' device and add more RAM to it for local dev
$ # Build device with low resolution
$ android create avd -n react-galaxynexus -t android-18 --abi default/x86 --device "Galaxy Nexus" --skin "720x1280" -c 128M
$ # Build device with high resolution
$ android create avd -n react-nexus6 -t android-24 --abi default/x86_64 --device "Nexus 6" --skin "1440x2560" -c 128M
$ # Enable keyboard for each avd
$ for f in ~/.android/avd/*.avd/config.ini; do echo 'hw.keyboard=yes' >> "$f";
done
$ # Start emulator
$ emulator @react-galaxynexus
```

Then start react-native and run the android app
```
$ npm start
$ react-native run-android
$ react-native log-android
```




## DeployGate

### User testing

To test the applications from a real device, install using the following QR codes

#### Android

![android qrcode](https://chart.googleapis.com/chart?chs=178x178&cht=qr&chl=https%3A%2F%2Fdeploygate.com%2Fusers%2FShareWisInc%2Fapps%2Fcom.sharewis.ShareWisAct)

#### iOS

![ios qrcode](https://chart.googleapis.com/chart?chs=178x178&cht=qr&chl=https%3A%2F%2Fdeploygate.com%2Fconnect%2Fiphones%3Ffrom_qr%3D1)

### Deploy staging app to [DeployGate](https://deploygate.com/dashboard) 

How to deploy staging app to DeployGate manually.

#### Build apk file (Android)

Run below commands.

```
$ cd sharewis-act-mobile
$ git pull origin master
$ npm install
$ cd android && ./gradlew assembleRelease
```

The generated apk files are in `android/app/build/outputs/apk`.
Upload `app-release.apk` to DeployGate.

#### Build ipa file (iOS)

Run below commands.

```
$ cd sharewis-act-mobile
$ git pull origin master
$ npm install
```

And build ipa with xcode.

1. Open xcode project.
2. Set scheme `SharewisActMobile` and `Generic iOS Device`
3. `Product` -> `Archive...`
4. After archiving, the organization window is opened.
5. Check latest archive in the organization window and click `Export...`
6. Check `Save for AdHoc Deployment` and go next and next...
8. Upload exported `SharewisActMobile.ipa` to DeployGate.

#### Upload

1. Login to [DeployGate](https://deploygate.com/dashboard). (ID & Password are [here](https://launchpad.meldium.com/#/launchpad?edit=c01f6779-d5a9-440e-880a-284ac87fe443))
2. Drag & Drop the apk or ipa 




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

**Special conventions**:
  - When you need to set a function attribute that is unused, suffix it with
    **Ignored** (cf `src/utils/propTypes.js`)


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

1. Read the release notes for your new version in
   [Github](https://github.com/facebook/react-native/releases)

1. Install the new version of react-native
   ```
   $ npm install --save react-native@0.38.0
   ```
1. Run upgrade script. Always read the diff when prompted and decided whether to
   override the file or not. **※ただし `project.pbxproj` は手動でマージするのは難しいので上書きする。**
   ```
   $ react-native upgrade
   ```
   
   以下の2ファイルはそれぞれ対応するファイルと比較し、マージ後に削除する。
   ```
   android/app/src/main/java/com/sharewisactmobile/MainActivity.java --> android/app/src/main/java/com/sharewis/ShareWisAct/MainActivity.java
   android/app/src/main/java/com/sharewisactmobile/MainApplication --> android/app/src/main/java/com/sharewis/ShareWisAct/MainApplication
   ```

1. Re-link and Re-install dependency packages:
   ```
   $ react-native link
   $ react-native install fbsdk
   $ cd ios budle exec pod install
   ```

1. Xcodeを開き、以下の設定を行う。
    1. General -> Bundle Identifierに「com.share-wis.ShareWisACT」を設定する
    1. FacebookSDKをXcodeに追加する。[ドキュメント](https://developers.facebook.com/docs/ios/getting-started/#sdk-project)
    1. Build Settingsに環境変数[FACEBOOK_APP_ID]を追加する。[詳細](https://gyazo.com/0e7b6d30655fb82bc2e87c442825db9a)
    1. LaunchImageの設定がされていなければ再設定する。
    1. ARTライブラリを追加する。（https://github.com/bgryszko/react-native-circular-progress/issues/23）

### For react native video
   - Info.plistの `App Transport Security Settings` に `Allow Arbitrary Loads` を追加してYESを設定する。（For Dev）

### トラブルシューティング
 Facebookログインに失敗する場合（エラーコード308）
 XcodeからCapabilities -> Keychain Sharing をONにする
- http://stackoverflow.com/questions/30643122/ios-parse-facebook-login-error-308-fbsdkloginbadchallengestring
- https://github.com/facebook/facebook-sdk-swift/issues/51



## API Specs

### Account API
Cf repo `sharewis-account` and serverless endpoints

### ACT API

#### Read online
1. Go to [other/act_api_swagger.yml](https://github.com/ShareWis/sharewis-act-mobile/blob/master/other/act_api_swagger.yml),
   then click on the **Raw** button.
2. Copy the page url, then access `http://editor.swagger.io/#/?import=<GITHUB_RAW_PAGE_URL>`.
3. You should now see the ShareWis ACT API specifications

#### Read locally (recommended)
```
$ docker pull swaggerapi/swagger-editor
$ docker run -p 80:8080 --name swagger swaggerapi/swagger-editor
$ xdg-open http://172.17.0.2:8080  # Or whatever url is output by docker run
$ Go to `file > Import File`, then load `other/act_api_swagger.yml`
$ cd sharewis-act-mobile
$ git pull origin master
$ npm install
```

And build ipa with xcode.

1. Open `ios/SharewisActMobile.xcworkspace` with xcode. 
2. Set scheme `SharewisActMobile` and `Generic iOS Device`
3. `Product` -> `Archive...`
4. After archiving, the organization window is opened.
5. Check latest archive in the organization window and click `Export...`
6. Check `Save for AdHoc Deployment` and go next and next...
8. Upload exported `SharewisActMobile.ipa` to DeployGate.

### Upload

1. Login to [DeployGate](https://deploygate.com/dashboard). (ID & Password are [here](https://launchpad.meldium.com/#/launchpad?edit=c01f6779-d5a9-440e-880a-284ac87fe443))
2. Drag & Drop the apk or ipa 
