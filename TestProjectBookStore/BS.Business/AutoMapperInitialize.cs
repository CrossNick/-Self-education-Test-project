using AutoMapper;
using BS.Business.ViewModels;
using BS.Data.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business
{
    public class AutoMapperInitialize
    {
        public static  void InitMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<BookEM, BookVM>();
                cfg.CreateMap<AuthorEM, AuthorVM>();
            });
        }
    }
}
