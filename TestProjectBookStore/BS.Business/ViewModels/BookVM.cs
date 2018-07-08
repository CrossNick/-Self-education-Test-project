using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.ViewModels
{
    public class BookVM
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string ReleaseDate { get; set; }
        public IEnumerable<string> Authors { get; set; }
        public int Rating { get; set; }
        public int PageCount { get; set; }
    }
}
