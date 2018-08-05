var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { LocationWatcher } from '../../provider/location-watcher';
import * as leaflet from 'leaflet';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, locationWatcher, events) {
        this.navCtrl = navCtrl;
        this.locationWatcher = locationWatcher;
        this.events = events;
        this.bindEvents();
    }
    // runs when ion page loads
    HomePage.prototype.ionViewDidEnter = function () {
        this.locationWatcher.startWatching();
    };
    HomePage.prototype.bindEvents = function () {
        var _this = this;
        this.events.subscribe('bgeo_callback:location', function (location) {
            try {
                console.log("Callback Location: " + location.latitude + ", " + location.longitude);
                _this.loadmap(location);
            }
            catch (e) {
                console.error("Callback Location Error: " + e.message);
                //          this.loadmap(this.defaultLocation);
            }
        });
    };
    HomePage.prototype.loadmap = function (location) {
        var mapOptions = {
            zoomControl: false,
            zoom: 18,
            attributionControl: false
        };
        // setup initial map
        this.map = leaflet.map("map", mapOptions);
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
        this.locations = leaflet.polyline([], { color: 'red' }).addTo(this.map);
        this.locations.addLatLng([location.latitude, location.longitude]);
        this.map.fitBounds(this.locations.getBounds());
        // manipulate map
        this.map.zoomOut(2);
        leaflet.control.scale({ metric: true }).addTo(this.map);
        leaflet.marker([location.latitude, location.longitude]).addTo(this.map);
    };
    // start watching location
    HomePage.prototype.start = function () {
        this.locationWatcher.startWatching();
    };
    // stop watching location
    HomePage.prototype.stop = function () {
        this.locationWatcher.stopWatching();
    };
    // start watching location
    HomePage.prototype.showBail = function () {
        this.locationWatcher.startWatching();
    };
    HomePage.prototype.showAlerts = function () {
        this.locationWatcher.startWatching();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" && _a || Object)
    ], HomePage.prototype, "mapContainer", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, LocationWatcher, Events])
    ], HomePage);
    return HomePage;
    var _a;
}());
export { HomePage };
//# sourceMappingURL=home.js.map