import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { RuleListComponent } from './components/rule/rule-list/rule-list.component';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property/property-details/property-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SellerPropertyListComponent } from './components/property/seller-property-list/seller-property-list.component';
import { FavoritePropertyListComponent } from './components/favorite-property-list/favorite-property-list.component';
import { BuyerRequestListComponent } from './components/buyer-request/buyer-request-list/buyer-request-list.component';
import { BuyerRequestDetailsComponent } from './components/buyer-request/buyer-request-details/buyer-request-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionListComponent },
  { path: 'rules', component: RuleListComponent },
  { path: 'survey', component: UserFormComponent },
  { path: 'main', component: PropertyListComponent },
  { path: 'seller-property', component: SellerPropertyListComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritePropertyListComponent },
  { path: 'buyer-requests', component: BuyerRequestListComponent },
  { path: 'buyer-requests/:id', component: BuyerRequestDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }