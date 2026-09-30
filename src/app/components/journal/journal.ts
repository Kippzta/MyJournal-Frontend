import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post';
import { Post } from '../../models/post';

@Component({
  selector: 'app-journal',
  imports: [],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal implements OnInit{

  private postService = inject(PostService);

  posts = signal<Post[]>([]);

  ngOnInit() {

    this.postService.getPosts().subscribe({
      
      next: (posts) => this.posts.set(posts),

    });

  }

}
