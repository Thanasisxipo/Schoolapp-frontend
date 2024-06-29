import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Speciality } from '../interfaces/speciality';
import { Router } from '@angular/router';


const API_URL = `${environment.apiURL}/api/specialities`;

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router)

  constructor() { 
  
  }

  addSpeciality(speciality: Speciality) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Speciality>(`${API_URL}/`, speciality, { headers });
  }

  updateSpeciality(speciality: Speciality) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = speciality.id;
    return this.http.put<Speciality>(`${API_URL}/${id}`, speciality, { headers });
  }

  deleteSpeciality(speciality: Speciality) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = speciality.id
    return this.http.delete<Speciality>(`${API_URL}/${id}`, { headers });
  }

  getSpecialityById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Speciality>(`${API_URL}/${id}`, { headers });
  }

  getSpecialities() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Speciality[]>(`${API_URL}/`, { headers });
  }
}
