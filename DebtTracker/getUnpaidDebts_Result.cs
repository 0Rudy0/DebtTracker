//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DebtTracker
{
    using System;
    
    public partial class getUnpaidDebts_Result
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public double Ammount { get; set; }
        public System.DateTime Date { get; set; }
        public int TypeId { get; set; }
        public bool DoesRepeat { get; set; }
        public int RepeatCount { get; set; }
        public string UserOwner { get; set; }
        public string ForUser { get; set; }
    }
}
