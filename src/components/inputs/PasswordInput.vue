<template>
  <div
    class="form-group"
    :class="{
      success: !$v.user.password1.$invalid,
      shake: showPasswordError,
    }"
  >
    <input
      :type="showPassword1 ? 'text' : 'password'"
      id="password1"
      ref="password1"
      name="password1"
      :value="password1"
      @input="(e) => $emit('input', e.target.value)"
      required
      @keyup="debounce('password1')"
    />
    <label for="password1">Mot de passe</label>
    <i
      class="far fa-eye"
      :class="{ blue: showPassword1 }"
      id="eye1"
      @click="$emit('show-password')"
    ></i>
    <span></span>
    <div class="error" v-if="errors.password1 && $v.user.password1.$error">
      Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre,
      1 caractère spécial.
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
    showPasswordError: {
      type: Boolean,
      default: false,
    },
    errorPassword: {
      type: String,
      default: "",
    },
  },
};
</script>
