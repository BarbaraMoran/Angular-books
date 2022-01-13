import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksOverviewComponent } from './books-overview/books-overview.component';
import { FormsModule } from '@angular/forms';
import { BookService } from './book.service';



@NgModule({
  declarations: [
    BookDetailComponent,
    BooksOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookDetailComponent,
    BooksOverviewComponent
  ],
  providers: [
    BookService
  ]

})
export class BooksModule { }
