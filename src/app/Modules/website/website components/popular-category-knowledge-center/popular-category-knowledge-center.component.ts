import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../../../services/login';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
import { CommonModule } from '@angular/common'
import { Globalobjects } from '../../../../services/globalobjects';

@Component({
  selector: 'app-popular-category-knowledge-center',
  templateUrl: './popular-category-knowledge-center.component.html',
  styleUrls: ['./popular-category-knowledge-center.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterLink],

})
export class PopularCategoryKnowledgeCenterComponent implements OnInit {
  blogs: any[] = [];
  websiteUrl :any;
  constructor(private blogService: Login, private router: Router, private globalObject : Globalobjects) { }

  ngOnInit() {
    // this.websiteSeoSyncService.applySeoByPageName('knowledge-center');
    this.websiteUrl = this.globalObject.websiteUrl;
    this.blogsdata();
  }



  blogsdata() {
    this.blogService.getBlogsData().subscribe(
      (data: any) => {
        // console.log('Blogs data:', data);

        this.blogs = data.responseData;
      },
      (error) => {
        console.error('Error fetching blogs data:', error);
      }
    );
  }

   

  openBlog(slug: string) {
    this.router.navigate([
      'blogs/Knowledge-Center-Read-More-Blog',
      slug
    ]);
  }

}
