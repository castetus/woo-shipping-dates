<template>
  <v-app>
    <v-main>
      <ShippingDatesList/>
    </v-main>
  </v-app>
</template>

<script>
import ShippingDatesList from './components/ShippingDatesList';

export default {
  name: 'App',

  components: {
    ShippingDatesList
  },

  data: () => ({
    //
  }),
};
</script>
