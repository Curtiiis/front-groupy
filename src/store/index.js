import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { createStore } from "vuex-extensions";

Vue.use(Vuex);

var store = createStore(Vuex.Store, {
  state: {
    token: "",
    userId: "",
    userPseudo: "",
    userLink: "",
    userEmail: "",
    userPicture: "",
    userPosts: "",
    selectedFile: "",
    imgPreview: "",
    userFollowers: [],
    userDataX: [],
    postDataX: [],
    suggestionsX: [],
    savesX: [],
    allUsersX: [],
    isAdmin: false,
    createModale: false,
    updateModale: false,
    showAccount: false,
    showAdminPanel: false,
    showLoader: false,
    showValidBox: false,
    showSaveBox: false,
    showDeleteBox: false,
    showErrorBox: false,
  },
  getters: {
    tokenGetter: (state) => state.token,
    isAdminGetter: (state) => state.isAdmin,
    userIdGetter: (state) => state.userId,
    followersGetter: (state) => state.userFollowers,
    imgPreviewGetter: (state) => state.imgPreview,
    postDataGetter: (state) => state.postDataX,
    suggestionsGetter: (state) => state.suggestionsX,
    savesGetter: (state) => state.savesX,
    allUsersGetter: (state) => state.allUsersX,
    userDataGetter: (state) => state.userDataX,
    userPictureGetter: (state) => state.userPicture,
    createGetter: (state) => state.createModale,
    updateGetter: (state) => state.updateModale,
    accountGetter: (state) => state.showAccount,
    showAdminPanelGetter: (state) => state.showAdminPanel,
    loaderGetter: (state) => state.showLoader,
    validBoxGetter: (state) => state.showValidBox,
    deleteBoxGetter: (state) => state.showDeleteBox,
    forbiddenBoxGetter: (state) => state.showErrorBox,
    saveBoxGetter: (state) => state.showSaveBox,
    noPostsGetter: (state) => state.noPosts,
    fileGetter: (state) => state.selectedFile,
  },
  mutations: {
    resetState(state) {
      state.token = "";
      state.userId = "";
      state.userPseudo = "";
      state.userLink = "";
      state.userEmail = "";
      state.userPicture = "";
      state.userPosts = "";
      state.selectedFile = "";
      state.imgPreview = "";
      state.userFollowers = [];
      state.userDataX = [];
      state.postDataX = [];
      state.suggestionsX = [];
      state.savesX = [];
      state.allUsersX = [];
      state.isAdmin = false;
      state.createModale = false;
      state.updateModale = false;
      state.showAccount = false;
      state.showAdminPanel = false;
      state.showLoader = false;
      state.showValidBox = false;
      state.showDeleteBox = false;
      state.showErrorBox = false;
      state.showSaveBox = false;
    },
    resetModals(state) {
      state.createModale = false;
      state.updateModale = false;
      state.showAccount = false;
      state.showAdminPanel = false;
      state.showLoader = false;
      state.showValidBox = false;
      state.showDeleteBox = false;
      state.showErrorBox = false;
      state.showSaveBox = false;
    },
  },
  actions: {
    fetchToken(context, token) {
      context.commit("token", token);
    },
  },
  mixins: {
    mutations: {
      changeState: function (state, changed) {
        Object.entries(changed).forEach(([name, value]) => {
          state[name] = value;
        });
      },
    },
  },
  plugins: [createPersistedState()],
});

export default store;
