const express = require("express");
const multer = require("multer");
const path = require("path");

// console.log("확장자 추출: ", path.extname("path.extension"));
// console.log("파일명 추출: ", path.basename("path.extension", path.extname("path.extension")));

const app = express();
const PORT = 8000;

app.use("/upload", express.static(__dirname + "/upload"));

const upload = multer({
    dest: "upload/",
});

const uploadDetail = multer({
    storage: multer.diskStorage({
        destination : function(req, file, done) {
            done(null, "upload/")
        },
        
        filename: function (req, file, done) {
            // console.log(file)
            const ext = path.extname(file.originalname)
            const basename = path.basename(file.originalname, ext)
            
            const fileName = basename + "_" + Date.now() + ext;

            done(null, fileName)
        }
    }),
    // limits: { fieldSize: 5 * 1024 * 1024 },
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.render("10_file_upload_index");
});

app.post("/upload", upload.single("userfile"), function (req, res) {
    console.log("file: ", req.file);
    console.log("body: ", req.body);

    res.render("10_file_upload_result", {
        src: req.file.path,
        title: req.body.title,
    });
});


app.post("/upload/detail", uploadDetail.single("userfile"), function (req, res) {
    console.log("file detail: ", req.file);
    console.log("body detail: ", req.body);

    res.render("10_file_upload_result", {
        src: req.file.path,
        title: req.body.title,
    });
});


app.post("/upload/array", uploadDetail.array("userfile"), function (req, res) {
    console.log("file 여러 개(ver1): ", req.files);

    res.send("파일 여러 개 업로드");
});


app.post("/upload/fields", uploadDetail.fields([{name: "userfile1"}, {name: "userfile2"}]), function (req, res) {
    console.log("file 여러 개(ver2): ", req.files);
    console.log("req.body: ", req.body);

    // res.render("result", {
    //     src: req.files.path,
    //     title: req.body.title,
    // })
    
    res.send("파일 여러 개 업로드");
});

app.post("/upload/dynamic", uploadDetail.single("userfile"), function (req, res) {
    res.send({ src: req.file.path });
});

app.listen(PORT, function () {
    console.log(`Sever Open: ${PORT}`);
});