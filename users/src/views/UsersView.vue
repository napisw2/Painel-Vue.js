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
                        <router-link  to="/login"> Logar em um novo usuário </router-link>
                    </a>
                    <a class="navbar-item">
                        <router-link  to="/register"> Cadastro </router-link>
                    </a>
                    <a class="navbar-item is-active">
                        Users
                    </a>
                   
                </div>
                </div>
            </div>
        </header>
    </div>

  <!-- Hero content: will be in the middle -->
    <div class="hero-body ">
        <div class="container has-text-centered ">
            <h2 class=" has-background-link-dark py-3 mt-4 is-size-4"> PAINEL ADMINISTRATIVO</h2>
            
            <table class="table is-fullwidth is-size-4">
            <thead>
                <tr>
                <th align='center'>Nome</th>
                <th align='center'>E-mail</th>
                <th align='center'>Cargo</th>
                <th align='center'>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td v-if=" user.role != 1 ">Usuário Comum</td>
                    <td v-if=" user.role == 1 " >Admin</td>
                    <td>
                        <router-link :to="{name: 'UserEdit', params:{id: user.id}}"><button class="button is-success">Editar</button></router-link> | 
                        <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button>
                    </td>
                </tr>
            </tbody>
            </table>
                <div :class="{modal: true, 'is-active': showModal}">
                    <div class="modal-background"></div>
                        <div class="modal-content">
                            <div class="card">
                                <header class="card-header"> 
                                    <p class="card-header-title">
                                        Você realmente deseja deletar este usuário?
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <p>O usuário não poderá mais ser consultado</p>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                                    <a href="#" class="card-footer-item" @click="deleteUser(deleteUserId)">Sim, quero deletar</a>
                                </footer>
                            </div>
                        </div>
                    <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
                </div>
        </div>
    </div>
 

  
</section>






</template>

<script>
import axios from 'axios';
export default {
    created(){
       console.log("inicio created")
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/user",req).then(res =>{
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        });
    },
    data(){
        return {
            users: [],
            showModal: false,
            deleteUserId: -1
        }
    },
    methods: {
        hideModal(){
            this.showModal = false;
        },
        showModalUser(id){
            console.log("id :" + id);
            alert("carreguei agora" );
            
            this.deleteUserId = id;
            this.showModal = true;
        },
        deleteUser(){

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.delete("http://localhost:8686/user/" + this.deleteUserId , req).then(res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter (u => u.id != this.deleteUserId);
            }).catch(err => {
                console.log(err);
                this.showModal = false;
            });
        }
    }
}

</script>

<style scoped>

</style>