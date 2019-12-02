/**
 * Initialize Mollie Components instance
 */
const mollie = Mollie(
  "pfl_HgMrHhRAFm", // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
  {
    locale: "en_US" // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
  }
);


/**
 * Get elements
 */
const form = document.getElementById("mcForm");
const formError = document.getElementById("form-error");
const submitButton = document.getElementById("submit-button");

/**
 * Create card holder input
 */
const cardHolder = mollie.createComponent("cardHolder");
cardHolder.mount("#card-holder");

const cardHolderError = document.getElementById("card-holder-error");

cardHolder.addEventListener("change", event => {
  if (event.error && event.touched) {
    cardHolderError.textContent = event.error;
  } else {
    cardHolderError.textContent = "";
  }
});

/**
 * Create card number input
 */
const cardNumber = mollie.createComponent("cardNumber");
cardNumber.mount("#card-number");

const cardNumberError = document.getElementById("card-number-error");

cardNumber.addEventListener("change", event => {
  if (event.error && event.touched) {
    cardNumberError.textContent = event.error;
  } else {
    cardNumberError.textContent = "";
  }
});

/**
 * Create expiry date input
 */
const expiryDate = mollie.createComponent("expiryDate");
expiryDate.mount("#expiry-date");

const expiryDateError = document.getElementById("expiry-date-error");

expiryDate.addEventListener("change", event => {
  if (event.error && event.touched) {
    expiryDateError.textContent = event.error;
  } else {
    expiryDateError.textContent = "";
  }
});

/**
 * Create verification code input
 */
const verificationCode = mollie.createComponent("verificationCode");
verificationCode.mount("#verification-code");

const verificationCodeError = document.getElementById("verification-code-error");

verificationCode.addEventListener("change", event => {
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
form.addEventListener("submit", async event => {
  event.preventDefault();
  disableForm();

  // Reset possible form error
  formError.textContent = "";

  // Get a payment token
  const { token, error } = await mollie.createToken();

  if (error) {
    enableForm();
    formError.textContent = error.message;
    return;
  }

  // Add token to the form
  const tokenInput = document.createElement("input");
  tokenInput.setAttribute("name", "token");
  tokenInput.setAttribute("type", "hidden");
  tokenInput.setAttribute("value", token);

  form.appendChild(tokenInput);

  // Re-submit form to the server
  form.submit();
});
