import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';

import { EntregasService } from './entregas.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EntregasService', () => {
  let service: EntregasService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
       provideHttpClient,
       provideHttpClientTesting,
       HttpClient,
       HttpHandler
      ],
      imports: [
      ]
    });
    service = TestBed.inject(EntregasService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getEntregas method', () => {
    expect(service.getEntregas()).toBeTruthy();
  });
});
