import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-chatboat',
  templateUrl: './website-chatboat.component.html',
  styleUrls: ['./website-chatboat.component.scss'],
  standalone:true,
  imports: [CommonModule]
})
export class WebsiteChatboatComponent implements OnInit {
  isOpen = false;

  constructor() { }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() { }

}
