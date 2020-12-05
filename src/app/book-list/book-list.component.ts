import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books:Book[] = [];
  bookSubscription :Subscription = new Subscription();
  constructor(private bookService:BooksService,private route:Router) { }
  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books:Book[])=>{
        this.books = books;
      }
    );
    this.bookService.emitBooks();
    this.bookService.getBooks();
  }

  //ajout book
  onNewBook(){
    this.route.navigate(['/books', 'new']);
  }
  //remove
  onDelete(book:Book){
    this.bookService.removeBook(book);
  }
//voir un seul livre
  onViewBook(id:number){
    this.route.navigate(['/books', 'view', id]);
  }

  //
  

}
