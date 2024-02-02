import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  refreshTime = 60;
  ngOnInit(){
    setInterval(() => {
      this.refreshTime ? this.refreshTime-- : this.refreshTime = 60;
    }, 1000);
  }
}
