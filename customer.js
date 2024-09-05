document.addEventListener("DOMContentLoaded", function () {
  displayCustomers();

  // Handle edit customer form submission
  document
    .getElementById("editCustomerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      updateCustomer();
    });
});

// Display customers in the table
function displayCustomers(
  customers = JSON.parse(localStorage.getItem("customers")) || []
) {
  const tableBody = document.getElementById("customerTableBody");
  tableBody.innerHTML = ""; // Clear previous content

  customers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${customer.ssn}</td>
        <td>${customer.name}</td>
        <td>${customer.accountNumber}</td>
        <td>${customer.email}</td>
        <td>${customer.balance}</td>
        <td>
          <button onclick="editCustomer(${index})">Edit</button>
          <button onclick="deleteCustomer(${index})">Delete</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}

// Search functionality
function filterCustomers() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.ssn.includes(searchTerm)
  );
  displayCustomers(filteredCustomers);
}

// Edit customer
function editCustomer(index) {
  const customers = JSON.parse(localStorage.getItem("customers"));
  const customer = customers[index];

  document.getElementById("editIndex").value = index;
  document.getElementById("editName").value = customer.name;
  document.getElementById("editEmail").value = customer.email;
  document.getElementById("editBalance").value = customer.balance;

  document.getElementById("editFormContainer").style.display = "block";
}

// Update customer
function updateCustomer() {
  const index = document.getElementById("editIndex").value;
  const customers = JSON.parse(localStorage.getItem("customers"));

  customers[index].name = document.getElementById("editName").value.trim();
  customers[index].email = document.getElementById("editEmail").value.trim();
  customers[index].balance = parseFloat(
    document.getElementById("editBalance").value
  );

  localStorage.setItem("customers", JSON.stringify(customers));
  displayCustomers();
  closeEditForm();
  alert("Customer updated successfully!");
}

// Delete customer
function deleteCustomer(index) {
  const customers = JSON.parse(localStorage.getItem("customers"));
  customers.splice(index, 1);
  localStorage.setItem("customers", JSON.stringify(customers));
  displayCustomers();
  alert("Customer deleted successfully!");
}

// Close the edit form
function closeEditForm() {
  document.getElementById("editFormContainer").style.display = "none";
}
