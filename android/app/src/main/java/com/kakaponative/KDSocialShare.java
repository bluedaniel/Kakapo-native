package com.kakaponative;

import android.app.Activity;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

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
    public void shareIntent(ReadableMap options, Callback callback) {
        Intent share = new Intent(android.content.Intent.ACTION_SEND);
        share.setType("text/plain");
        if (options.hasKey("text") && !options.isNull("text")) {
            share.putExtra(Intent.EXTRA_SUBJECT, options.getString("text"));
        }
        if (options.hasKey("link") && !options.isNull("link")) {
            share.putExtra(Intent.EXTRA_TEXT, options.getString("link"));
        }
        String title = "Share Kakapo";
        if (options.hasKey("title") && !options.isNull("title")) {
            title = options.getString("title");
        }
        try {
            Intent chooser = Intent.createChooser(share, title);
            chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mActivity.startActivity(chooser);
            callback.invoke("success");
        } catch (ActivityNotFoundException ex) {
            callback.invoke("not_available");
        }
    }

    @ReactMethod
    public void openURL(String url) {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        mActivity.startActivity(browserIntent);
    }
}
