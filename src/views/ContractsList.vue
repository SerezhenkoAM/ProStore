<template>
  <div class="home">
    <h2>Список отгрузки товара</h2>
    <Contract :data="item" v-for="item in contracts" :key="item.idContract"/>
  </div>
</template>

<script>
import Contract from '../components/Contract'
export default {
  name: 'HomeView',
  components: {
    Contract
  },
  data() {
    return {
      contracts: []
    }
  },
  mounted() {
    fetch('http://localhost:3000/contracts', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({idEmployee: localStorage.getItem("idEmployee")})
            })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.length != 0) {
                this.contracts = result
              }
            })
            .catch(err => console.log(err))
  }
}
</script>
