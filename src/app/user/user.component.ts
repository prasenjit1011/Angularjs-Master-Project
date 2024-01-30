import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { retry } from 'rxjs';

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
	page 		= 1;
	cnt 		= 5;
	apiUrl		= 'http://localhost:3100/users';
	
	constructor(private route:ActivatedRoute, private http: HttpClient){		
		this.page = this.route.snapshot.params['id'] ?? 1;

        this.http
            .get(this.apiUrl)
			.pipe(
				retry(2)
			)
            .subscribe(result=>(
				console.log(result['data']),
				this.loading	= false,
				this.apiMsg		= result['statusCode'] != 200 ? result['msg'] : undefined,
				this.users 		= result['data']
            ));
	}
}
