using DebtTracker.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;

namespace DebtTracker
{
    public static class Utils
    {
        public static DateTime FromStringUrl(this string dt, string format = null)
        {
            if (format == null)
            {
                format = "ddMMyyyy";
            }
            return DateTime.ParseExact(dt, format, Thread.CurrentThread.CurrentCulture);
        }

        public static string[] SplitPropper(string line)
        {
            var splitChar = ';';

            var splitLine = new List<string>();
            var buffer = "";
            var insideQuote = false;
            var insideDoubleQuote = false;
            for (var i = 0; i < line.Length; i++)
            {
                if (line[i] == '"')
                    insideDoubleQuote = !insideDoubleQuote;
                else if (line[i] == '\'')
                    insideQuote = !insideQuote;
                else if (line[i] == splitChar && !insideQuote && !insideDoubleQuote)
                {
                    splitLine.Add(buffer);
                    buffer = "";
                }
                else
                {
                    buffer += line[i];
                }
            }

            if (!string.IsNullOrEmpty(buffer))
                splitLine.Add(buffer.Replace("\"", ""));
            return splitLine.ToArray();

        }

        public static HeaderIndexes GetHeaderIndexes(string[] headers)
        {
            var csvColumnNamesConfig = new List<CSVHeaderProperty>
            {
                new CSVHeaderProperty
                {
                    name = "ime",
                    headerNames = new string [][] { new string[] { "ime" } }
                },
                new CSVHeaderProperty
                {
                    name = "opis",
                    headerNames = new string [][] { new string[] { "opis" } }
                },
                new CSVHeaderProperty
                {
                    name = "iznos",
                    headerNames = new string [][] { new string[] { "iznos" } }
                },
                new CSVHeaderProperty
                {
                    name = "tip",
                    headerNames = new string [][] { new string[] { "tip" } }
                },
                new CSVHeaderProperty
                {
                    name = "datum",
                    headerNames = new string [][] { new string[] { "datum" } }
                }
            };



            var imeAcceptedHeaderNames = csvColumnNamesConfig.FirstOrDefault(h => h.name == "ime").headerNames;
            var opisAcceptedHeaderNames = csvColumnNamesConfig.FirstOrDefault(h => h.name == "opis").headerNames;
            var iznosAcceptedHeaderNames = csvColumnNamesConfig.FirstOrDefault(h => h.name == "iznos").headerNames;
            var tipAcceptedHeaderNames = csvColumnNamesConfig.FirstOrDefault(h => h.name == "tip").headerNames;
            var datumAcceptedHeaderNames = csvColumnNamesConfig.FirstOrDefault(h => h.name == "datum").headerNames;


            var indexes = new HeaderIndexes();

            for (var i = 0; i < headers.Length; i++)
            {
                var h = headers[i].ToLower();
                foreach (var acceptedNames in imeAcceptedHeaderNames)
                {
                    var accepted = true;
                    foreach (var acceptedName in acceptedNames)
                    {
                        accepted = accepted && h.Contains(acceptedName.Trim().ToLower());
                    }
                    if (accepted)
                    {
                        indexes.ImeIndex = i;
                        break;
                    }
                }
                foreach (var acceptedNames in opisAcceptedHeaderNames)
                {
                    var accepted = true;
                    foreach (var acceptedName in acceptedNames)
                    {
                        accepted = accepted && h.Contains(acceptedName.Trim().ToLower());
                    }
                    if (accepted)
                    {
                        indexes.OpisIndex = i;
                        break;
                    }
                }
                foreach (var acceptedNames in iznosAcceptedHeaderNames)
                {
                    var accepted = true;
                    foreach (var acceptedName in acceptedNames)
                    {
                        accepted = accepted && h.Contains(acceptedName.Trim().ToLower());
                    }
                    if (accepted)
                    {
                        indexes.IznosIndex = i;
                        break;
                    }
                }
                foreach (var acceptedNames in tipAcceptedHeaderNames)
                {
                    var accepted = true;
                    foreach (var acceptedName in acceptedNames)
                    {
                        accepted = accepted && h.Contains(acceptedName.Trim().ToLower());
                    }
                    if (accepted)
                    {
                        indexes.TipIndex = i;
                        break;
                    }
                }
                foreach (var acceptedNames in datumAcceptedHeaderNames)
                {
                    var accepted = true;
                    foreach (var acceptedName in acceptedNames)
                    {
                        accepted = accepted && h.Contains(acceptedName.Trim().ToLower());
                    }
                    if (accepted)
                    {
                        indexes.DatumIndex = i;
                        break;
                    }
                }
            }

            return indexes;

        }

