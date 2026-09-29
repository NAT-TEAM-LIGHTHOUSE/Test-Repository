import { Component, OnInit } from '@angular/core';
import { PopularCategoryKnowledgeCenterComponent } from '../popular-category-knowledge-center/popular-category-knowledge-center.component';
import { Login } from '../../../../services/login';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';

@Component({
  selector: 'app-knowledge-center-read-more-blog',
  templateUrl: './knowledge-center-read-more-blog.component.html',
  styleUrls: ['./knowledge-center-read-more-blog.component.scss'],
  standalone: true,
  imports: [PopularCategoryKnowledgeCenterComponent, CommonModule],
})
export class KnowledgeCenterReadMoreBlogComponent implements OnInit {

  slug: any;
  blogDetail: any;


  constructor(private blogService: Login, private route: ActivatedRoute,private loginService: Login,private websiteSeoSyncService: WebsiteSeoSyncService) { }



  ngOnInit() {
    console.log('DETAIL PAGE LOADED');
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.websiteSeoSyncService.applySeoByPageName(this.slug);
    console.log('Slug:', this.slug);
    this.getBlogDetail();
  }


  getBlogDetail() {
    this.blogService.getBlogsData().subscribe((data: any) => {
      const blogs = data.responseData;
      this.blogDetail = blogs.find(
        (item: any) =>
          item.slug_name?.toLowerCase().trim() ===
          this.slug?.toLowerCase().trim()
      );


    });

  }

 
}
