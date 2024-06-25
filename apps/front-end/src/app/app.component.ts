import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  group: string | undefined
  isLoading: boolean = false
  constructor(private keycloakService: KeycloakService) { }

  async ngOnInit(): Promise<void> {
    if (await this.keycloakService.isLoggedIn()) {
      const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;
      
      this.group = tokenParsed ? (tokenParsed['groups'] ? tokenParsed['groups'][0] : null) : null

      if (this.group){
        this.group = this.group.substring(1, this.group.length)
        console.log(this.group)
        const profile = await this.keycloakService.loadUserProfile();
      }

      //console.log(profile.attributes ? profile.attributes : '');
    }
  }
}
