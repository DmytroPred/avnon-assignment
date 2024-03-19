import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AnswersComponent } from './answers/answers.component';

const routes: Routes = [
  { path: 'form/builder', component: FormBuilderComponent },
  { path: 'form/answers', component: AnswersComponent },
  { path: '**', redirectTo: 'form/builder' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
