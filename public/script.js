async function addStudent() {
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      id: document.getElementById("id").value,
      semester: document.getElementById("semester").value,
      courses: document.getElementById("courses").value.split(","),
    };

    const response = await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert(await response.json());
  }