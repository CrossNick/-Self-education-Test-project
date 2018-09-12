using AutoMapper;
using BS.Business.ViewModels;
using BS.Data.EntityModels;
using BS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.DomainModels
{
    public class BookDM : IBookDM
    {
        public IBookRepository bookRepo;
        public IAuthorRepository authorRepo;

        public BookDM(IBookRepository bookRepo, IAuthorRepository authorRepo)
        {
            this.bookRepo = bookRepo;
            this.authorRepo = authorRepo;
        }

        public void CreateBook(BookCreateVM book)
        {
            bookRepo.Create(Mapper.Map<BookCreateEM>(book));
        }

        public IEnumerable<BookVM> GetBooks()
        {
            var result = Mapper.Map<IEnumerable<BookVM>>(bookRepo.Get());
            foreach(var book in result)
            {
                book.Mode = "display";
            }
            return result;
        }
    }
}
