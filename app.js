const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  //this if class check it is in root and when submit it goes to next page
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Node Practice</title></head>");
    res.write("<body>");
    res.write(
      '<form action="/message" method="POST"><input type= "text" name="message" ></input><input type="submit" value="Submit"></input></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  // this if class does redirecting and read data
  if (url === "/message" && method == "POST") {
    //read data
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const content = Buffer.concat(body).toString();
      const message = content.split("=");
      

      const replacedMessage = message.map((item) => item.replace(/\+/g, " "));
      console.log(replacedMessage);
      //fs.writeFileSync('msg.txt',message[1]);
      fs.writeFile('msg.txt',replacedMessage[1],(err)=>{
        res.setHeader("Location", "/");
        res.statusCode = 302;
        return res.end();
      });
      //redirecting
      

    });
  }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Hello World</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});

server.listen(8000);
