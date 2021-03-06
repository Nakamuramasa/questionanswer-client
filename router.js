import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
    { path: '/', name: 'index', component: page('index.vue') },
    { path: '/login', name: 'login', component: page('auth/login.vue') },
    { path: '/register', name: 'register', component: page('auth/register.vue') },
    { path: '/verification/verify/:id', name: 'verify', component: page('auth/verification/verify.vue') },
    { path: '/verification/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },
    { path: '/password/email', name: 'password.email', component: page('auth/password/reset-email.vue') },
    { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/password-reset.vue') },
    { path: '/password/setting', name: 'password.setting', component: page('user/settings/password-setting.vue') },
    { path: '/user/dashboard', name: 'user.dashboard', component: page('user/settings/dashboard.vue') },
    { path: '/questions', name: 'questions.create', component: page('user/questions/create.vue') },
    { path: '/questions/:id/edit', name: 'questions.edit', component: page('user/questions/edit.vue') },
    { path: '/question/:slug', name: 'questions.show', component: page('user/questions/show.vue') }
];

export function createRouter(){
    return new Router({
        routes,
        mode: 'history'
    });
}
