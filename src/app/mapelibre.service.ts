import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapelibreService {

  constructor(private readonly http: HttpClient) { }

  getRoadObject(): Observable<roadobject[]> {
    return this.http.get<roadobject[]>('api/backend/data/road-object');
  }

  getRoadObjectMaintenanceCondition(): Observable<roadobjectmaintenancecondition[]> {
    return this.http.get<roadobjectmaintenancecondition[]>('api/backend/data/road-object-maintenance-condition');
  }

  getRoadObjectForkJoin(): Observable<[roadobject[], roadobjectmaintenancecondition[]]> {
    return forkJoin([
      this.http.get<roadobject[]>('api/backend/data/road-object'),
      this.http.get<roadobjectmaintenancecondition[]>('api/backend/data/road-object-maintenance-condition')
    ])
  }
}

export interface roadobject {
  "objectId": string;
  "name": string;
  "roadNumber": string;
  "hectometer": number;
  "direction": any;
  "geometry": {
    "type": string,
    "coordinates": [
      number,
      number
    ]
  }
  "constructionYear": number;
  "comment": any
}

export interface roadobjectmaintenancecondition {
  "objectId": string;
  "year": string;
  "score": number;
}
