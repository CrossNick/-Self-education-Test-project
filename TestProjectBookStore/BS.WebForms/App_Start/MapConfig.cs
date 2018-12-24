using AutoMapper;
using BS.Business.ViewModels;
using BS.WebForms.WFViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BS.WebForms.App_Start
{
    public class MapConfig
    {
        public static void Init()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<ReviewVM, ReviewVMWF>().ReverseMap();
            });
        }
    }
}