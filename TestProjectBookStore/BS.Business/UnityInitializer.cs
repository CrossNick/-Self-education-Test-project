using BS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;

namespace BS.Business
{
    public class UnityInitializer
    {
        public static IUnityContainer container;
        public static void InitUnity(IUnityContainer container)
        {
            UnityInitializer.container = container;
            container.RegisterType<IBookRepository, BookRepository>();
            container.RegisterType<IAuthorRepository, AuthorRepository>();
            
        }
    }
}
