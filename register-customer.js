document
  .getElementById("customerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    function generateUniqueAccountNumber(customers) {
      let accountNumber;
      let isUnique = false;
      while (!isUnique) {
        accountNumber = Math.floor(
          10000000 + Math.random() * 90000000
        ).toString();
        isUnique = !customers.some(
          (customer) => customer.accountNumber === accountNumber
        );
      }
      return accountNumber;
    }

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    const customerData = {
      ssn: document.getElementById("ssn").value.trim(),
      name: document.getElementById("name").value.trim(),
      accountNumber: generateUniqueAccountNumber(customers),
      ifscCode: document.getElementById("ifscCode").value.trim(),
      balance: parseFloat(document.getElementById("balance").value),
      aadhaar: document.getElementById("aadhaar").value.trim(),
      panCard: document.getElementById("panCard").value.trim(),
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      maritalStatus: document.getElementById("maritalStatus").value,
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      contactNumber: document.getElementById("contactNumber").value.trim(),
    };

    const ssnExists = customers.some(
      (customer) => customer.ssn === customerData.ssn
    );
    if (ssnExists) {
      alert("A customer with this SSN already exists.");
      return;
    }

    customers.push(customerData);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert(
      "Customer registered successfully! Account Number: " +
        customerData.accountNumber
    );
    document.getElementById("customerForm").reset();
  });
