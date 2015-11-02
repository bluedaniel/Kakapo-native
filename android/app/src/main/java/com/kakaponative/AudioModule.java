package com.kakaponative;

import java.util.*;

import android.app.Activity;
import android.media.MediaPlayer;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AudioModule extends ReactContextBaseJavaModule {

  private static Map<String, MediaPlayer> soundArr = new HashMap<String, MediaPlayer>();

  Activity mActivity;

  public AudioModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "AudioModule";
  }

  @ReactMethod
  public void setSound(String sound, Integer vol) {
    if (!soundArr.containsKey(sound)) {
      String filename = "android.resource://com.kakaponative/raw/" + sound;
      MediaPlayer soundObj = MediaPlayer.create(mActivity, Uri.parse(filename));
      // soundObj.setLooping(true);
      // soundObj.setVolume((float) vol / 100, (float) vol / 100);
      soundArr.put(sound, soundObj);
    }
  }

  @ReactMethod
  public void togglePlay(String sound) {
    if (soundArr.get(sound).isPlaying()) {
      soundArr.get(sound).pause();
    } else {
      soundArr.get(sound).start();
    }
  }

  @ReactMethod
  public void changeVolume(String sound, Integer vol) {
    soundArr.get(sound).setVolume((float) vol / 100, (float) vol / 100);
  }
}
