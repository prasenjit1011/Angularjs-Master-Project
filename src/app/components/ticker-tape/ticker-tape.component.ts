import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css'
})
export class TickerTapeComponent {
  
  profit  = 0;
  cmprice = 0;
  ltpdata = undefined;
  sidData = undefined;
  apiHost = 'http://localhost:3000';
  sandboxHost = 'https://ynhsgq-3000.csb.app'

  constructor(private http: HttpClient){
    this.apidata();
  }

  ngOnInit(){
      //setInterval(() => this.apidata(), 300000);
  }

  apidata(){
    let apiUrl = this.sandboxHost+'/stock/list';
    this.http
        .get(apiUrl)
        .subscribe(data=>(
          this.sidData  = data['sidData'],
          this.ltpdata  = data['apiData'],
          this.dayStatus()
        ));
  }

  dayStatus() {
    console.log('-----dayStatus-----------');
    
    //this.profit   = 0;
    //this.cmprice  = 0;

    this.ltpdata.map((val,key)=>{
      console.log(this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01);
      this.profit   += this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01;
      this.cmprice  += this.sidData[val['sid']]['cqty']*val['price'];
    });
  }

}
