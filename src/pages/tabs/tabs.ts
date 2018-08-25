import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';

@IonicPage()
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homeRoot: any = HomePage
  historyRoot: any = HistoryPage

  constructor() { }
}
