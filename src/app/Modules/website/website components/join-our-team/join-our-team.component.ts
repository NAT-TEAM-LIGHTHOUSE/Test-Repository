import { Component, OnInit , AfterViewInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
import { Globalobjects } from '../../../../services/globalobjects';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';


@Component({
  selector: 'app-join-our-team',
  templateUrl: './join-our-team.component.html',
  styleUrls: ['./join-our-team.component.scss'],
  standalone: true,
  imports: [RouterLink]
  
})
export class JoinOurTeamComponent  implements OnInit ,  AfterViewInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService,public globalObject: Globalobjects) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('join-our-team');
  }
scrollToSection() {
  document.getElementById('jobList')
    ?.scrollIntoView({ behavior: 'smooth' });
}
 ngAfterViewInit() {
setTimeout(() => {
      new Swiper('.owl-careerspeak', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 3,
        speed: 800,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
       breakpoints: {
  0: {
    slidesPerView: 1,
  },
  600: {
    slidesPerView: 1,
  },
  1097: {
    slidesPerView: 2,   
  },
  1537: {
    slidesPerView: 2,   
  },
  1538: {
    slidesPerView: 3,   // above 1537 show 3
  }
}
      });
    });


  


}

}
