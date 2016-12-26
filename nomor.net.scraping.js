var request = require('request');
var cheerio = require('cheerio');

var links = [
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=2",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=1&no2=10000&kk=2",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=10001&no2=20000&kk=3",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=20001&no2=30000&kk=4",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=30001&no2=40000&kk=5",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=40001&no2=50000&kk=6",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=50001&no2=60000&kk=7",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=60001&no2=70000&kk=8",
  "http://www.nomor.net/_kodepos.php?_i=desa-kodepos&daerah=&jobs=&perhal=10000&urut=&asc=000101&sby=000000&no1=70001&no2=80000&kk=9"];

for (index=0;index<links.length;index++) {
  scrapeThis(links[index]);
}

function scrapeThis(url) {
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var separator = ",";
      $('tr').each(function(i, element) {
        if ($(element).attr('bgcolor') != undefined && $(element).attr('bgcolor')=="#ccffff") {
          var kodepos = $(element).find('.ktw2');
          var desakelurahan = $(element).find('.ktu');
          var kecamatandistrik = $(element).find('.ktw');
          if ($(kodepos).text()!="") {
            var val_kodepos = $(kodepos).text();
            var val_kelurahan = $(desakelurahan).text();
            var val_kecamatan = "";
            var val_kabupaten = "";
            var val_propinsi = "";
            $(element).children().find('.ktw').each(function(j, elm) {
              if (j==0)
                val_kecamatan = $(this).text();
              else if (j==1)
                val_kabupaten = $(this).text();
              else if (j==2)
                val_propinsi = $(this).text();
            });
            console.log(val_kodepos + separator + val_kelurahan + separator + val_kecamatan + separator + val_kabupaten + separator + val_propinsi);
          }
        }
      });
    } else {
      console.log(error);
    }
  });
}
