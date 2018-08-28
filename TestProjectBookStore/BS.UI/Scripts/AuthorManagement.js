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

    self.saveData = function (currentData) {
        var submitData = ko.mapping.toJS(currentData);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: $('#author-edit').data('url'),
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.AuthorId(id);
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
        ko.applyBindings(self.viewModel);

        $('#author-create-save').click(function () {
            OnSaveButtonClick();
        });
        getAuthorsAjax();
        
    }

    
}).apply(AuthorManagement);


