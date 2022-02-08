import { Component, OnInit, Input } from '@angular/core';
import { Knowledge } from '../../../models/knowledge.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-knowledge-view',
  templateUrl: './knowledge-view.component.html',
  styleUrls: ['./knowledge-view.component.css'],
})
export class KnowledgeViewComponent implements OnInit {
  knowledge: Knowledge;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.knowledge = this.route.snapshot.data['knowledge'];
    this.onRemoveTags();
  }

  onRemoveTags() {
    let regex = this.knowledge.description.replace(/<img .*?>/g, "");
  }

  onBack() {
    this.location.back();
  }

}
