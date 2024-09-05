document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const address = document.getElementById("address").value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const employee = {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      address,
    };

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    const emailExists = employees.some((emp) => emp.email === email);
    if (emailExists) {
      alert("An employee with this email already exists.");
      return;
    }

    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee registered successfully!");
    document.getElementById("registrationForm").reset(); // Clear form
  });
