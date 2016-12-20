import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";
import {FbGraphService} from "../fb-graph.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: any;

  constructor(
      private postsService: PostsService,
      private fb: FbGraphService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
    this.fb.fbSample();
  }


}
