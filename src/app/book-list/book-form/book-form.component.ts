import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup = new FormGroup({});
  constructor(private formBuilder:FormBuilder,private bookservice:BooksService,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.bookForm = this.formBuilder.group({

      title: ['', Validators.required],
      author:['', Validators.required]
    }  )
  }

  //ajout d'un nouveau book
  onSaveBook(){
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);
    this.bookservice.createNewBook(newBook);
    this.router.navigate(['/books'])
  }
}
