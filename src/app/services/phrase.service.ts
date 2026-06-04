import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { ModalService } from "./modal.service";
import { catchError, map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PhraseService {
    private apiUrl = environment.apiUrl + 'phrases/';
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