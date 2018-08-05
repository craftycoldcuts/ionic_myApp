import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {LocationWatcher} from '../../provider/location-watcher';
import * as leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  public locations;

  constructor(public navCtrl: NavController, public locationWatcher: LocationWatcher, public events: Events) {
    this.bindEvents();
  }

  // runs when ion page loads
  ionViewDidEnter() {
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
