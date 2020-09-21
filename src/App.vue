<template>
  <div id="app">
    <div class="header">

    </div>
    <div class="main">
      <router-view/>
    </div>
    <!--<div class="panel-background">
      <div class="close-button">
        <img class="close-button__icon" src="@/assets/close.svg" alt=""/>
      </div>
      <div class="panel">
        <router-view name="panel"/>
      </div>
    </div>
    -->
  </div>
</template>

<style lang="scss">
@import "normalize";

html, body, #app { height:100%; }
html {
  background-color: #F9F9F9;
}
.header {
  height: 100px;
  width: 100%;
  background-color: #091C28;
}
.main {
  padding: 30px;
  height: 100%;
  margin: 0 10%;
  background-color: #FFFFFF;
}
.panel-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.panel {
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 100%;
  background-color: #3399FF;
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;

  &__icon {
    height: 50px;
  }
}
</style>
