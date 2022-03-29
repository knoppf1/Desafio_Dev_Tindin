
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from './../quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  _id: any= "";
  nome_tela = "Quizzes";
  nome_etapa = "View";
  dados: any;
  tiposdespesa: any;
  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  frmForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quizService: QuizService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._id = +this.route.snapshot.paramMap.get('_id')!;


    this.frmForm = this.createForm();
    if(this._id == ""){
       this.editing = true;
       this.loading = false;
    }else{
      this.load();
    }
  }

  load() {
    this.loading = true;
    this.quizService.buscar(this._id).subscribe(res => {
       this.dados = res;
       this.frmForm.patchValue(res);
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

  createForm(): FormGroup {
    return this.fb.group({
     _id : [this._id, Validators.required ],
     description : ['',Validators.required],
     type : ['',Validators.required],
     level : ['',Validators.required],

    });


 }

 // get f() {
    //   return this.frmForm.controls;
    // }

  edit() {
    this.editing = true;
    this.submitted = false;
  }

 save($event: { preventDefault: () => void; }) {
  this.submitted = true;
  this.toastr.clear();
  if(this.frmForm.invalid){
    this.toastr.warning("",'VERIFIQUE OS CAMPOS');
  }else{

    this.loading = true;
    if(this._id != ""){
      this.quizService.editar(this._id,this.frmForm.value).subscribe(res =>{
        this.editing = false;
        this.toastr.success("",'GRAVADO COM SUCESSO');
        this.loading = false;
      }, err => {
        this.toastr.error(err,'ERRO AO GRAVAR');
        this.loading = false;
      });
    }else{
      this.quizService.adicionar(this.frmForm.value).subscribe(res =>{
        this.toastr.success("",'GRAVADO COM SUCESSO');
        this.loading = false;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['appcore/despesa/view']));
      }, err => {
        this.toastr.error(err,'ERRO AO GRAVAR');
        this.loading = false;
      });
    }
  }

  $event.preventDefault();
}

}


