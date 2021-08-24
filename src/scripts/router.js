import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
