import { Component } from '@angular/core';
import { TestLibService } from 'test-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private testLibService: TestLibService) {
    
  }
}
