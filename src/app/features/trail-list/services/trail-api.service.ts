import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrailSchema } from '../../../core/interfaces/trail.schema';

@Injectable({
  providedIn: 'root',
})
export class TrailApiService {
  trailsResource = httpResource(() => '/api/trails', {
    parse: TrailSchema.parse,
  });
}
