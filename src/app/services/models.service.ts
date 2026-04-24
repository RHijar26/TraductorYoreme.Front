import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, httpResource, HttpResourceRef } from "@angular/common/http";
import { Observable, map, catchError } from "rxjs";
import { ModalService } from "./modal.service";
import { Lenguage } from "../models/lenguage";
import { Model } from "../models/model";

@Injectable({ providedIn: 'root' })
export class ModelsService {
    private apiUrl = environment.apiUrl + 'models/';
    private http = inject(HttpClient);    
    private modalService = inject(ModalService);


    getAll() : Observable<Model[]>{
        return this.http.get<Model[]>(this.apiUrl).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) =>{
                this.modalService.showErrorModal(error);
                throw error;
            })
        );
    }

    getAllResource() : HttpResourceRef<Array<Model> | undefined>{
        return httpResource<Array<Model>>(() => this.apiUrl);
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