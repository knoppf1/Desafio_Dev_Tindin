import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ map} from 'rxjs/operators';
import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly apiUrl: string = 'https://h-api-ava.tindin.com.br/'
  token: string;

  constructor(
    private http: HttpClient,
    private router:Router)  { }

  login(data: any){
    console.log('Data', data)
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {data}
  };

    return this.http.post<any>(this.apiUrl +'auth', httpOptions).pipe(map(res => {
      console.log('Res', res);
      if(res.token){
        this.token = res.token;
        localStorage.setItem('x-api-key', this.token);
      }
      console.log('Res', res)
      return res;
    }));
  }









}
