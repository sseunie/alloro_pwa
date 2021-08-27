import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";
import Notifications from "@/components/footer-components/Notifications";
import Profile from "@/components/footer-components/Profile";
import Login from "@/components/Login";
import Settings from "@/components/footer-components/Settings";
import Information from "@/components/home-components/Information";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage, name: 'ALLORO' },
    { path: '/notifications', component: Notifications, name: 'Avisos' },
    { path: '/profile', component: Profile, name: 'Perfil' },
    { path: '/login', component: Login, name: 'Iniciar sesión' },
    { path: '/settings', component: Settings, name: 'Ajustes' },
    { path: '/info', component: Information, name: 'Información' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Error 404' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const forbiddenRoutes = ['/profile'];

router.beforeEach((to, from, next) => {
    if (forbiddenRoutes.includes(to.path) && localStorage.getItem('token') == null) {
        next({ name: 'Iniciar sesión', params: { nextRoute: to.path } });
    } else if (to.path === '/login' && localStorage.getItem('token') != null) {
        next('/homepage');
    } else {
        next();
    }
})

export default router
