# Angular master

### Module base project :
In Angular, a module is a mechanism to group components, directives, pipes and services that are related, in such a way that can be combined with other modules to create an application.

### Component base project :
Standalone components provide a simplified way to build Angular applications. Each standalone component is developed independently, with its own set of dependencies and functionality. 


### Data daigram / Important files / Life cycle
tsconfig.app.json --> /src/main.ts --> /src/app/app.module.ts --> <br />
app.module.ts --> app.component.ts, navbar.component.ts, product-list.component.ts ...<br />

### Angular Decorators 
import { Component, ViewEncapsulation } from '@angular/core'; <br />

### @Component Decorators
##### Selector must be unique, component can be access using Selector 
eg : selector: 'app-navbar' <br />
access component using : <app-navbar></app-navbar> <br />

##### templateUrl : app.component.html
##### styleUrl : app.component.css
##### app.component.spec.ts for testing the app



## Important command list
npm i -g @angular/cli <br />
ng new projectName --no-strict --standalone false --routing false <br />
** Server-Side rendering : No <br />

ng serve <br />


## Important package need to install
ng add @ngrx/store <br />























#
#
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Important Command<br />

ng new angularTodo --no-strict --standalone false --routing false<br />
Select Basic CSS<br />
Select Server-Side Rendering : No<br />

ng g c product-list<br />
Arr = [{},{},{}]<br />
*ngFor="let prod of products"<br />





Please build an API for a movie lobby for OTT applications. The lobby has a collection of movies with genre, rating, and streaming link. The API should allow users to:
1. List all the movies in the lobby
2. Search for a movie by title or genre
3. Add a new movie to the lobby
4. Update an existing movie information (title, genre, rating, or streaming link)
5. Delete a movie from the lobby




The API should be built using TypeScript and MongoDB. 
You can use any Node.js framework (such as Express or Nest.js) and any MongoDB library (such as Mongoose or MongoDB driver).

Please build the API with the following endpoints:
- `GET /movies`: List all the movies in the lobby
- `GET /search?q={query}`: Search for a movie by title or genre
- `POST /movies`: Add a new movie to the lobby (requires "admin" role)
- `PUT /movies/:id`: Update an existing movie's information (title, genre, rating, or streaming link) (requires "admin" role)
- `DELETE /movies/:id`: Delete a movie from the lobby (requires "admin" role)


You can assume that the request and response payloads will be in JSON format. 
The movie data should be ideally stored in a MongoDB database However if you are out of time then you can also use in memory DB.

Please provide clear instructions on how to set up and run the API on a local machine. 
Also, please include a brief documentation of the API, including sample requests and responses for each endpoint. 
Additionally, please provide a set of test cases and ensure that the tests are written in TypeScript as well.

Depending on the time left it will be nice if you can use caching to reduce the load on the database and speed up response times.
To ensure quality, please implement the following measures:
- Write unit tests and integration tests for each endpoint to ensure that the API functions as expected. 
You can use any testing framework (such as Jest or Mocha). If you are out of time then add at least few integration and unit tests.
- Use a code quality tool (such as ESLint) to ensure that the code follows best practices and is maintainable.


Caching, 
Testing framework (such as Jest or Mocha)
ESLint

