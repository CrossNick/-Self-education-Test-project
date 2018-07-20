using BS.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BS.UI.App_Start
{
    public static class MapConfig
    {
        public static void Init()
        {
            AutoMapperInitialize.InitMappings();
        }
    }
}