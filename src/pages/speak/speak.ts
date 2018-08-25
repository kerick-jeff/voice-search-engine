import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UtilityProvider } from '../../providers/utility/utility';
import { ContactsModalPage } from '../contacts-modal/contacts-modal';

@IonicPage()
@Component({
  selector: 'page-speak',
  templateUrl: 'speak.html',
})
export class SpeakPage {
  entity: string = ''
  matches: Array<string> = []
  url: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private speech: SpeechRecognition,
    private iab: InAppBrowser,
    private zone: NgZone,
    private utility: UtilityProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) { 
    if (this.navParams.get('entity')) {
      this.entity = this.navParams.get('entity')
    }
  }

  ionViewDidLoad() {
    this.listen()
  }

  public goBack() {
    this.navCtrl.pop()
  }

  public reset() {
    this.speech.stopListening().then(() => {
      this.matches = []
      this.listen()
    })
  }

  private listen() {
    this.speech.startListening({
      showPopup: false,
      showPartial: true
    }).subscribe((matches: Array<string>) => {
      if (matches && matches.length != 0) {
        this.zone.run(() => {
          this.matches = matches
          setTimeout(() => {
            this.speech.stopListening().then(() => {
              const queryStr = this.matches[0]
              this.composeUrl(queryStr)
              const browser = this.iab.create(this.url)
              browser.show()
            })
          }, 5000)
        })
      } else {
        this.reset()
      }
    }, (e) => {
      this.utility.alert('Error', JSON.stringify(e))
    })
  }

  private composeUrl(queryStr) {
    switch (this.entity) {
      case 'contacts':
        this.viewCtrl.dismiss().then(() => {
          let modal = this.modalCtrl.create(ContactsModalPage, {
            contactName: queryStr
          }, {
            cssClass: 'contacts-modal'
          })

          modal.present()
        })

        break;

      case 'youtube':
        queryStr = queryStr.replace(/\s+/g, '+')
        this.url = 'https://www.youtube.com/results?search_query=' + queryStr
        break;

      case 'wikipedia':
        queryStr = queryStr.replace(/\s+/g, '_')
        queryStr = queryStr.charAt(0).toUpperCase() + queryStr.slice(1)
        this.url = 'https://en.wikipedia.org/wiki/' + queryStr
        break;

      case 'quora':
        queryStr = queryStr.replace(/\s+/g, '+')
        this.url = 'https://www.quora.com/search?q=' + queryStr
        break;

      case 'facebook':
        queryStr = queryStr.replace(/\s+/g, '+')
        this.url = 'https://web.facebook.com/search/str/' + queryStr + '/keywords_search'
        break;

      case 'twitter':
        //queryStr = queryStr.replace()
        this.url = 'https://twitter.com/search?q=' + queryStr + '&src=typd'
        break;

      case 'amazon':
        queryStr = queryStr.replace(/\s+/g, '+')
        this.url = 'https://www.amazon.com/s/?field-keywords=' + queryStr
        break;
    
      default: // Google & Web
        queryStr = queryStr.replace(/\s+/g, '+')
        this.url = 'https://google.com/search?q=' + queryStr
        break;
    }
  }
}
