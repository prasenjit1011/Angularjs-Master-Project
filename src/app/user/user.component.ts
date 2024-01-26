import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
	title		= '-: User Listing :-'
	loading		= true;
	users		= undefined;
	apiUrl		= 'http://localhost:3100/users';
	
	constructor(private http: HttpClient){		
        this.http
            .get(this.apiUrl)
            .subscribe(data=>(
				console.log(data),
				this.loading	= false,
				this.users 		= data
            ));
	}
}
