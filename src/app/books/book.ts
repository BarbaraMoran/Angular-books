import { BooksOverviewComponent } from "./books-overview/books-overview.component";

export class Book {

    public id!: number;
    public author!: string;
    public title!: string;
    static idSeq = 1;

    //método estático para instanciar un nuevo libro
    static from(author: string, title: string): Book {
        const book = new Book();
        book.author = author;
        book.title = title;
        book.id = Book.idSeq++;
        return book; 
    }



    constructor(){}


}
