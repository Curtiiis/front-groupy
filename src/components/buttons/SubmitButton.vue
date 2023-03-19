<template>
  <button type="submit" class="gradientBtn" id="submit-btn" :name="buttonName" :disabled="disabled">
    {{ buttonLabel }}
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: ["buttonLabel", "buttonName", "disabled"],
};
</script>

<style lang="scss" scoped>
@import "../../scss/utils/_variables.scss";
.gradientBtn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  color: $white;
  background: $bg-shade2;
  border: none;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover {
    background: $bg-shade2;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  }
}
</style>
