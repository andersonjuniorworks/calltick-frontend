import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeViewComponent } from './knowledge-view.component';
import { KnowledgeResolverGuard } from '../../../guards/knowledge-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeViewComponent,
    resolve: {
      knowledge: KnowledgeResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeViewRoutingModule {}
