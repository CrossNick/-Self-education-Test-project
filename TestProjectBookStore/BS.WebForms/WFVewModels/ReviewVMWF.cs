using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BS.WebForms.WFViewModels
{
    public class ReviewVMWF
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [Required, StringLength(20)]
        public string Name { get; set; }

        [Required, StringLength(100)]
        public string Message { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
