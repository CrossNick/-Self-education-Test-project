using BS.Business.DomainModels;
using BS.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BS.UI.Controllers
{
    public class AuthorController : Controller
    {
        public IBookDM bookDM;
        public IAuthorDM authorDM;

        public AuthorController(IBookDM bookDM, IAuthorDM authorDM)
        {
            this.bookDM = bookDM;
            this.authorDM = authorDM;
        }


        public JsonResult Edit(AuthorVM author)
        {
            return Json(author.AuthorId);
        }

        public JsonResult Delete(AuthorVM author)
        {
            return Json(author.AuthorId);
        }

        public void Create(AuthorVM book)
        {


        }
    }
}