import {Injectable, NgZone} from '@angular/core';
import { Events } from 'ionic-angular';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationWatcher {
  
  is_ios: boolean;

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, 
    private geolocation: Geolocation, public events: Events) {

  }

  startWatching() {

    // Native background geolocation
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      this.onBGeoCallback(location);
    }, (err) => {
      this.onBGeoError(err);
    });
    
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // init web geolocation
    this.startWebApiGeolocation();
    

  }
  
  // Fallback web W3C geolocation API
  startWebApiGeolocation() {
    
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      this.onBGeoCallback(position.coords);
    }, (err) => {
      this.onBGeoError(err);
    });
//      console.log('WebGeoocation: ' + position);
//
//      // Run update inside of Angular's zone
//      this.zone.run(() => {
//        this.lat = position.coords.latitude;
//        this.lng = position.coords.longitude;
//      });
//
//    });
  }
  
  onBGeoCallback(location) {
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    location.lat = location.latitude;
    location.lng = location.longitude;

    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });
    
    this.events.publish('bgeo_callback:location', location);
    
    // to sop IOS crash
    if (this.is_ios) {
      this.backgroundGeolocation.finish();
    }
  }
  
  onBGeoError(err) {
    console.log(err);
  }

  stopWatching() {
    console.log('stopWatching');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }
  
  getPosition() {
    
     let location = {
      lat: this.lat,
      lng: this.lng
    };
    
    return location;
  }

}