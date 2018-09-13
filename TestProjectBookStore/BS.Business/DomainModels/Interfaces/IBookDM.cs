using BS.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.DomainModels
{
    public interface IBookDM
    {
        IEnumerable<BookVM> GetBooks();
        void CreateBook(BookCreateVM book);
        int DeleteBook(int bookId);
        int EditBook(BookCreateVM book);

    }

}
