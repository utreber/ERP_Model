﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP_Model.Controllers
{
    public class ProductManagementController : Controller
    {
        // GET: GoodsManagement
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult New()
        {
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult ProductDetails()
        {
            return View();
        }
    }
}