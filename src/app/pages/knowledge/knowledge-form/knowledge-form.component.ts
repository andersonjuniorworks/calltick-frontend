import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { Location } from '@angular/common';
import { KnowledgeService } from '../../../services/knowledge.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-knowledge-form',
  templateUrl: './knowledge-form.component.html',
  styleUrls: ['./knowledge-form.component.css'],
})
export class KnowledgeFormComponent implements OnInit {

  knowledgeForm: FormGroup;
  user: User;
  categories: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private knowledgeService: KnowledgeService,
    private categoryService: CategoryService,
    private notification: NzNotificationService,
    private location: Location
  ) {}

  ngOnInit() {
    this.user = this.storageService.getLocalUser();
    this.onCreateForm();
    this.onReadCategory();
  }

  onCreateForm() {
    this.knowledgeForm = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      description: [null, Validators.required],
      category: null,
      createdBy: this.user,
      createdAt: new Date(),
      updateAt: null,
      updateBy: null
    });
  }

  onReadCategory() {
    this.categoryService.findAll(`0`,`10`).subscribe((response) => {
      this.categories = response.body
    })
  }

  onSubmit() {
    this.knowledgeService.insert(this.knowledgeForm.value).subscribe((success) => {
      this.notification.create(
        'success',
        'SUCESSO!',
        `Registro inserido com sucesso!`
      );
      this.onCreateForm();
    }, (err) => {
      this.notification.create(
        'error',
        'ERRO!',
        `Erro ao inserir registro na base de conhecimento!`
      );
    })
  }

  onBack() {
    this.location.back();
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    placeholder: 'Digite o conteúdo do artigo',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['fontName'],
      ['fontSize', 'insertVideo', 'customClasses', 'backgroundColor'],
    ],
    customClasses: [
      {
        name: 'Citação',
        class: 'quote',
      },
      {
        name: 'Destacado',
        class: 'redText',
      },
      {
        name: 'Título',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
  };

}
