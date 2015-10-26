//
//  SwiftAudio.swift
//  kakapoNative
//
//  Created by Daniel Levitt on 03/10/2015.
//  Copyright © 2015 SuperCerebral. All rights reserved.
//
import Foundation
import AVFoundation

@objc(SwiftAudio)
class SwiftAudio: NSObject {

  var soundArr = [String:AVAudioPlayer]()

  override init() {
    do {
      try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
      do {
        try AVAudioSession.sharedInstance().setActive(true)
      } catch let error as NSError {
        print(error.localizedDescription)
      }
    } catch let error as NSError {
      print(error.localizedDescription)
    }
  }

  @objc func setSound(sound: String, vol: NSNumber) {
    if soundArr[sound] === nil {
      do {
        let soundObj = try AVAudioPlayer(contentsOfURL: NSBundle.mainBundle().URLForResource(sound, withExtension: "m4a")!)
        soundArr.updateValue(soundObj, forKey: sound)
        soundArr[sound]!.prepareToPlay()
        soundArr[sound]!.volume = Float(vol) / 100
        soundArr[sound]!.numberOfLoops = -1
      } catch {
        fatalError ("Error loading \(sound): \(error)")
      }
    }
  }

  @objc func togglePlay(sound: String) {
    if soundArr[sound]!.playing {
      soundArr[sound]!.pause()
    } else {
      soundArr[sound]!.play()
    }
  }

  @objc func changeVolume(sound: String, vol: NSNumber) {
    soundArr[sound]!.volume = Float(vol) / 100
  }
}
