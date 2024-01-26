import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
	title		= '-: Post Listing :-'
	loading		= true;
	backurl		= '';
	users		= undefined;
	posts		= undefined;
	
	constructor(private route:ActivatedRoute, private http: HttpClient){
		this.backurl = '/';
		
        this.http
            .get('http://localhost:3100/users/'+this.route.snapshot.params['id']+'/posts')
            .subscribe(data=>(
				console.log(data),
				this.loading	= false,
				this.posts 		= data
            ));
	}
}
