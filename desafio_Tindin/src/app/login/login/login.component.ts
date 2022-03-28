import { LoginService } from './../login.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  msgErro : string = "";
  submited: boolean = true;
  login : boolean = false;
  // loginService: any;



  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(){
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }

  onLogin()
  {

    this.submited = true;
    if(this.form.valid){
      this.login = true;
      console.log('this.form', this.form.value);
      var myJson = JSON.stringify(this.form.value)
      console.log('Json', myJson)
      this.loginService.login(myJson).subscribe(res => {
        console.log('Res', res)
        // TODO: validacao
        if(res._id == 0 ){
          this.msgErro = "Usuário ou senha inválidos!";
        }else{
          this.msgErro = "";
          this.router.navigate(['/quiz']);
        }
        this.login = false;
      });
    }
  }



  // onLogin1()
  // {

  //   this.submited = true;
  //   if(this.form.valid){
  //     this.login = true;
  //     console.log('this.form', this.form.value);
  //     var myJson = JSON.stringify(this.form.value)
  //     console.log('Json', myJson)
  //     this.loginService.postJSON(myJson).subscribe((res: { _id: number; }) => {
  //       console.log('Res', res)
  //       // TODO: validacao
  //       if(res._id == 0 ){
  //         this.msgErro = "Usuário ou senha inválidos!";
  //       }else{
  //         this.msgErro = "";
  //         this.router.navigate(['/quiz']);
  //       }
  //       this.login = false;
  //     });
  //   }
  // }

}
