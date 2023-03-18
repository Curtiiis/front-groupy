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
      this.$refs.submitBtn.disabled = !this.$v.$invalid ? false : true;
    },
  },
};
