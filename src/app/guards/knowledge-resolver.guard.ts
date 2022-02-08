
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { Knowledge } from '../models/knowledge.model';
import { KnowledgeService } from '../services/knowledge.service';

@Injectable({
  providedIn: "root",
})
export class KnowledgeResolverGuard implements Resolve<Knowledge> {

  knowledge: Knowledge;

  constructor(private knowledgeService: KnowledgeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Knowledge> {

    if (route.params && route.params["id"]) {
      return this.knowledgeService.findById(route.params["id"]);
    }

    return of({
      ...this.knowledge
    });

  }
}
