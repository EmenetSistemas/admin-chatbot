import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InicioComponent } from "../modules/inicio/inicio.component";
import { ConsultaComprobantesComponent } from "../modules/comprobantes/consulta-comprobantes/consulta-comprobantes.component";
import { BlacklistComponent } from "../modules/blacklist/blacklist.component";
import { SolicitudesInternetComponent } from "../modules/chats-bot/solicitudes-internet/solicitudes-internet.component";

export const HomeRoutes: Routes = [
    {
        path: 'chatbot',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            }, {
                path: 'solicitudes-internet',
                component: SolicitudesInternetComponent
            }, {
                path: 'comprobantes',
                component: ConsultaComprobantesComponent
            }, {
                path: 'blacklist',
                component: BlacklistComponent
            }
        ]
    }
];