// Loan Calculator Function
function calculateLoan() {
  const amount = document.getElementById("amount").value;
  const interestRate = document.getElementById("interest").value;
  const years = document.getElementById("years").value;

  if (amount === "" || interestRate === "" || years === "") {
    alert("Please fill in all the fields");
    return;
  }

  const principal = parseFloat(amount);
  const interest = parseFloat(interestRate) / 100 / 12;
  const payments = parseFloat(years) * 12;

  // Calculate monthly payment using the formula
  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);

  if (isFinite(monthly)) {
    document.getElementById("loan-result").innerHTML = `
      <h3>Loan Summary</h3>
      <p>Monthly Payment: $${monthly.toFixed(2)}</p>
      <p>Total Payment: $${(monthly * payments).toFixed(2)}</p>
      <p>Total Interest: $${(monthly * payments - principal).toFixed(2)}</p>
    `;
  } else {
    alert("Please check your numbers");
  }
}

// Mobile Navigation Toggle
function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show-nav");
}
