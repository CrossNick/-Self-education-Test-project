var BookManagement = BookManagement || {};
//TODO: Bootstrap layout and gri
//TODO: CHeck mapping
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
            ko.mapping.fromJS(data, {}, self.viewModel.books);
            $(self.viewModel.books).each(function (index, element) {
                element.Title = ko.observable(element.Title).extend({
                    required: true
                });
                element.ReleaseDate = ko.observable(element.ReleaseDate).extend({
                    required: true
                });
                    //    ReleaseDate: ko.observable(element.ReleaseDate).extend({
                    //        required: true
                    //    }),
                    //    Authors: ko.observableArray(element.Authors),
                    //    Rating: ko.observable(element.Rating),
                    //    PageCount: ko.observable(element.PageCount),
                    //    Mode: ko.observable("display")
                    //};
                element.Mode = ko.observable("display");
                self.viewModel.books.push(mappedItem);
            });
        });
    }

    self.saveData = function(currentData) {
        var submitData = {
            BookId: currentData.BookId(),
            Title: currentData.Title(),
            ReleaseDate: currentData.ReleaseDate(),
            Authors: currentData.Authors(),
            Rating: currentData.Rating(),
            PageCount: currentData.PageCount()
        };
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
        var submitData = {
            BookId: current.BookId(),
            Title: current.Title(),
            ReleaseDate: current.ReleaseDate(),
            Authors: current.Authors(),
            Rating: current.Rating(),
            PageCount: current.PageCount()
        };
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


