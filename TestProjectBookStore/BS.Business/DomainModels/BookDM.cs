using AutoMapper;
using BS.Business.ViewModels;
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

        public IEnumerable<BookVM> GetBooks()
        {
            var result = Mapper.Map<IEnumerable<BookVM>>(bookRepo.Get());
            foreach(var book in result)
            {
                book.Authors = Mapper.Map<IEnumerable<AuthorVM>>(authorRepo.GetAuthors(book.BookId));
                book.Mode = "display";
            }
            return result;
        }
    }
}
