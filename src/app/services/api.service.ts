import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

type RequestOptions = {
    server?: string;
    headers?: any;
    params?: any;
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export abstract class ApiService {
    public server: string;
    protected requireAuthentication: boolean;

    constructor(protected http: HttpClient){
        this.server = '';
        this.requireAuthentication = true;
    }

    private setHeaders(isFile = false){
        const headersConfig: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (!isFile) {
            headersConfig['Content-Type'] = 'application/json';
        }

        if (this.requireAuthentication) {
            const token = localStorage.getItem('auth_token');
            if (token) {
                headersConfig['Authorization'] = `Bearer ${token}`;
            }
        }
        return new HttpHeaders(headersConfig);
    }

    private formatErrors(error: any) {
        return throwError(() => error);
    }

    protected get <T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${this.server}${path}`, 
            { headers: this.setHeaders(), params: params })
            .pipe(catchError(this.formatErrors));
    }

    protected getPDF(path: string): Observable<Blob> {
        return this.http.get(
            `${this.server}${path}`,
            { headers: this.setHeaders(), responseType: 'blob' }
        )
        .pipe(
            map((res: Blob) => new Blob([res], { type: 'application/pdf' })),
        );
    }

    protected getPDFParam(path: string, queryParams?: {[key: string]: any}): Observable<Blob> {
        let params = new HttpParams();
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                const value = queryParams[key];
                if (value !== null && value !== undefined) {
                    params = params.set(key, value.toString());
                }
            });
        }

        return this.http.get(
            `${this.server}${path}`,
            { headers: this.setHeaders(), params: params, responseType: 'blob' }
        )
        .pipe(
            map((res: Blob) => new Blob([res], { type: 'application/pdf' })),
        );
    }

    protected put<T>(path: string, body: any = {}): Observable<T> {
        return this.http
        .put<T>(`${this.server}${path}`, body, {
            headers: this.setHeaders(),
        })
        .pipe(catchError(this.formatErrors));
    }
    
    protected post<T>(path: string, body: any = {}, isFile = false, options: RequestOptions = { server: this.server }): Observable<T> {
        const server = options?.server ?? this.server;
        const httpOptions: any = {
            headers: this.setHeaders(isFile),
        };

        if (options?.withCredentials !== undefined) {
            httpOptions.withCredentials = !!options.withCredentials;
        }

        return this.http
        .post<T>(`${server}${path}`, body, httpOptions)
        .pipe(catchError(this.formatErrors)) as Observable<T>;
    }
    
    protected file<T>(path: string, file: File): Observable<T> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name.split('.')[0]);
        return this.http
        .post<T>(`${this.server}${path}`, formData, {
            headers: this.setHeaders(true),
        })
        .pipe(catchError(this.formatErrors));
    }

    protected blob<T>(path: string, file: Blob, fileName: string): Observable<T> {
        const formData: FormData = new FormData();
        formData.append('file', file, fileName);
        return this.http
        .post<T>(`${this.server}${path}`, formData, {
            headers: this.setHeaders(true),
        })
        .pipe(catchError(this.formatErrors));
    }

    protected delete<T>(path: string): Observable<T> {
        return this.http
        .delete<T>(`${this.server}${path}`, {
            headers: this.setHeaders(),
        })
        .pipe(catchError(this.formatErrors));
    }

}