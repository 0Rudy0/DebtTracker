using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading;
using System.Web;

namespace DebtTracker.Models
{
    [DataContract]
    public class ChunkMetaData
    {
        [DataMember(Name = "uploadUid")]
        public string UploadUid { get; set; }
        [DataMember(Name = "fileName")]
        public string FileName { get; set; }
        [DataMember(Name = "contentType")]
        public string ContentType { get; set; }
        [DataMember(Name = "chunkIndex")]
        public long ChunkIndex { get; set; }
        [DataMember(Name = "totalChunks")]
        public long TotalChunks { get; set; }
        [DataMember(Name = "totalFileSize")]
        public long TotalFileSize { get; set; }
    }

    public class FileResult
    {
        public bool uploaded { get; set; }
        public string fileUid { get; set; }
    }

    public class HeaderIndexes
    {
        public int ImeIndex { get; set; }
        public int OpisIndex { get; set; }
        public int IznosIndex { get; set; }
        public int TipIndex { get; set; }
        public int DatumIndex { get; set; }

        public HeaderIndexes()
        {
            ImeIndex = -1;
            OpisIndex = -1;
            TipIndex = -1;
            IznosIndex = -1;
            DatumIndex = -1;
        }
    }

    public class CSVProperties
    {
        public CSVHeaderProperty[] HeaderProperty { get; set; }
    }

    public class CSVHeaderProperty
    {
        public string name { get; set; }
        public string[][] headerNames { get; set; }
    }

}