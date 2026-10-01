import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post';
import { Post } from '../../models/post';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mood, MOOD_EMOJI, MOODS } from '../../models/mood';
import { StatisticsService } from '../../services/statistics';
import { PostStatistics } from '../../models/post-statistics';

@Component({
  selector: 'app-journal',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})

export class Journal implements OnInit{

  private postService = inject(PostService);

  private statisticsService = inject(StatisticsService);

  protected moodEmoji = MOOD_EMOJI;

  moods = MOODS;

  // signal för att visa eller dölja statistiksektionen i journalen
  showStatistics = signal(false);

  // signal för att lagra statistikdata som hämtas från backend
  statistics = signal<PostStatistics | null>(null);

  createPostFailedMsg = signal('');

  createPostSuccessMsg = signal('');

  // signal för att lagra alla journalposter som hämtas från backend
  posts = signal<Post[]>([]);



  filterStatsForm = new FormGroup({
   
    startDate: new FormControl('', {nonNullable: true, validators: [Validators.required]}),

    endDate: new FormControl('', {nonNullable: true, validators: [Validators.required]}),

  })


  journalForm = new FormGroup({

    note: new FormControl('', { nonNullable: true, validators:  [Validators.required] }),

    mood: new FormControl<Mood>(('HAPPY'), { nonNullable: true })

  })
 

  // Metod som körs när användaren skickar in formuläret för att skapa en ny post.
  // Skickar en POST-förfrågan till backend med hjälp av PostService 
  // och uppdaterar signalen posts med den nya posten om det lyckas.
  onSubmit() {

    if (this.journalForm.invalid) {
      
      this.createPostFailedMsg.set('Please write a note.')
      return;

    }


    // Plockar ut värdena från journalForm och skapar ett nytt post-objekt.
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

  // Funktion som körs när komponenten initieras. 
  // Hämtar alla journalposter från backend och uppdaterar signalen posts med den hämtade datan.
  ngOnInit() {

    this.postService.getPosts().subscribe({

      next: (posts) => this.posts.set(posts),

    });

  }

  toggleStats() {

    this.showStatistics.set(!this.showStatistics());

  }

  onStatsSubmit() {

    if(this.filterStatsForm.invalid){
      return;
    }


    // Plockar ut start- och slutdatum som användaren valt i filterStatsForm 
    const { startDate, endDate } = this.filterStatsForm.getRawValue();


    // hämtar statistikdata från backend med hjälp av StatisticsService
    //  och uppdaterar signalen statistics med den hämtade datan.
    this.statisticsService.getStatistics(startDate, endDate).subscribe({
      next: (stats) => this.statistics.set(stats),

    })

  }

}
