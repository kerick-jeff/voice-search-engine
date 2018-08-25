import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { SpeakPage } from '../pages/speak/speak';
import { ContactsModalPage } from '../pages/contacts-modal/contacts-modal';
import { UtilityProvider } from '../providers/utility/utility';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    HistoryPage,
    SpeakPage,
    ContactsModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    HistoryPage,
    SpeakPage,
    ContactsModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Contacts,
    SpeechRecognition,
    UtilityProvider
  ]
})
export class AppModule {}
