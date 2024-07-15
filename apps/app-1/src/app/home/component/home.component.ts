import { Component, OnInit } from '@angular/core';
import { HtmlServiceService } from '../services/html-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TestLibService } from 'test-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  headerHTML: any
  constructor(private htmlService: HtmlServiceService,
    private sanitizer: DomSanitizer,
    private testLibService: TestLibService
  ) {
  }
  
  ngOnInit(): void {
    this.htmlService.getHtml().subscribe((res: any) => {
      this.headerHTML = this.htmlTransform(res)
    })
  }

  htmlTransform(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }
}
