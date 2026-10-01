import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post';
import { Post } from '../../models/post';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mood, MOOD_EMOJI } from '../../models/mood';
@Component({
  selector: 'app-journal',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})

export class Journal implements OnInit{

  private postService = inject(PostService);

  protected moodEmoji = MOOD_EMOJI;

  moods: Mood[] = ['HAPPY', 'SAD', 'MOTIVATED', 'ANGRY', 'SUSPICIOUS']

  createPostFailedMsg = signal('');

  createPostSuccessMsg = signal('');

  posts = signal<Post[]>([]);

  journalForm = new FormGroup({

    note: new FormControl('', { nonNullable: true, validators:  [Validators.required] }),

    mood: new FormControl<Mood>(('HAPPY'), { nonNullable: true })

  })
 
  onSubmit() {

    if (this.journalForm.invalid) {
      
      this.createPostFailedMsg.set('Please write a note.')
      return;

    }


    const newPost = this.journalForm.getRawValue();

    this.postService.createPost(newPost).subscribe({
      next: (post) => {
        this.posts.update((currentPosts) => [post, ...currentPosts]);
        this.createPostSuccessMsg.set('Note created!');
        this.journalForm.reset();
      },
      error: () => {

        this.createPostFailedMsg.set('Could not create a note. Please try again.')
      },
    });
  }

  ngOnInit() {

    this.postService.getPosts().subscribe({

      next: (posts) => this.posts.set(posts),

    });

  }

}
