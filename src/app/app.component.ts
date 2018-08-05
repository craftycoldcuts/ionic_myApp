import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  is_ios: boolean;
  is_android: boolean;
  events: Events;
  rootPage:any = TabsPage;

  constructor(platform: Platform, events: Events, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.events = events;
    this.is_ios = platform.is('ios');
    this.is_android = platform.is('android');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
