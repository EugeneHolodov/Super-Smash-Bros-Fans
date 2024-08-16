import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';
import { FighterPageComponent } from './fighter-page/fighter-page.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsComponent } from './teams/teams.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { NotTeamComponent } from './not-team/not-team.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    title: 'Admin',
  },
  { path: 'fighters', component: CatalogComponent, title: 'Fighters' },
  {
    path: 'match/:id',
    component: MatchFormComponent,
    canActivate: [AuthGuard],
    title: 'Match',
  },
  {
    path: 'fighter',
    component: FighterPageComponent,
    title: 'Fighter Details',
  },
  { path: 'fighter/:name', component: FighterPageComponent, title: 'Fighter' },

  { path: 'teams', component: TeamsComponent, title: 'Teams' },
  { path: 'team-page/:id', component: TeamPageComponent, title: 'Teams' },
  {
    path: 'team/:owner',
    component: CreateTeamComponent,
    canActivate: [AuthGuard],
    title: 'Team',
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'form-controls', component: TemplateFormControlsComponent },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '401', component: NotAuthorizedComponent },
  { path: 'not-team', component: NotTeamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
