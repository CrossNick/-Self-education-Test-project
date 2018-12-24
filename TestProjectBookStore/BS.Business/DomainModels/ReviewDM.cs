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
    public class ReviewDM : IReviewDM
    {
        public IReviewRepository reviewRepo;

        public ReviewDM(IReviewRepository reviewRepo)
        {
            this.reviewRepo = reviewRepo;
        }

        public void CreateReview(ReviewVM book)
        {
            reviewRepo.Create(Mapper.Map<ReviewEM>(book));
        }

        public void EditReview(ReviewVM book)
        {
            reviewRepo.Update(Mapper.Map<ReviewEM>(book));
        }

        public int DeleteReview(int bookId)
        {
            reviewRepo.Delete(bookId);
            return bookId;
        }

        public IEnumerable<ReviewVM> GetReviews()
        {
            var result = Mapper.Map<IEnumerable<ReviewVM>>(reviewRepo.Get());
            return result;
        }

        public ReviewVM GetReview(int Id)
        {
            var result = Mapper.Map<ReviewVM>(reviewRepo.Get(Id));
            return result;
        }
    }
}
