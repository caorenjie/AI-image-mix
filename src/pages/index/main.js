import Vue from 'vue'
import App from './index'

import api from '../../service/api';

Vue.prototype.$http = api;

const app = new Vue(App)
app.$mount()
