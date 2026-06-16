import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { ModalService } from "../../../services/modal.service";
import { catchError, map, Observable } from "rxjs";
import { GetPhraseResponse } from "../interfaces/GetPhraseResponse.interface";

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

    getAll(page: number = 1, pageSize: number = 100) : Observable<GetPhraseResponse>{
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);

        return this.http.get<GetPhraseResponse>(this.apiUrl, { params }).pipe(
            map(responese => responese),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }

}