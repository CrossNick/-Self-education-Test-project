var BookManagement = BookManagement || {};
(function () {
    var self = this;
    self.viewModel = {
        books: ko.observableArray()
    };

    function OnAddButtonClick() {
        $('#create-book-authors').select2({
            ajax: {
                url: "/Book/GetAuthors",
                processResults: function (data) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: data.items
                    };
                }
                // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
            }
        });
        $('#create-book-modal').modal('show');
    }

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


    self.Initialize = function () {
        ko.applyBindings(self.viewModel);
        getBooksAjax();
        $("#book-create").click(function () {
            OnAddButtonClick();
        })
        
    }

    
}).apply(BookManagement);


