const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.render("09_form-dynamic");
  });

app.get("/ajax", function (req, res) {
    // console.log(req.query);
    res.send(req.query);
});

app.post("/ajax", function (req, res) {
    // console.log(req.body);
    res.send(req.body);
});

app.get("/axios", function (req, res) {
    // console.log("req.query: ", req.query);
    const data = {
        ...req.query,
        msg: "axios get! 반가워요.",
    }
    res.send(data);
    // res.send(req.query);
});

app.post("/axios", function (req, res) {
    // console.log("req.body: ", req.body);
    const data = {
        ...req.body,
        msg: "axios post! 반가워요.",
    }
    // {
    //     id: .
    //     name: ,
    //     msg: "반가워요",
    // }
    res.send(req.body);
});

app.get("/fetch", function (req, res) {
    console.log("req.query: ", req.query);
    res.send(req.query);
});

app.post("/fetch", function (req, res) {
    console.log("req.body: ", req.body);
    res.send(req.body);
});



app.listen(PORT, function () {
    console.log(`Sever Open: ${PORT}`);
});