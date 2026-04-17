import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ModalService } from "./modal.service";
import { Observable, map, catchError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RegionsService {
    private apiUrl = environment.apiUrl + 'regions/';
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

    delete(id: number) : Observable<any>{
        return this.http.delete(this.apiUrl + id).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }
}
