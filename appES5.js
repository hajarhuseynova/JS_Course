const form = document.getElementById("newCourse");
const courseList = document.getElementById("course-list");
const row = document.querySelector(".row");

function Course(title, instructor, image) {
  this.title = title;
  this.instructor = instructor;
  this.image = image;
}
function UI() {}

UI.prototype.addCourseToList = function (course) {
  var html = `
    <tr>
  <td style="width:200px"><img src="img/${course.image}" style="width:100px"></td>
  <td style="width:300px">${course.title}</td>
  <td style="width:200px">${course.instructor}</td>
  <td><a class="btn btn-danger btn-sm delete" href="#">DELETE</a></td>
    </tr>`;
  courseList.innerHTML += html;
};
UI.prototype.clearControls = function () {
  const title = (document.getElementById("title").value = "");
  const instructor = (document.getElementById("instructor").value = "");
  const image = (document.getElementById("image").value = "");
};
UI.prototype.deleteCourse = function (element) {
  if (element.classList.contains("delete")) {
    element.parentElement.parentElement.remove();
  }
};
UI.prototype.showAlert = function (message, className) {
  var alert = `
  <div class="alert alert-${className}">
  ${message}
  </div>
  `;

  row.insertAdjacentHTML("afterBegin", alert);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};
form.addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const image = document.getElementById("image").value;

  //cretae object
  const course = new Course(title, instructor, image);
  //cretae UI
  const ui = new UI();

  if (image === "" || instructor === "" || title === "") {
    ui.showAlert("Please,fill the all gap", "danger");
  } else {
    //add course to list
    ui.addCourseToList(course);
    //clear Controls
    ui.clearControls();
    ui.showAlert("Successfully added!", "success");
  }
  e.preventDefault();
});

courseList.addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteCourse(e.target);
  ui.showAlert("Successfully deleted!", "success");
});
