import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeResolverGuard } from '../../../guards/knowledge-resolver.guard';
import { KnowledgeFormComponent } from './knowledge-form.component';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeFormComponent,
    resolve: {
      knowledge: KnowledgeResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeFormRoutingModule {}
