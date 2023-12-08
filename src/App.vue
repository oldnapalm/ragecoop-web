<template>
  <Navigation />

  <router-view></router-view>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
main {
  padding-top: 60px;

  section {
    &:not(:first-child) {
      margin-top: 6rem;

      @media only screen and (max-width: 767.98px) {
        margin-top: 4rem;
      }
    }
  }
}

.border-tb {
  border: 1px solid #272727;
}

.router-link-exact-active {
  color: #eab308!important;
  opacity: 100%!important;

  @media only screen and (min-width: 1024px) {
    &::before {
      content: "";
      position: absolute;
      bottom: -18px;
      height: 2px;
      width: 100%;
      background: #eab308;
      pointer-events: none;
    }
  }
}
</style>