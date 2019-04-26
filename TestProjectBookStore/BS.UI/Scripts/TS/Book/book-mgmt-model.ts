class BookMgmtModel {
    books: KnockoutObservableArray<BookModel>;
    allauthors: KnockoutObservableArray<AuthorModel>;
}

class BookModel {
    BookId: KnockoutObservable<number>;
    Title: KnockoutObservable<string>;
    ReleaseDate: KnockoutObservable<string>;
    Authors: KnockoutObservableArray<AuthorModel>;
    Rating: KnockoutObservable<number>;
    PageCount: KnockoutObservable<number>;
    Mode: KnockoutObservable<string>;
}

class BookCreateVM {
    BookId: KnockoutObservable<number>;
    Title: KnockoutObservable<string>;
    ReleaseDate: KnockoutObservable<Date>;
    Authors: KnockoutObservableArray<AuthorModel>;
    Rating: KnockoutObservable<number>;
    PageCount: KnockoutObservable<number>;
    Mode: KnockoutObservable<string>;
}

class AuthorModel {
    AuthorId: KnockoutObservable<number>;
    FirstName: KnockoutObservable<string>;
    LastName: KnockoutObservable<string>;
    FullName: KnockoutObservable<string>;
    BooksCount: KnockoutObservable<number>;
    Mode: KnockoutObservable<string>;
}