using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BS.Business.ViewModels;
namespace BS.UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetBooks()
        {
            var result = new List<BookVM>(){
                new BookVM(){BookId=1, Title="Book 1", ReleaseDate="1.1.2010", Rating=10, PageCount=300,
                    Authors =new List<string>(){"Author 1.1", "Author 1.2", "Author 1.3" } },
                new BookVM(){BookId=2, Title="Book 2", ReleaseDate="2.2.2010", Rating=5, PageCount=500,
                    Authors =new List<string>(){"Author 2.1", "Author 2.2", "Author 2.3" } },
                new BookVM(){BookId=3, Title="Book 3", ReleaseDate="3.3.2010", Rating=8, PageCount=600,
                    Authors =new List<string>(){"Author 3.1", "Author 3.2", "Author 3.3" } }
            };
            var res = Json(result, JsonRequestBehavior.AllowGet);
            return res;
        }

    }
}