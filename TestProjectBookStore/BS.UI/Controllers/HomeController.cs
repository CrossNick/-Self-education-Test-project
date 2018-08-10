﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BS.Business.ViewModels;
using BS.Business.DomainModels;

namespace BS.UI.Controllers
{
    public class HomeController : Controller
    {
        public IBookDM bookDM;
        public IAuthorDM authorDM;

        public HomeController(IBookDM bookDM, IAuthorDM authorDM)
        {
            this.bookDM = bookDM;
            this.authorDM = authorDM;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ViewBooks()
        {
            return View();
        }
        public ActionResult ViewAuthors()
        {
            return View();
        }
        public JsonResult GetBooks()
        {
            var result = bookDM.GetBooks();
            var res = Json(result, JsonRequestBehavior.AllowGet);
            return res;
        }

        public JsonResult GetAuthors()
        {
            var result = authorDM.GetAuthors();
            var res = Json(result, JsonRequestBehavior.AllowGet);
            return res;
        }

    }
}