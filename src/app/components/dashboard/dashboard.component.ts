import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {

  server  = true;
  apiHost = this.server ? 'http://localhost:3000' : 'https://35v63r-3000.csb.app';

  constructor(private http: HttpClient, public datepipe: DatePipe){
    
  }

  dtOptions: DataTables.Settings = {};
  ngOnInit(){
    this.dtOptions = {
      ajax:
      {
        url: this.apiHost+'/stock/list',
        dataSrc: 'apiData'
      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        if(data['change'] > 5){
          $('td:nth-child(3)', row).css('background-color', '#0F0')
        }
        if(data['change'] < -0.5){
          $('td:nth-child(3)', row).css('background-color', '#e88320')
        }
      },
      columns: [{
          title: 'SID',
          data: 'sid'
        }, {
          title: 'LTP',
          data: 'price'
        }, {
          title: 'Change',
          data: 'change'
        }, {
          /*title: 'Open',
          data: 'o'
        }, {
          title: 'High',
          data: 'h',
        }, {
          title: 'Low',
          data:'l',
        }, {
          title: 'Close',
          data: 'c',
        }, {*/
          title: 'Vol',
          data: 'vol',
        }, {
          /*title: 'wkRange',
          data: 'wkRange',
        }, {
          title: 'mnRange',
          data: 'mnRange',
        }, {*/
          title: 'dyCh',
          data: 'dyChange',
        }, {
          title: 'wkCh',
          data: 'wkChange',
        }, {
          title: 'mnCh',
          data: 'mnChange',
        }, {
          /*title: 'crossedHigh',
          data: 'crossedHigh',
        }, {
          title: 'crossedLow',
          data: 'crossedLow',
        }, {*/
          title: 'away52wH',
          data: 'away52wH',
        }, {
          title: 'away52wL',
          data: 'away52wL',
        }, {
          title: 'low52w',
          data: 'low52w',
        }, {
          title: 'high52w',
          data: 'high52w'
      }]
    }
  }

}
