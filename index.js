const getStudents = async () => {
  try {
    let res = await fetch("http://localhost:3000/students");
    let data = await res.json();
    console.log(data);
    displayStudents(data);
  } catch (error) {
    console.log(error);
  }
};

getStudents();

const displayStudents = (data) => {
  data.forEach((student) => {
    let trow = document.createElement("tr");

    let id = document.createElement("td");
    let name = document.createElement("td");
    let gender = document.createElement("td");
    let age = document.createElement("td");
    let marks = document.createElement("td");
    let cohort = document.createElement("td");

    let edit = document.createElement("td");
    let deleteBt =  document.createElement("td");



    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    id.innerText = student.id;
    name.innerText = student.name;
    gender.innerText = student.gender;
    age.innerText = student.age;
    marks.innerText = student.marks;
    cohort.innerText = student.cohort;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    edit.append(editBtn)
    deleteBt.append(deleteBtn)

    deleteBtn.onclick = async () =>{
      let res = await fetch (`http://localhost:3000/students/${student.id}`, {
        method: "DELETE"
      })
      displayStudents()

    }

    editBtn.onclick = async () =>{
      localStorage.setItem("student", student.id)
      location.href = "./edit.html"
    }

    trow.append(id, name, gender, age, marks, cohort, edit, deleteBt);
    document.getElementById("tbody").append(trow);
  });
};

const createStudent = async () => {
  try {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let marks = document.getElementById("marks").value;
    let cohort = document.getElementById("cohort").value;

    const body = {
      name,
      age,
      gender,
      marks,
      cohort,
    };

    let res = await fetch("http://localhost:3000/students", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    displayStudents(data);
  } catch (error) {
    console.log(error);
  }
};

document.querySelector("form").addEventListener("submit", createStudent);
