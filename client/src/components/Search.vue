<template>
  <div class="main-form">
    <!-- <Card shadow style="flex: 1;"> -->
      <Form :model="formItem" label-position="top" :label-width="0" style="flex: 1;">
        <FormItem>
          <AutoComplete
              v-model="formItem.source"
              size="large"
              :data="routes"
              class="extra-large"
              placeholder="From where are you leaving?"
              style="width:300px"></AutoComplete>
        </FormItem>
        <FormItem>
          <AutoComplete
              v-model="formItem.destination"
              size="large"
              class="extra-large"
              :data="routes"
              placeholder="To where are you going?"
              style="width:300px"></AutoComplete>
        </FormItem>
      </Form>
    <!-- </Card> -->
    <Button style="height: 64px; font-weight: 700; font-size: 1.8em;" class="footer" type="primary" @click="handleSubmit()">Go</Button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formItem: {
        source: '',
        destination: ''
      },
      routes: ['Ramallah', 'Nablus', 'Jenin', 'Bethlahem', 'Hebron', 'Gaza', 'Salfit']
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push({path: 'schedule', query: { source: this.formItem.source, dest: this.formItem.destination }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.extra-large input {
  height: 65px !important;
  text-align: center;
}
.extra-large input::-webkit-input-placeholder {
  color: #898989;
}
</style>
<style scoped>
.main-form {
  padding: 10px;
  display: flex;
  align-items: center;
  height: 100vh;
  margin-top: -50px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 90%;
  left: 5%;
  margin-bottom: 10px;
}
</style>