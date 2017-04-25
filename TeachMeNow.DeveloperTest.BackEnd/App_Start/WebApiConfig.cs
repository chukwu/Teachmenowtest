using System.Web.Http;
using System.Web.Http.Cors;

namespace TeachMeNow.DeveloperTest.BackEnd
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}/{usertype}",
                defaults: new { id = RouteParameter.Optional, usertype = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "userform",
                routeTemplate: "api/{controller}/{dataobject}",
                defaults: new { dataobject = RouteParameter.Optional }
            );
        }
    }
}
