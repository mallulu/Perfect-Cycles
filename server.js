var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const { getPerfectCycles } = require('./src/cycler.js')

// Initialize server
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {   // Initialize endpoint '/fileupload'
    var form = new formidable.IncomingForm();   // Instantiate a 'form' variable that will receive the submitted form data
    form.parse(req, function (err, fields, files) {   // Parse the submitted form data

      var filepath = files.filetoupload.filepath;     // Get the path of the uploaded file
      fs.readFile(filepath, "utf8", (err, jsonString) => {  // Read the file from the given filepath
        if (err) {  // File read failed
          console.log("File read failed:", err);
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.write("File read failed.");
          res.end();
          return;
        }
        
        let perfectCycles = getPerfectCycles(JSON.parse(jsonString));   // Checks whether the arrays in the request json are perfect cycles or not
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(perfectCycles));
        res.end();
      });
    });
  } else {  // Default/base endpoint
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);    