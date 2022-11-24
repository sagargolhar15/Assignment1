const http = require('http');
const fs = require('fs');
const PORT = 5000;
// create a server
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        res.end()
        })
    }
    // create a file 
    else if (req.url == "/createFile") {
        // file exist are not
        if (fs.existsSync("neosoft.txt")) {
            res.write("<script>alert('file is exist'); location.assign('/');</script>");
            res.end()
        }
        else {
            // create and write data into the file
            fs.writeFile('neosoft.txt', "Welcome to neosoft !", (err) => {
                if (err) throw err
                else {
                    res.write("<script>alert('File is Created'); location.assign('/');</script>");
                    res.end()
                }
            })
        }
    }
    // read a file
    else if (req.url == "/readFile") {
        if (fs.existsSync("neosoft.txt")) {
            let data = fs.readFileSync('neosoft.txt');
            res.write("<!DOCTYPE html><html>")
            res.write("<head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'></head>")
            res.write("<body><div class='container mt-5 text-center'><h1 class='text-primary'>FILE DATA IS</h1>");
            res.write(`<p>${data.toString()}</p><a class='btn btn-success mt-2 ms-2' href='/' role='button'>Go to Back</a>`)
           
            res.write("</div></body></html>");
            res.end();
        }
        else {
            res.write("<script>alert('file not exist'); location.assign('/');</script>");
            res.end();

        }
    }
    // delete a file
    else if (req.url == "/deleteFile") {
        if (fs.existsSync("neosoft.txt")) {
            fs.unlink("neosoft.txt", (err) => {
                if (err) throw err
                else {
                    res.write("<script>alert('File is Deleted'); location.assign('/');</script>");
                    res.end()
                }
            })
        }
        else {
            res.write("<script>alert('file not exist'); location.assign('/');</script>");
            res.end()

        }
    }
    // append data into the file
    else if (req.url == "/append") {
        if (fs.existsSync("neosoft.txt")) {
            fs.appendFile("neosoft.txt", "Data is Added !", (err) => {
                if (err) throw err
                else {
                    res.write("<script>alert('Data is Updated'); location.assign('/');</script>");
            res.end()
                }
            })
        }
        else {
            res.write("<script>alert('file not exist'); location.assign('/');</script>");
            res.end()

        }
    }
})


server.listen(PORT, (err) => {
    if (err) throw err
    else console.log(`server work on ${PORT}`)
})
