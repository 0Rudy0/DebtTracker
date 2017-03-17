using System;
using System.Globalization;
using ServiceStack.Text;

namespace DebtTracker
{
	public class JsonUtils
	{
		/// <summary>
		/// Helper class for serializing objects
		/// </summary>
		/// <param name="value">Value for serialization</param>
		/// <param name="decimalPlaces">Number of decimal places for decimal type formatting</param>
		/// <returns>Serialized object as string</returns>
		public static string Serialize(object value, int decimalPlaces = 2)
		{
			string output = "";
			JsConfig<decimal>.SerializeFn = (s) =>
			{
				CultureInfo ci = (CultureInfo)CultureInfo.InvariantCulture.Clone();
				ci.NumberFormat.NumberDecimalSeparator = ".";
				ci.NumberFormat.NumberGroupSeparator = "";
				return s.ToString("N" + decimalPlaces, ci);
			};

			JsConfig<DateTime>.SerializeFn = (d) =>
			{
				return d.ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'", CultureInfo.InvariantCulture);
			};

			JsConfig.IncludeNullValues = true;
			JsConfig.IncludePublicFields = true;
			JsConfig.EscapeUnicode = true;
			JsConfig.ExcludeTypeInfo = false;

			output = ServiceStack.Text.JsonSerializer.SerializeToString(value);

			return output;
		}

		/// <summary>
		/// Deserialize string to given object
		/// </summary>
		/// <typeparam name="T">Type to which string will be deserialized</typeparam>
		/// <param name="json">String value to deserialize</param>
		/// <returns></returns>
		public static object Deserialize(string json, Type t)
		{
			return TypeSerializer.DeserializeFromString(json, t);
		}
	}
}
