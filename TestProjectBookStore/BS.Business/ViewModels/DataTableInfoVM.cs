using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.ViewModels
{
    public class DataTableInfoVM
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }

        public IList<OrderVM> Order { get; set; }
        public IList<ColumnVM> Columns { get; set; }
    }
}
