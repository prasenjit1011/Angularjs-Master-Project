import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css'
})
export class TickerTapeComponent {
  ltpdata = undefined;
  sidData = undefined;
  apiHost = 'https://mmsv6q-3000.csb.app';

  constructor(private http: HttpClient){
    let apiUrl = this.apiHost+'/stock/list';

    this.http
        .get(apiUrl)
        .subscribe(data=>(
          console.log(data['sidData']['ADAG']),
          this.sidData  = data['sidData'],
          this.ltpdata  = data['apiData']
        ));

  }
}
