import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { ModalService } from "./modal.service";

@Injectable({ providedIn: 'root' })
export class UserService {    
    private apiUrl = environment.apiUrl + 'users/';

    private http = inject(HttpClient);    
    private modalService = inject(ModalService);
    register(payload: object ) : Observable<any>{
        return this.http.post<object>(this.apiUrl + 'register',payload).pipe(
            map(responese => responese),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }
}