var BookManagement = BookManagement || {};
ko.bindingHandlers.dataTablesForEach = {
    page: 0,
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var binding = ko.utils.unwrapObservable(valueAccessor());

        ko.unwrap(binding.data);

        if (binding.options.paging) {
            binding.data.subscribe(function (changes) {
                var table = $(element).closest('table').DataTable();
                ko.bindingHandlers.dataTablesForEach.page = table.page();
                table.destroy();
            }, null, 'arrayChange');
        }

        var nodes = Array.prototype.slice.call(element.childNodes, 0);
        ko.utils.arrayForEach(nodes, function (node) {
            if (node && node.nodeType !== 1) {
                node.parentNode.removeChild(node);
            }
        });

        return ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var binding = ko.utils.unwrapObservable(valueAccessor()),
            key = 'DataTablesForEach_Initialized';

        ko.unwrap(binding.data);

        var table;
        if (!binding.options.paging) {
            table = $(element).closest('table').DataTable();
            table.destroy();
        }

        ko.bindingHandlers.foreach.update(element, valueAccessor, allBindings, viewModel, bindingContext);

        table = $(element).closest('table').DataTable(binding.options);

        if (binding.options.paging) {
            if (table.page.info().pages - ko.bindingHandlers.dataTablesForEach.page === 0) {
                table.page(--ko.bindingHandlers.dataTablesForEach.page).draw(false);
            } else {
                table.page(ko.bindingHandlers.dataTablesForEach.page).draw(false);
            }
        }

        if (!ko.utils.domData.get(element, key) && (binding.data || binding.length)) {
            ko.utils.domData.set(element, key, true);
        }

        return {
            controlsDescendantBindings: true
        };
    }
};
(function () {
    var self = this;
    self.viewModel = {
        books: ko.observableArray(),
        allauthors: ko.observableArray(),
    };

    function OnAddButtonClick() {
        $('#create-book-authors').select2({
            width: 'resolve'
        });
        
        $('#create-book-modal').modal('show');
    }

    function UpdateSelect2() {
        $('#edit-book-authors').select2();
    }
    function getAllAuthors() {
        $.ajax({
            type: "GET",
            url: $('#book-create').data('url'),
        }).done(function (data) {
            var model = { allauthors: data };
            ko.mapping.fromJS(model, {}, self.viewModel);
        });
    } 

    function getBooksAjax() {
        $.ajax({
            type: "GET",
            url: $('#getBooksLink').data('url'),
        }).done(function (data) {
            var model = { books: data };
            ko.mapping.fromJS(model, {}, self.viewModel);
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
            getBooksAjax();
        });
    }

    function OnEditClick() {
        var current = ko.dataFor(this);
        current.Mode("edit");
        UpdateSelect2();
    }

    self.OnCreateSubmitClick = function() {
        var model = {
            Title: $('#create-book-title').val(),
            ReleaseDate: $('#create-book-date').val(),
            Rating: $('#create-book-rating').val(),
            PageCount: $('#create-book-pagecount').val(),
            Authors: $('#create-book-authors').val()
        };
        $.ajax({
            type: "POST",
            url: $('#create-book-form').data('url'),
            data: model
        }).done(function () {
            $('#create-book-modal').modal('hide');
            getBooksAjax();
        });
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
        getAllAuthors();
        UpdateSelect2();
        $("#book-create").click(function () {
            OnAddButtonClick();
        });
        $(".kout-edit").click(function () {
            OnEditClick();
        });
        $("#book-create-submit").click(function () {
            self.OnCreateSubmitClick();
        });
        
    }

    
}).apply(BookManagement);


