import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//let dateFormat = require('dateformat');
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ticker-tape',
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css'
})
export class TickerTapeComponent implements OnInit {

  profit  = 0;
  cmprice = 0;
  ltpdata = undefined;
  sidData = undefined;
  
  server  = true;
  apiHost = this.server ? 'http://localhost:3000' : 'https://35v63r-3000.csb.app';

  apiInterval = 1*60*1000;

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


  apidata(){
    let apiUrl = this.apiHost+'/stock/list';
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
    
    this.profit   = 0;
    this.cmprice  = 0;

    this.ltpdata.map((val,key)=>{
      //console.log(this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01);
      this.profit   += this.sidData[val['sid']]['cqty']*val['dyChange']*val['c']*0.01;
      this.cmprice  += this.sidData[val['sid']]['cqty']*val['price'];
    });
  }

}
