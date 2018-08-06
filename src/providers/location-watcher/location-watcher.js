var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Events } from 'ionic-angular';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
var LocationWatcher = /** @class */ (function () {
    function LocationWatcher(zone, backgroundGeolocation, geolocation, events) {
        this.zone = zone;
        this.backgroundGeolocation = backgroundGeolocation;
        this.geolocation = geolocation;
        this.events = events;
        this.lat = 0;
        this.lng = 0;
    }
    LocationWatcher.prototype.startWatching = function () {
        var _this = this;
        // Native background geolocation
        var config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000
        };
        this.backgroundGeolocation.configure(config).subscribe(function (location) {
            _this.onBGeoCallback(location);
        }, function (err) {
            _this.onBGeoError(err);
        });
        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();
        // init web geolocation
        this.startWebApiGeolocation();
    };
    // Fallback web W3C geolocation API
    LocationWatcher.prototype.startWebApiGeolocation = function () {
        var _this = this;
        var options = {
            frequency: 3000,
            enableHighAccuracy: true
        };
        this.watch = this.geolocation.watchPosition(options).filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            _this.onBGeoCallback(position.coords);
        }, function (err) {
            _this.onBGeoError(err);
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
    };
    LocationWatcher.prototype.onBGeoCallback = function (location) {
        var _this = this;
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
        location.lat = location.latitude;
        location.lng = location.longitude;
        // Run update inside of Angular's zone
        this.zone.run(function () {
            _this.lat = location.latitude;
            _this.lng = location.longitude;
        });
        this.events.publish('bgeo_callback:location', location);
        // to sop IOS crash
        if (this.is_ios) {
            this.backgroundGeolocation.finish();
        }
    };
    LocationWatcher.prototype.onBGeoError = function (err) {
        console.log(err);
    };
    LocationWatcher.prototype.stopWatching = function () {
        console.log('stopWatching');
        this.backgroundGeolocation.finish();
        this.watch.unsubscribe();
    };
    LocationWatcher.prototype.getPosition = function () {
        var location = {
            lat: this.lat,
            lng: this.lng
        };
        return location;
    };
    LocationWatcher = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof NgZone !== "undefined" && NgZone) === "function" && _a || Object, BackgroundGeolocation,
            Geolocation, Events])
    ], LocationWatcher);
    return LocationWatcher;
    var _a;
}());
export { LocationWatcher };
//# sourceMappingURL=location-watcher.js.map