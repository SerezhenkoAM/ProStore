<template>
    <div class="login">
        <h1>Вход в ProStore</h1>
        <input type="text" v-model="login">
        <input type="password" v-model="password">
        <button @click="auth">Войти</button>
    </div>
</template>
<script>
export default {
    name: 'LoginView',
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        auth() {
            let data = {
                login: this.login,
                password: this.password
            }
            fetch('http://localhost:3000/auth', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.auth != false) {
                    localStorage.setItem("idEmployee", result.idEmployee);
                    this.$router.push('/contracts')
                }
            })
            .catch(err => console.debug(err))
        }
    }
}
</script>
<style scoped lang='less'>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    input:nth-child(3) {
        margin: 1rem 0;
    }
}
</style>