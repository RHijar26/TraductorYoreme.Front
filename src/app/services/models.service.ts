import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, map, catchError } from "rxjs";
import { ModalService } from "./modal.service";

@Injectable({ providedIn: 'root' })
export class ModelsService {
    private apiUrl = environment.apiUrl + 'models/';
    private http = inject(HttpClient);    
    private modalService = inject(ModalService);


    getAll() : Observable<any>{
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }


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