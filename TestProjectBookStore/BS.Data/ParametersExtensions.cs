using BS.Data.EntityModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Data
{
    static class ParametersExtensions
    {
        public static DataTable AuthorsAsDataTableParam(this IEnumerable<int> data)
        {
            var tableAsParam = new DataTable();
            tableAsParam.Columns.Add("AuthorId");

            if (data != null)
            {
                foreach (var item in data)
                {
                    tableAsParam.Rows.Add(item);
                }
            }

            return tableAsParam;
        }
    }
}
