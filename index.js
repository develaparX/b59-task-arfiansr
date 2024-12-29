const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {
  home,
  contact,
  project,
  addProject,
  testimonials,
  createProject,
  deleteProject,
  editProject,
  editProjectPage,
  projectDetail,
} = require("./controllers/controllers.js");
const { getRelativeTime } = require("./utils/time.js");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./component"));

hbs.registerPartials(__dirname + "/component/partials");
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});
hbs.registerHelper("includes", (array, value) => {
  return array && array.includes(value);
});

app.get("/", home);
app.get("/contact", contact);

app.get("/project", project);
app.post("/project", addProject);
app.get("/create-project", createProject);
app.get("/project/delete/:id", deleteProject);

app.get("/project/edit/:id", editProjectPage);
app.post("/project/update/:id", editProject);
app.get("/project/detail/:id", projectDetail);

app.get("/testimonials", testimonials);

app.get("/:lang/project/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
