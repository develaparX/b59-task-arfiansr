const { getRelativeTime } = require("../utils/time");
const { Project } = require("../models");

async function home(req, res) {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    res.render("index", { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function addProject(req, res) {
  try {
    const { projectName, projectDesc, startDate, endDate, techStack } =
      req.body;

    const duration = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 30)
    );

    await Project.create({
      name: projectName,
      desc: projectDesc,
      image:
        "https://img.freepik.com/free-vector/stylish-happy-new-year-2025-colorful-text-greeting-background_1055-22756.jpg?t=st=1735486603~exp=1735490203~hmac=4bd2a0e221c247ac8e3bba8689231afa771986cc5455202087b708a7b530fd81&w=826",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      duration,
      stack: techStack || [],
    });

    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function createProject(req, res) {
  try {
    res.render("addProject");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function project(req, res) {
  try {
    const projects = await Project.findAll();
    res.render("project", { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function editProject(req, res) {
  const id = req.params.id;
  try {
    const { projectName, projectDesc, startDate, endDate, techStack } =
      req.body;

    if (!projectName || !projectDesc || !startDate || !endDate) {
      return res.status(400).send("All fields are required.");
    }

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }

    const duration = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 30)
    );

    project.name = projectName;
    project.desc = projectDesc;
    project.startDate = new Date(startDate);
    project.endDate = new Date(endDate);
    project.duration = duration;
    project.stack = Array.isArray(techStack) ? techStack : [];

    await project.save();

    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function editProjectPage(req, res) {
  const id = req.params.id;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }

    res.render("editProject", { project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const projectDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }

    const formatDate = (date) => {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, "0");
      const month = months[d.getMonth()];
      const year = d.getFullYear();

      return `${day} ${month} ${year}`;
    };

    const formattedStartDate = formatDate(project.startDate);
    const formattedEndDate = formatDate(project.endDate);

    res.render("projectDetail", {
      project: {
        ...project.toJSON(),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }

    await project.destroy();
    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

function testimonials(req, res) {
  res.render("testimonials");
}

function contact(req, res) {
  res.render("contact");
}

module.exports = {
  home,
  project,
  contact,
  addProject,
  testimonials,
  createProject,
  deleteProject,
  editProject,
  editProjectPage,
  projectDetail,
};
