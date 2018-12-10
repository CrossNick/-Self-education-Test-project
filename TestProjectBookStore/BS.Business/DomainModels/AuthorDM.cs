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

        public IEnumerable<AuthorVM> GetAuthors(DataTableInfoVM model, out int total, out int filtered)
        {
            IEnumerable<AuthorEM> result;
            if (model.Order.Count != 0)
            {
                string columName = model.Columns[model.Order.First().Column].Name;
                bool descOrder = model.Order.First().Dir.ToUpper() == "DESC";

                result = repo.Get(model.Length, model.Start, out total, columName, descOrder);
            }
            else
            {
                result = repo.Get(model.Length, model.Start, out total);
            }

            filtered = result.Count();
            return Mapper.Map<IEnumerable<AuthorVM>>(result);
        }

        public IEnumerable<Select2AuthorsVM> GetAuthorsSelect2()
        {
            var result = Mapper.Map<IEnumerable<Select2AuthorsVM>>(repo.Get());
            return result;
        }

        public AuthorVM AddAuthor(AuthorVM author)
        {
            var result = repo.Create(Mapper.Map<AuthorEM>(author));
            return Mapper.Map<AuthorVM>(result);
        }

        public int UpdateAuthor(AuthorVM author)
        {
            repo.Update(Mapper.Map<AuthorEM>(author));
            return author.AuthorId;
        }

        public int DeleteAuthor(AuthorVM author)
        {
            repo.Delete(author.AuthorId);
            return author.AuthorId;
        }

    }
}
