import {Routes} from '@angular/router';
import {SobreComponent} from "./pages/sobre/sobre.component";

import {InicioComponent} from "./pages/inicio/inicio.component";

export const routes: Routes = [


    {
        path: 'sobre',
        component: SobreComponent,

    },

    {
        path: '**',
        component: InicioComponent
    }


];
