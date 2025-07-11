import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private http = inject(HttpClient);
  constructor() { }

  getTopRatedMovies(page = 1):Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
  }

  getMovieDetails(movieId: string):Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  }
}
