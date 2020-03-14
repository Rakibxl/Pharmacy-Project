using PH_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PH_Management.Controllers
{
    public class PurchaseController : Controller
    {
        // GET: Purchase
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProductPurchase()
        {
            return View();
        } 

        public ActionResult Invoice()
        {

            return View();
        }

        [HttpPost]
        public ActionResult GetAllProduct(string Type) {            
            using (PharmacyEntities dc = new PharmacyEntities()) {
                var result = dc.prGetProduct(Type).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
               return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetProductInfo(string ProductCode, string Type) {
            using (PharmacyEntities dc = new PharmacyEntities())
            {
                var result = dc.prSalesProduct(ProductCode,Type).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertSalesItem(string ProductCode, int Quantity, string UnitPrice,string TotalCost, int RestOfAmount) {
            var UserID = "1001";
            DateTime today = DateTime.Today;
            using (PharmacyEntities dc = new PharmacyEntities())
            {
                var result = dc.prISalesIntem(ProductCode, Quantity, UnitPrice, TotalCost, RestOfAmount, UserID, today,"").ToString();
                //var result = dc.prISalesIntem("6", 1, "10", "20", RestOfAmount, UserID, today, "").ToString();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}