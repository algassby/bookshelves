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
    if(book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        ()=>{
          console.log("photo supprimée!");
        }
      ).catch(
        (error)=>{
          console.log("fichier non trouvé"+error);
        }
        
      );
    }
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

  //updload file-photo using firebase storage

  uploadFile(file:File){
    return new Promise(
      (resolve, reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload =  firebase.storage().ref()
        .child('images/'+almostUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log("chargement");
          }, (error)=>{
            console.log("Erreur de chargement"+error);
            reject();
          },
          ()=>{
            resolve(upload.snapshot.metadata.downloadURLs);
          }
        );
      }
    );
  }
}
