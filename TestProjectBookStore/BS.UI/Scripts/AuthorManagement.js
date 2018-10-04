var AuthorManagement = AuthorManagement || {};

(function () {
    var self = this;

    var self = this;
    self.viewModel = {
        authors: ko.observableArray()
    };


    function getAuthorsAjax() {
        $.ajax({
            type: "GET",
            url: $('#getAuthorsLink').data('url'),
        }).done(function (data) {
            var model = { authors: data };
            ko.mapping.fromJS(model, {}, self.viewModel);
            //$(self.viewModel.authors).each(function (index, element) {
            //    element.FirstName = ko.observable(element.FirstName).extend({
            //        required: true
            //    });
            //    element.LastName = ko.observable(element.LastName).extend({
            //        required: true
            //    });
            //});
        });
    }

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
    } 

    self.saveData = function (currentData) {
        var submitData = ko.mapping.toJS(currentData);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: $('#author-edit').data('url'),
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.AuthorId(id);
            getAuthorsAjax();
        });
    }

    self.OnDeleteClick = function (current) {
        var submitData = ko.mapping.toJS(current);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: $('#author-delete').data('url'),
            data: JSON.stringify(submitData)
        }).done(function () {
            self.viewModel.authors.remove(function (author) {
                return author.AuthorId == current.AuthorId;
            });
        });
    }

    self.Initialize = function () {
        $("#author-table").DataTable({
            "processing": true,
            "serverSide": true,
            "columns": [
                { name: "FirstName", data: "FirstName" },
                { name: "LastName", data: "LastName" },
                { name: "BooksCount", data: "BooksCount" },
                {
                    name: "Authors", data: "Authors",
                    render: function (authors) {
                        var resultMarkup = "";
                        var links = [];

                        for (var i = 0; i < authors.length; i++) {
                            var url = self.editAuthorUrl + "/" + authors[i].FirstName + "-" + authors[i].LastName;
                            links[i] = "<p><a class='btn btn-link' href='" + url + "'>" + authors[i].FirstName + " " + authors[i].LastName + "</a></p>";
                        }

                        return links.join("");
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return "<a class='btn btn-info' href='#' onclick=BookGrid.EditBook('" + row.BookID + "'); >Edit</a>" +
                            "<a href='#' class='btn btn-danger' onclick=BookGrid.DeleteBook('" + row.BookID + "'); >Delete</a>";
                    }
                },
            ],
            "ajax": {
                "url": self.getBooksUrl,
                "type": "POST",
                "datatype": "json",
                "data": function (d) {
                    return Object.assign(d, BookFilter.vm.ToJS())
                }
            }
        });

        ko.applyBindings(self.viewModel);

       
        $("#author-create-save").click(function () {
            self.OnCreateSubmitClick();
        });
        getAuthorsAjax();
        
    }

    
}).apply(AuthorManagement);


