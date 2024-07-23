import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {

  apiHost = environment.apiHost;
  constructor(private http: HttpClient, public datepipe: DatePipe){
    
  }

  dtOptions: DataTables.Settings = {};
  ngOnInit(){
    this.dtOptions = {
      ajax:
      {
        url: this.apiHost+'/stock/list',
        dataSrc: 'apiData',
        processData: true
      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        if(data['change'] > 5){
          $('td:nth-child(3)', row).css('background-color', '#0F0')
        }
        if(data['change'] < -0.5){
          $('td:nth-child(3)', row).css('background-color', '#e88320')
        }

        $('td:nth-child(1)', row).html('<a href="">hello</a>');
        $('td:nth-child(1)', row).html('<a href="/details/'+data['sid']+'" target="_blank">'+data['share_name']+'</a>');

        console.log(data);
      },
      columns: [{
          title: 'Name',
          data: 'sid'
        }, {
          title: 'SID',
          data: 'sid'          
        }, {
          title: 'Rank',
          data: 'rank'          
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
        }, {
          title: 'Name',
          data: 'share_name'
        }
      ]
    }
  }

}
