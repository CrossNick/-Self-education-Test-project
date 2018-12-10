using BS.Business.DomainModels;
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
            //var results = authorDM.GetAuthors();
            return Json("", JsonRequestBehavior.AllowGet);

        }

        public JsonResult Edit(BookCreateVM book)
        {
            bookDM.EditBook(book);
            return Json(book.BookId);
        }

        public JsonResult Delete(BookVM book)
        {
            bookDM.DeleteBook(book.BookId);
            return Json(book.BookId);
        }


        public void Create(BookCreateVM book)
        {
            bookDM.CreateBook(book);
        }
    }
}