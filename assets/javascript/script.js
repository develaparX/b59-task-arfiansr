let projects = [];

function addProject(e) {
  e.preventDefault();

  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let desc = document.getElementById("projectDesc").value;
  let stack = document.querySelectorAll('input[name="techStack"]:checked');
  let image = document.getElementById("input-project-image");

  let selectedStack = [];
  for (let i = 0; i < stack.length; i++) {
    selectedStack.push(stack[i].value);
  }
  let imageInput = URL.createObjectURL(image.files[0]);

  let postedAt = new Date();

  let project = {
    name: projectName,
    desc: desc,
    image: imageInput,
    startDate: startDate,
    endDate: endDate,
    stack: selectedStack,
    postedAt: postedAt,
  };

  projects.push(project);

  renderProject();
}

function renderProject() {
  console.log(projects);

  let projectListElement = document.getElementById("projectList");

  projectListElement.innerHTML = firstBlogContent();

  const iconMap = {
    NodeJS: '<i class="fa-brands fa-node-js fa-2xl"></i>',
    Golang: '<i class="fa-brands fa-golang fa-2xl"></i>',
    ReactJS: '<i class="fab fa-react fa-2xl"></i>',
    HTML5: '<i class="fa-brands fa-html5 fa-2xl"></i>',
  };

  for (let i = 0; i < projects.length; i++) {
    const startDate = new Date(projects[i].startDate);
    const endDate = new Date(projects[i].endDate);
    const duration = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24 * 30) // Konversi ke bulan
    );

    let techIcons = "";
    for (let j = 0; j < projects[i].stack.length; j++) {
      const tech = projects[i].stack[j];
      if (iconMap[tech]) {
        techIcons += iconMap[tech] + " ";
      }
    }

    console.log(projects[i]);

    projectListElement.innerHTML += `
           <div class="card">
        <div class="card-dir">
          <div class="card-img">
            <img
              src="${projects[i].image}"
              alt="${projects[i].name}"
              class="card-i"
            />
          </div>
          <div class="card-desc">
            <div class="desc-title">
              <div class="desc-title-satu">
                <h2>${projects[i].name}</h2>
                <p class="relative-time">${getRelativeTime(
                  projects[i].postedAt
                )}</p>
              </div>
              <p>Durasi: ${duration} Bulan</p>
            </div>
            <div class="desc-detail">
              <p>${projects[i].desc}</p>
            </div>
            <div class="desc-stack">${techIcons.trim()}</div>
            <div class="desc-btn">
              <button onclick="editProject(${i})">Edit</button>
              <button onclick="deleteProject(${i})">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function editProject(index) {
  alert(`Edit project: ${projects[index].name}`);
}

function deleteProject(index) {
  projects.splice(index, 1);
  renderProject();
}

function firstBlogContent() {
  return `
    <div class="card">
        <div class="card-dir">
          <div class="card-img">
            <img
              src="https://img.freepik.com/free-photo/view-people-learning-how-make-traditional-sushi-dish_23-2151186458.jpg?ga=GA1.1.925454002.1733145920"
              alt="makan"
              class="card-i"
            />
          </div>
          <div class="card-desc">
            <div class="desc-title">
              <h2>Dumbways Title</h2>
              <p>durasi : 3 Bulan</p>
            </div>
            <div class="desc-detail">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequatur tenetur blanditiis praesentium eos necessitatibus
              </p>
            </div>
            <div class="desc-stack">
              <i class="fa-brands fa-node-js fa-2xl"></i>
              <i class="fa-brands fa-golang fa-2xl"></i>
              <i class="fab fa-react fa-2xl"></i>
              <i class="fa-brands fa-html5 fa-2xl"></i>
            </div>
            <div class="desc-btn">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
}

function getRelativeTime(targetDate) {
  let now = new Date();

  let diffInSeconds = Math.floor((now - targetDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes $ ago`;
  }
}
