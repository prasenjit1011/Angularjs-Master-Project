import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})

export class StockDetailsComponent {
  sid = undefined;
  shareName     = undefined;
  shareDetails  = undefined;
  transaction   = undefined;
  weeklyData    = undefined;
  oneYear       = undefined;
  historyData   = undefined;
  buyTotal      = 0;
  sellTotal     = 0;
  holdingQty    = 0;
  holdingCMP    = 0;
  apiHost = environment.apiHost;

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
          this.shareName    = data['shareDetails']['share_name'],
          this.transaction  = data['transactionDetails'],
          this.weeklyData   = data['weeklyData'].reverse(),
          this.oneYear      = data['oneYearData'].reverse(),
          this.historyData  = data['historyData'].reverse(),
          this.holdingData()
        ));
  }

  private holdingData(){
    this.holdingQty = 0;
    this.buyTotal   = 0;
    this.sellTotal  = 0;
    this.transaction.forEach(val => {
      if(val['action'] == 'Buy'){
        this.holdingQty += val['qty'];
        this.buyTotal   += val['qty']*val['price'];
      }
      else if(val['action'] == 'Sell'){
        this.holdingQty -= val['qty'];;
        this.sellTotal  += val['qty']*val['price'];
      }
    });

    this.holdingCMP = this.holdingQty*this.shareDetails['ltp']
  }



  private handleError(error:HttpErrorResponse) {
    if (error.status === 0) {
      //// A client-side or network error occurred. Handle it accordingly.
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
