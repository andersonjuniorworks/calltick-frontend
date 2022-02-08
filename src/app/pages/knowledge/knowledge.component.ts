import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Knowledge } from '../../models/knowledge.model';
import { KnowledgeService } from '../../services/knowledge.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {

  knowledges: Knowledge[];

  searchControl = new FormControl();

  user: User;

  constructor(
    private knowledgeService: KnowledgeService,
    private router: Router,
    private route : ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.user = this.storageService.getLocalUser();
    this.onListAll();
  }

  onListAll() {
    this.knowledgeService.findAll(`0`,`10`).subscribe((response) => {
      this.knowledges = response.body;
      for(let item of this.knowledges) {
        item.description = item.description.replace(/<img .*?>/g, "");
        item.description = item.description.substring(400, 0);
      }
    });
  }

  onListByDescription() {
    console.log(this.searchControl.value)
    this.knowledgeService.findByDescription(this.searchControl.value).subscribe((response) => {
      this.knowledges = response;
      console.log(response)
      for(let item of this.knowledges) {
        item.description = item.description.replace(/<img .*?>/g, "");
        item.description = item.description.substring(400, 0);
      }
    });
  }

  onOpenViewKnowledge(id) {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }

  onOpenFormKnowledge() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
