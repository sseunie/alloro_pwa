import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";
import Notifications from "@/components/footer-components/Notifications";
import Profile from "@/components/footer-components/Profile";
import Login from "@/components/Login";
import Information from "@/components/home-components/Information";
import Services from "@/components/home-components/Services";
import ResidencesInformation from "@/components/home-components/ResidencesInformation";
import IMPInformation from "@/components/home-components/IMPInformation";
import Incidences from "@/components/home-components/Incidences";
import Absences from "@/components/home-components/Absences";
import Messages from "@/components/footer-components/Messages";
import MessagesDetails from "@/components/footer-components/MessagesDetails";
import NotificationDetails from "@/components/footer-components/NotificationDetails";
import RoomState from "@/components/home-components/RoomState";
import RoomStateImages from "@/components/home-components/RoomStateImages";
import Reservations from "@/components/home-components/Reservations";
import ReservationsType from "@/components/home-components/ReservationsType";
import ResidenceChat from "@/components/footer-components/ResidenceChat";

const routes = [
    { path: '/', component: LandingPage, name: 'Landing' },
    { path: '/homepage', component: HomePage, name: 'ALLORO' },
    { path: '/notifications', component: Notifications, name: 'Avisos' },
    { path: '/notifications/:id', component: NotificationDetails, name: 'Aviso' },
    { path: '/profile', component: Profile, name: 'Perfil' },
    { path: '/login', component: Login, name: 'Iniciar sesión' },
    { path: '/info', component: Information, name: 'Información' },
    { path: '/services', component: Services, name: 'Servicios' },
    { path: '/services/residences', component: ResidencesInformation, name: 'Residencias' },
    { path: '/services/imp', component: IMPInformation, name: 'IMP' },
    { path: '/incidences', component: Incidences, name: 'Incidencias' },
    { path: '/absences', component: Absences, name: 'Ausencias' },
    { path: '/messages', component: Messages, name: 'Mensajes' },
    { path: '/messages/:id', component: MessagesDetails, name: 'Mensajes de la incidencia' },
    { path: '/messages/residence-chat', component: ResidenceChat, name: 'Chat con la Residencia' },
    { path: '/room-state', component: RoomState, name: 'Estado inicial de la habitación' },
    { path: '/room-state/images', component: RoomStateImages, name: 'Imágenes del estado inicial' },
    { path: '/reservations', component: Reservations, name: 'Reservas' },
    { path: '/reservations/:type', component: ReservationsType, name: 'Mis reservas' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Error 404' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const forbiddenRoutes = ['/profile', '/incidences', '/absences', '/messages'
    , '/reservations', '/room-state', '/room-state/images'];

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
