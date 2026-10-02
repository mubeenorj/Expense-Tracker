const API_URL = "http://localhost:3000/api/expenses";

let allExpenses = [];

const dateInput = document.getElementById("date");
const expenseForm = document.getElementById("expenseForm");
const editExpenseForm = document.getElementById("editExpenseForm");
const categoryFilter = document.getElementById("categoryFilter");
const titleSearch = document.getElementById("titleSearch");

function setTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.value = `${year}-${month}-${day}`;
}

async function getExpenses() {
    try {
        showSpinner();

        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const expenses = await response.json();

        allExpenses = expenses;

        displayExpenses(expenses);
        updateSummary(expenses);
    } catch (error) {
        showAlert(error.message, "danger");
    } finally {
        hideSpinner();
    }
}

function displayExpenses(expenses) {
    const tableBody = document.getElementById("expensesTableBody");

    tableBody.innerHTML = "";

    expenses.forEach(function(expense) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.amount}</td>
            <td>
                <span class="category-badge ${expense.category.toLowerCase()}">
                    ${expense.category}
                </span>
            </td>
            <td>${expense.date}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editExpense(${expense.id})">
                    Edit
                </button>
            </td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function updateSummary(expenses) {
    let total = 0;
    let highest = 0;

    expenses.forEach(function(expense) {
        total += Number(expense.amount);

        if (Number(expense.amount) > highest) {
            highest = Number(expense.amount);
        }
    });

    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("expenseCount").textContent = expenses.length;
    document.getElementById("highestExpense").textContent = highest.toFixed(2);
}

function filterExpenses(category) {
    const filteredExpenses = allExpenses.filter(function(expense) {
        return expense.category === category;
    });

    displayExpenses(filteredExpenses);
}

function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const searchText = titleSearch.value.toLowerCase();

    let filteredExpenses = allExpenses;

    if (selectedCategory !== "All") {
        filteredExpenses = filteredExpenses.filter(function(expense) {
            return expense.category === selectedCategory;
        });
    }

    if (searchText !== "") {
        filteredExpenses = filteredExpenses.filter(function(expense) {
            return expense.title.toLowerCase().includes(searchText);
        });
    }

    displayExpenses(filteredExpenses);
}

categoryFilter.addEventListener("change", function() {
    applyFilters();
});

titleSearch.addEventListener("input", function() {
    applyFilters();
});

expenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (title === "" || amount === "" || category === "" || date === "") {
        showAlert("Please fill in all fields.", "warning");
        return;
    }

    if (Number(amount) <= 0) {
        showAlert("Amount must be greater than 0.", "warning");
        return;
    }

    const expense = {
        title: title,
        amount: amount,
        category: category,
        date: date
    };

    try {
        showSpinner();

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        await getExpenses();

        expenseForm.reset();
        setTodayDate();

        showAlert("Expense added successfully!", "success");
    } catch (error) {
        showAlert(error.message, "danger");
    } finally {
        hideSpinner();
    }
});

function editExpense(id) {
    const expense = allExpenses.find(function(expense) {
        return expense.id === id;
    });

    if (!expense) {
        return;
    }

    document.getElementById("editId").value = expense.id;
    document.getElementById("editTitle").value = expense.title;
    document.getElementById("editAmount").value = expense.amount;
    document.getElementById("editCategory").value = expense.category;
    document.getElementById("editDate").value = expense.date;

    const modal = new bootstrap.Modal(
        document.getElementById("editExpenseModal")
    );

    modal.show();
}

editExpenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value;
    const amount = document.getElementById("editAmount").value;
    const category = document.getElementById("editCategory").value;
    const date = document.getElementById("editDate").value;

    if (title === "" || amount === "" || category === "" || date === "") {
        showAlert("Please fill in all fields.", "warning");
        return;
    }

    if (Number(amount) <= 0) {
        showAlert("Amount must be greater than 0.", "warning");
        return;
    }

    const expense = {
        title: title,
        amount: amount,
        category: category,
        date: date
    };

    try {
        showSpinner();

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        await getExpenses();

        const modalElement = document.getElementById("editExpenseModal");
        const modal = bootstrap.Modal.getInstance(modalElement);

        modal.hide();

        showAlert("Expense updated successfully!", "success");
    } catch (error) {
        showAlert(error.message, "danger");
    } finally {
        hideSpinner();
    }
});

async function deleteExpense(id) {
    try {
        showSpinner();

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        await getExpenses();

        showAlert("Expense deleted successfully!", "success");
    } catch (error) {
        showAlert(error.message, "danger");
    } finally {
        hideSpinner();
    }
}

function showAlert(message, type) {
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
    `;

    setTimeout(function() {
        alertMessage.innerHTML = "";
    }, 3000);
}

function showSpinner() {
    document.getElementById("loadingSpinner").classList.remove("d-none");
}

function hideSpinner() {
    document.getElementById("loadingSpinner").classList.add("d-none");
}

getExpenses();
setTodayDate();