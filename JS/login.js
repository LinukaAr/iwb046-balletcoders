(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  //Email validation
  const emailInput = document.getElementById("emailInput");
  const emailFeedback = document.getElementById("emailFeedback");

  emailInput.addEventListener("input", function () {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(emailInput.value)) {
      emailFeedback.style.display = "none"; // Hide feedback if valid
      emailInput.setCustomValidity(""); // Clear validation message
    } else {
      emailFeedback.textContent = "Please enter a valid email address"; // Show feedback
      emailFeedback.style.display = "block";
      emailInput.setCustomValidity("Invalid"); // Set custom validity message
    }
  });

  // Get the elements from the DOM (Sign up page)
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm_password");
  var passwordStatus = document.getElementById("password-match-status");
  var sign_upBtn = document.getElementById("sign_up-btn");

  // Event listener for real-time password matching(Sign up page)
  confirmPassword.addEventListener("input", validatePassword);
  password.addEventListener("input", validatePassword);

  function validatePassword() {
    // Check if passwords match(Sign up page)
    if (password.value === confirmPassword.value) {
      passwordStatus.textContent = "Passwords match!";
      passwordStatus.style.color = "green"; // Green color if passwords match
      sign_upBtn.disabled = false; // Enable submit button when passwords match
    } else {
      passwordStatus.textContent = "Passwords do not match";
      passwordStatus.style.color = "red"; // Red color if passwords do not match
      sign_upBtn.disabled = true; // Disable submit button if passwords don't match
    }
  }
})(jQuery);
