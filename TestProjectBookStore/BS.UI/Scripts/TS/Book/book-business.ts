///<reference path="./book-service.ts" />
///<reference path="./book-mgmt-model.ts" />

class BookBusiness {
    service: BookService;

    constructor(service: BookService) {
        this.service = service;
    }

    getAllAuthors(): Promise<Array<AuthorModel>> {
        var inner = this;

        return new Promise((resolve, reject) => {
            this.service.getAllAuthors()
                .done(function (result) {
                    resolve(result);
                }).fail(reject);
        });
    }
}