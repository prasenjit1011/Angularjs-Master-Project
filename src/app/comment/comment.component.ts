import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
	title			= '-: Comment Listing :-'
	loading			= true;
	backurl			= '';
	userId			= undefined
	users			= undefined;
	posts			= undefined;
	comments		= undefined;
	
	constructor(private route:ActivatedRoute, private http: HttpClient){
		this.userId		= this.route.snapshot.params['userId'];
        this.backurl 	= '/users/'+this.userId+'/posts';
		
		this.http
            .get('http://localhost:3100/posts/'+this.route.snapshot.params['id']+'/comments')
            .subscribe(data=>(
				console.log(data),
				this.loading	= false,
				this.comments 	= data
            ));
	}
}
