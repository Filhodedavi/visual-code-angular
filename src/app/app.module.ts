import { AlunosDeactivateGuard } from './guards/aluno-deactivate.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { CursosComponent } from './cursos/cursos.component';
import { AlunosComponent } from './alunos/alunos.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CursosGuard } from './guards/cursos.guard';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CursosComponent,
    AlunosComponent,
    CursoDetalheComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, CursosGuard, AlunosGuard, AlunosDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
