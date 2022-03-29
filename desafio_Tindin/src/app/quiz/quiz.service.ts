import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly apiUrl: string = 'https://h-api-ava.tindin.com.br/quizzes'

  constructor(
    private http: HttpClient
  ) { }


  listar(team: string | number | boolean): Observable<any> {
    console.log('Team', team)
    let params = new HttpParams();
    params = params.append('team', team);
    return this.http.get(this.apiUrl, { params: params } );
  }

  adicionar(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'base/newDespesa',data);
  }

  editar(id: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'base/updateDespesa',data);

  }

  buscar(id: string): Observable<any> {
    return this.http.get(this.apiUrl+'base/getDespesa/'+id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl+id);
  }

}
