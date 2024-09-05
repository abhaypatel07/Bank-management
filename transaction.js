document.addEventListener("DOMContentLoaded", function () {
  displayAccounts("transfer");
  displayAccounts("deposit");
  displayAccounts("withdraw");

  // Handle transfer form submission
  document
    .getElementById("transferForm")
    ?.addEventListener("submit", function (event) {
      event.preventDefault();
      processTransfer();
    });

  // Handle deposit form submission
  document
    .getElementById("depositForm")
    ?.addEventListener("submit", function (event) {
      event.preventDefault();
      processDeposit();
    });

  // Handle withdraw form submission
  document
    .getElementById("withdrawForm")
    ?.addEventListener("submit", function (event) {
      event.preventDefault();
      processWithdraw();
    });
});

// Display accounts for different transaction pages
function displayAccounts(transactionType) {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const tableBody = document.getElementById(
    `${transactionType}AccountTableBody`
  );

  if (!tableBody) return;

  tableBody.innerHTML = ""; // Clear previous content

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${customer.accountNumber}</td>
        <td>${customer.name}</td>
        <td>${customer.balance}</td>
        <td><button onclick="selectAccount('${transactionType}', '${customer.accountNumber}')">Select</button></td>
      `;
    tableBody.appendChild(row);
  });
}

// Select an account for transactions
function selectAccount(transactionType, accountNumber) {
  document.getElementById(`${transactionType}Account`).value = accountNumber;
}

// Filter accounts for search functionality
function filterTransferAccounts() {
  filterAccounts("transfer");
}
function filterDepositAccounts() {
  filterAccounts("deposit");
}
function filterWithdrawAccounts() {
  filterAccounts("withdraw");
}

function filterAccounts(transactionType) {
  const searchTerm = document
    .getElementById(
      `search${
        transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
      }Input`
    )
    .value.toLowerCase();
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.accountNumber.includes(searchTerm)
  );
  displayFilteredAccounts(transactionType, filteredCustomers);
}

function displayFilteredAccounts(transactionType, customers) {
  const tableBody = document.getElementById(
    `${transactionType}AccountTableBody`
  );
  tableBody.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${customer.accountNumber}</td>
        <td>${customer.name}</td>
        <td>${customer.balance}</td>
        <td><button onclick="selectAccount('${transactionType}', '${customer.accountNumber}')">Select</button></td>
      `;
    tableBody.appendChild(row);
  });
}

// Process transfer between accounts
function processTransfer() {
  const fromAccount = document.getElementById("fromAccount").value;
  const toAccount = document.getElementById("toAccount").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const sender = customers.find(
    (customer) => customer.accountNumber === fromAccount
  );
  const receiver = customers.find(
    (customer) => customer.accountNumber === toAccount
  );

  if (!sender || !receiver) {
    alert("Invalid account number(s).");
    return;
  }

  if (sender.balance < amount) {
    alert("Insufficient balance.");
    return;
  }

  sender.balance -= amount;
  receiver.balance += amount;

  localStorage.setItem("customers", JSON.stringify(customers));
  alert("Transfer successful!");
  displayAccounts("transfer");
}

// Process deposit to an account
function processDeposit() {
  const accountNumber = document.getElementById("depositAccount").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const customer = customers.find(
    (customer) => customer.accountNumber === accountNumber
  );

  if (!customer) {
    alert("Invalid account number.");
    return;
  }

  customer.balance += amount;
  localStorage.setItem("customers", JSON.stringify(customers));
  alert("Deposit successful!");
  displayAccounts("deposit");
}

// Process withdrawal from an account
function processWithdraw() {
  const accountNumber = document.getElementById("withdrawAccount").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const customer = customers.find(
    (customer) => customer.accountNumber === accountNumber
  );

  if (!customer) {
    alert("Invalid account number.");
    return;
  }

  if (customer.balance < amount) {
    alert("Insufficient balance.");
    return;
  }

  customer.balance -= amount;
  localStorage.setItem("customers", JSON.stringify(customers));
  alert("Withdrawal successful!");
  displayAccounts("withdraw");
}
