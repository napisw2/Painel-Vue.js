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
            <a class="navbar-item is-active">
                Login 
            </a>
            <a class="navbar-item">
                <router-link  to="/register"> Cadastro </router-link>
            </a>
            <a class="navbar-item">
                <router-link  to="/admin/users"> Users </router-link>
            </a>
            
          </div>
        </div>
      </div>
    </header>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered has-background-white ">
        <h2 class=" has-background-link-dark  py-3 is-size-4 "> Login !</h2>
            <hr >
            <div class="columns is-centered py-4">
                <div class="column mx-5">
                     <div v-if="error != undefined"> <!--se err for diferente de undefined que a div é usada -->
                         <div class="notification is-danger">
                            {{ error }}
                        </div>
                    </div>
                    <p>Email</p>
                    <input type="email" placeholder="E-mail" class="input my-2 is-size-4" v-model="email">
                    <p>Senha</p>
                    <input type="password" placeholder="******" class="input my-2 is-size-4" v-model="password">
                    <hr>
                    <button class="button is-success mb-4 is-size-4" @click="login">Logar</button>
                </div>
            </div>
    
    </div>
  </div>

  
</section>
</template>

<script> 
import axios from 'axios';
export default {
    
    data(){ //dados no data ficam reativos
        return {
            password: '',
            email: '',
            error: undefined

        }
    },
    methods: {
        login(){
            axios.post("http://localhost:8686/login",{
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem('token',res.data.token) //localstorage armazena os dados do navegador,entao as informaçoes de requisiçao sao armazenadas lá
                                    //token= nome da variavel que daremos, res.data.token é o valor dessa nova variavel
                this.$router.push({name: 'home'});
            }).catch(err =>{
                var msgErro = err.response.data.err //capturando a mensagem de erro que mostramos na API
                this.error = msgErro;
            });
           console.log("login!");
        }          
    }
}
</script>


<style scoped>
</style>
