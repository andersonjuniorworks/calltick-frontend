import { UserService } from './../../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from './../../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  users: User[];

  loading = true;
  visibleDescription = false;

  listOfDisplayData: User[];

  searchValue = '';

  isVisible = false;
  isOkLoading = false;
  page: number = 0;
  size: number = 10;

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.onCreateForm();
    this.onList();
  }

  onCreateForm() {
    this.userForm = this.formBuilder.group({
      id: null,
      description: null,
    });
  }

  onList(): void {
    this.userService.findAll(`${this.page}`,`${this.size}`).subscribe((response) => {
      this.users = response.body;
      this.listOfDisplayData = this.users;
      this.loading = false;
    });
    console.log(this.users);
  }

  onSubmit() {
    let msgSuccess = 'Setor cadastrado com sucesso!!!';

    if (this.userForm.value.id) {
      msgSuccess = 'Setor atualizado com sucesso!!!';
    }

    this.userService.save(this.userForm.value).subscribe(
      (success) => {
        this.notification.create('success', 'SUCESSO!', `${msgSuccess}`);
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

  onDelete(value) {
    let user: User = value;
    this.userService.delete(user.id).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Setor excluido com sucesso`
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

  onAdd() {
    this.showModal(null);
  }

  onEdit(id) {
    this.userService.findById(id).subscribe((response) => {
      this.user = response;
      this.showModal(this.user);
    });
  }

  showDeleteConfirm(value): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este setor?',
      nzContent: `<b style="color: red;">${value.description}</b>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(value),
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  searchByFullname(): void {
    this.visibleDescription = false;
    this.userService
      .findByFullname(this.searchValue)
      .subscribe((response) => {
        this.users = response.body;
      });
  }

  reset(): void {
    this.searchValue = '';
    this.onList();
  }

  showModal(value): void {
    if(!value) {
      this.onCreateForm();
    } else {
      this.userForm.patchValue({
        id: value.id,
        description: value.description,
      });
    }
    this.isVisible = true;
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
    console.log('TESTE');
  }

}
