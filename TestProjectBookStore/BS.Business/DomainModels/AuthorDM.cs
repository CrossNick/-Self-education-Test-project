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
            foreach (var author in result)
            {
                author.Mode = "display";
            }
            return result;
        }

        public IEnumerable<Select2AuthorsVM> GetAuthorsSelect2()
        {
            var result = Mapper.Map<IEnumerable<Select2AuthorsVM>>(repo.Get());
            return result;
        }

        public AuthorVM AddAuthor(AuthorVM author)
        {
            var param = Mapper.Map<AuthorEM>(author);
            repo.Create(param);
            return author;
        }

    }
}
