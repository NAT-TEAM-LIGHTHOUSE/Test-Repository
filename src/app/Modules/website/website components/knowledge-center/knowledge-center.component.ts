import { Component, OnInit } from '@angular/core';
// import { KnowledgeCenterReadMoreBlogComponent } from '../knowledge-center-read-more-blog/knowledge-center-read-more-blog.component';
import { Router } from '@angular/router';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
import { CommonModule } from '@angular/common'
import { Login } from '../../../../services/login';


@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.scss'],
  standalone: true,
  imports: [ CommonModule],
})
export class KnowledgeCenterComponent implements OnInit {

  constructor(private router: Router, private websiteSeoSyncService: WebsiteSeoSyncService, private blogService: Login) { }

  blogs: any[] = [];

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('knowledge-center');
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



  test1() { console.log("test ") }
  check() {
    this.router.navigate(['/blogs/Knowledge-Center-Read-More-Blog']);
  }
}
