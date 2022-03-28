import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  nome_tela = "Quizzes";
  nome_etapa = "Listagem";
  itens: any[] = [];
  loading: boolean = true;
  error: string = '';
  team : any = "623497e07ccb72a54717b9f4"
  _id: any =[];




  constructor(
    private quizService : QuizService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.load();
  }


  load(){
    this.loading = true;
    console.log("Load", this.team);
    this.quizService.listar(this.team).subscribe((res: { quizzes: any[]; }) => {
      console.log('Quizzes', res);
      this.itens = res.quizzes;
      this.loading = false;
    }, (err: string) => {
      this.error = err;
      this.loading = false;
    });
  }


  delete(_id: any){}

  // delete(_id) {
  //   if(confirm('Você deseja excluir o resgitro?')){
  //     this.quizService.delete(_id).subscribe(res =>{
  //       this.toastr.success(null,'DELETADO COM SUCESSO');
  //       this.load();
  //     }, err => {
  //       this.toastr.error(err,'ERRO AO DELETAR');
  //     });

  //   }
  // }

}
