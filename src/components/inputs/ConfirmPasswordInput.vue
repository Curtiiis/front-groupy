<template>
  <div class="form-group" :class="{ success: !$v.user.password2.$invalid }">
    <input
      :type="showPassword2 ? 'text' : 'password'"
      id="password2"
      name="password2"
      ref="password2"
      :value="password2"
      @input="onInput"
      required
      @keyup="debounce('password2')"
    />
    <label for="password2">Confirmer le mot de passe</label>
    <i
      class="far fa-eye"
      :class="{ blue: showPassword2 }"
      id="eye2"
      @click="$emit('toggle-show-password')"
    ></i>
    <span></span>
    <div class="error" v-if="errors.password2 && $v.user.password2.$error">
      Les deux mots de passe doivent être identiques.
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmPasswordInput",
  props: {
    user: Object,
    $v: Object,
    password2: String,
    showPassword2: Boolean,
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
