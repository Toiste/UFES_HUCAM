import {Routes} from '@angular/router';
import {SobreComponent} from "./pages/sobre/sobre.component";

import {InicioComponent} from "./pages/inicio/inicio.component";
import {GameComponent} from "./pages/game/game.component";
import {ResiduosComponent} from "./pages/residuos/residuos.component";

export const routes: Routes = [


    {
        path: 'sobre',
        component: SobreComponent,

    },

    {
        path:'game',
        component: GameComponent
    },

    {
        path:'residuos',
        component: ResiduosComponent
    },

    {
        path: '**',
        component: InicioComponent
    }


];
