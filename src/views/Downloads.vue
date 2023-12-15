<template>
  <main class="px-4 my-4">
    <section class="w-full container mx-auto text-white">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 class="text-4xl mb-2">Nightly build</h1>
          <div class="w-full bg-black border border-[#272727] rounded-xl overflow-hidden">
            <div class="h-[160px] xl:h-[320px] relative nightly-bg">
              <div class="h-full w-full absolute bg-[linear-gradient(1turn,#000,rgba(9,9,9,.3))]"></div>
              <div class="h-full w-full absolute flex justify-center items-center hover:backdrop-blur-sm opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
                <p>This version is a nightly build and only for testing new features!</p>
              </div>
            </div>
            <div class="p-3">
              <div v-if="nightlyRelease !== null">
                <h1 class="text-2xl">{{ nightlyRelease.name }}</h1>
                <p class="text-gray-200">{{ new Date(nightlyRelease.published_at).toDateString() }}</p>
                <div class="grid">
                  <a v-for="(val, i) in nightlyRelease.assets" :key="i" class="inline-block font-semibold text-yellow-500 hover:text-black uppercase hover:bg-yellow-500 border-2 border-yellow-500 rounded-lg px-4 py-2 mt-2 transition duration-300" :href="val.browser_download_url">
                    {{ val.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-4xl mb-2">Latest releases</h1>
          <div v-if="latestReleases !== null" class="grid gap-y-2">
            <div v-for="(val, i) in latestReleases" :key="i" class="bg-black border border-[#272727] rounded-xl p-4">
              <h1 class="text-2xl">{{ val.name }}</h1>
              <p class="text-gray-200">{{ new Date(val.published_at).toDateString() }}</p>
              <div class="grid">
                <a v-for="(download, i) in val.assets" :key="i" class="inline-block font-semibold text-yellow-500 hover:text-black uppercase hover:bg-yellow-500 border-2 border-yellow-500 rounded-lg px-4 py-2 mt-2 transition duration-300" :href="download.browser_download_url">
                  {{ download.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({
    latestReleases: null,
    nightlyRelease: null,
  }),
  async mounted() {
    // Fetch the latest release
    const localReleases = localStorage.getItem('latestReleases');
    if (localReleases === null) {
      await fetch('https://api.github.com/repos/RAGECOOP/RAGECOOP-V/releases?page=1&per_page=5')
        .then(res => res.json())
        .then(res => {
          this.latestReleases = res;
          localStorage.setItem('latestReleases', JSON.stringify(res));
          console.log("DOWNLOAD");
        })
        .catch(err => console.error(err));
    } else {
      this.latestReleases = JSON.parse(localReleases);
    }
    
    // Fetch the latest nightly build
    const localNightly = localStorage.getItem('localNightly');
    if (localNightly === null) {
      await fetch('https://api.github.com/repos/RAGECOOP/RAGECOOP-V/releases/70603992')
        .then(res => res.json())
        .then(res => {
          this.nightlyRelease = res;
          localStorage.setItem('localNightly', JSON.stringify(res));
        })
        .catch(err => console.error(err));
    } else {
      this.nightlyRelease = JSON.parse(localNightly);
    }
  }
}
</script>

<style lang="scss" scoped>
.nightly-bg {
  background: url(./../assets/nightly.webp) no-repeat 50%/cover;
}
</style>