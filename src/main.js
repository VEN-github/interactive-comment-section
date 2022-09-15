import { createApp } from 'vue';
import App from './App.vue';
import Store from './store';
import './scss/main.scss';

createApp(App).use(Store).mount('#app');
