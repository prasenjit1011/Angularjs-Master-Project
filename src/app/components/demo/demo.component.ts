import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//let dateFormat = require('dateformat');
import { DatePipe } from '@angular/common';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})

export class DemoComponent implements OnInit {

  profit  = 0;
  cmprice = 0;
  ltpdata = undefined;
  sidData = undefined;
  apiHost = environment.apiHost;

  apiInterval = 1*60*1000;
  apiStatus = true;

  constructor(private http: HttpClient, public datepipe: DatePipe){
    this.apidata();
  }

  ngOnInit(){
    let currentTime = parseInt(this.datepipe.transform((new Date), 'H'));
    if(currentTime >= 9 && currentTime < 16 ){
      setInterval(() => this.apidata(), this.apiInterval);
    }
    else{
      this.apidata();
    }
  }

  private handleError(error:HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => {
        this.apiStatus = false;
        alert('Something bad happened; Please check your API or Restart sandbox,  https://codesandbox.io/p/github/prasenjit1011/dematSandbox/tickertape');
        new Error('Something bad happened; Please check your API.');
      });
  }


  apidata(){
    
    if(!this.apiStatus)return false;

    let apiUrl = this.apiHost+'/stock/list';
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
          this.sidData  = data['sidData'],
          this.ltpdata  = data['apiData'],
          this.dayStatus()
        ));
  }

  dayStatus() {
    console.log('-----dayStatus-----------');
    
    this.profit   = 0;
    this.cmprice  = 0;

    this.ltpdata.map((val,key)=>{
      //console.log(this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01);
      this.profit   += this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01;
      this.cmprice  += this.sidData[val['sid']]['cqty']*val['price'];
    });
  }

}
