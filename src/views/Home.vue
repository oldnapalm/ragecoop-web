<template>
  <main class="mb-6">
    <section class="relative h-[600px] bg-[url(/home-bg.webp)] bg-cover bg-top flex items-center justify-center rounded-t-2xl">
      <div class="z-10 relative text-center px-4">
        <h1 class="font-bold text-white text-4xl uppercase">play offline-online</h1>
        <p class="font-semibold text-gray-200">
          Drive around the interstate with your buddy, enjoy GTAs environment, make own missions and events or just chill in Grove Street with your mates!
        </p>
        <router-link class="inline-block font-semibold text-yellow-500 hover:text-black uppercase hover:bg-yellow-500 border-2 border-yellow-500 rounded-lg px-4 py-2 mt-2 transition duration-300" to="/downloads">download ragecoop</router-link>
      </div>
      <div class="absolute h-full w-full bg-[linear-gradient(transparent,#0e0e0e)]"></div>
    </section>

    <section>
      <div class="container mx-auto grid gap-x-4 gap-y-12 lg:gap-y-16 px-4">
        <div class="grid md:grid-cols-2 gap-x-6 gap-y-2 items-center">
          <div>
            <img class="rounded-2xl" src="./../assets/home-1.jpg" alt="">
          </div>
          <div class="text-white">
            <h1 class="font-bold text-4xl">Play with your friends in story mode!</h1>
            <p>Play with your friends in story mode, drive around with them, use various modifications like LSPDFR together or chill out in the hood with others!</p>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-x-6 gap-y-4 items-center">
          <div class="max-md:row-start-2 text-white">
            <h1 class="font-bold text-4xl">Write your own story!</h1>
            <p>Write your own story with a game mode or modification for GTA5 using our Server/Client/ScriptHookVDotNet API!</p>
            <a class="inline-block font-semibold text-yellow-500 hover:text-black uppercase hover:bg-yellow-500 border-2 border-yellow-500 rounded-lg px-4 py-2 mt-2 transition duration-300" target="_blank" href="https://docs.ragecoop.com/">documentation</a>
          </div>
          <div>
            <img class="rounded-2xl" src="./../assets/home-2.png" alt="">
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="bg-black border-tb text-white px-4 py-12">
        <div class="container mx-auto">
          <div class="grid lg:grid-cols-2 gap-4">
            <div class="text-center lg:text-start">
              <h1 class="text-4xl">Join our discord community!</h1>
              <p class="text-gray-200">Join our community on Discord, get news and report problems, get help with the modification or meet new people to play with!</p>
            </div>
            <div >
              <div class="max-w-[360px] bg-[#272727] rounded max-lg:mx-auto">
                <div class="bg-[#7289da] rounded-t p-4">
                  <p>RAGECOOP</p>
                </div>

                <div class="text-sm p-4">
                  <div class="h-[129px] overflow-auto mb-4">
                    <div v-if="discord !== null" v-for="(val, i) in discord.members" :key="i" class="flex items-center gap-x-2" :style="val.id !== 0 ? { 'margin-top': '0.75rem' } : null">
                      <div class="relative">
                        <div class="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden">
                          <img :src="val.avatar_url" alt="">
                          <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#272727]" :style="val.status === 'online' ? { 'background-color': '#16a34a' } : (val.status === 'dnd' ? { 'background-color': '#9c0016' } : { 'background-color': '#e9b124' })"></div>
                        </div>
                      </div>
                      <div>
                        <p class="font-semibold">{{ val.nick === undefined ? val.username : val.nick }}</p>
                        <p class="text-zinc-400">{{ val.game !== undefined ? val.game.name : null }}</p>
                      </div>
                    </div>
                  </div>
                  <a class="inline-block text-center w-full text-white uppercase font-semibold bg-[#7289da] hover:bg-[#6279cb] px-4 py-2 rounded transition" :href="discord?.instant_invite ?? '#'" target="_blank">Join discord</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container mx-auto px-4">
        <div class="relative h-[300px] md:h-[400px] bg-[url(/home-b-bg.jpg)] bg-cover bg-center flex flex-col items-center justify-center rounded-2xl">
          <div class="z-10 relative">
            <div class="text-center">
              <div class="md:flex gap-x-8 text-white">
                <div class="text-center">
                  <h1 class="font-bold text-2xl md:text-6xl uppercase">{{ fetched.server_count }}</h1>
                  <p class="font-semibold md:text-xl text-gray-200">Servers Online</p>
                </div>
                <div class="text-center">
                  <h1 class="font-bold text-2xl md:text-6xl uppercase">{{ fetched.player_count }}</h1>
                  <p class="font-semibold md:text-xl text-gray-200">Players Online</p>
                </div>
              </div>
              <router-link class="inline-block font-semibold text-yellow-500 hover:text-black uppercase hover:bg-yellow-500 border-2 border-yellow-500 rounded-lg px-4 py-2 mt-2 transition duration-300" to="/servers">server list</router-link>
            </div>
          </div>
          <div class="absolute h-full w-full bg-[linear-gradient(transparent,rgba(9,9,9,.8))] rounded-2xl"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({
    fetched: {
      player_count: 0,
      server_count: 0,
    },
    fetchInterval: null,
    discord: null,
  }),
  async mounted() {
    await this.fetchData();
    this.fetchInterval = setInterval(async () => await this.fetchData(), 3500);
    fetch('https://discordapp.com/api/guilds/920774603570294896/widget.json')
        .then(res => res.json())
        .then(res => this.discord = res)
        .catch(err => console.error(err));
  },
  beforeUnmount() {
    if (this.fetchInterval !== null) {
      clearInterval(this.fetchInterval);
      this.fetchInterval = null;
    }
  },
  methods: {
    async fetchData() {
      await fetch('https://masterserver.ragecoop.com/count')
        .then(res => res.json())
        .then(res => this.fetched = res)
        .catch(err => console.error(err));
    }
  }
}
</script>
