import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeRoutes } from "./home.routing";
import { InicioComponent } from "../modules/inicio/inicio.component";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(HomeRoutes)
    ],
    declarations: [
        InicioComponent
    ]
})

export class HomeModule {}