import { inject, Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { ModalService } from "../../../services/modal.service";
import { GetUserResponse } from "../interfaces/GetUserResponse.interface";

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

    getAll(page: number = 1, pageSize: number = 100) : Observable<GetUserResponse>{
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);

        return this.http.get<GetUserResponse>(this.apiUrl, { params }).pipe(
            map(responese => responese),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }
}