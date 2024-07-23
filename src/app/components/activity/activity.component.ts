import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  sid       = undefined;
  shareName = undefined;
  apiHost   = environment.apiHost;

  constructor(private http: HttpClient){

  }


  addShare(){
    console.log('***here***', this.shareName);

    let apiUrl = this.apiHost+'/stock/add';
    console.log(apiUrl);
    this.http
        .post(apiUrl, {sid:this.sid, shareName : this.shareName})
        .subscribe(data=>(
          console.log('- here -', data)
        ));
        // .pipe(
        //   retry(3),
        //   catchError(this.handleError)
        // );
  }


  searchShare(){

    // let apiUrl = this.apiHost+'/updStockParam';
    // let paramValue = (<HTMLInputElement>event.target).value;
    // this.http
    //     .post(apiUrl, {sid:this.sid, paramName, paramValue})
    //     .subscribe(data=>(
    //       console.log('- here -')
    //     ));
    //     // .pipe(
    //     //   retry(3),
    //     //   catchError(this.handleError)
    //     // );
    console.log('=======here=====');
  }

}
