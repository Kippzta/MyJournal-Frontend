import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostStatistics } from '../models/post-statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  private http = inject(HttpClient);

  private readonly statUrl = 'http://localhost:8080/api/posts/statistics';

  getStatistics(startDate: string, endDate: string) {

    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)

    return this.http.get<PostStatistics>(this.statUrl, { params })
  }

}
