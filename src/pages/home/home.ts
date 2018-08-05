import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationWatcher } from '../../provider/location-watcher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public locationWatcher: LocationWatcher) {

  }
  
  start() {
    this.locationWatcher.startWatching();
  }
  
  stop() {
    this.locationWatcher.stopWatching();
  }

}
