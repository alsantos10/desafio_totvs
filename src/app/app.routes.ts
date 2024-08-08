import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EntregasComponent } from './entregas/entregas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EntregasResolverService } from './entregas/entregas-resolver.service';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, resolve: {entregas: EntregasResolverService} },
    { path: 'entregas', component: EntregasComponent, resolve: {entregas: EntregasResolverService} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
