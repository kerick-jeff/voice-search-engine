import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class UtilityProvider {

  constructor(
    public alertCtrl: AlertController
  ) { }

  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    })

    alert.present()
  }

}
