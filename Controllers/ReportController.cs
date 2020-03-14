using PH_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PH_Management.Controllers
{
    public class ReportController : Controller
    {
        PharmacyEntities db = new PharmacyEntities();

        public ActionResult Index()
        {

            return View();
        }
        public ActionResult GetReport()
        {
            ViewBag.Product = new SelectList(db.Products, "ProductCode", "ProductName");
            return View();

        }

        [HttpPost]
        public ActionResult GetReport(DateTime startdate, DateTime enddate, string productcode,string Type)
        {
            if (Type == "ProductAll")
            {
                var result = db.prSalesReport(startdate, enddate, productcode).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else if(Type == "ProductDetails") {
                var result = db.prSalesReportDetails(startdate, enddate, productcode).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }

            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}