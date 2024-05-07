import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/environment/environment';

const API = environment.apiBaseUrl || 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private storageService: StorageService) {}



  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('csv_file', file);

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.storageService.getUser().token}` })
    };
    return this.http.post<any>(`${API}/users_import`, formData, httpOptions);
  }

  getUsersByBatchId(batchId: string, params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.storageService.getUser().token}` })
    return this.http.get<any>(`${API}/users/${batchId}`, {
      params,
      headers,
    });
  }
}
