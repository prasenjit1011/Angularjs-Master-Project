import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from './../../../environments/environment';
import { UploadService } from './../../upload.service';

@Component({
  selector: 'app-networth',
  templateUrl: './networth.component.html',
  styleUrl: './networth.component.css'
})
export class NetworthComponent {
  
  sl = 0;
  todayChange = 0;
  cmpTotal    = 0;
  portfolio   = undefined;
  dailyStatus = undefined;
  stockList   = undefined;
  apiStatus   = true;
  apiHost     = environment.apiHost;
  file: File  = null;

  sortBy    = 'sid';
  sortType  = 2;
  
  constructor(private uploadService: UploadService, private http: HttpClient, public datepipe: DatePipe){
    this.balancesheet();
    this.myportfolio();
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this.uploadService.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }


  sortData(colName = 'sid'){

    this.sortBy   = colName;
    this.sortType = this.sortType == 1 ? 2 : 1;

    return this.stockList.sort((a, b) => {

      if(this.sortType == 1){
        if(colName == 'sid'){
          if (a.sid < b.sid) {
            return -1;
          }
        }
        else if(colName == 'stock'){
          if (a.stock < b.stock) {
            return -1;
          }
        }
        else if(colName == 'qty'){
          if (a.qty < b.qty) {
            return -1;
          }
        }
        else if(colName == 'ltp'){
          if (a.ltp < b.ltp) {
            return -1;
          }
        }
        else if(colName == 'currentVal'){
          if (a.currentVal < b.currentVal) {
            return -1;
          }
        }
      }
      else{
        if(colName == 'sid'){
          if (a.sid > b.sid) {
            return -1;
          }
        }
        else if(colName == 'stock'){
          if (a.stock > b.stock) {
            return -1;
          }
        }
        else if(colName == 'qty'){
          if (a.qty > b.qty) {
            return -1;
          }
        }
        else if(colName == 'ltp'){
          if (a.ltp > b.ltp) {
            return -1;
          }
        }
        else if(colName == 'currentVal'){
          if (a.currentVal > b.currentVal) {
            return -1;
          }
        }
      }

    });
  }

  myportfolio(){

    let apiUrl = this.apiHost+'/tradedata';
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
          this.todayChange  = data['todayChange'],
          this.cmpTotal     = data['cmp'],
          this.stockList    = data['currentArr'],
          this.portfolio    = this.sortData('sid')
        ));
  }


  balancesheet(){

    let apiUrl = this.apiHost+'/networth';
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
          console.log(typeof data),
          console.log(data),
          this.dailyStatus = data
        ));
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

}
