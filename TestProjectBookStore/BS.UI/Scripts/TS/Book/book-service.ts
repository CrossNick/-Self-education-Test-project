///<reference path="../service-base.ts" />

class BookService extends ServiceBase{
    urls: any;

    constructor(urls: any) {
        super();
        this.urls = urls;
    }

    getAllAuthors(): JQueryXHR {
        return this.Get(this.urls.GetAllAuthorsUrl, null);
    }

    getBooks(): JQueryXHR {
        return this.Get(this.urls.GetBooksUrl, null);
    }

    saveData(data:any): JQueryXHR {
        return this.Post(this.urls.SaveDataUrl, data);
    }

    createBook(data: any): JQueryXHR {
        return this.Post(this.urls.CreateBookUrl, data);
    }

    deleteBook(data: any): JQueryXHR {
        return this.Post(this.urls.DeleteBookUrl, data);
    }
}