let http= require("http");

let server = http.createServer((req,res)=>{
    res.write('<h1>This is nodejs Code server stanli</h1>');
    res.end()
})

server.listen(5070)
