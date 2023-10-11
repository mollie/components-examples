/**
 * Initialize Mollie Components instance
 */
var mollie = Mollie(
  "pfl_HgMrHhRAFm", // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
  {
    locale: "en_US", // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
    testmode: false, // Set to true to enable test mode.
  }
);

var options = {
  styles: {
    base: {
      color: "rgba(0, 0, 0, 0.8)",
    },
  },
};

/**
 * Get elements
 */
var form = document.getElementById("mcForm");
var formError = document.getElementById("form-error");
var submitButton = document.getElementById("submit-button");

/**
 * Create card holder input
 */
var cardHolder = mollie.createComponent("cardHolder", options);
cardHolder.mount("#card-holder");

var cardHolderError = document.getElementById("card-holder-error");

cardHolder.addEventListener("change", function (event) {
  if (event.error && event.touched) {
    cardHolderError.textContent = event.error;
  } else {
    cardHolderError.textContent = "";
  }
});

/**
 * Create card number input
 */
var cardNumber = mollie.createComponent("cardNumber", options);
cardNumber.mount("#card-number");

var cardNumberError = document.getElementById("card-number-error");

cardNumber.addEventListener("change", function (event) {
  if (event.error && event.touched) {
    cardNumberError.textContent = event.error;
  } else {
    cardNumberError.textContent = "";
  }
});

/**
 * Create expiry date input
 */
var expiryDate = mollie.createComponent("expiryDate", options);
expiryDate.mount("#expiry-date");

var expiryDateError = document.getElementById("expiry-date-error");

expiryDate.addEventListener("change", function (event) {
  if (event.error && event.touched) {
    expiryDateError.textContent = event.error;
  } else {
    expiryDateError.textContent = "";
  }
});

/**
 * Create verification code input
 */
var verificationCode = mollie.createComponent("verificationCode", options);
verificationCode.mount("#verification-code");

var verificationCodeError = document.getElementById("verification-code-error");

verificationCode.addEventListener("change", function (event) {
  if (event.error && event.touched) {
    verificationCodeError.textContent = event.error;
  } else {
    verificationCodeError.textContent = "";
  }
});

/**
 * Disables the form inputs and submit button
 */
function disableForm() {
  submitButton.disabled = true;
}

/**
 * Enables the form inputs and submit button
 */
function enableForm() {
  submitButton.disabled = false;
}

/**
 * Submit handler
 */
form.addEventListener("submit", function (event) {
  event.preventDefault();
  disableForm();

  // Reset possible form error
  formError.textContent = "";

  // Get a payment token

  mollie.createToken().then(function (result) {
    var token = result.token;
    var error = result.error;

    formError.classList.remove("has-error");

    if (error) {
      enableForm();
      formError.textContent = error.message;
      formError.classList.add("has-error");
      return;
    }

    // Add token to the form
    var tokenInput = document.createElement("input");
    tokenInput.setAttribute("name", "token");
    tokenInput.setAttribute("type", "hidden");
    tokenInput.setAttribute("value", token);

    form.appendChild(tokenInput);

    // Re-submit form to the server
    form.submit();
  });
});
