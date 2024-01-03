<template>
  <section class="hero is-success is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="title is-16 mt-2">
            <p4> Página Inicial </p4>
          </a>
          <span class="navbar-burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item ">
              <router-link  to="/login"> Login </router-link>
    
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
    <div class="container has-text-centered">
      <p class="title is-1">
        Bem vindo ao meu Painel de Usuários !!
      </p>
      <p class="subtitle is-3 mt-3">
        Este painel foi criado com o intuito de aprimorar meus aprendizados na integração do Node.Js com o Vue.Js, onde utilizo API
        para consumir o meu banco de dados.
        Espero que goste, tenha um ótimo dia !!
      </p>
    </div>
  </div>

  
</section>
  
  
 
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
   
  }
}
</script>
