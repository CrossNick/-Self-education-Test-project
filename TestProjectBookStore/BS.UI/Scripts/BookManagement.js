var BookManagement = BookManagement || {};
//TODO: Bootstrap layout and grid
(function () {
    var self = this;
    self.viewModel = {
        books: ko.observableArray()
    };

    function OnAddButtonClick() {
        $('#create-book-authors').select2(
            $.ajax({
                url: $('#book-create').data('url'),
                processResults: function (data) {
                    return {
                        results: data.items
                    };
                }
            })
        );
        $('#create-book-modal').modal('show');
    }

    function getBooksAjax() {
        $.ajax({
            type: "GET",
            url: $('#getBooksLink').data('url'),
        }).done(function (data) {
            var model = { books: data };
            ko.mapping.fromJS(model, {}, self.viewModel);
            //$(self.viewModel.books).each(function (index, element) {
            //    element.Title = ko.observable(element.Title).extend({
            //        required: true
            //    });
            //    element.ReleaseDate = ko.observable(element.ReleaseDate).extend({
            //        required: true
            //    });
            //});
        });
    }

    self.saveData = function(currentData) {
       var submitData = ko.mapping.toJS(currentData);//{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: $('#book-update').data('url'),
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.BookId(id);
        });
    }

    function OnEditClick() {
        var current = ko.dataFor(this);
        current.Mode("edit");
    }

    self.OnDeleteClick = function(current)
    {
        var submitData = ko.mapping.toJS(current);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: $('#book-delete').data('url'),
            data: JSON.stringify(submitData)
        }).done(function () {
            self.viewModel.books.remove(function (book) {
                return book.BookId == current.BookId;
            });
        });
    }

    self.Initialize = function () {
        ko.applyBindings(self.viewModel);
        getBooksAjax();
        $("#book-create").click(function () {
            OnAddButtonClick();
        });
        $(".kout-edit").click(function () {
            OnEditClick();
        });
        
    }

    
}).apply(BookManagement);


