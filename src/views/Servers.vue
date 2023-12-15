<template>
  <main class="px-4 my-4">
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-4 gap-3">
        <div>
          <div class="flex lg:flex-col gap-1 bg-black text-white border border-[#272727] rounded-2xl p-3">
            <div class="w-full bg-[#272727] text-center rounded p-2">
              <p>{{ fetched.server_count }}</p>
              <p class="text-sm">Servers Online</p>
            </div>
            <div class="w-full bg-[#272727] text-center rounded p-2">
              <p>{{ fetched.player_count }}</p>
              <p class="text-sm">Players Online</p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-3 overflow-hidden">
          <div class="overflow-auto h-[max(100vh-193px,410px)] lg:h-[max(100vh-95px,410px)] bg-[#272727] p-2 rounded-2xl shadow-xl w-full">
            <table class="w-full table-auto bg-[#272727] text-white">
              <thead>
                <tr class="opacity-50 border-[4px] border-[#272727]">
                  <th class="text-start px-6">Name</th>
                  <th class="text-start px-6">Website</th>
                  <th class="text-start px-6">Version</th>
                  <th class="text-start px-6">Players</th>
                  <th class="text-start px-6">Country</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(val, i) in fetched.servers" :key="i">
                  <td class="py-3 px-6">
                    <div>
                      <p>{{ val.name }}</p>
                      <p class="text-sm text-gray-300">{{ val.address }}:{{ val.port }}</p>
                    </div>
                  </td>
                  <td class="px-6">{{ val.website }}</td>
                  <td class="px-6">{{ val.version }}</td>
                  <td class="px-6">{{ val.players }} <span class="text-sm opacity-75">/ {{ val.maxPlayers }}</span></td>
                  <td class="px-6">{{ val.country }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    fetched: {
      player_count: 0,
      server_count: 0,
      servers: []
    },
    fetchInterval: null,
  }),
  async mounted() {
    await this.fetchData();
    this.fetchInterval = setInterval(async () => await this.fetchData(), 5000);
  },
  beforeUnmount() {
    if (this.fetchInterval !== null) {
      clearInterval(this.fetchInterval);
      this.fetchInterval = null;
    }
  },
  methods: {
    async fetchData() {
      await fetch('https://masterserver.ragecoop.com/all')
        .then(res => res.json())
        .then(res => this.fetched = res)
        .catch(err => console.error(err));
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #212121;
      }
    }
  }
}
</style>