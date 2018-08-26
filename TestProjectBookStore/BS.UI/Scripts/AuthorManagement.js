var AuthorManagement = AuthorManagement || {};
(function () {
    var self = this;

    var self = this;
    self.viewModel = {
        authors: ko.observableArray()
    };

    function OnSaveButtonClick() {
        $.ajax({
            type: "GET",
            url: $('#author-create-save').data('url'),
            data: {
                FirstName: $('#create-author-fname').val(),
                LastName: $('#create-author-lname').val()
            }
        }).done(function (data) {
            self.viewModel.authors.push(data);
            $('#create-author-modal').modal('hide');
            
        });
    }

    function getAuthorsAjax() {
        $.ajax({
            type: "GET",
            url: $('#getAuthorsLink').data('url'),
        }).done(function (data) {
            self.viewModel.authors.removeAll();
            $(data).each(function (index, element) {
                var mappedItem =
                    {
                        AuthorId: ko.observable(element.AuthorId),
                        FirstName: ko.observable(element.FirstName).extend({
                            required: true
                        }),
                        LastName: ko.observable(element.LastName).extend({
                            required: true
                        }),
                        BooksCount: ko.observable(element.BooksCount),
                        Mode: ko.observable("display")
                    };
                self.viewModel.authors.push(mappedItem);
            });
        });
    }

    self.saveData = function (currentData) {
        var submitData = {
            AuthorId: currentData.AuthorId(),
            FirstName: currentData.FirstName(),
            LastName: currentData.LastName(),
            BooksCount: currentData.BooksCount()
        };
        $.ajax({
            type: "POST",
            contentType: $('#author-edit').data('url'),
            url: postUrl,
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.AuthorId(id);
        });
    }

    self.OnDeleteClick = function (current) {
        var submitData = {
            AuthorId: current.AuthorId(),
            FirstName: current.FirstName(),
            LastName: current.LastName(),
            BooksCount: current.BooksCount()
        };
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
        ko.applyBindings(self.viewModel);

        $('#author-create-save').click(function () {
            OnSaveButtonClick();
        });
        getAuthorsAjax();
        
    }

    
}).apply(AuthorManagement);


