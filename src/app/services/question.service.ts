import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, catchError, throwError } from "rxjs";
import { IQuestion } from "../models/question";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    private host: string = 'http://localhost:8080'
    private basePath: string = '/api/v1/admin/knowledge-base/questions'

    getAll(): Observable<IQuestion[]> {
        return this._httpClient.get<IQuestion[]>(this.host + this.basePath)
    }

    createQuestion(question: IQuestion): Observable<any> {
        return this._httpClient.post(this.host + this.basePath, question)
    }

    patchQuestion(id: string, question: IQuestion): Observable<any> {
        return this._httpClient.patch(this.host + this.basePath + `/${id}`, question)
    }

    deleteQuestion(id: string): Observable<any> {
        return this._httpClient.delete(this.host + this.basePath + `/${id}`)
    }
}
