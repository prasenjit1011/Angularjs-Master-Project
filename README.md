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
ng generate component compName <br />
ng generate `directive|pipe|service|class|guard|interface|enum|module` <br />



