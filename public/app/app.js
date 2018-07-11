var data;
var ch;
var toSearch=[];

  function handleFileSelect(evt) {
    evt.preventDefault();
    var file = evt.target.files[0];
 
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        data = results;
        console.log(data);
        getLinks();
      }
    });
  }

  function getLinks(){
    // console.log(data.data[0]);
    console.log(data.data[0].Link);


    // unshorten_url(data.data[0].Link);
    runQuery(data.data[0].Link);

    // for (var i=0;i<data.data.length;i++){
    //  toSearch.push(data.data[i].Link);
    // }
    // console.log(toSearch);

  }

// function unshorten_url(url) {
//   ch = curl_init(url);
//   curl_setopt_array(ch, array(
//     CURLOPT_FOLLOWLOCATION => TRUE,  // the magic sauce
//     CURLOPT_RETURNTRANSFER => TRUE,
//     CURLOPT_SSL_VERIFYHOST => FALSE, // suppress certain SSL errors
//     CURLOPT_SSL_VERIFYPEER => FALSE, 
//   ));
//   curl_exec(ch); 
//   return curl_getinfo(ch, CURLINFO_EFFECTIVE_URL);
// }



function runQuery(queryURL) {
  // o_44bue6v1qm
  // R_96273b3fa9194264b98f7b03b337d4e4

  // $.ajax({
  //   url: "https://api-ssl.bitly.com/v3/expand?login=o_44bue6v1qm&apiKey=R_96273b3fa9194264b98f7b03b337d4e4&shortUrl=https%3A%2F%2Ft.co%2FwpC3fVTTqc",
  //   type: 'GET'
    $.ajax({
    method: "POST",
    url: "/runRequest"
    data: {
     url: queryURL
   }
  })
  .then(function(data) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // Log the NYTData to console, where it will show up as an object
    console.log(data);
    console.log("------------------------------------");

  });
}


  $(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
  });


