using AutoMapper;
using BS.Business.DomainModels;
using BS.Business.ViewModels;
using BS.Data.Repositories;
using BS.WebForms.WFViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BS.WebForms
{
    public partial class _Default : Page
    {
        IReviewDM reviewDM;
        public _Default()
        {
            reviewDM = 
                new ReviewDM(new ReviewRepository());
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public IQueryable<ReviewVMWF> reviewGrid_GetData()
        {

            var query = Mapper.Map<IEnumerable<ReviewVMWF>>(reviewDM.GetReviews()).AsQueryable();
            return query;
        }

        public void reviewGrid_UpdateItem(int Id)
        {
            var item = Mapper.Map<ReviewVMWF>(reviewDM.GetReview(Id));
            if (item == null)
            {
                ModelState.AddModelError("",
                  String.Format("Item with id {0} was not found", Id));
                return;
            }

            TryUpdateModel(item);
            if (ModelState.IsValid)
            {
                reviewDM.EditReview(Mapper.Map<ReviewVM>(item));
            }

        }

        public void reviewGrid_DeleteItem(int Id)
        {
            reviewDM.DeleteReview(Id);
        }
    }
}