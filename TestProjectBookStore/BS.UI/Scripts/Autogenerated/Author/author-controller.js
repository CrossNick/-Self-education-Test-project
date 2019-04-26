///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/knockout/knockout.d.ts" />
///<reference path="./author-business.ts" />
class AuthorController {
    constructor(business) {
        this.business = business;
    }
    initialize() {
        this.initDataTable();
    }
    reload() {
        $("#author-table").DataTable().ajax.reload();
    }
    initDataTable() {
        $("#author-table").DataTable({
            "processing": true,
            "serverSide": true,
            // "pagingType": "full_numbers",
            // "paging": true,
            "lengthMenu": [10, 25, 50, 75, 100],
            "columns": [
                { name: "FirstName", data: "FirstName" },
                { name: "LastName", data: "LastName" },
                { name: "BooksCount", data: "BooksCount" },
                {
                    name: "Actions",
                    data: null,
                    render: function (data, type, row) {
                        return "<button class=\"btn btn-success kout-edit\" onclick=\"\">Edit</button>" +
                            "<button class=\"btn btn-danger kout-delete \" id=\"author-delete \" onclick=\"\">Delete</button>";
                    }
                },
            ],
            "ajax": {
                "url": $('#getAuthorsLink').data('url'),
                "type": "POST",
                "datatype": "json"
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UUy9BdXRob3IvYXV0aG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBQ3hELDREQUE0RDtBQUM1RCw0Q0FBNEM7QUFFNUMsTUFBTSxnQkFBZ0I7SUFHbEIsWUFBWSxRQUF3QjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVTtRQUVOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTtRQUNGLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELGFBQWE7UUFDVCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGdDQUFnQztZQUNoQyxrQkFBa0I7WUFDbEIsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztZQUNuQyxTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7Z0JBQ3hDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUN0QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtnQkFDMUM7b0JBQ0ksSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLFVBQVUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHO3dCQUM3QixPQUFPLHdFQUF3RTs0QkFDM0Usa0dBQWtHLENBQUM7b0JBQzNHLENBQUM7aUJBQ0o7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsVUFBVSxFQUFFLE1BQU07YUFDckI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2pxdWVyeS9qcXVlcnkuZC50c1wiIC8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3Mva25vY2tvdXQva25vY2tvdXQuZC50c1wiIC8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYXV0aG9yLWJ1c2luZXNzLnRzXCIgLz5cclxuXHJcbmNsYXNzIEF1dGhvckNvbnRyb2xsZXIge1xyXG4gICAgYnVzaW5lc3M6IEF1dGhvckJ1c2luZXNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1c2luZXNzOiBBdXRob3JCdXNpbmVzcykge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBidXNpbmVzcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmluaXREYXRhVGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgJChcIiNhdXRob3ItdGFibGVcIikuRGF0YVRhYmxlKCkuYWpheC5yZWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RGF0YVRhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgICQoXCIjYXV0aG9yLXRhYmxlXCIpLkRhdGFUYWJsZSh7XHJcbiAgICAgICAgICAgIFwicHJvY2Vzc2luZ1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInNlcnZlclNpZGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gXCJwYWdpbmdUeXBlXCI6IFwiZnVsbF9udW1iZXJzXCIsXHJcbiAgICAgICAgICAgIC8vIFwicGFnaW5nXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoTWVudVwiOiBbMTAsIDI1LCA1MCwgNzUsIDEwMF0sXHJcbiAgICAgICAgICAgIFwiY29sdW1uc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiRmlyc3ROYW1lXCIsIGRhdGE6IFwiRmlyc3ROYW1lXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJMYXN0TmFtZVwiLCBkYXRhOiBcIkxhc3ROYW1lXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJCb29rc0NvdW50XCIsIGRhdGE6IFwiQm9va3NDb3VudFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBY3Rpb25zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uIChkYXRhLCB0eXBlLCByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzIGtvdXQtZWRpdFxcXCIgb25jbGljaz1cXFwiXFxcIj5FZGl0PC9idXR0b24+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRhbmdlciBrb3V0LWRlbGV0ZSBcXFwiIGlkPVxcXCJhdXRob3ItZGVsZXRlIFxcXCIgb25jbGljaz1cXFwiXFxcIj5EZWxldGU8L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFqYXhcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogJCgnI2dldEF1dGhvcnNMaW5rJykuZGF0YSgndXJsJyksXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGF0eXBlXCI6IFwianNvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==