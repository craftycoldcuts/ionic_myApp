import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {LocationWatcher} from '../../providers/location-watcher/location-watcher';
import * as leaflet from 'leaflet';
import {BailDataProvider} from '../../providers/bail-data/bail-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
  
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  bailData: any;
  markerMyPosition: any;
  mapLoaded: boolean;
  public locations;

  constructor(public navCtrl: NavController
    ,public locationWatcher: LocationWatcher
    ,public events: Events
    ,public bailDataProvider: BailDataProvider
  ) {
    this.mapLoaded = false;
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
          if (this.mapLoaded) {
            this.markerMyPosition.setLatLng(location);
          }
        } catch (e) {
          console.error("Callback Location Error: " + e.message);
//          this.loadmap(this.defaultLocation);
        }
      }
    );
  }

  loadmap(location) {
    var context = this;
    
    if (this.mapLoaded) return false;
    
    console.log("Loadmap: map loaded");
    
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
     this.mapLoaded = true;
 
    // add markers
    var myPositionPopup = leaflet.popup({closeButton: false}).setContent("my current position");
    this.markerMyPosition = leaflet.marker([location.latitude, location.longitude],
    {
      icon: this.getLeafletIcon("me")
      ,title: "my current location"
    }).bindPopup(myPositionPopup).addTo(this.map);
    
    context.fetchBailData();  
    
  }
  
  fetchBailData() {
    // load remote bail data    
    this.bailDataProvider.getLocalData().subscribe( data => { 
      this.bailData = data;
    },
    err => console.error(err),
    () => console.log('done loading bail checks')
    );
  }
  
  showBailMarkers() {
    var row, bailMarker, bailPopup;
    if (this.bailData.markersLoaded === true) return;
    this.bailData.markersLoaded = true;
    
    for (let i = 0; i < this.bailData.data.length; i++) {
        row = this.bailData.data[i];
        console.log("Bail lat:" + row.latitude);
        console.log("Bail lng" + row.longitude);
        bailPopup = leaflet.popup({closeButton: false}).setContent(row.title);
        bailMarker = leaflet.marker([row.latitude, row.longitude], {icon: this.getLeafletIcon("bail")}).bindPopup(bailPopup)
        bailMarker.addTo(this.map);
      }
  }
  
  getLeafletIcon(icon) {
    
    var iconUrl;
    var baseIconUrl = "../assets/icon/map/";
    
    switch (icon) {
     case "me":
        iconUrl = baseIconUrl + "police.png";
        break;
    case"unit":
        iconUrl = baseIconUrl + "car.png";
        break;
        
    case"bail":
        iconUrl = baseIconUrl + "home.png";
        break;
        
    default:
         iconUrl = baseIconUrl + "shooting.png";
    }
    
    return leaflet.icon({
      iconUrl: iconUrl,
//      iconSize:     [38, 95], // size of the icon
//      shadowSize:   [50, 64], // size of the shadow
//      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [15, 0] // point from which the popup should open relative to the iconAnchor
    });
    
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
