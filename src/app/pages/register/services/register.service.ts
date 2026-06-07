import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpErrorResponse, httpResource, HttpResourceRef } from "@angular/common/http";
import { ModalService } from "../../../services/modal.service";
import { GetRegisterResponse } from "../interfaces/GetRegisterResponse.interface";

@Injectable({ providedIn: 'root' })
export class RegisterService {   
    private apiUrl = environment.apiUrl + 'userRegister/';
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

    getPending() : HttpResourceRef<any | undefined>{
        return httpResource<any  | undefined>(() => this.apiUrl + 'pending');
    }

    getAll() : Observable<GetRegisterResponse[]>{
        return this.http.get<{ data: GetRegisterResponse[] }>(this.apiUrl).pipe(
            map(response => response.data),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    } 


    decline(id: number) : Observable<any>{
        return this.http.put(this.apiUrl + 'decline/' + id, {}).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }
} 