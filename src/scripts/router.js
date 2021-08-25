import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage, name: 'ALLORO' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Error 404' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
