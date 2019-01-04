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

        [Required(ErrorMessage = "The Name field is required"), StringLength(20)]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Message field is required"), StringLength(100)]
        public string Message { get; set; }

        [Required(ErrorMessage = "The DateOfBirth field is required")]
        [Range(typeof(DateTime), "1/1/1900", "1/1/2100", ErrorMessage = "Please provide a birth date between 1/1/1900 and 1/1/2100")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:d}")]
        public DateTime DateOfBirth { get; set; }
    }
}
