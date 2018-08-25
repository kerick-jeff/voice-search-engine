import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-contacts-modal',
  templateUrl: 'contacts-modal.html',
})
export class ContactsModalPage {
  private contactName: string = ''
  private contactList: Contact[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contacts: Contacts
  ) {
    if (this.navParams.get('contactName')) {
      this.contactName = this.navParams.get('contactName')
    }
  }

  ionViewDidLoad() {
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'photos'], {
      filter: this.contactName,
      multiple: true
    }).then((contacts) => {
      this.contactList = contacts
    })
  }

}
