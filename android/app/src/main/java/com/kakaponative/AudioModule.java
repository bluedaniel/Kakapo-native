package com.kakaponative;

import java.util.*;

import android.util.Log;
import android.util.Pair;
import android.media.MediaPlayer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AudioModule extends ReactContextBaseJavaModule {

  private static Map<String, MediaPlayer> soundArr = new HashMap<String, MediaPlayer>();

  public AudioModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "AudioModule";
  }

  @ReactMethod
  public void setSound(String sound, Integer vol) {
    if (!soundArr.containsKey(sound)) {
      String filename = sound.replace("-", "_");
      MediaPlayer soundObj = MediaPlayer.create(Context, R.raw.filename);
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
    Log.i("AudioModule", "AudioModule is cool!");
  }
}
