import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import {cloneDeep} from 'lodash';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
   _book!: Book;
  @Output() 
  bookUpdate: EventEmitter<Book> = new EventEmitter<Book>();


  constructor() {
    // this.book = new Book(); 

   }

   get book(): Book {
    return this._book;
  }

  //hace referencia al input book que está en <app-book-detail> (comunicación padre-hijo)
  //es decir, ese book me lo pasa mi padre y yo lo paso por la función para hacer el clonedeep
  @Input()
  set book(book: Book) {
    this._book = cloneDeep(book);
  }


  ngOnInit(): void {
    //se ejecutará cuando hagamos click en una entrada del grid
    //una vez se construya el componente
  }



  apply(book: Book): void {
    this.bookUpdate.emit(this._book);

  }

}
