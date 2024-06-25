import { Route } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';

export const appRoutes: Route[] = [{
    path: '', 
    component: AdminComponent,
    children:  [
        {
            path: 'teams',
            loadChildren: () => import('../admin/teams/teams.module').then((m) => m.TeamsModule)
        }
    ]
}];
