import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
import {BailDataProvider} from '../../providers/bail-data/bail-data';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(List) list: List;
    public bailData: any;
  

  constructor(public navCtrl: NavController
      ,public bailDataProvider: BailDataProvider) {
this.fetchBailData(); 
  }
  
    // runs when ion page loads
  ionViewDidEnter() {
     console.log("hello");
//      this.fetchBailData();  
  }
  
    itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  
    fetchBailData() {
    // load remote bail data    
    this.bailDataProvider.getLocalData().subscribe( mong => { 
//      this.bailData = mong;
      this.bailData = mong["data"];
      console.log("list1");
    },
    err => console.error(err),
    () => console.log('List: done loading bail checks')
    );
  }

}
