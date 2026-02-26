import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {    
    private apiUrl = environment.apiUrl + 'users/';
    private http = inject(HttpClient);    
    register(payload: object ) : Observable<string>{
        return this.http.post<string>(this.apiUrl + 'register',payload).pipe(
            map(responese => responese),
            catchError((error: HttpErrorResponse) =>{

                throw error;
            })
        );
    }
}