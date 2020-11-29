import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes:Routes = [
  {path:'auth/signup', component: SignupComponent},
  {path:'auth/signin', component: SigninComponent},
  {path:'books', component: BookListComponent},
  {path:'books/view/:id', component: SingleBookComponent},
  {path:'books/new', component: BookFormComponent},
  

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
