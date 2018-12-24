using BS.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.DomainModels
{
    public interface IReviewDM
    {
        IEnumerable<ReviewVM> GetReviews();
        void CreateReview(ReviewVM model);
        int DeleteReview(int Id);
        void EditReview(ReviewVM model);
        ReviewVM GetReview(int Id);

    }

}
