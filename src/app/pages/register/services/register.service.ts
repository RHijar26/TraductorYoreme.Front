import { inject, Injectable, signal } from "@angular/core";
import { catchError, map, Observable, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpErrorResponse, httpResource, HttpResourceRef } from "@angular/common/http";
import { ModalService } from "../../../services/modal.service";
import { GetRegisterResponse } from "../interfaces/GetRegisterResponse.interface";

@Injectable({ providedIn: 'root' })
export class RegisterService {   
    private apiUrl = environment.apiUrl + 'userRegister/';
    private http = inject(HttpClient);    
    private modalService = inject(ModalService);
    
    private _pendings = new Subject<void>();
    pendings = this._pendings.asObservable();  

    UpdatePendigs() {
        this._pendings.next();
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

    approve(id: number) : Observable<any>{
        return this.http.put(this.apiUrl + 'approve/' + id, {}).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }

    setPassword(payload: object) : Observable<any>{
        return this.http.post(this.apiUrl + 'setPassword', payload).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }
} 