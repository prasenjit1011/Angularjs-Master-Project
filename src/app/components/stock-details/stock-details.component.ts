import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})

export class StockDetailsComponent {
  sid           = undefined;
  shareName     = undefined;
  shareRank     = undefined;
  nseCode       = undefined;
  iciciCode     = undefined;
  growCode      = undefined;
  sharePrice    = 0;
  shareDetails  = undefined;
  transaction   = undefined;
  weeklyData    = undefined;
  oneYear       = undefined;
  historyData   = undefined;
  buyTotal      = 0;
  sellTotal     = 0;
  invStatus     = true;
  holdingQty    = 0;
  holdingCMP    = 0;
  apiHost       = environment.apiHost;
  stockUrlArr   = [];

  updSid        = '';
  updStockCode  = '';
  updStockName  = '';

  searchURL     = '';
  nseUrl        = "https://www.nseindia.com/get-quotes/equity?symbol=";
  ipoUrl        = "https://www.google.com/search?q=ipo+";
  priceChkUrl   = "https://www.google.com/search?q=share+price+";
  tradingUrl    = "https://www.google.com/search?q=share+price+tradingview+";
  tickerUrl     = "https://www.tickertape.in/stocks/"+this.sid+"?chartScope=1mo";
  moneyCtrlUrl  = "https://www.google.com/search?q=moneycontrol+";
  growUrl       = "https://www.google.com/search?q=groww+";
  m4mUrl        = "https://www.google.com/search?q=moneyworks4me+"+this.shareName;;
  tapiUrl       = "https://quotes-api.tickertape.in/quotes?sids="+this.sid;;


  constructor(private route:ActivatedRoute, private http: HttpClient, public datepipe: DatePipe){
    this.apidata();
    ;
  }

  stockUrl(){

    this.searchURL = this.priceChkUrl+this.shareName;    
    this.stockUrlArr.push({key:'nseUrl', val: this.nseCode ? this.nseUrl+this.nseCode : this.searchURL});
    this.stockUrlArr.push({key:'ipo', val: this.ipoUrl+this.shareName});;
    this.stockUrlArr.push({key:'priceChk', val: this.searchURL});;
    this.stockUrlArr.push({key:'trading', val: this.searchURL+"+tradingview+"+this.shareName});    
    this.stockUrlArr.push({key:'ticker', val:"https://www.tickertape.in/stocks/"+this.sid+"?chartScope=1mo"});;
    this.stockUrlArr.push({key:'moneyCtrl', val:"https://www.google.com/search?q=moneycontrol+"+this.shareName});;
    this.stockUrlArr.push({key:'growUrl', val:"https://www.google.com/search?q=groww+"+this.shareName});;
    this.stockUrlArr.push({key:'m4m', val:"https://www.google.com/search?q=moneyworks4me+"+this.shareName});;
    this.stockUrlArr.push({key:'tapi', val:"https://quotes-api.tickertape.in/quotes?sids="+this.sid});;

  }

  apidata(){
    this.sid = this.route.snapshot.params['sid'];    
    console.log('Sid :::: ', this.sid);
  
    let apiUrl = this.apiHost+'/stock/details/'+this.sid;
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
          this.shareDetails = data['shareDetails'] ? data['shareDetails'] : [],
          this.shareName    = data['shareDetails'] ? data['shareDetails']['share_name'] : '',
          this.shareRank    = data['shareDetails'] ? data['shareDetails']['rank'] : 0,        
          this.sharePrice   = data['shareDetails'] ? data['shareDetails']['ltp'] : 0,

          this.nseCode      = data['shareDetails'] ? data['shareDetails']['nseCode'] : 0,
          this.iciciCode    = data['shareDetails'] ? data['shareDetails']['iciciCode'] : 0,
          this.growCode     = data['shareDetails'] ? data['shareDetails']['growCode'] : 0,

          this.transaction  = data['transactionDetails'],
          this.weeklyData   = data['weeklyData'].reverse(),
          this.oneYear      = data['oneYearData'].reverse(),
          this.historyData  = data['historyData'].reverse(),
          this.holdingData(),
          this.stockUrl()
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

    this.holdingCMP = this.holdingQty*this.sharePrice;
    this.invStatus  = this.buyTotal-this.sellTotal > 0 ? true:false;
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

  updParamVal(event: Event, paramName){

    let apiUrl = this.apiHost+'/updStockParam';
    let paramValue = (<HTMLInputElement>event.target).value;
    this.http
        .post(apiUrl, {sid:this.sid, paramName, paramValue})
        .subscribe(data=>(
          console.log('- here -')
        ));
        // .pipe(
        //   retry(3),
        //   catchError(this.handleError)
        // );
    console.log('=======', paramName, this.updSid);

  }
}
