//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PH_Management.Models
{
    using System;
    
    public partial class prSalesReportDetails_Result
    {
        public Nullable<int> ProductCode { get; set; }
        public string ProductName { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<double> UnitPrice { get; set; }
        public Nullable<double> ActualPrice { get; set; }
        public Nullable<double> TotalCost { get; set; }
        public Nullable<double> ExpectedClientPrice { get; set; }
        public string InsertDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string InsertedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> RestOfAmount { get; set; }
        public string RackId { get; set; }
    }
}