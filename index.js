// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req,res) => {
  
  if(req.params.date == null) {
    const unixStamp = Date.now();
    const utcStamp = new Date().toUTCString();
    
    res.json({
      unix: unixStamp,
      utc: `${utcStamp}`
    }
    );
  }

  const stringDate = req.params.date.toString();
  const numberDate = parseInt(req.params.date);

  if(numberDate == stringDate) {
    const utcStamp = new Date(numberDate).toUTCString();
    

    res.json({

      unix : numberDate,
      utc : `${utcStamp}`

    });


  }

  else {
    
    const unixStamp = Date.parse(req.params.date);
    const utcStamp = new Date(req.params.date).toUTCString();

    
    if(unixStamp === "Invalid Date" | utcStamp === "Invalid Date") {

      res.json({
        error: "Invalid Date"
      });

    }

    else {
      res.json({
      
        unix : unixStamp,
        utc : `${utcStamp}`
  
      });
    }

  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
