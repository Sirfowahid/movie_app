import { Component,inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,InfiniteScrollCustomEvent, IonList, IonItem, IonText, IonAvatar, IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import {MoviesService} from '../services/movies.service';
import { every, finalize } from 'rxjs';
import { ApiResult, MovieResult } from '../services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent,IonInfiniteScroll,IonInfiniteScrollContent,IonGrid,IonRow,IonCol,IonCard,IonImg,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent, IonChip,IonIcon,IonLabel],
})
export class HomePage {
  private movieService = inject(MoviesService);
  private router = inject(Router);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies:MovieResult[] = [];
  public imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  public dummyMovies = new Array(5);
  hoveredMovieId: number | null = null;


  constructor() {
    this.loadMovies();
  }

    goToDetails(id: number | string) {
    this.router.navigate(['/details', id]);
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
  this.error = null;

  if (!event) {
    this.isLoading = true;
  }

  this.movieService.getTopRatedMovies(this.currentPage).pipe(
    finalize(() => {
      this.isLoading = false;
      if (event) {
        event.target.complete();
      }
    })
  ).subscribe({
    next: (res) => {
      this.movies.push(...res.results);

      this.currentPage++;

      if (event && this.currentPage > res.total_pages) {
        event.target.disabled = true;
      }
    },
    error: (err) => {
      this.error = err.message || 'Something went wrong';
    }
  });
}


  
}
