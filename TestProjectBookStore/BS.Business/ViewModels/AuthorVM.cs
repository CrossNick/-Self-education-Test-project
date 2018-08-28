using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.ViewModels
{
    public class AuthorVM
    {
        public int AuthorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BooksCount { get; set; }
        public string Mode { get; set; }
    }
}
