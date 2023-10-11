/**
 * Initialize Mollie Components instance
 */
 var mollie = Mollie(
    "pfl_HgMrHhRAFm", // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
    {
      locale: "en_US", // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
      testmode: false // Set to true to enable test mode.
    }
  );
  
  var options = {
    styles: {
      base: {
        color: 'rgba(0, 0, 0, 0.8)',
      }
    }
  }

  /**
   * Get elements
   */
  var form = document.getElementById("mcForm");
  var formError = document.getElementById("form-error");
  var submitButton = document.getElementById("submit-button");
  
  /**
   * Create unified card form component
   */
  const cardComponent = mollie.createComponent('card');
  cardComponent.mount('.form-fields');

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
  