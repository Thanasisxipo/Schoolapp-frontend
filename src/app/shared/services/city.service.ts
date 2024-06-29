import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedInUser } from '../interfaces/user';
import { City } from '../interfaces/city';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/api/cities`;

@Injectable({
  providedIn: 'root'
})
export class CityService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router)

  constructor() { 
  
  }

  addCity(city: City) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<City>(`${API_URL}/`, city, { headers });
  }

  updateCity(city: City) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = city.id;
    return this.http.put<City>(`${API_URL}/${id}`, city, { headers });
  }

  deleteCity(city: City) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = city.id
    return this.http.delete<City>(`${API_URL}/${id}`, { headers });
  }

  getCityById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<City>(`${API_URL}/${id}`, { headers });
  }

  getCities() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<City[]>(`${API_URL}/`, { headers });
  }
}
