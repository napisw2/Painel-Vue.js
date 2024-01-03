import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import axios from 'axios';
import EditView from '../views/EditView.vue'



function AdminAuth(to,from,next){
  if(localStorage.getItem('token') != undefined){  //se o token existir,entra no painel adm

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    
    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res);
      next();                                        //next = prosseguir normalmente a requisição,nao acontece nada
    }).catch(err => {
      console.log(err.response);
      next("/login");
    });
   

  } else {
    next("/login");                                    //aqui estamos impedindo de ir para a rota
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/register',
    name:'Register',
    component: RegisterView
  },
  {
    path:'/login',
    name:'Login',
    component: LoginView
  },
  {
    path:'/admin/users',
    name:'Users',
    component: UsersView,
    beforeEnter: AdminAuth         //antes de entrar na rota,faz uma análise
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: EditView,
    beforeEnter: AdminAuth
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
