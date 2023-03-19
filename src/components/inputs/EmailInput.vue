<template>
  <div
    class="form-group"
    :class="{
      success: !$v.user.email.$invalid,
      shake: showEmailError,
    }"
  >
    <input
      :type="email"
      id="email"
      ref="email"
      name="email"
      :value="value"
      @input="(e) => $emit('input', e.target.value)"
      @keyup="debounce('email')"
      required
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
    showEmailError: Boolean,
    errorEmail: String,
    value: { type: String, default: "" },
    validation: { type: Object, required: true },
    errors: { type: Object, required: true },
  },
};
</script>
