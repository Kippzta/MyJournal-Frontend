import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post';
import { CreatePost } from '../models/create-post';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient);

  private readonly postsUrl = 'http://localhost:8080/api/posts';

  getPosts() {

    return this.http.get<Post[]>(this.postsUrl);

  }

  createPost(createPost: CreatePost) {

    return this.http.post<Post>(this.postsUrl, createPost);
  }



}
