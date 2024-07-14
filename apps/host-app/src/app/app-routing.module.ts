import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from "@angular-architects/module-federation";

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    redirectTo: '/app1',
    pathMatch: 'full'
  },
  {
    path: 'app1',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'app1',
        exposedModule: 'App1Module'
      }).then(m => m.HomeModule)
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
