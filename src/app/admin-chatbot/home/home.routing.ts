import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InicioComponent } from "../modules/inicio/inicio.component";
import { ConsultaComprobantesComponent } from "../modules/comprobantes/consulta-comprobantes/consulta-comprobantes.component";
import { ChatsBotComponent } from "../modules/chats-bot/chats-bot.component";

export const HomeRoutes: Routes = [
    {
        path: 'chatbot',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            }, {
                path: 'chats',
                component: ChatsBotComponent
            }, {
                path: 'comprobantes',
                component: ConsultaComprobantesComponent
            }
        ]
    }
];