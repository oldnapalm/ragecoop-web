<template>
  <nav id="navigation" class="z-30 fixed w-full h-[60px] flex items-center backdrop-blur-md bg-black/80 px-8 lg:px-12">
    <div class="max-lg:absolute max-lg:hidden w-full left-0 z-20 max-lg:top-[60px] max-lg:bg-black/80 p-6 flex-1" :style="opened === true ? { 'display': 'block!important' } : null">
      <ul class="flex max-lg:flex-col gap-x-6 gap-y-2 text-white">
        <li class="relative">
          <router-link class="text-sm max-lg:text-2xl opacity-75 hover:opacity-100 transition" exact to="/">Home</router-link>
        </li>
        <li class="relative">
          <router-link class="text-sm max-lg:text-2xl opacity-75 hover:opacity-100 transition" exact to="/downloads">Downloads</router-link>
        </li>
        <li class="relative">
          <router-link class="text-sm max-lg:text-2xl opacity-75 hover:opacity-100 transition" exact to="/servers">Serverlist</router-link>
        </li>
        <li class="relative">
          <a class="text-sm max-lg:text-2xl opacity-75 hover:opacity-100 transition" target="_blank" href="https://docs.ragecoop.com/">Documentation</a>
        </li>
      </ul>
    </div>

    <div class="flex items-center">
      <img class="h-[36px]" src="/favicon.png" alt="">
    </div>

    <div class="h-full lg:flex-1 ms-auto">
      <div @click="opened = !opened" class="h-full flex items-center max-lg:cursor-pointer">
        <button class="lg:hidden menu"></button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    opened: false,
    lastScrollY: 0,
  }),
  mounted() {
    const navigation = document.getElementById('navigation');

    window.addEventListener('scroll', (e) => {
      const oldScrollY = this.lastScrollY;
      this.lastScrollY = window.scrollY;

      if (window.scrollY > 60) {
        if (navigation.style.border === 'none') {
          navigation.style.border = '1px solid #272727';
        }

        if (window.scrollY > oldScrollY) {
          if (navigation.classList.contains('hide') === false) {
            if (this.opened === true) {
              this.opened = false;
            }
            navigation.classList.add('hide');
          }

          return;
        }
      } else if (navigation.style.border !== 'none') {
        navigation.style.border = 'none';
      }
      
      if (navigation.classList.contains('hide') === true) {
        navigation.classList.remove('hide');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
nav {
  top: 0;
  transition: top .25s ease-in-out;

  &.hide {
    top: -60px;
  }
}

.menu {
  position: relative;
  background: #fff;
  border-radius: 4px;
  height: 2px;
  width: 28px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    background: #fff;
    height: 2px;
    width: 28px;
  }

  &::before {
    top: -8px;
  }

  &::after {
    top: 8px;
  }
}
</style>