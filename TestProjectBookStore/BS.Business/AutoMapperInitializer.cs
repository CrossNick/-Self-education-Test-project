﻿using AutoMapper;
using BS.Business.ViewModels;
using BS.Data.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business
{
    public class AutoMapperInitializer
    {
        public static  void InitMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<BookEM, BookVM>();
                cfg.CreateMap<AuthorEM, AuthorVM>()
                    .ForMember(dest => dest.FullName, opt=> opt.ResolveUsing(src=> { return src.FirstName + " " + src.LastName; }));
                cfg.CreateMap<AuthorEM, Select2AuthorsVM>()
                    .ForMember(dest => dest.id, opt => opt.ResolveUsing(src => { return src.AuthorId; }))
                    .ForMember(dest => dest.text, opt => opt.ResolveUsing(src => { return src.FirstName + " " + src.LastName; }));
            });
        }
    }
}
