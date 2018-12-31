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

        protected void BSDataSource_Deleting(object sender, SqlDataSourceCommandEventArgs e)
        {

        }


        protected void reviewGrid_RowDataBound1(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    LinkButton lnkDetete = ((LinkButton)e.Row.Cells[0].Controls[2]);
                    if (lnkDetete != null)
                        lnkDetete.Attributes["onclick"] = "$('.modal').modal('toggle'); return   false;";
                }
            }
        }
    }
}