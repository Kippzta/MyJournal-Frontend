import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post';
import { Post } from '../../models/post';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-journal',
  imports: [DatePipe],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal implements OnInit{

  private date = DatePipe;

  private postService = inject(PostService);

  posts = signal<Post[]>([]);

  ngOnInit() {

    this.postService.getPosts().subscribe({

      next: (posts) => this.posts.set(posts),

    });

  }

}
