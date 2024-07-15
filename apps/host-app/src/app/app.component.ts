import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor( private router: Router) {

  }

  title = 'host-app';
  @ViewChild('header', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/app2'])
    // }, 10000);
    this.loadRemote()
  }

  async loadRemote(): Promise<void> {
    const m = await loadRemoteModule({
      remoteName: 'app2',
      remoteEntry: 'http://localhost:4400/remoteEntry.js',
      exposedModule: 'HomeModule'
    });
    const componentRef = this.viewContainer.createComponent(m.HomeComponent);
  }
}
