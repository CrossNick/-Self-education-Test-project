///<reference path="./author-service.ts" />

class AuthorBusiness {
    service: AuthorService;

    constructor(service: AuthorService) {
        this.service = service;
    }
}