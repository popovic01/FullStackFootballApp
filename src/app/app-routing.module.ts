import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { LigaComponent } from './components/liga/liga.component';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { TimComponent } from './components/tim/tim.component';

const routes: Routes = [
  { path: 'tim', component: TimComponent },
  { path: 'nacionalnost', component: NacionalnostComponent },
  { path: 'liga', component: LigaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
