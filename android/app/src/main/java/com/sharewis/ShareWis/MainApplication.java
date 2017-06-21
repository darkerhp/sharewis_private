package com.sharewis.ShareWis;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.bugsnag.BugsnagReactNative;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.rnfs.RNFSPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.repro.android.Repro;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNI18nPackage(),
            new RNDeviceInfo(),
            new KCKeepAwakePackage(),
            BugsnagReactNative.getPackage(),
            new RNMixpanel(),
            new VectorIconsPackage(),
            new OrientationPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNFSPackage(),
          new ReactVideoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());

    // Setup Repro
    Repro.setup(this, "a3ec35c0-af7a-47ac-a10f-866ba354bd33");
    Repro.enablePushNotification("357133052683");
    // Start Recording
    Repro.startRecording();
    // If you want to use AppEventsLogger to log events.
    //AppEventsLogger.activateApp(this);
  }
}
