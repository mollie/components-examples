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
      fontSize: "18px",
      color: "#162941",
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
  toggleFieldClass({ elementId: "card-holder", toggleClassesObject: event });

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
  toggleFieldClass({ elementId: "card-number", toggleClassesObject: event });

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
  toggleFieldClass({ elementId: "expiry-date", toggleClassesObject: event });

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
  toggleFieldClass({
    elementId: "verification-code",
    toggleClassesObject: event,
  });

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

    if (error) {
      enableForm();
      formError.textContent = error.message;
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
// Extra styling listeners for floating labels
function toggleFocusFieldClass({ elementId, className, toggleSwitch }) {
  var element = document.getElementById(elementId);

  if (toggleSwitch) {
    element.parentNode.classList.add(className);
  } else {
    element.parentNode.classList.remove(className);
  }
}

function toggleFieldClass({ elementId, toggleClassesObject }) {
  var element = document.getElementById(elementId);

  Object.keys(toggleClassesObject).forEach(function (key) {
    if (typeof toggleClassesObject[key] !== "boolean") {
      return;
    }

    if (toggleClassesObject[key]) {
      element.parentNode.classList.add("is-" + key);
    } else {
      element.parentNode.classList.remove("is-" + key);
    }
  });
}

// Some extra listeners for styling purposes
cardNumber.addEventListener("focus", () =>
  toggleFieldClass({
    elementId: "card-number",
    toggleClassesObject: { focussed: true },
  })
);

cardNumber.addEventListener("blur", () =>
  toggleFieldClass({
    elementId: "card-number",
    toggleClassesObject: { focussed: false },
  })
);

cardHolder.addEventListener("focus", () =>
  toggleFieldClass({
    elementId: "card-holder",
    toggleClassesObject: { focussed: true },
  })
);

cardHolder.addEventListener("blur", () =>
  toggleFieldClass({
    elementId: "card-holder",
    toggleClassesObject: { focussed: false },
  })
);

expiryDate.addEventListener("focus", () =>
  toggleFieldClass({
    elementId: "expiry-date",
    toggleClassesObject: { focussed: true },
  })
);
expiryDate.addEventListener("blur", () =>
  toggleFieldClass({
    elementId: "expiry-date",
    toggleClassesObject: { focussed: false },
  })
);
verificationCode.addEventListener("focus", () =>
  toggleFieldClass({
    elementId: "verification-code",
    toggleClassesObject: { focussed: true },
  })
);

verificationCode.addEventListener("blur", () =>
  toggleFieldClass({
    elementId: "verification-code",
    toggleClassesObject: { focussed: false },
  })
);
