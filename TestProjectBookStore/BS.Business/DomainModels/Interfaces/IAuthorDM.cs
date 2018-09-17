using BS.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.DomainModels
{
    public interface IAuthorDM
    {
        IEnumerable<AuthorVM> GetAuthors();
        IEnumerable<Select2AuthorsVM> GetAuthorsSelect2();
        AuthorVM AddAuthor(AuthorVM author);
        int UpdateAuthor(AuthorVM author);
        int DeleteAuthor(AuthorVM author);
    }
}
