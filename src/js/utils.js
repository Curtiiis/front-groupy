import store from "../store/index";
import router from "../router/index";

export function scrollToTop() {
  window.scrollTo(0, 0);
}

function changeState(item, value) {
  store.commit("changeState", {
    [item]: value,
  });
}
function changeStateDelay(item, value, delay) {
  setTimeout(() => changeState(item, value), delay);
}
function toggleState(item, delay) {
  changeState(item, true);
  setTimeout(() => changeState(item, false), delay);
}

export function showLoader(value, delay) {
  changeStateDelay("showLoader", value, delay);
}
export function showLoaderTimer(delay) {
  toggleState("showLoader", delay);
}
export function showValidBox(value, delay) {
  changeStateDelay("showValidBox", value, delay);
}
export function showValidBoxTimer(delay) {
  toggleState("showValidBox", delay);
}
export function showDeleteBox(value, delay) {
  changeStateDelay("showDeleteBox", value, delay);
}
export function showDeleteBoxTimer(delay) {
  toggleState("showDeleteBox", delay);
}

export function showSaveBox(value, delay) {
  changeStateDelay("showSaveBox", value, delay);
}
export function showSaveBoxTimer(delay) {
  toggleState("showSaveBox", delay);
}

export function showErrorBox(value, delay) {
  changeStateDelay("showErrorBox", value, delay);
}
export function showErrorBoxTimer(delay) {
  toggleState("showErrorBox", delay);
}

export function showCreateModale(value) {
  changeState("createModale", value);
}
export function showUpdateModale(value) {
  changeState("updateModale", value);
  changeState("createModale", value);
}
export function showAccount(value) {
  changeState("showAccount", value);
}
export function showAdminPanel(value) {
  changeState("showAdminPanel", value);
}

// INFOS USER
export function commitToken(value) {
  changeState("token", value);
}
export function commitUserId(value) {
  changeState("userId", value);
}
export function commitUserPseudo(value) {
  changeState("userPseudo", value);
}
export function commitUserPicture(value) {
  changeState("userPicture", value);
}
export function commitUserEmail(value) {
  changeState("userEmail", value);
}
export function commitUserFollowers(value) {
  changeState("userFollowers", value);
}
export function commitUserPosts(value) {
  changeState("userPosts", value);
}
export function commitUserLink(value) {
  changeState("userLink", value);
}
export function commitIsAdmin(value) {
  changeState("isAdmin", value);
}
export function commitUserData(value) {
  changeState("userDataX", value);
}
export function commitAllUsers(value) {
  changeState("allUsersX", value);
}
export function commitPostData(value) {
  changeState("postDataX", value);
}
export function commitSuggestions(value) {
  changeState("suggestionsX", value);
}
export function commitSaves(value) {
  changeState("savesX", value);
}
export function commitSelectedFile(value) {
  changeState("selectedFile", value);
}
export function commitImgPreview(value) {
  changeState("imgPreview", value);
}

// Fonctions globales
export function redirectDelay(value, delay) {
  setTimeout(() => router.push(value), delay);
}
export function redirect(value) {
  router.push(value);
}
export function deleteItem(item) {
  setTimeout(() => item, 500);
  this.showDeleteBoxTimer(700);
}
