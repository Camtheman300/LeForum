import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import moment from 'moment'

import App from './App.vue'
import HomeView from './views/Home.vue'
import InstallView from './views/Install.vue'
import RegisterView from './views/Register.vue'
import LoginView from './views/Login.vue'
import StaffView from './views/Staff.vue'
import ProfileView from './views/Profile.vue'
import AdminView from './views/Admin.vue'

import InfoService from './services/info'
import Session from './services/session'

import Utils from './services/utils'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);

const routes = [
  { path: '/home', component: HomeView },
  { path: '/install', component: InstallView },
  { path: '/register', component: RegisterView },
  { path: '/staff', component: StaffView },
  { path: '/login', component: LoginView },
  { path: '/profile/:id', component: ProfileView },
  { path: '/profile', component: ProfileView },
  { path: '/admincp', component: AdminView },
  { path: '*', redirect: '/home' }
];

var router = new VueRouter({
  routes
});

function runApp() {
  window.document.title = InfoService.get().name;

  const app = new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app');
}

function registerFilters() {
  Vue.filter('formatDate', Utils.formatDate);
  Vue.filter('formatGroupTitle', InfoService.getGroupTitle);
}

function registerDirectives() {
  Vue.directive('title', (el, binding) => {
      document.title = binding.value+' - '+InfoService.get().name;
  });
}

let services = 0;
const SERVICES_COUNT = 2;

//Initialize all services and then run
function serviceCallback() {
  services++;
  console.log('Registered service #'+services);

  if (services == SERVICES_COUNT) {
    console.log('Services registered, launching application...');
    registerDirectives();
    registerFilters();
    runApp();
  }
}

InfoService.init(serviceCallback);
Session.init(serviceCallback);
