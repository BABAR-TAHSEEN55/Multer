import express from "express";
import path from "path";
import multer from "multer";

const app = express();
const PORT = 2000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, (req, res) => console.log(`Server started at ${PORT} `));
console.log(path.resolve("./views"));
