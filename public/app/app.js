    var fileData, csvData;
    var toSearch=[], ids=[], newString="",shortLink="";
    var date=Date.now();
    var newFileName="links_"+date+".csv";

     $(document).ready(function(){
        $("#csv-file").change(handleFileSelect);
        $(".newFile").change(handleFileSelect);

        $( ".buttonDiv").on( "click", ".download", function( event ) {
            event.preventDefault();
            download(newFileName,csvData);
        });
      });

     // triggers when file is uploaded
    function handleFileSelect(evt) {
    evt.preventDefault();
    $(".buttonDiv").html("<p>Wait for it....</p>");
    $(".newFile").css("display", "block");
    var file = evt.target.files[0];

// change file to JSON
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        fileData = results.data;
        // console.log(fileData);
        shrinkData(fileData)
      }
    });
  }

    //format short links and extract ids
    function shrinkData(longData){
    var index=0;

    for (var i=0;i<longData.length;i++){
      ids.push(longData[i]["Channel Post ID"]);
        shortLink=longData[i]["Link"];
       if (shortLink===null)
          newString="No Link";
       else if (shortLink.indexOf(',')!==-1){
          index = shortLink.indexOf(',');
          newString= shortLink.substring(0, index);
      }
       else if (shortLink.indexOf(' ')!==-1){
          index = shortLink.indexOf(' ');
          newString= shortLink.substring(0, index);
      }
       else newString=shortLink;

       toSearch.push(newString);
      }
      sendData(ids,toSearch);

  }

//rest of app performed server side
function sendData(channelIds,URLs) {
    $.ajax({
    method: "POST",
    url: "/runrequest",
    dataType: 'json',
    data: {
     idArray: channelIds,
     shortURL: URLs
    }
  })
  .then(function(myData) {

      if(myData){
        csvData = Papa.unparse(myData);
        $(".buttonDiv").html("<button class='download'>Download File</button>");
      }

      else{
        $(".buttonDiv").html("<p>Error Occurred</p>");
      }

    });
  }


  function download(filename, text) {
      var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
  
  }

