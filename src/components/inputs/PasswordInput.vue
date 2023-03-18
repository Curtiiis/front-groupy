<template>
  <div
    class="form-group"
    :class="{
      success: !$v.user.password1.$invalid,
      shake: displayErrorPassword,
    }"
  >
    <input
      :type="showPassword1 ? 'text' : 'password'"
      id="password1"
      ref="password1"
      name="password1"
      :value="password1"
      @input="onInput"
      required
      @keyup="debounce('password1')"
    />
    <label for="password1">Mot de passe</label>
    <i
      class="far fa-eye"
      :class="{ blue: showPassword1 }"
      id="eye1"
      @click="$emit('toggle-show-password')"
    ></i>
    <span></span>
    <div class="error" v-if="errors.password1 && $v.user.password1.$error">
      Le mot de passe doit contenir 8 caractères : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère
      spécial.
    </div>
    <div class="error">
      {{ errorPassword }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: {
    user: Object,
    $v: Object,
    password1: String,
    showPassword1: Boolean,
    value: { type: String, default: "" },
    validation: { type: Object, required: true },
    errors: { type: Object, required: true },
    displayErrorPassword: {
      type: Boolean,
      default: false,
    },
    errorPassword: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
