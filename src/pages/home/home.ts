import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SpeakPage } from '../speak/speak';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) { }

  speak(entity: string) {
    let modal = this.modalCtrl.create(SpeakPage, {
      entity
    })

    modal.present()
  }
}
