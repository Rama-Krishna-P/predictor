import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {


  title = 'host-app';
  @ViewChild('header', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  ngOnInit(): void {
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
