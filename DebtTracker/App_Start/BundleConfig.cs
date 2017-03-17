using System.Web;
using System.Web.Optimization;

namespace DebtTracker
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			#region Styles

			bundles.Add(new StyleBundle("~/Content/Layout").Include(
                "~/Content/bootstrap.css",
                "~/Content/Kendo/kendo.material.css",
				"~/Content/Kendo/kendo.common-material.css",
				"~/Content/Kendo/kendo.custom0.css",
				//"~/Content/Kendo/kendo.material.css",
				//"~/Content/Kendo/kendo.common.css",
				"~/Content/icon.css",
				"~/Content/materialize.css",
				//"~/Content/ghpages-materialize.css",
				"~/Content/Layout.css"));

			bundles.Add(new StyleBundle("~/Content/MainIndex").Include(
				"~/Content/Index/IndexGeneral.css",
				"~/Content/Index/IndexKendoGrid.css",
				"~/Content/Index/IndexDebtForm.css",
				"~/Content/Index/IndexModals.css",
				"~/Content/Index/IndexHistory.css"
				));

			bundles.Add(new StyleBundle("~/Content/SelectUser").Include(
                "~/Content/SelectUser.css"
				));

			bundles.Add(new StyleBundle("~/Content/Login").Include(
				"~/Content/Login.css"
				));

			bundles.Add(new StyleBundle("~/Content/Statistics").Include(
				"~/Content/Statistics.css"
				));

			bundles.Add(new StyleBundle("~/Content/AllPaidDebts").Include(
				"~/Content/AllPaidDebts.css"
				));

			#endregion


			#region Scripts

			bundles.Add(new ScriptBundle("~/bundles/Layout").Include(
				"~/Scripts/jquery-1.11.3.js",
				"~/Scripts/moment.js",
				"~/Scripts/Utils.js",
                "~/Scripts/Layout.js",
                "~/Scripts/kendo.all.js",
                "~/Scripts/jquery.validate*",
                "~/Scripts/materialize.js",
				"~/Scripts/kendo.culture.hr-HR.js",
				"~/Scripts/kendo.messages.hr-HR.js"
				//"~/Scripts/modernizr-*",
				//"~/Scripts/bootstrap.js",
				//"~/Scripts/respond.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/Index").Include(
				"~/Scripts/Index/IndexGlobalVariables.js",		
				"~/Scripts/Index/IndexAjaxCalls.js",			
				"~/Scripts/Index/IndexInitControlls.js",			
				"~/Scripts/Index/IndexMain.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/Login").Include(
				"~/Scripts/Login.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/SelectUser").Include(
				"~/Scripts/SelectUser.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/Statistics").Include(
				"~/Scripts/Statistics.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/AllPaidDebts").Include(
				"~/Scripts/AllPaidDebts.js"
				));



			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
				"~/Scripts/jquery-1.11.3.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
				"~/Scripts/jquery.validate*"
				));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
				"~/Scripts/modernizr-*"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
				"~/Scripts/bootstrap.js",
				"~/Scripts/respond.js"));

			#endregion

		}
	}
}
