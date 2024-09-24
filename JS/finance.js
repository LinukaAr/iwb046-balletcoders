function calculateLoan() {
  const amount = document.getElementById("amount").value;
  const interest = document.getElementById("interest").value;
  const years = document.getElementById("years").value;

  if (amount === "" || interest === "" || years === "") {
    document.getElementById("loan-result").innerHTML =
      "Please fill in all fields.";
    return;
  }

  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Monthly Payment Calculation
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    document.getElementById(
      "loan-result"
    ).innerHTML = `Your Monthly Payment: Rs.${monthly.toFixed(2)}`;
  } else {
    document.getElementById("loan-result").innerHTML =
      "Please check your numbers.";
  }
}
