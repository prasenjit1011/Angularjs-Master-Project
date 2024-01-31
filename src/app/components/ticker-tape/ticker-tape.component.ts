import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css'
})
export class TickerTapeComponent {
  
  profit  = 0;
  ltpdata = undefined;
  sidData = undefined;
  apiHost = 'http://localhost:3000';
  sandboxHost = 'https://ynhsgq-3000.csb.app'

  constructor(private http: HttpClient){
    let apiUrl = this.sandboxHost+'/stock/list';

    this.http
        .get(apiUrl)
        .subscribe(data=>(
          this.sidData  = data['sidData'],
          this.ltpdata  = data['apiData'],
          this.mydata()
        ));
  }

  mydata() {

    console.log('-----here-----------');
    this.ltpdata.map((val,key)=>{
      this.profit += this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01;
    });
     

  }

}
