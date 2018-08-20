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
            url: '/Author/AddAuthor',
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
                self.viewModel.authors.push(element);
            });
        }).error(function (ex) {
            alert("Error");
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


