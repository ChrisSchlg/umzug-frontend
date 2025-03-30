import { Injectable } from "@angular/core";
import { apiUrl } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MovingService {
    private movingUrl = apiUrl + "/api/umzug";

    constructor(private http: HttpClient) {}

    postAssistanceRequest(name: string, time: string, origin: string, destination: string, item: string, amount: string): Observable<Object> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = {
            name,
            time,
            origin,
            destination,
            item,
            amount
        }

        return this.http.post(this.movingUrl, body, { headers });
    }
}