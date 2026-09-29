import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-footer2',
  templateUrl: './website-footer2.component.html',
  styleUrls: ['./website-footer2.component.scss'],
  standalone: true,
  imports: []
})
export class WebsiteFooter2Component implements OnInit {

  constructor() { }

  ngOnInit() { }


  goTop() {
    const container = document.getElementById('website-container');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

}
