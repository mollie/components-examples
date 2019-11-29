/**
 * Initialize Mollie Components instance
 */
const mollie = Mollie("pfl_saaa222aaa3", { // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
  locale: "en_US" // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
});

/**
 * Error containers
 */
const cardNumberErrors = document.getElementById("card-number-errors");
const cardHolderErrors = document.getElementById("card-holder-errors");
const expiryDateErrors = document.getElementById("expiry-date-errors");
const verificationCodeErrors = document.getElementById("verification-code-errors");
const formErrors = document.getElementById("form-errors");

/**
 * Get elements
 */
const form = document.getElementById("mcForm");
const submitButton = document.getElementById("submit-button");

/**
 * Create card holder input
 */
const cardHolder = mollie.createComponent("cardHolder");
cardHolder.mount("#card-holder");

cardHolder.addEventListener("change", event => {
  if (event.error && event.touched) {
    cardHolderErrors.textContent = event.error;
  } else {
    cardHolderErrors.textContent = "";
  }
});

/**
 * Create card number input
 */
const cardNumber = mollie.createComponent("cardNumber");
cardNumber.mount("#card-number");

cardNumber.addEventListener("change", event => {
  if (event.error && event.touched) {
    cardNumberErrors.textContent = event.error;
  } else {
    cardNumberErrors.textContent = "";
  }
});

/**
 * Create expiry date input
 */
const expiryDate = mollie.createComponent("expiryDate");
expiryDate.mount("#expiry-date");

expiryDate.addEventListener("change", event => {
  if (event.error && event.touched) {
    expiryDateErrors.textContent = event.error;
  } else {
    expiryDateErrors.textContent = "";
  }
});

/**
 * Create verification code input
 */
const verificationCode = mollie.createComponent("verificationCode");
verificationCode.mount("#verification-code");

verificationCode.addEventListener("change", event => {
  if (event.error && event.touched) {
    verificationCodeErrors.textContent = event.error;
  } else {
    verificationCodeErrors.textContent = "";
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

  // Reset possible form errors
  formErrors.textContent = "";

  // Get a payment token
  const { token, error } = await mollie.createToken();

  if (error) {
    enableForm();
    formErrors.textContent = error.message;
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


/**
 * For the floating labels to work we need some extra event listeners
 * to set proper classes on the form-group elements: `has-focus` and `is-dirty`
 */

function toggleFieldDirtyClass(fieldName, { dirty }) {
  const element = document.getElementById(fieldName);
  element.parentNode.classList.toggle('is-dirty', dirty);
}

function toggleFieldFocusClass(fieldName, hasFocus) {
  const element = document.getElementById(fieldName);
  element.parentNode.classList.toggle('has-focus', hasFocus);
}

cardHolder.addEventListener("change", event => toggleFieldDirtyClass('card-holder', event));
cardHolder.addEventListener("focus", () => toggleFieldFocusClass('card-holder', true));
cardHolder.addEventListener("blur", () => toggleFieldFocusClass('card-holder', false));

cardNumber.addEventListener("change", event => toggleFieldDirtyClass('card-number', event));
cardNumber.addEventListener("focus", () => toggleFieldFocusClass('card-number', true));
cardNumber.addEventListener("blur", () => toggleFieldFocusClass('card-number', false));

expiryDate.addEventListener("change", event => toggleFieldDirtyClass('expiry-date', event));
expiryDate.addEventListener("focus", () => toggleFieldFocusClass('expiry-date', true));
expiryDate.addEventListener("blur", () => toggleFieldFocusClass('expiry-date', false));

verificationCode.addEventListener("change", event => toggleFieldDirtyClass('verification-code', event));
verificationCode.addEventListener("focus", () => toggleFieldFocusClass('verification-code', true));
verificationCode.addEventListener("blur", () => toggleFieldFocusClass('verification-code', false));
