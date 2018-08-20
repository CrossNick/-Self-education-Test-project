﻿using BS.Business.DomainModels;
using BS.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BS.UI.Controllers
{
    public class BookController : Controller
    {
        public IBookDM bookDM;
        public IAuthorDM authorDM;

        public BookController(IBookDM bookDM, IAuthorDM authorDM)
        {
            this.bookDM = bookDM;
            this.authorDM = authorDM;
        }

        public JsonResult GetAuthors()
        {
            var results = authorDM.GetAuthorsSelect2();
            return Json(results, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Edit(BookVM book)
        {
            return Json(book.BookId);
        }
    }
}