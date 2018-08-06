import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController) {

  }
  
    // runs when ion page loads
  ionViewDidEnter() {
     console.log("hello");
  }

}
