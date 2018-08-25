import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsModalPage } from './contacts-modal';

@NgModule({
  declarations: [
    ContactsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsModalPage),
  ],
})
export class ContactsModalPageModule {}
