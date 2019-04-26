///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/knockout/knockout.d.ts" />
///<reference path="./book-business.ts" />
///<reference path="./book-mgmt-model.ts" />
class BookController {
    constructor(business) {
        this.viewModel = new BookMgmtModel();
        this.business = business;
    }
    OnAddButtonClick() {
        $('#create-book-authors').select2({
            width: 'resolve'
        });
        $('#create-book-modal').modal('show');
    }
    UpdateSelect2() {
        $('#edit-book-authors').select2();
    }
    getAllAuthors() {
        var allAutorsObtained = this.business.getAllAuthors();
        allAutorsObtained.then(function (data) {
            var model = { allauthors: data };
            ko.mapping.fromJS(model, {}, this.viewModel);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vay1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVFMvQm9vay9ib29rLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBQ3hELDREQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsNENBQTRDO0FBRTVDLE1BQU0sY0FBYztJQUtoQixZQUFZLFFBQXNCO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzlCLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsYUFBYTtRQUNULENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RELGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7WUFDakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDakMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2pxdWVyeS9qcXVlcnkuZC50c1wiIC8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3Mva25vY2tvdXQva25vY2tvdXQuZC50c1wiIC8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYm9vay1idXNpbmVzcy50c1wiIC8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYm9vay1tZ210LW1vZGVsLnRzXCIgLz5cclxuXHJcbmNsYXNzIEJvb2tDb250cm9sbGVyIHtcclxuICAgIFxyXG4gICAgdmlld01vZGVsOiBCb29rTWdtdE1vZGVsO1xyXG4gICAgYnVzaW5lc3M6IEJvb2tCdXNpbmVzcztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihidXNpbmVzczogQm9va0J1c2luZXNzKSB7XHJcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSBuZXcgQm9va01nbXRNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBidXNpbmVzcztcclxuICAgIH1cclxuXHJcbiAgICBPbkFkZEJ1dHRvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgICQoJyNjcmVhdGUtYm9vay1hdXRob3JzJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHdpZHRoOiAncmVzb2x2ZSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI2NyZWF0ZS1ib29rLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGVTZWxlY3QyKCkgOiB2b2lkIHtcclxuICAgICAgICAkKCcjZWRpdC1ib29rLWF1dGhvcnMnKS5zZWxlY3QyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsQXV0aG9ycygpOiB2b2lkIHtcclxuICAgICAgICB2YXIgYWxsQXV0b3JzT2J0YWluZWQgPSB0aGlzLmJ1c2luZXNzLmdldEFsbEF1dGhvcnMoKTtcclxuICAgICAgICBhbGxBdXRvcnNPYnRhaW5lZC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHsgYWxsYXV0aG9yczogZGF0YSB9O1xyXG4gICAgICAgICAgICBrby5tYXBwaW5nLmZyb21KUyhtb2RlbCwge30sIHRoaXMudmlld01vZGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=