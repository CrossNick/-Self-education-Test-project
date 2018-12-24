var AuthorManagement = AuthorManagement || {};

(function () {
    var self = this;

    self.OnCreateSubmitClick = function () {
        var model = {
            FirstName: $('#create-author-fname').val(),
            LastName: $('#create-author-lname').val()
        };
        $.ajax({
            type: "POST",
            url: $('#create-author-form').data('url'),
            data: model
        }).done(function () {
            $('#create-author-modal').modal('hide');
            getAuthorsAjax();
        });
    }; 


    self.Initialize = function () {
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
                {   name: "Actions",
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

    self.Reload = function () {
        $("#author-table").DataTable().ajax.reload();
    };
    
}).apply(AuthorManagement);


