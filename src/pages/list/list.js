var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { BailDataProvider } from '../../providers/bail-data/bail-data';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, bailDataProvider) {
        this.navCtrl = navCtrl;
        this.bailDataProvider = bailDataProvider;
        this.fetchBailData();
    }
    // runs when ion page loads
    ListPage.prototype.ionViewDidEnter = function () {
        console.log("hello");
        //      this.fetchBailData();  
    };
    ListPage.prototype.itemSelected = function (item) {
        console.log("Selected Item", item);
    };
    ListPage.prototype.fetchBailData = function () {
        var _this = this;
        // load remote bail data    
        this.bailDataProvider.getLocalData().subscribe(function (mong) {
            //      this.bailData = mong;
            _this.bailData = mong["data"];
            console.log("list1");
        }, function (err) { return console.error(err); }, function () { return console.log('List: done loading bail checks'); });
    };
    __decorate([
        ViewChild(List),
        __metadata("design:type", List)
    ], ListPage.prototype, "list", void 0);
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController,
            BailDataProvider])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map