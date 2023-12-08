import { createApp } from 'vue';
import App from './App.vue';

import './style.css';

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue'),
    },
    {
        path: '/servers',
        component: () => import('./views/Servers.vue'),
    },
    {
        path: '/downloads',
        component: () => import('./views/Downloads.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
