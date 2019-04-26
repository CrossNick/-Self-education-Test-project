///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/knockout/knockout.d.ts" />
///<reference path="./book-business.ts" />
///<reference path="./book-mgmt-model.ts" />

class BookController {
    
    viewModel: BookMgmtModel;
    business: BookBusiness;

    constructor(business: BookBusiness) {
        this.viewModel = new BookMgmtModel();
        this.business = business;
    }

    OnAddButtonClick(): void {
        $('#create-book-authors').select2({
            width: 'resolve'
        });

        $('#create-book-modal').modal('show');
    }

    UpdateSelect2() : void {
        $('#edit-book-authors').select2();
    }

    getAllAuthors(): void {
        var allAutorsObtained = this.business.getAllAuthors();
        allAutorsObtained.then(function (data) {
            var model = { allauthors: data };
            ko.mapping.fromJS(model, {}, this.viewModel);
        });
    }

}