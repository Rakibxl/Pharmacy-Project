using PH_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PH_Management.Controllers
{
    public class ProductController : Controller
    {
        PharmacyEntities db = new PharmacyEntities();
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }
        public ActionResult Create()
        {
            Product product = new Product();
            ViewBag.Category = new SelectList(db.ProductCategories, "ProductTypeCode", "ProductType");

            return View(product);
        }

        public ActionResult Edit(Product product)
        {
            //db.Products.Attach(product);
            //db.Entry(product).State = EntityState.Modified;
            //db.SaveChanges();
            ViewBag.Category = new SelectList(db.ProductCategories, "ProductTypeCode", "ProductType");

            return View(product);
        }



        [HttpPost]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {


                db.Products.Add(product);
                db.SaveChanges();

                return Json("Success", JsonRequestBehavior.AllowGet);
            }
            ViewBag.Category = new SelectList(db.ProductCategories, "ProductTypeCode", "ProductType", product.ProductTypeCode);


            return View(product);
        }



        public ActionResult Deletes(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return Json("Success", JsonRequestBehavior.AllowGet);
        }


    }
}