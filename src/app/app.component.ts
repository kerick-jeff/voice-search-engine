import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { UtilityProvider } from '../providers/utility/utility';

import { TabsPage } from '../pages/tabs/tabs';
import { SpeakPage } from '../pages/speak/speak';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    speech: SpeechRecognition,
    utility: UtilityProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      speech.isRecognitionAvailable().then((available: boolean) => {
        if (available) {
          speech.hasPermission().then((has: boolean) => {
            if (!has) {
              speech.requestPermission().then().catch((e) => {
                utility.alert('Not Granted', 'Permission not granted!')
              })
            }
          })
        } else {
          utility.alert('Feature Detection', 'Recognition feature unavailable')
        }
      }).catch((e) => {
        utility.alert('Detection failed', JSON.stringify(e))
      })
    });
  }
}

