var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var writeFile = require('write');
var papa = require('papaparse');
var request = require("request");

var app = express();
var PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));


var longURLs=[],ids=[], shortLinks=[],sortedURLs=[],allData=[];


// API ROUTES
app.get("/", function (req,res){
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

// gets CSV
app.post("/runrequest", function (req,res){


    ids=req.body['idArray[]'];
    shortLinks=req.body['shortURL[]'];

    shortLinks.forEach(function(element,index){
        expandUrl(element,index);

    });

    setTimeout( function(){
                var _longURLs=longURLs;
                sortLongUrls(_longURLs,res);

              }, 5000 );



    function expandUrl(element,index) {
            if(element==="No Link"){
                longURLs.push({"index":index, URL: "No Link"});
            }
            else{
             require('events').EventEmitter.prototype._maxListeners = 250;
            request( { method: "HEAD", url: element, followAllRedirects: true },
                function (error, response) {
                     if(response){
                        longURLs.push({"index":index, URL: response.request.href});

                    }
                      
                    else {
                        longURLs.push({"index":index, URL: "error"});
                    }

                });
            }

        }



    function sortLongUrls(crayArray, res){

        var singleObj;

        for (var i=0;i<ids.length;i++){
            function isNext(links) { 
                return links.index === i;
            }
            singleObj=crayArray.find(isNext);

            if(singleObj===undefined){
                sortedURLs.push("error");
            } 
            else {
                sortedURLs.push(singleObj.URL);
            }
        }

        objectify(ids, shortLinks, sortedURLs, res);
    }

    function objectify(col1,col2,col3,res){
        for (var i=0;i<ids.length;i++){
            allData.push({"Channel Post ID": col1[i], "Short Link":col2[i], "Long Link": col3[i]});
        }

        var csv = papa.unparse(allData);
        var thispath=path.join(__dirname, "/public/index.html");
            writeFile(thispath, csv, function (err) {
              if (err) return console.log(err)
              console.log('file is written')
            });
        console.log("out of loop");
        res.json("done");
       
    }


});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

