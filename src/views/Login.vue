<template>
  <div class="super-container">
    <ValidBox :validBox="showValidBox" />
    <div class="auth__container">
      <TitleLogo :authType="login" />
      <div class="errorLogin" v-show="showErrorLogin">
        <p>Ce compte a été désactivé.</p>
      </div>
      <form id="form" method="post" @submit.prevent="submitLoginForm" @keyup="isFormValid">
        <!-- INPUT - Email -->
        <EmailInput
          :user="user"
          :$v="$v"
          :displayErrorEmail="displayErrorEmail"
          :errorEmail="errorEmail"
          v-model="user.email"
          :validation="$v.user.email"
          :errors="errors"
        />

        <!-- INPUT - Password -->
        <div
          class="form-group"
          :class="{
            success: !$v.user.password.$invalid,
            shake: displayError,
          }"
        >
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            ref="password"
            name="password"
            v-model.trim="$v.user.password.$model"
            required
            @keyup="debounce('password')"
          />
          <label for="password">Mot de passe</label>
          <i
            class="far fa-eye"
            :class="{ blue: showPassword }"
            id="eye1"
            @click="showPassword = !showPassword"
          ></i>
          <span></span>
          <div class="error" v-if="errors.password && $v.user.password.$error">
            Le mot de passe doit contenir 8 caractères : 1 majuscule, 1 minuscule, 1 chiffre, 1
            caractère spécial.
          </div>
          <div class="error">
            {{ errorMessage }}
          </div>
        </div>

        <button
          type="submit"
          class="gradientBtn"
          id="submit-btn"
          ref="submitBtn"
          name="connexion"
          :disabled="submitLoginForm"
        >
          Se connecter
        </button>
      </form>

      <div class="signup_link">
        Vous n'avez pas encore de compte ? <br />
        <router-link to="/signup">Inscrivez-vous</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//IMPORTS
import { mapState, mapGetters } from "vuex";
import TitleLogo from "../components/TitleLogo.vue";
import EmailInput from "../components/inputs/EmailInput.vue";

import http from "../js/http";
import * as utils from "../js/utils";

import { required, minLength, email } from "vuelidate/lib/validators";
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
    EmailInput,
  },
  data() {
    return {
      login: "Connexion",
      displayContainer: true,
      showPassword: false,
      displayError: false,
      displayErrorEmail: false,
      showErrorLogin: false,
      errorMessage: "",
      email: "",
      errorEmail: "",
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: false,
        password: false,
      },
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        hasNumber,
        hasLowercaseLetter,
        hasCapitalcaseLetter,
        hasSpecialCharacter,
      },
    },
  },
  methods: {
    errorAnimation() {
      this.showErrorLogin = true;
      const errorLoginMsg = document.querySelector(".errorLogin p");
      errorLoginMsg.classList.add("shake");

      setTimeout(() => {
        errorLoginMsg.classList.remove("shake");
      }, 500);
      return;
    },

    submitLoginForm() {
      if (this.$v.$invalid) {
        return;
      }
      http
        .post("auth/login", {
          email: this.$v.user.email.$model,
          password: this.$v.user.password.$model,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          utils.commitToken(response.data.token);
          utils.commitUserId(response.data.userId);
          utils.commitIsAdmin(response.data.isAdmin);

          utils.showValidBox(true);
          utils.redirectDelay("/home", 500);
        })
        .catch((error) => {
          const errorTable = [
            {
              name: "Pseudo/email invalide",
              statusCode: 400,
              action: () => (this.errorMessage = "Pseudo/email invalide"),
            },
            {
              name: "Erreur d'authentification",
              statusCode: 401,
              action: () => this.errorAnimation(),
            },
          ];

          const errorEntry = errorTable.find((entry) => entry.statusCode === error.response.status);
          errorEntry.action();
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState({
      token: "token",
      userFollowers: "userFollowers",
      isAdmin: "isAdmin",
      userLink: "userLink",
      userPosts: "userPosts",
      userId: "userId",
      showAccount: "showAccount",
      showLoader: "showLoader",
      showValidBox: "showValidBox",
      noPosts: "noPosts",
      userDataX: "userDataX",
    }),
    ...mapGetters([
      "tokenGetter",
      "userIdGetter",
      "followersGetter",
      "postsGetter",
      "linkGetter",
      "accountGetter",
      "loaderGetter",
      "validBoxGetter",
      "noPostsGetter",
      "isAdminGetter",
      "userDataGetter",
    ]),
  },
  watch: {
    errorMessage(newValue) {
      this.errorMessage = newValue;
      this.displayError = true;
      setTimeout(() => {
        this.displayError = false;
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.errorLogin {
  width: 100%;
  text-align: center;

  & p {
    color: red;
    font-size: 16px;
  }
}
</style>
