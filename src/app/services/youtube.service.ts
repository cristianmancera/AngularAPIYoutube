import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyBLJYIg-ddb7imVqzN2HqEGKUUzyByRBEk';
  private playlist = 'PLLhUyPZ7578cBzT6JdkxXiWTw7-pnmaOI';
  private nextPageToken = '';
  constructor(private http: HttpClient) {

  }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '11')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken)
    return this.http.get<YoutubeResponse>(url, { params: params })
      .pipe(
        map(resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => items.map(video => video.snippet))
      );
  }
}
