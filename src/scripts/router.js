import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";
import Notifications from "@/components/footer-components/Notifications";
import Profile from "@/components/footer-components/Profile";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage, name: 'ALLORO' },
    { path: '/notifications', component: Notifications, name: 'Avisos' },
    { path: '/profile', component: Profile, name: 'Perfil' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Error 404' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
