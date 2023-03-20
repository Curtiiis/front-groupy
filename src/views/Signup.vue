<template>
  <div class="super-container">
    <div class="valid-box" v-show="displayValidBox">
      <img src="../assets/checked.png" alt="checked logo" />
    </div>
    <div class="auth__container">
      <TitleLogo :authType="signup" />

      <form id="form" method="post" @submit.prevent="submitSignupForm" @keyup="isFormValid">
        <!-- INPUT - Pseudo -->
        <div
          id="form-group-pseudo"
          class="form-group"
          :class="{
            success: !$v.user.pseudo.$invalid,
            shake: showPseudoError,
          }"
        >
          <input
            :type="pseudo"
            id="pseudo"
            ref="pseudo"
            name="pseudo"
            v-model.trim="$v.user.pseudo.$model"
            required
            @keyup="debounce('pseudo')"
          />
          <label for="pseudo">Pseudo</label>
          <span></span>
          <div class="error" v-if="errors.pseudo && !$v.user.pseudo.minLength">
            Le pseudo doit contenir minimum 3 caractères
          </div>
          <div class="error" v-if="errors.pseudo && !$v.user.pseudo.maxLength">
            Le pseudo doit contenir maximum 20 caractères
          </div>
          <div class="error">
            {{ errorPseudo }}
          </div>
        </div>

        <EmailInput
          :user="user"
          :$v="$v"
          :showEmailError="showEmailError"
          :errorEmail="errorEmail"
          v-model="user.email"
          :validation="$v.user.email"
          :errors="errors"
        />
        <PasswordInput
          :user="user"
          :$v="$v"
          :showPasswordError="showPasswordError"
          :errorPassword="errorPassword"
          :password1="user.password1"
          :showPassword1="showPassword1"
          v-model="user.password1"
          :validation="$v.user.password1"
          :errors="errors"
          @show-password="showPassword1 = !showPassword1"
        />

        <ConfirmPasswordInput
          :user="user"
          :$v="$v"
          :password2="user.password2"
          :showPassword2="showPassword2"
          v-model="user.password2"
          :validation="$v.user.password2"
          :errors="errors"
          @show-password="showPassword2 = !showPassword2"
        />

        <SubmitButton
          buttonName="inscription"
          buttonLabel="S'inscrire"
          :disabled="isButtonDisabled"
        />
      </form>

      <p class="cgu">
        En créant un compte, vous acceptez les
        <button id="cgu-button" @click="showModal = !showModal" name="CGU">CGU</button>
      </p>

      <div class="signup_link">
        Vous avez déjà un compte ? <br />
        <router-link to="/login">Connectez-vous</router-link>
      </div>
      <Modale :showModal="showModal" @closed="showModal = false" />
    </div>
  </div>
</template>

<script>
//IMPORTS
import TitleLogo from "../components/TitleLogo.vue";
import EmailInput from "../components/inputs/EmailInput.vue";
import PasswordInput from "../components/inputs/PasswordInput.vue";
import ConfirmPasswordInput from "../components/inputs/ConfirmPasswordInput.vue";
import SubmitButton from "../components/buttons/SubmitButton.vue";
import Modale from "./Modale.vue";

import http from "../js/http";

import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import {
  hasNumber,
  hasLowercaseLetter,
  hasCapitalcaseLetter,
  hasSpecialCharacter,
} from "../validators/password";

//EXPORTS
export default {
  name: "Signup",
  components: {
    TitleLogo,
    Modale,
    EmailInput,
    PasswordInput,
    SubmitButton,
    ConfirmPasswordInput,
  },
  data() {
    return {
      signup: "Inscription",
      showModal: false,
      showPseudoError: false,
      showEmailError: false,
      showPasswordError: false,
      displayValidBox: false,
      errorPseudo: "",
      errorEmail: "",
      errorPassword: "",
      showPassword1: false,
      showPassword2: false,
      pseudo: "",
      email: "",
      isButtonDisabled: true,
      user: {
        pseudo: "",
        email: "",
        password1: "",
        password2: "",
      },
      errors: {
        pseudo: false,
        email: false,
        password1: false,
        password2: false,
      },
    };
  },
  validations: {
    user: {
      pseudo: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },
      email: {
        required,
        email,
        minLength: minLength(8),
      },
      password1: {
        required,
        minLength: minLength(8),
        hasNumber,
        hasLowercaseLetter,
        hasCapitalcaseLetter,
        hasSpecialCharacter,
      },
      password2: {
        required,
        minLength: minLength(8),
        hasNumber,
        hasLowercaseLetter,
        hasCapitalcaseLetter,
        hasSpecialCharacter,
        sameAsPassword: sameAs("password1"),
      },
    },
  },
  methods: {
    async submitSignupForm() {
      try {
        this.$v.$touch();

        const pseudo = this.$v.user.pseudo.$model;
        const email = this.$v.user.email.$model;
        const password = this.$v.user.password1.$model;

        if (!this.$v.$invalid) {
          await http.post("auth/signup", { pseudo, email, password });
          this.displayValidBox = true;
          setTimeout(() => this.$router.push("/login"), 1000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorEmail = "Ce pseudo/email est déjà pris.";
          return;
        }
        if (error.response && error.response.status === 500) {
          this.errorEmail = "Impossible d'envoyer votre demande (erreur serveur)";
          return;
        }
        throw error;
      }
    },
  },
  watch: {
    errorPseudo(newValue) {
      this.handleError("errorPseudo", "showPseudoError", newValue);
    },
    errorEmail(newValue) {
      this.handleError("errorEmail", "showEmailError", newValue);
    },
    errorPassword(newValue) {
      this.handleError("errorPassword", "showPasswordError", newValue);
    },
  },
};
</script>

<style scoped lang="scss"></style>
