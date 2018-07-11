    var fileData;
    var toSearch=[], ids=[], newString="",shortLink="";

     $(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
      });

     // triggers when file is uploaded
    function handleFileSelect(evt) {
    evt.preventDefault();
    $(".buttonDiv").html("<p>Wait for it....</p>");
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
  .then(function(data) {
    // console.log(data);

      if(data==="done"){
        $(".buttonDiv").html("<a href='/assets/newLinks.csv' target='_blank' download><button>Download File</button></a>");
      }

      else{
        $(".buttonDiv").html("<p>Error Occurred</p>");
      }

    });
  }
   
      
  }

