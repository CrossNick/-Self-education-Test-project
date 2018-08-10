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
    public class AuthorDM : IAuthorDM
    {
        public IAuthorRepository repo;

        public AuthorDM(IAuthorRepository repo)
        {
            this.repo = repo;
        }

        public IEnumerable<AuthorVM> GetAuthors()
        {
            var result = Mapper.Map<IEnumerable<AuthorVM>>(repo.Get());
            return result;
        }

    }
}
