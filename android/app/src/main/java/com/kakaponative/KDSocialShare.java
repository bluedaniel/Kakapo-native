package com.kakaponative;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KDSocialShare extends ReactContextBaseJavaModule {

  Activity mActivity;

  public KDSocialShare(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "KDSocialShare";
  }

  @ReactMethod
  public void shareOnFacebook(String url, String fn) {
    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    mActivity.startActivity(browserIntent);
  }

  @ReactMethod
  public void tweet(String url, String fn) {
    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    mActivity.startActivity(browserIntent);
  }

  @ReactMethod
  public void openURL(String url) {
    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    mActivity.startActivity(browserIntent);
  }
}
