import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import PageNotFound from "@/components/PageNotFound";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
