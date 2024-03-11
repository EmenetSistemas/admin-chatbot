import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InicioComponent } from "../modules/inicio/inicio.component";
import { ConsultaComprobantesComponent } from "../modules/comprobantes/consulta-comprobantes/consulta-comprobantes.component";
import { EnEsperaComponent } from "../modules/chats-bot/en-espera/en-espera.component";

export const HomeRoutes: Routes = [
    {
        path: 'chatbot',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            }, {
                path: 'chats-en-espera',
                component: EnEsperaComponent
            }, {
                path: 'comprobantes',
                component: ConsultaComprobantesComponent
            }
        ]
    }
];