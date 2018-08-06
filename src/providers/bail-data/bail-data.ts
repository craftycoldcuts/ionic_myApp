import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the BailDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BailDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BailDataProvider Provider');
  }
  
  getRemoteData(){
        this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=105sort=hot').subscribe(data => {
            console.log(data);
        });
    }
  
  getLocalData(){
        return this.http.get('assets/data/bailData.json');
    }
 

}
