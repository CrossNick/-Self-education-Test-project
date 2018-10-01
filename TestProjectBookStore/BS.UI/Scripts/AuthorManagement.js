var AuthorManagement = AuthorManagement || {};
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

    var self = this;
    self.viewModel = {
        authors: ko.observableArray()
    };


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

    self.OnCreateSubmitClick = function () {
        var model = {
            FirstName: $('#create-author-fname').val(),
            LastName: $('#create-author-lname').val()
        };
        $.ajax({
            type: "POST",
            url: $('#create-author-form').data('url'),
            data: model
        }).done(function () {
            $('#create-author-modal').modal('hide');
            getAuthorsAjax();
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
            getAuthorsAjax();
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

       
        $("#author-create-save").click(function () {
            self.OnCreateSubmitClick();
        });
        getAuthorsAjax();
        
    }

    
}).apply(AuthorManagement);


