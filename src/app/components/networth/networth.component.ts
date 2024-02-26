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
  
  dailyStatus = undefined;
  apiStatus   = true;
  apiHost = environment.apiHost;
  file: File = null;
  constructor(private uploadService: UploadService, private http: HttpClient, public datepipe: DatePipe){
    this.balancesheet();
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


  balancesheet(){

    let apiUrl = this.apiHost+'/networth';
    this.http
        .get(apiUrl)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(data=>(
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
