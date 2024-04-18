var courseApi = "http://localhost:3000/posts";

function start() {
  getCourse();
}

function getCourse() {
  fetch(courseApi)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderCourse(data);
    });
}

function renderCourse(data) {
  var listCourse = document.querySelector("#course__list");
  var htmls = "";
  data.forEach((course) => {
    htmls += `
            <div id="course-id-${course.id}">
                <h3 class = "course-title">${course.name}</h3>
                <p class = "course-desc">${course.desc}</p>
            </div>
            <div id ="course-actionGr-${course.id}">
                   <button onclick = "rmCourse(${course.id})">Delete</button>
                    <button class = "patchBTN-${course.id}" onclick = "csCourse(${course.id})">Patch</button>
            </div>
        `;
  });
  listCourse.innerHTML = htmls;
}

//POST
function postCourse(data, callBack) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  fetch(courseApi, options)
    .then((res) => {
      return res.json();
    })
    .then(callBack);
}
//DELETE
function delCourse(id, callBack) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  var delApi = courseApi + "/" + id;
  fetch(delApi, options)
    .then((res) => {
      return res.json();
    })
    .then(callBack);
}
//PATCH
function patchCourse(id, data, callBack) {
  var options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  var patchApi = courseApi + "/" + id;
  fetch(patchApi, options)
    .then((res) => {
      return res.json();
    })
    .then(callBack);
}

function createCourse() {
  var title = document.querySelector(".input__title").value;
  var desc = document.querySelector(".input__desc").value;

  var dataForm = {
    name: title,
    desc: desc,
  };
  postCourse(dataForm);
}

function rmCourse(id) {
  var listCourse = document.querySelector("#course__list");
  listCourse.remove(`.course-id-${id}`);
  delCourse(id);
}

function csCourse(id) {
  var titleCS = document.querySelector(`#course-id-${id} .course-title`);
  var descCS = document.querySelector(`#course-id-${id} .course-desc`);

  var inputTitle = document.createElement("input");
  var inputDesc = document.createElement("input");
  var buttonSave = document.createElement("button");

  inputTitle.classList.add(`course-titleNew-${id}`);
  inputDesc.classList.add(`course-descNew-${id}`);
  buttonSave.classList.add(`course-save-${id}`);
  buttonSave.textContent = "Save";

  var listMain = document.querySelector(`#course-id-${id}`);
  var actionGr = document.querySelector(`#course-actionGr-${id}`);

  // Thêm input vào sau titleCS và descCS
  if (!listMain.querySelector(`.course-titleNew-${id}`)) {
    titleCS.parentNode.insertBefore(inputTitle, titleCS.nextSibling);
    descCS.parentNode.insertBefore(inputDesc, descCS.nextSibling);
    actionGr.appendChild(buttonSave);

    buttonSave.addEventListener("click", () => {
      actionSave(id);
    });
  }
}

function actionSave(id) {
  var titleCS = document.querySelector(`.course-titleNew-${id}`).value;
  var descCS = document.querySelector(`.course-descNew-${id}`).value;

  if (titleCS !== "" && descCS !== "") {
    var newData = {
      name: titleCS,
      desc: descCS,
    };

    patchCourse(id, newData);
  } else {
    start();
  }
}

start();
