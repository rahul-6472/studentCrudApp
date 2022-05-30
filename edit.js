const student = localStorage.getItem("student");
console.log(student);

const prerfilledStudent = async () => {
  try {
    let res = await fetch(`http://localhost:3000/students/${student}`);
    let data = await res.json();
    //   console.log(data)
    const { id, name, age, gender, marks, cohort } = data;

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("gender").value = gender;
    document.getElementById("marks").value = marks;
    document.getElementById("cohort").value = cohort;
  } catch (error) {
    console.log(error);
  }
};

prerfilledStudent();

const editStudent = async () => {
  let body = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    marks: document.getElementById("marks").value,
    cohort: document.getElementById("cohort").value,
  };

  try {
    let res = await fetch(`http://localhost:3000/students/${student}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    location.href = "./index.html";
  } catch (error) {
    console.log(error);
  }
};
