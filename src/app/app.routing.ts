import { Routes } from "@angular/router";
import { HomeComponent } from "./admin-chatbot/home/home.component";

export const AppRoutes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent
    }
];