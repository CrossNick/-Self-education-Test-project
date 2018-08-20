var BookManagement = BookManagement || {};
(function () {
    var self = this;
    self.viewModel = {
        books: ko.observableArray()
    };

    function OnAddButtonClick() {
        $('#create-book-authors').select2(
            $.ajax({
                url: "/Book/GetAuthors",
                processResults: function (data) {
                    return {
                        results: data.items
                    };
                }
            }).error(function (ex) {
                alert(ex);
            })
        );
        $('#create-book-modal').modal('show');
    }

    function getBooksAjax() {
        $.ajax({
            type: "GET",
            url: $('#getBooksLink').data('url'),
        }).done(function (data) {
            self.viewModel.books.removeAll();
            $(data).each(function (index, element) {
                var mappedItem =
                    {
                        BookId: ko.observable(element.BookId),
                        Title: ko.observable(element.Title).extend({
                            required: true
                        }),
                        ReleaseDate: ko.observable(element.ReleaseDate).extend({
                            required: true
                        }),
                        Authors: ko.observableArray(element.Authors),
                        Rating: ko.observable(element.Rating),
                        PageCount: ko.observable(element.PageCount),
                        Mode: ko.observable("display")
                    };
                self.viewModel.books.push(mappedItem);
            });
        }).error(function (ex) {
            alert("Error");
        });
    }

    function saveData(currentData) {
        var postUrl = "";
        var submitData = {
            BookId: currentData.BookId(),
            Title: currentData.Title(),
            ReleaseDate: currentData.ReleaseDate(),
            Authors: currentData.Authors(),
            Rating: currentData.Rating(),
            PageCount: currentData.PageCount()
        };
        if (currentData.Id && currentData.Id > 0) {
            postUrl = "/Book/Edit"
        }
        else {
            postUrl = "/Book/Create"
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: postUrl,
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.Id(id);
        }).error(function (ex) {
            alert("ERROR Saving");
        })
    }

    function OnEditClick() {
        var current = ko.dataFor(this);
        current.Mode("edit");
    }
    self.Initialize = function () {
        ko.applyBindings(self.viewModel);
        getBooksAjax();
        $("#book-create").click(function () {
            OnAddButtonClick();
        });
        $("#edit-book-button").click(function () {
            OnEditClick();
        });
        
    }

    
}).apply(BookManagement);


