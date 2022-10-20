const root = document.documentElement;

const addBtn = document.querySelector(".add-btn");
const removeAllBtn = document.querySelector(".remove-all-btn");
const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");
const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

const panel = document.querySelector(".panel");
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const category = document.querySelector("#category");

console.log(category.selectedIndex);

const iconsArray = [
  "a tutaj nie ma ikonki bo index 0 jest nie dostepny:)",
  "fa-solid fa-money-bill-wave",
  "fa-solid fa-cart-shopping",
  "fa-solid fa-utensils",
  "fa-solid fa-film",
];

const moneyArray = [0];

let id = 0;

function showPanel() {
  panel.style.display = "flex";
  category.selectedIndex = 0;
  console.log(category.selectedIndex);
}

function hidePanel() {
  panel.style.display = "none";
}

function addItem() {
  let create = checkInputs();

  if (create) {
    hidePanel();
    let transaction = createTransaction();
    if (amountInput.value > 0) {
      incomes.appendChild(transaction);
    } else {
      expenses.appendChild(transaction);
    }

    showSumtoUser();
  }
}

function showSumtoUser() {
  const amount = document.querySelector(".amount");
  moneyArray.push(parseFloat(amountInput.value));
  let sum = moneyArray.reduce((a, b) => a + b);
  amount.textContent = sum + "zł";
}

function createTransaction() {
  let transaction = document.createElement("div");
  transaction.classList.add("transaction");
  transaction.innerHTML = `
                <i class="${iconsArray[category.selectedIndex]}"></i>
                <p class="transaction-name">${nameInput.value}</p>
                <p class="sum">${amountInput.value} zł</p>
                <button onclick="removeTransaction(${id})" class="remove-transaction"><i class="fa-solid fa-xmark"></i></button>
    `;

  id++;

  return transaction;
}

function removeTransaction(id) {
  let transactionsList = document.querySelectorAll(".transaction");
  transactionsList[id].remove();

  moneyArray.splice(id, 1);
  showSumtoUser();
}

function checkInputs() {
  if (
    category.options[category.selectedIndex].value !== "none" &&
    nameInput.value !== "" &&
    amountInput.value !== ""
  ) {
    return true;
  } else {
    alert(
      "Wszystkie pola muszą byc uzupełnione aby dodać nową transakcje! Nie zapomnij równierz, że input number po wpisaniu stringa zwraca false"
    );
    return false;
  }
}

function removeAllItems() {}

const changeStyleToLight = () => {
  root.style.setProperty("--first-color", "#F9F9F9");
  root.style.setProperty("--second-color", "#14161F");
  root.style.setProperty("--border-color", "rgba(0, 0, 0, .2)");

  darkBtn.classList.remove("active");
  lightBtn.classList.add("active");
};

const changeStyleToDark = () => {
  root.style.setProperty("--first-color", "#14161F");
  root.style.setProperty("--second-color", "#F9F9F9");
  root.style.setProperty("--border-color", "rgba(255, 255, 255, .4)");
  lightBtn.classList.remove("active");
  darkBtn.classList.add("active");
};

addBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
removeAllBtn.addEventListener("click", removeAllItems);
saveBtn.addEventListener("click", addItem);
lightBtn.addEventListener("click", changeStyleToLight);
darkBtn.addEventListener("click", changeStyleToDark);
