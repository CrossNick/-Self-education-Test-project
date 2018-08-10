var Actions = Actions || {};
(function () {
    var self = this;
    self.viewModel = {
        books: ko.observableArray(),
        authors: ko.observableArray()
    };


    function getBooksAjax() {
        $.ajax({
            type: "GET",
            url: $('#getBooksLink').data('url'),
        }).done(function (data) {
            self.viewModel.books.removeAll();
            $(data).each(function (index, element) {
                self.viewModel.books.push(element);
            });
        }).error(function (ex) {
            alert("Error");
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
        getAuthorsAjax();
        getBooksAjax();
        
    }

    
}).apply(Actions);


