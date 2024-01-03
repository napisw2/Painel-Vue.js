<template>
    <section class="hero is-success is-fullheight">
  <!-- Hero head: will stick at the top -->
    <div class="hero-head">
        <header class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <a class="title is-16 mt-2">
                        <p4 > <router-link  to="/"> Página Inicial </router-link>  </p4>
                    </a>
                </div>
                <div id="navbarMenuHeroC" class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item">
                        <router-link  to="/login"> Login </router-link>
                    </a>
                    <a class="navbar-item is-active">
                         Cadastro
                    </a>
                    <a class="navbar-item">
                        <router-link  to="/admin/users"> Users </router-link>
                    </a>
                    <RouterView/>
                </div>
                </div>
            </div>
        </header>
    </div>

  <!-- Hero content: will be in the middle -->
    <div class="hero-body  ">
        <div class="container has-text-centered has-background-white">
            <div>
                <h3 class=" has-background-link-dark py-2 is-size-4"> Registro de Usuário! </h3>
                <hr>
                <div class="columns is-centered">
                    <div class="column is-half ">
                        <div v-if="error != undefined"> <!--se err for diferente de undefined que a div é usada-->
                            <div class="notification is-danger">
                                {{ error }}
                            </div>
                        </div>
                        <p>Nome</p>
                        <input type="text" placeholder="Nome do Usuario" class="input my-2 is-size-4" v-model="name">
                        <p>Email</p>
                        <input type="email" placeholder="E-mail" class="input my-2 is-size-4" v-model="email">
                        <p>Senha</p>
                        <input type="password" placeholder="******" class="input my-2 is-size-4" v-model="password">
                        <hr>
                        <button class="button is-success mb-4 is-size-4" @click="register">Cadastrar</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>

</section>



    
</template>

<script>
import axios from 'axios';
export default {

    data() { //dados no data ficam reativos
        return {
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:8686/user", {
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res => {
                this.$router.push({ name: 'home' });
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


<style scoped></style>
