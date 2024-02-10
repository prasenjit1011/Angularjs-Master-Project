import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  refreshTime = undefined;
  dateTime    = undefined;
  constructor(public datepipe: DatePipe){
    
  }

  ngOnInit(){
    setInterval(() => {
      this.dateTime = this.datepipe.transform((new Date), 'MMM d, y, h:mm:ss a');
    }, 1000);
    
    let day = this.datepipe.transform((new Date), 'EEEE');
    if(day != 'Sunday' && day != 'Saturday'){
      setInterval(() => {
        this.refreshTime ? this.refreshTime-- : this.refreshTime = 60;
      }, 1000);
    }
    
  }
}
