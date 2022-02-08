import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StorageService } from '../../services/storage.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: Category;
  categories: Category[];

  loading = true;
  visibleDescription = false;

  listOfDisplayData: Category[];

  searchValue = '';

  isVisible = false;
  isOkLoading = false;
  page: number = 0;
  size: number = 10;

  isVisibleEditCategoryModal = false;

  categoryForm: FormGroup;

  user: User;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getLocalUser();
    this.onCreateForm();
    this.onList();
  }

  onCreateForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      description: [null],
      createdAt: [new Date()],
      createdBy: this.user,
      updateAt: null,
      updateBy: null,
    });
  }

  onList(): void {
    this.categoryService
      .findAll(`${this.page}`, `${this.size}`)
      .subscribe((response) => {
        this.categories = response.body;
        this.listOfDisplayData = this.categories;
        this.loading = false;
      });
  }

  onSubmit() {
    let msgSuccess = 'Categoria cadastrada com sucesso!!!';

    if (this.categoryForm.value.id) {
      msgSuccess = 'Categoria atualizada com sucesso!!!';
    }

    this.categoryService.save(this.categoryForm.value).subscribe(
      (success) => {
        this.notification.create('success', 'SUCESSO!', `${msgSuccess}`);
        this.onList();
        this.closeModalEditCategory();
      },
      (error) => {
        let err = error;
        this.notification.create(
          'error',
          `ERRO ${err.error.status}`,
          `${err.error.message}`
        );
      }
    );
  }

  onDelete(value) {
    let category: Category = value;
    this.categoryService.delete(category.id).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Categoria excluida com sucesso`
        );
        this.onList();
      },
      (error) => {
        let err = error;
        this.notification.create(
          'error',
          `ERRO ${err.error.status}`,
          `${err.error.message}`
        );
      }
    );
  }

  showDeleteConfirm(value): void {
    if (value.id != 1) {
      this.modal.confirm({
        nzTitle: 'Deseja realmente excluir esta categoria?',
        nzContent: `<b style="color: red;">${value.description}</b>`,
        nzOkText: 'Sim',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.onDelete(value),
        nzCancelText: 'Não',
        nzOnCancel: () => console.log('Cancel'),
      });
    } else {
      this.notification.create(
        'warning',
        'ALERTA!',
        `Não é possível excluir a categoria padrão!`
      );
    }
  }

  onAdd() {
    this.showModal();
  }

  onEdit(id) {
    this.categoryService.findById(id).subscribe((response) => {
      this.category = response;
      this.showModalEditCategory(this.category);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.onList();
  }

  showModal(): void {
    this.onCreateForm();
    this.isVisible = true;
  }

  showModalEditCategory(value) {
    if (value.id != 1) {
      this.categoryForm.patchValue({
        id: value.id,
        description: value.description,
        createdAt: value.createdAt,
        createdBy: value.createdBy,
        updateAt: value.updateAt,
        updateBy: value.updateBy,
      });
      this.isVisibleEditCategoryModal = true;
    } else {
      this.notification.create(
        'warning',
        'ALERTA!',
        `Não é possível editar a categoria padrão!`
      );
    }
  }

  closeModalEditCategory() {
    this.isVisibleEditCategoryModal = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.onSubmit();
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
