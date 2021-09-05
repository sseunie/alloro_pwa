import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";
import Notifications from "@/components/footer-components/Notifications";
import Profile from "@/components/footer-components/Profile";
import Login from "@/components/Login";
import Settings from "@/components/footer-components/Settings";
import Information from "@/components/home-components/Information";
import Services from "@/components/home-components/Services";
import ResidencesInformation from "@/components/home-components/ResidencesInformation";
import IMPInformation from "@/components/home-components/IMPInformation";
import Incidences from "@/components/home-components/Incidences";
import Absences from "@/components/home-components/Absences";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage, name: 'ALLORO' },
    { path: '/notifications', component: Notifications, name: 'Avisos' },
    { path: '/profile', component: Profile, name: 'Perfil' },
    { path: '/login', component: Login, name: 'Iniciar sesión' },
    { path: '/settings', component: Settings, name: 'Ajustes' },
    { path: '/info', component: Information, name: 'Información' },
    { path: '/services', component: Services, name: 'Servicios' },
    { path: '/services/residences', component: ResidencesInformation, name: 'Residencias' },
    { path: '/services/imp', component: IMPInformation, name: 'IMP' },
    { path: '/incidences', component: Incidences, name: 'Incidencias' },
    { path: '/absences', component: Absences, name: 'Ausencias' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Error 404' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const forbiddenRoutes = ['/profile', '/incidences', '/absences', '/messages'];

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
