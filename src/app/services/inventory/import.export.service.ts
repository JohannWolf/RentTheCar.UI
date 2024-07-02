import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  searchVehicles(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/search`, criteria);
  }

  importVehicles(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/import`, formData).pipe(
      catchError(error => {
        // Handle error message
        return throwError(error.error);
      })
    );
  }

  exportVehicles(vehicles: any[]) {
    const csvData = this.convertToCSV(vehicles);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicles.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(vehicle => Object.values(vehicle).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }
}