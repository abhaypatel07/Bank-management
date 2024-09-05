// Initialize loan data
let loans = JSON.parse(localStorage.getItem("loans")) || [];

// Request a new loan
document
  .getElementById("loanRequestForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const loanRequest = {
      ssn: document.getElementById("ssn").value,
      name: document.getElementById("name").value,
      occupation: document.getElementById("occupation").value,
      employerName: document.getElementById("employerName").value,
      employerAddress: document.getElementById("employerAddress").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      maritalStatus: document.getElementById("maritalStatus").value,
      contact: document.getElementById("contact").value,
      loanAmount: parseFloat(document.getElementById("loanAmount").value),
      loanDuration: parseInt(document.getElementById("loanDuration").value),
      loanId: Date.now().toString(), // Unique ID for each loan
    };

    loans.push(loanRequest);
    localStorage.setItem("loans", JSON.stringify(loans));
    alert("Loan request submitted successfully!");
    displayLoans("request");
  });

// Display loans for various actions (request, edit, cancel)
function displayLoans(action) {
  const loanTableId = {
    request: "loanRequestTable",
    edit: "editLoanTable",
    cancel: "cancelLoanTable",
  }[action];

  const loanTable = document.getElementById(loanTableId);
  if (!loanTable) return;

  loanTable.innerHTML = `
    <tr>
      <th>SSN</th>
      <th>Name</th>
      <th>Occupation</th>
      <th>Employer Name</th>
      <th>Employer Address</th>
      <th>Email</th>
      <th>Address</th>
      <th>Marital Status</th>
      <th>Contact</th>
      <th>Loan Amount</th>
      <th>Loan Duration</th>
      <th>Action</th>
    </tr>
  `;

  loans.forEach((loan, index) => {
    loanTable.innerHTML += `
      <tr>
        <td>${loan.ssn}</td>
        <td>${loan.name}</td>
        <td>${loan.occupation}</td>
        <td>${loan.employerName}</td>
        <td>${loan.employerAddress}</td>
        <td>${loan.email}</td>
        <td>${loan.address}</td>
        <td>${loan.maritalStatus}</td>
        <td>${loan.contact}</td>
        <td>${loan.loanAmount}</td>
        <td>${loan.loanDuration} Months</td>
        <td>
          ${
            action === "edit"
              ? `<button onclick="editLoan(${index})">Edit</button>`
              : ""
          }
          ${
            action === "cancel"
              ? `<button onclick="cancelLoan(${index})">Cancel</button>`
              : ""
          }
        </td>
      </tr>
    `;
  });
}

// Edit loan details
function editLoan(index) {
  const newLoanAmount = prompt(
    "Enter new loan amount:",
    loans[index].loanAmount
  );
  const newLoanDuration = prompt(
    "Enter new loan duration (in months):",
    loans[index].loanDuration
  );

  if (newLoanAmount !== null && newLoanDuration !== null) {
    loans[index].loanAmount = parseFloat(newLoanAmount);
    loans[index].loanDuration = parseInt(newLoanDuration);
    localStorage.setItem("loans", JSON.stringify(loans));
    alert("Loan details updated successfully!");
    displayLoans("edit");
  }
}

// Cancel loan
function cancelLoan(index) {
  if (confirm("Are you sure you want to cancel this loan?")) {
    loans.splice(index, 1);
    localStorage.setItem("loans", JSON.stringify(loans));
    alert("Loan canceled successfully!");
    displayLoans("cancel");
  }
}

// Filter loans based on search input
function filterLoans(action) {
  const searchInputId = {
    request: "searchLoanRequest",
    edit: "searchLoanEdit",
    cancel: "searchLoanCancel",
  }[action];

  const searchInput = document
    .getElementById(searchInputId)
    .value.toLowerCase();
  const loanTableId = {
    request: "loanRequestTable",
    edit: "editLoanTable",
    cancel: "cancelLoanTable",
  }[action];

  const loanTable = document.getElementById(loanTableId);
  const filteredLoans = loans.filter((loan) => {
    return (
      loan.ssn.toLowerCase().includes(searchInput) ||
      loan.name.toLowerCase().includes(searchInput)
    );
  });

  loanTable.innerHTML = `
    <tr>
      <th>SSN</th>
      <th>Name</th>
      <th>Occupation</th>
      <th>Employer Name</th>
      <th>Employer Address</th>
      <th>Email</th>
      <th>Address</th>
      <th>Marital Status</th>
      <th>Contact</th>
      <th>Loan Amount</th>
      <th>Loan Duration</th>
      <th>Action</th>
    </tr>
  `;

  filteredLoans.forEach((loan, index) => {
    loanTable.innerHTML += `
      <tr>
        <td>${loan.ssn}</td>
        <td>${loan.name}</td>
        <td>${loan.occupation}</td>
        <td>${loan.employerName}</td>
        <td>${loan.employerAddress}</td>
        <td>${loan.email}</td>
        <td>${loan.address}</td>
        <td>${loan.maritalStatus}</td>
        <td>${loan.contact}</td>
        <td>${loan.loanAmount}</td>
        <td>${loan.loanDuration} Months</td>
        <td>
          ${
            action === "edit"
              ? `<button onclick="editLoan(${index})">Edit</button>`
              : ""
          }
          ${
            action === "cancel"
              ? `<button onclick="cancelLoan(${index})">Cancel</button>`
              : ""
          }
        </td>
      </tr>
    `;
  });
}

// Initialize the page based on action
document.addEventListener("DOMContentLoaded", () => {
  const action = document.body.id; // Get the action from the body id (request, edit, cancel)
  if (action) {
    displayLoans(action);
  }
});
