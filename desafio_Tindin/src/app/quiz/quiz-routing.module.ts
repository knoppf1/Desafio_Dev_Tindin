import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent
    },
    {
      path: 'view',
      component: QuizViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
