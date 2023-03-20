<template>
  <div class="super-container">
    <ValidBox :validBox="showValidBox" />
    <div class="auth__container">
      <TitleLogo :authType="login" />
      <div class="errorLogin" v-show="showErrorLogin">
        <p ref="messageDisableAccount">{{ errorMessage }}</p>
      </div>
      <form id="form" method="post" @submit.prevent="submitLoginForm" @keyup="isFormValid">
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

        <SubmitButton
          buttonName="connexion"
          buttonLabel="Se connecter"
          :disabled="isButtonDisabled"
        />
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
import PasswordInput from "../components/inputs/PasswordInput.vue";
import SubmitButton from "../components/buttons/SubmitButton.vue";

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
    PasswordInput,
    SubmitButton,
  },
  data() {
    return {
      login: "Connexion",
      showPassword1: false,
      showPasswordError: false,
      displayError: false,
      showEmailError: false,
      showErrorLogin: false,
      errorMessage: "",
      errorPassword: "",
      email: "",
      errorEmail: "",
      isButtonDisabled: true,
      user: {
        email: "",
        password1: "",
      },
      errors: {
        email: false,
        password1: false,
      },
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password1: {
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
    async submitLoginForm() {
      if (this.$v.$invalid) return;

      try {
        const response = await http.post("auth/login", {
          email: this.$v.user.email.$model,
          password: this.$v.user.password1.$model,
        });

        const { token, userId, isAdmin } = response.data;
        localStorage.setItem("token", token);
        utils.commitToken(token);
        utils.commitUserId(userId);
        utils.commitIsAdmin(isAdmin);

        utils.showValidBox(true);
        utils.redirectDelay("/home", 500);
      } catch (error) {
        if (error.response.status === 400) {
          this.errorMessage = "Pseudo/email invalide";
        }
        if (error.response.status === 401) {
          this.errorMessage = "Ce compte a été désactivé.";
        }
        this.showErrorLogin = true;
      }
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
    errorEmail(newValue) {
      this.handleError("errorEmail", "showEmailError", newValue);
    },
    errorPassword(newValue) {
      this.handleError("errorPassword", "showPasswordError", newValue);
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
