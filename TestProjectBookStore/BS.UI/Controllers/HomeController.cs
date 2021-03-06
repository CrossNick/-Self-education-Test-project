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
        public ActionResult WebForms()
        {
            return View();
        }
        public JsonResult GetBooks()
        {
            var result = bookDM.GetBooks();
            var books = Json(result, JsonRequestBehavior.AllowGet);
            return books;
        }

        public JsonResult GetAuthors(DataTableInfoVM model)
        {
            var result = authorDM.GetAuthors(model, out int total, out int filtered);
            return Json(new { draw = model.Draw, recordsFiltered = filtered, recordsTotal = total, data = result });
        }

    }
}