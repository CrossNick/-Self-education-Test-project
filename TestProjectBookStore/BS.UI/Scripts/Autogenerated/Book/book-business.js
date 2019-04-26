///<reference path="./book-service.ts" />
///<reference path="./book-mgmt-model.ts" />
class BookBusiness {
    constructor(service) {
        this.service = service;
    }
    getAllAuthors() {
        var inner = this;
        return new Promise((resolve, reject) => {
            this.service.getAllAuthors()
                .done(function (result) {
                resolve(result);
            }).fail(reject);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vay1idXNpbmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1RTL0Jvb2svYm9vay1idXNpbmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsNENBQTRDO0FBRTVDLE1BQU0sWUFBWTtJQUdkLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtpQkFDdkIsSUFBSSxDQUFDLFVBQVUsTUFBTTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYm9vay1zZXJ2aWNlLnRzXCIgLz5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi9ib29rLW1nbXQtbW9kZWwudHNcIiAvPlxyXG5cclxuY2xhc3MgQm9va0J1c2luZXNzIHtcclxuICAgIHNlcnZpY2U6IEJvb2tTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IEJvb2tTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxBdXRob3JzKCk6IFByb21pc2U8QXJyYXk8QXV0aG9yTW9kZWw+PiB7XHJcbiAgICAgICAgdmFyIGlubmVyID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldEFsbEF1dGhvcnMoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==