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

    }
}
