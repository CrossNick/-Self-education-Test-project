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
    public partial class AddReview : System.Web.UI.Page
    {
        IReviewDM reviewDM;
        protected void Page_Load(object sender, EventArgs e)
        {
            reviewDM = new ReviewDM(new ReviewRepository());
        }

        public void addReviewForm_InsertItem()
        {
            var item = new ReviewVMWF();

            TryUpdateModel(item);
            if (ModelState.IsValid)
            {
                reviewDM.CreateReview(Mapper.Map<ReviewVM>(item));
            }
        }

        protected void cancelButton_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/Default");
        }

        protected void addReviewForm_ItemInserted(object sender, FormViewInsertedEventArgs e)
        {
            Response.Redirect("~/Default");
        }
    }
}