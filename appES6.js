const form = document.getElementById("newCourse");
const courseList = document.getElementById("course-list");
const row = document.querySelector(".row");

class Course {
  constructor(title, instructor, image) {
    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;
  }
}

class UI {
  addCourseToList(course) {
    var html = `
    <tr>
  <td style="width:200px"><img src="img/${course.image}" style="width:100px;height:100px"></td>
  <td style="width:300px">${course.title}</td>
  <td style="width:200px">${course.instructor}</td>
  <td><a class="btn btn-danger btn-sm delete" data-id="${course.courseId}" href="#">DELETE</a></td>
    </tr>`;
    courseList.innerHTML += html;
  }
  clearControls() {
    const title = (document.getElementById("title").value = "");
    const instructor = (document.getElementById("instructor").value = "");
    const image = (document.getElementById("image").value = "");
  }
  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
    return true;
  }
  showAlert(message, className) {
    var alert = `
    <div class="alert alert-${className}">
    ${message}
    </div>
    `;

    row.insertAdjacentHTML("afterBegin", alert);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

class Storage {
  static getCourse() {
    let courses;
    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }
    return courses;
  }
  static displayCourse() {
    const courses = Storage.getCourse();
    courses.forEach((course) => {
      const ui = new UI();
      ui.addCourseToList(course);
    });
  }
  static addCourse(course) {
    const courses = Storage.getCourse();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }
  static deleteCourse(element) {
    if (element.classList.contains("delete")) {
      const id = element.getAttribute("data-id");

      const courses = Storage.getCourse();
      courses.forEach((course, index) => {
        if (course.courseId == id) {
          courses.splice(index, 1);
        }
      });
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourse);

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
    //save to local
    Storage.addCourse(course);
    //clear Controls
    ui.clearControls();
    ui.showAlert("Successfully added!", "success");
  }
  e.preventDefault();
});

courseList.addEventListener("click", function (e) {
  const ui = new UI();
  //delete course
  if (ui.deleteCourse(e.target) == true) {
    //delete from local
    Storage.deleteCourse(e.target);
    ui.showAlert("Successfully deleted!", "success");
  }
});
