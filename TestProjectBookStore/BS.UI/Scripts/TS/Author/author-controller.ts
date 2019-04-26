///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/knockout/knockout.d.ts" />
///<reference path="./author-business.ts" />

class AuthorController {
    business: AuthorBusiness;

    constructor(business: AuthorBusiness) {
        this.business = business;
    }

    initialize(): void {

        this.initDataTable();
    }

    reload(): void {
        $("#author-table").DataTable().ajax.reload();
    }

    initDataTable(): void {
        $("#author-table").DataTable({
            "processing": true,
            "serverSide": true,
            // "pagingType": "full_numbers",
            // "paging": true,
            "lengthMenu": [10, 25, 50, 75, 100],
            "columns": [
                { name: "FirstName", data: "FirstName" },
                { name: "LastName", data: "LastName" },
                { name: "BooksCount", data: "BooksCount" },
                {
                    name: "Actions",
                    data: null,
                    render: function (data, type, row) {
                        return "<button class=\"btn btn-success kout-edit\" onclick=\"\">Edit</button>" +
                            "<button class=\"btn btn-danger kout-delete \" id=\"author-delete \" onclick=\"\">Delete</button>";
                    }
                },
            ],
            "ajax": {
                "url": $('#getAuthorsLink').data('url'),
                "type": "POST",
                "datatype": "json"
            }
        });
    }
}