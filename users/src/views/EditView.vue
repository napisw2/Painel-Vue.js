<template>
    <div>
        <h2 class="has-text-white-ter has-background-link-dark mt-4"> Edição de Usuário</h2>
        <hr>

        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined"> <!--se err for diferente de undefined que a div é usada-->
                    <div class="notification is-danger">
                        {{ error }}
                    </div>
                </div>
                <p>Nome</p>
                <input type="text" placeholder="Nome do Usuario" class="input" v-model="name">
                <p>Email</p>
                <input type="email" placeholder="Email" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-success" @click="update">Editar</button>
            </div>
        </div>
        
    </div>
</template>

<script> 
import axios from 'axios';
export default {

    created(){

        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/user/" + this.$route.params.id , req).then(res =>{
       
            this.name = res.data.name;
            this.email = res.data.email;
            this.id = res.data.id;
        }).catch(err => {
            console.log(err.response)
            this.$router.push({name: 'Users'});
        })
    },  
    data(){ //dados no data ficam reativos
        return {
            name: '',
            email: '',
            id: -1,
            error: undefined
        }
    },
    methods:{
        update(){
            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
            axios.put("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                id: this.id
            },req).then(res => {
                this.$router.push({name:'Users'});
                console.log(res);
            }).catch(err => {

                var msgErro = err.response.data.err //capturando a mensagem de erro que mostramos na API
                this.error = msgErro;
                console.log(msgErro);

            });
        }          
    }
}
</script>


<style scoped>
</style>