        public static DateTime? TryToParseDate(string date)
        {
            var dateFormats = new List<string> { "yyyy-MM-dd", "dd/MM/yyyy", "MM/dd/yyyy", "M/dd/yyyy", "MM/d/yyyy", "M/d/yyyy", "ddd dd/MM/YYYY", "ddd MM/DD/yyyy" };
            foreach (var format in dateFormats)
            {
                try
                {
                    var parsedDate = date.FromStringUrl(format);
                    return parsedDate;
                }
                catch
                {
                    continue;
                }
            }
            return null;
        }

        public static Tuple<List<Debt>, List<string>> ProcessCSV(string csv, List<DebtType> debtTypes, string userId, string currUserId)
        {
            var errorMessages = new List<string>();
            var newDebts = new List<Debt>();

            var lines = csv.Split('\n');
            int count = 0;
            var indexes = new HeaderIndexes();

            foreach (string line in lines)
            {
                DateTime? datum = null;
                var opis = "";
                decimal iznos = 0;
                var tipNaziv = "";
                DebtType type = null;
                var ime = "";
                string forUserId = null;

                if (String.IsNullOrEmpty(line?.Trim()) || String.IsNullOrEmpty(line?.Replace(",", "").Trim()))
                    continue;

                if (count == 0)
                {
                    //contains header names, try to guess which row is for which data
                    var headers = SplitPropper(line);
                    indexes = GetHeaderIndexes(headers);
                }
                else
                {
                    if (count == 1)
                    {
                        if (indexes.ImeIndex == -1)
                            errorMessages.Add("Kolona za \"Ime\" ne postoji u CSV datoteci");

                        if (indexes.OpisIndex == -1)
                            errorMessages.Add("Kolona za \"Opis\" ne postoji u CSV datoteci");

                        if (indexes.IznosIndex == -1)
                            errorMessages.Add("Kolona za \"Iznos\" ne postoji u CSV datoteci");

                        if (indexes.TipIndex == -1)
                            errorMessages.Add("Kolona za \"Tip\" ne postoji u CSV datoteci");
                    }

                    var lineElements = SplitPropper(line);

                    if (datum == null && indexes.DatumIndex >= 0)
                    {
                        datum = TryToParseDate(lineElements[indexes.DatumIndex]);
                    }
                    if (datum == null)
                    {
                        datum = DateTime.UtcNow.Date;
                    }

                    if (indexes.OpisIndex >= 0)
                    {
                        opis = lineElements[indexes.OpisIndex];

                        if (String.IsNullOrEmpty(opis) && !errorMessages.Contains("Opis ne može biti prazan"))
                            errorMessages.Add("Opis ne može biti prazan");
                    }

                    if (indexes.IznosIndex >= 0)
                    {
                        iznos = decimal.Parse(lineElements[indexes.IznosIndex], System.Globalization.NumberStyles.Any, CultureInfo.GetCultureInfo("hr-HR"));

                        if (iznos == 0 && !errorMessages.Contains("Iznos ne može biti 0"))                        
                            errorMessages.Add("Iznos ne može biti 0");
                        
                    }

                    if (indexes.TipIndex >= 0)
                    {
                        tipNaziv = lineElements[indexes.TipIndex];
                        type = debtTypes.FirstOrDefault(dt => dt.Description.ToLower().Trim() == tipNaziv.ToLower().Trim());

                        if (type == null && !errorMessages.Contains($"Tip naziva \"{tipNaziv}\" ne postoji"))
                        {
                            errorMessages.Add($"Tip naziva \"{tipNaziv}\" ne postoji");
                        }
                    }

                    if (indexes.ImeIndex >= 0)
                    {
                        ime = lineElements[indexes.ImeIndex];
                        switch (ime.ToLower())
                        {
                            case "danijel":
                                forUserId = "066d5a34-ccb8-46db-ab4d-ce716272a65e";
                                break;
                            case "mario":
                                forUserId = "9f43b9fa-39c9-4f21-b93b-d8f2beadfe97";
                                break;
                        }
                    }

                    forUserId = forUserId ?? userId;

                    if (iznos > 0 && type != null && !String.IsNullOrEmpty(forUserId) && !String.IsNullOrEmpty(opis))
                    {
                        var newDebt = new Debt
                        {
                            Ammount = (double)iznos,
                            Description = opis,
                            Date = datum.Value,
                            ForUser = forUserId,
                            TypeId = type.Id,
                            DoesRepeat = false,
                            RepeatCount = 0,
                            UserOwner = currUserId
                        };
                        newDebts.Add(newDebt);
                    }

                }
                count++;
            }

            return new Tuple<List<Debt>, List<string>>(newDebts, errorMessages);
        }
    }
}