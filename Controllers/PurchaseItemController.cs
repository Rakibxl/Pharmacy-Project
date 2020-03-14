using PH_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PH_Management.Controllers
{
    public class PurchaseItemController : Controller
    {
        // GET: PurchaseItem

        PharmacyEntities db = new PharmacyEntities();

        public ActionResult Index()
        {
            return View(db.PurchaseItems.ToList());
        }

        public ActionResult Create()
        {
            PurchaseItem purchaseitem = new PurchaseItem();

            return View(purchaseitem);
        }


        [HttpPost]
        public ActionResult Create(PurchaseItem purchaseitem)
        {
            DateTime CurrentDate = DateTime.Today;
            var UserID = "Rakib";
            var ActionType = "Purchase";
            string InvoiceNo =  (DateTime.Now.Month.ToString() +DateTime.Now.Day.ToString() +DateTime.Now.Year.ToString() +DateTime.Now.Hour.ToString() +DateTime.Now.Minute.ToString() +DateTime.Now.Second.ToString() +DateTime.Now.Millisecond).ToString();
            if (ModelState.IsValid)
            {
                //prPurchaseItem

                var result = db.prPurchaseItem(purchaseitem.ProductCode, purchaseitem.Quantity, purchaseitem.UnitPrice, purchaseitem.ClientPrice, ActionType, purchaseitem.Remarks, CurrentDate, UserID,InvoiceNo);
                return Json(result, JsonRequestBehavior.AllowGet);               

            }
            return View(purchaseitem);
        }

        public ActionResult Deletes(int id)
        {
            PurchaseItem purchaseitem = db.PurchaseItems.Find(id);
            db.PurchaseItems.Remove(purchaseitem);
            db.SaveChanges();
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

    }
}