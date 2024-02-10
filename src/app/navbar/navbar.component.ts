import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  refreshTime = 60;
  dateTime    = undefined;
  constructor(public datepipe: DatePipe){
    
  }

  ngOnInit(){
    this.dateTime = this.datepipe.transform((new Date), 'MMM d, y, h:mm:ss a');



    setInterval(() => {
      this.refreshTime ? this.refreshTime-- : this.refreshTime = 60;
    }, 1000);
  }
}
