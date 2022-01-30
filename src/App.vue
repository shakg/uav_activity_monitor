<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center text-center">
        <v-span class="text-center">
          TİTRA UAV ACTIVITY MONITOR
        </v-span>

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
