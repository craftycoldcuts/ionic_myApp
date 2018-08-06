import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {LocationWatcher} from '../../providers/location-watcher/location-watcher';
import * as leaflet from 'leaflet';
import {BailDataProvider} from '../../providers/bail-data/bail-data';
import {Observable} from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
  
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  bailData: any;
  public locations;

  constructor(public navCtrl: NavController
    ,public locationWatcher: LocationWatcher
    ,public events: Events
    ,public bailDataProvider: BailDataProvider
  ) {
    this.bindEvents();
  }

  // runs when ion page loads
  ionViewDidEnter() {
    // search for location
    this.locationWatcher.startWatching();
  }

  bindEvents() {
    this.events.subscribe('bgeo_callback:location',
      (location) => {
        try {
          console.log("Callback Location: " + location.latitude + ", " + location.longitude);
          this.loadmap(location);
        } catch (e) {
          console.error("Callback Location Error: " + e.message);
//          this.loadmap(this.defaultLocation);
        }
      }
    );
  }

  loadmap(location) {
    var context = this;
    
    var mapOptions = {
      zoomControl: false,
       zoom: 18,
      attributionControl: false
    }

    // setup initial map
    this.map = leaflet.map("map", mapOptions)
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
    this.locations = leaflet.polyline([], {color: 'red'}).addTo(this.map);
    this.locations.addLatLng([location.latitude, location.longitude]);
    this.map.fitBounds(this.locations.getBounds());
    
    // manipulate map
    this.map.zoomOut(2);
    leaflet.control.scale({metric: true}).addTo(this.map);
 
    leaflet.marker([location.latitude, location.longitude]).addTo(this.map);
    
    setTimeout(function() {
    context.loadBailMarkers();  
    }, 0);
    
    
  }
  
  loadBailMarkers() {
    // load remote bail data    
    this.bailDataProvider.getLocalData().subscribe( data => { 
      var row;
      
      this.bailData = data;
      for (let i = 0; i < this.bailData.data.length; i++) {
        row = this.bailData.data[i];
        console.log("LAT" + row.latitude);
        console.log("LNG" + row.longitude);
        leaflet.marker([row.latitude, row.longitude]).addTo(this.map);
      }
     
    },
    err => console.error(err),
    () => console.log('done loading bail checks')
    );
  }
  
  // start watching location
  start() {
    this.locationWatcher.startWatching();
  }

  // stop watching location
  stop() {
    this.locationWatcher.stopWatching();
  }
  
    // start watching location
  showBail() {
    this.locationWatcher.startWatching();
  }
  
  showAlerts() {
    this.locationWatcher.startWatching();
  }

}
