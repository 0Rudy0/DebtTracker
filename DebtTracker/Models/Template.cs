using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DebtTracker.Models
{
	public class Template
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public DebtType Type { get; set; }
		public float Ammount { get; set; }
	}
}