import App from '../App.vue'
export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../components/basic.vue')), 'basic'),
        redirect: '/home',
        children: [{
            path: 'home',
            component: r => require.ensure([], () => r(require('../components/home/home.vue')), 'home'),

        }, {
            path: '/form/:date',
            name: 'form',
            component: r => require.ensure([], () => r(require('../components/form/form.vue')), 'form'),

        }]

    }]
}]