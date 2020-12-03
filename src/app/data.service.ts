import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	getComments(): Observable<any> {
		return this.http.get('./assets/data.json');
	}

	constructor(private http: HttpClient) {
	}
}
