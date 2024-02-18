import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})

export class StockDetailsComponent {
  sid = undefined;
  shareDetails  = undefined;
  transaction   = undefined;
  twoWeekData   = undefined;
  oneYear       = undefined;
  historyData   = undefined;
  holdingQty    = 0;
  server        = true;
  apiHost       = this.server ? 'http://localhost:3000' : 'https://ynhsgq-3000.csb.app';

  constructor(private route:ActivatedRoute, private http: HttpClient, public datepipe: DatePipe){
    this.apidata();
  }

  apidata(){
    this.sid = this.route.snapshot.params['sid'];
    console.log('Sid : ', this.sid);
  
    let apiUrl = this.apiHost+'/stock/details/'+this.sid;
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
          this.shareDetails = data['shareDetails'],
          this.transaction  = data['transactionDetails'],
          this.twoWeekData  = data['twoWeekData'].reverse(),
          this.oneYear      = data['oneYearData'].reverse(),
          this.historyData  = data['historyData'].reverse(),
          this.holdingData()
        ));
  }

  private holdingData(){
    this.holdingQty = 0;
    this.transaction.forEach(val => {
      if(val['type'] == 1){
        this.holdingQty += val['qty'];
      }
      else if(val['type'] == 2){
        this.holdingQty -= val['qty'];;
      }
      
    });
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
        alert('Something bad happened; Please check your API or Restart sandbox,  https://codesandbox.io/p/github/prasenjit1011/dematSandbox/tickertape');
        new Error('Something bad happened; Please check your API.');
      });
  }


}
