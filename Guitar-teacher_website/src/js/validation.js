(function () {
	//* Forms
	const questionsForm = document.forms['questions__form'];

	//* Events Handlers
	questionsForm.addEventListener('submit', onSubmitQuestionFromHandler);

	//* Validation Service
	const validationCommonService = {
		checkRequired(value) {
			if (!value) return false;

			value = value.toString().trim();

			if (value === '') return false;

			return true;
		},

		checkTextLengthRange(value, min, max) {
			if (!value) return false;

			value = value.toString().trim();
			const length = value.length;

			if (max && length > max) {
				return false;
			}
			if (min && length < min) {
				return false;
			}
			return true;
		},

		checkPhoneNumber(phoneNumber) {
			const pattern = /^\d+$/;
			phoneNumber = phoneNumber.replace(/\s/g, '');

			if (!pattern.test(phoneNumber)) {
				return false;
			}
			return true;
		},

		resetErrors(inputs, errorTexts) {
			for (const input of inputs) {
				input.classList.remove('error-input');
			}

			for (const errorText of errorTexts) {
				errorText.innerText = '';
			}
		},
	};

	function onSubmitQuestionFromHandler(e) {
		e.preventDefault();

		const usernameInput = this.elements['username'];
		const phoneNrInput = this.elements['phoneNr'];

		const errorUsername = document.getElementById('errorUsername');
		const errorPhoneNr = document.getElementById('errorPhoneNr');

		validationCommonService.resetErrors([usernameInput, phoneNrInput], [errorUsername, errorPhoneNr]);
		const valid = validateQuestionsForm(usernameInput, phoneNrInput, errorUsername, errorPhoneNr);

		if (valid) {
			/**
			 * Send a request to the server
			 */

			questionsForm.reset();
		}
	}

	function validateQuestionsForm(usernameInput, phoneNrInput, errorUsername, errorPhoneNr) {
		let valid = true;

		// username
		if (!validationCommonService.checkRequired(usernameInput.value)) {
			generateError(usernameInput, errorUsername, 'The field is required');
			valid = false;
		} else if (!validationCommonService.checkTextLengthRange(usernameInput.value, 2, 50)) {
			generateError(usernameInput, errorUsername, 'The field should contain from 2 to 50 characters');
			valid = false;
		}

		// phone number
		if (!validationCommonService.checkRequired(phoneNrInput.value)) {
			generateError(phoneNrInput, errorPhoneNr, 'The field is required');
			valid = false;
		} else if (!validationCommonService.checkPhoneNumber(phoneNrInput.value)) {
			generateError(phoneNrInput, errorPhoneNr, 'phone number should contain only numbers');
			valid = false;
		}

		return valid;
	}

	function generateError(input, error, errorText) {
		input.classList.add('error-input');
		error.textContent = errorText;
	}
})();
