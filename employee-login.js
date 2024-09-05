document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const employeeId = document.getElementById("employeeId").value.trim();
    const loginPassword = document.getElementById("loginPassword").value;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const employee = employees.find((emp) => emp.email === employeeId);

    if (employee && employee.password === loginPassword) {
      alert("Login successful!");
    } else {
      alert("Invalid Employee ID or Password.");
    }

    document.getElementById("loginForm").reset();
  });
