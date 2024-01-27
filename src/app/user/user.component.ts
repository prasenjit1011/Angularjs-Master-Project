import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
	title		= '-: User Listing :-'
	apiMsg		= undefined;
	loading		= true;
	users		= undefined;
	apiUrl		= 'http://localhost:3100/users';
	
	constructor(private http: HttpClient){		
        this.http
            .get(this.apiUrl)
            .subscribe(result=>(
				console.log(result['data']),
				this.loading	= false,
				this.apiMsg		= result['statusCode'] != 200 ? result['msg'] : undefined,
				this.users 		= result['data']
            ));
	}
}
