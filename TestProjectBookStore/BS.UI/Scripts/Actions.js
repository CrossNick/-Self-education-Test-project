function getBooksAjax() {
    debugger;
    $.ajax({
        type: "GET",
        url: $('#getBooksLink').data('url'),
    }).done(function (data) {
        $(data).each(function (index, element) {
            viewModel.books.push(element);
        });
        ko.applyBindings(viewModel);
    }).error(function (ex) {
        alert("Error");
    });
}


viewModel = {
    books: ko.observableArray()
};