function getBooksAjax() {
    $.ajax({
        url: $('#getBooksLink').data('url'),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.length != 0) {
                $('#tablehead').empty();
                $('#tablebody').empty();
                $('#tablehead').append("<tr><th scope=\"col\">ID</th><th scope=\"col\">Title</th><th scope=\"col\">Authors</th>"+
                    "<th scope=\"col\">ReleaseDate</th><th scope=\"col\">Rating</th><th scope=\"col\">PageCount</th></tr > ")
                for (var x = 0; x < data.length; x++) {
                    var Authors = "";
                    data[x].Authors.forEach(function (item) {
                        Authors += item;
                        Authors += ", ";
                    });

                    $('#tablebody').append("<tr><td scope=\"row\">" + data[x].BookId + "</td><td>" + data[x].Title + "</td><td>" + Authors + "</td><td>" + data[x].ReleaseDate + "</td><td>" + data[x].Rating + "</td><td>" + data[x].PageCount + "</td></tr>")
                }
            }
        },
        error: function () {
            alert("Error");
        }
    });
}