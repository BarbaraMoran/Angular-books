import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { assign } from 'lodash';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.css']
})
export class BooksOverviewComponent implements OnInit {

  books!: Book[];
  selectedBook!: Book;

  //inyectamos el servicio en el parámetro del constructor declarándolo público
  constructor(public service: BookService) { 

  }

  ngOnInit(): void {
    //nos suscribimos al observable que nos llega a través del método findAll() del servicio books.
    //asignamos lo que viene con la propiedad 
    this.service.findAll().subscribe((data) => {
      //debugger;
      this.books = data;
    } );
  }

  //comprueba y devuelve un boolean
  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  //asigna el libro seleccionado por el user a selectedBook
  selectBook(book: Book):void{
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  //Evento a través del cual el hijo nos pasa info
  onBookUpdate(event: Book) {
    //buscamos (por id) en nuestro array de libros el libro que está actualizando el user
    let booksToUpdate: Book[] = 
    this.books.filter(function (currentBook: Book) {
      return currentBook.id === event.id;
    })
    //si lo tenemos
    if(booksToUpdate && booksToUpdate.length > 0 ) {
      const bookToUpdate: Book = booksToUpdate[0];

      //al elemento encontrado (id) le asignamos el valor del event (lo que venga del componente hijo)
      assign(bookToUpdate, event);
    }

  }

}
