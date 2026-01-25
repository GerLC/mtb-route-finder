import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trail } from '../../../core/interfaces/trail.interface';

@Injectable({
  providedIn: 'root',
})
export class TrailApiService {
  trailsResource = httpResource(() => '/api/trails');
}
