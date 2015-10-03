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
  
  @objc func setSound(sound: String) {
    if soundArr[sound] === nil {
      do {
        let soundObj = try AVAudioPlayer(contentsOfURL: NSBundle.mainBundle().URLForResource(sound, withExtension: "mp3")!)
        soundArr.updateValue(soundObj, forKey: sound)
        soundArr[sound]!.prepareToPlay()
        soundArr[sound]!.volume = 0.5
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
}