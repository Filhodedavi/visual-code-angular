import { AlunosGuard } from './guards/alunos.guard';
import { CursosGuard } from './guards/cursos.guard';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { CursosComponent } from './cursos/cursos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule', canActivate: [AuthGuard], canActivateChild: [CursosGuard]},
  {path: 'alunos', loadChildren: 'app/alunos/alunos.module#AlunosModule', canActivate: [AuthGuard]},// , canActivateChild: [AlunosGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  // {path: ':id', component: CursoDetalheComponent},
  // {path: 'naoEncontrado', component: CursoNaoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }