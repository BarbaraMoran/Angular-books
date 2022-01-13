import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash';
import { Observable, Observer } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
books!: Book[];
  constructor() { 
    this.books = [
      Book.from("Aldous Huxley", "The doors of Perception"), 
      Book.from("JK Rowling", "Harry Potter"), 
      Book.from("Elvira Lindo", "Manolito Gafotas"), 
      Book.from("Emilia Pardo Bazán", "Los Pazos de Ulloa"), 
    ]
  }

  //devolverá todos los libros.
  //Esta función devuelve un observable al que nos vamos a poder suscribir
  //Un observable es un canal de un grupo de datos y el observer es el objeto que atraviesa ese canal con los datos que queremos.  (coche-carretera)
  findAll(): Observable<Book[]> {
    //creamos un observable
    return new Observable((observer: Observer<Book[]>) => {
    observer.next(this.books);
    observer.complete();
  })
  }

  //devolverá el que se busque por id
  findOne(id: number): Observable<Book> {
    let bookCopy: Book;

    //buscamos el objeto libro que coincida con el id que nos han pasado. Nos devuelve solo 1, el primero
    const originalBook = this.books.find(book => book.id === id);
    if(originalBook) {
      //lo clonamos y guardamos en bookCopy
      bookCopy = cloneDeep(originalBook);
    }
    

    return new Observable((observer: Observer<Book>) => {
      if (bookCopy) {
          //le decimos al observer que devuelva la copia
          observer.next(bookCopy);
          observer.complete();
      } else {
        //no hemos encontrado lo que buscamos
        observer.error(`book with id: ${id} not found! `);

      }

    })
  }

  //save
  save(bookToSave: Book): Observable<Book> {
    //lo he tenido que poner any porque no me deja si es undefined o Book
    let savedBook: any; 
    
    if(bookToSave.id) {
      savedBook = this.books.find(book => book.id === bookToSave.id);
      if(savedBook) {
        assign(savedBook, bookToSave);
      }
    } else {
      savedBook = Book.from(bookToSave.author,bookToSave.title);
      this.books.push(savedBook);
    }

    return this.findOne(savedBook.id);
  }








}

