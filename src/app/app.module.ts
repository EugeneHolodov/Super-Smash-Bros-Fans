import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/fighters/catalog.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { FighterDetailsComponent } from './fighter-details/fighter-details.component';
import { FighterPageComponent } from './pages/fighter-page/fighter-page.component';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { MemberIconSelectorComponent } from './member-icon-selector/member-icon-selector.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthGuard } from './auth.guard';
import { HeroListGroupsComponent } from './hero-list-groups/hero-list-groups.component';
import { NotTeamComponent } from './not-team/not-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    SiteHeaderComponent,
    ProductDetailsComponent,
    FighterDetailsComponent,
    FighterPageComponent,
    SafeUrlPipe,
    CreateTeamComponent,
    TeamsComponent,
    AdminComponent,
    MatchFormComponent,
    TeamPageComponent,
    MemberIconSelectorComponent,
    ImageUploadComponent,
    LoginComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    HeroListGroupsComponent,
    NotTeamComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    UserModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    AuthButtonComponent,
    AuthModule.forRoot({
      domain: 'dev-awo008t8vaosjt2m.us.auth0.com',
      clientId: 'egNTcYhQqEB3WeCcY4Y5SpOLuX3x5BP7',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://dev-awo008t8vaosjt2m.us.auth0.com/api/v2/",
      },
    }),
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
