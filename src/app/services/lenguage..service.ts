import { HttpClient, HttpErrorResponse, httpResource, HttpResourceRef } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ModalService } from "./modal.service";
import { Observable, map, catchError } from "rxjs";
import { Lenguage } from "../models/lenguage";

@Injectable({ providedIn: 'root' })
export class LenguageService {
    private apiUrl = environment.apiUrl + 'lenguage/';
    private http = inject(HttpClient);    
    private modalService = inject(ModalService);
    
    getAll() : HttpResourceRef<Array<Lenguage> | undefined>{
        return httpResource<Array<Lenguage>>(() => this.apiUrl);
    }

}