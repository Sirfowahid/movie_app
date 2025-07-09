import { Component, OnInit, signal, WritableSignal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonRow, IonSpinner, IonSplitPane, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies.service';
import { MovieResult } from '../services/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonImg, CommonModule, FormsModule,IonCardHeader,IonCardTitle,IonCardContent,IonGrid,IonCard, IonRow,IonCol,IonList,IonAvatar,IonLabel,IonItem, IonText,]
})
export class DetailsPage implements OnInit {
  private movieService = inject(MoviesService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie);
    });
  }

  constructor() {}

  ngOnInit() {}
}
