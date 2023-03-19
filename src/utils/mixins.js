import _ from "lodash";

export default {
  methods: {
    setAuthorization() {
      return {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
    },

    debounce: _.debounce(function (inputName) {
      const { $v, $refs, errors } = this;
      errors[inputName] = $v.user[inputName].$error;

      const inputElement = $refs[inputName]?.parentElement;

      if (inputElement && errors[inputName]) {
        inputElement.classList.add("shake");
        setTimeout(() => inputElement.classList.remove("shake"), 500);
      }
    }, 700),

    isFormValid() {
      this.$v.$touch();
      this.isButtonDisabled = this.$v.$invalid;
      // this.$refs.submitBtn.disabled = this.$v.$invalid ? true : false;
    },

    handleError(fieldName, showError, newValue, timeout = 3000) {
      this[fieldName] = newValue;
      this[showError] = true;
      setTimeout(() => {
        this[fieldName] = "";
        this[showError] = false;
      }, timeout);
    },
  },
};
