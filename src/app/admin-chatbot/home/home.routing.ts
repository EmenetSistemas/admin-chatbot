import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InicioComponent } from "../modules/inicio/inicio.component";
import { ConsultaComprobantesComponent } from "../modules/comprobantes/consulta-comprobantes/consulta-comprobantes.component";

export const HomeRoutes: Routes = [
    {
        path: 'chatbot',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            }, {
                path: 'comprobantes',
                component: ConsultaComprobantesComponent
            }
        ]
    }
];