import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren:  () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'quiz',
    loadChildren:  () => import('./quiz/quiz.module').then(m => m.QuizModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
