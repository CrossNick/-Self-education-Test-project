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
        public IBookRepository repo;

        public BookDM(IBookRepository repo)
        {
            this.repo = repo;
        }

        public IEnumerable<BookVM> GetBooks()
        {
            var result = Mapper.Map<IEnumerable<BookVM>>(repo.Get());
            return result;
        }
    }
}
