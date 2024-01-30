import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css'
})
export class TickerTapeComponent {
  ltpdata = undefined;
  apiHost = 'http://localhost/myproject/Api';

  constructor(private http: HttpClient){
    //let apiUrlz = 'https://quotes-api.tickertape.in/quotes?sids=IRE,INOXI,HAP,ADAG,ESAF,IRM,SULA,ADEL,DABU,WIPR,IGAS,CAMP,ADAN,KTKM,RELI,ADAI,APTU,AET,INFY,BION';
    let apiUrl = this.apiHost+'/ltpdata.php';
    this.http
        .get(apiUrl)
        .subscribe(data=>(
          console.log(data),
          this.ltpdata = data
        ));

  }
}
