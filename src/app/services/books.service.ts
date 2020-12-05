import { Injectable } from '@angular/core';
import  firebase from 'firebase';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:Book[]= [];
  bookSubject =  new Subject<Book[]>();

  constructor() { }
//emitBooks
  emitBooks(){
    this.bookSubject.next(this.books);
  }

  //saveBook
  saveBooks(){
    firebase.database().ref('/books').set(this.books);

  }
  //getListBook
  getBooks(){
    firebase.database().ref('/books')
    .on(
      'value', (data)=>{
        this.books = data.val() ? data.val() : [];
      });
      this.emitBooks();
  }
  //getSingleBooks

  getSingleBook(id:number){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/books/'+id).once('value').then(
          (data)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        )
      }
    )
  }
  //creation new book

  createNewBook(newBook:Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book:Book) {
    const bookIndexRemove = this.books.findIndex(
      (bookElement =>
        bookElement === book)
    
    ); 
    this.books.splice(bookIndexRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  getIndex(book:Book){

    return this.books.findIndex(
      (bookel => bookel === book ) 
    );

  }
}
