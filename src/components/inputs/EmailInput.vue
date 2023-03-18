<template>
  <div
    class="form-group"
    :class="{
      success: !$v.user.email.$invalid,
      shake: displayErrorEmail,
    }"
  >
    <input
      :type="email"
      id="email"
      ref="email"
      name="email"
      :value="value"
      @input="onInput"
      required
      @keyup="debounce('email')"
    />
    <label for="email">Email</label>
    <span></span>
    <div class="error" v-if="errors.email && $v.user.email.$error">L'email n'est pas valide.</div>
    <div class="error">
      {{ errorEmail }}
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  data() {
    return {
      email: "",
    };
  },
  props: {
    user: Object,
    $v: Object,
    displayErrorEmail: Boolean,
    errorEmail: String,
    value: { type: String, default: "" },
    validation: { type: Object, required: true },
    errors: { type: Object, required: true },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
