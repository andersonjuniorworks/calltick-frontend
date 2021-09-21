import { UserService } from './../../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from './../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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

  isVisibleEditUserModal = false;

  profiles = [
    { value: 1, text: 'Administrador' },
    { value: 2, text: 'Técnico' },
    { value: 3, text: 'Atendimento' },
  ];

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.onCreateForm();
    this.onList();
  }

  onCreateForm() {
    this.userForm = this.formBuilder.group({
      id: [null],
      fullname: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
      profile: [null, [Validators.required]],
    });
  }

  onList(): void {
    this.userService
      .findAll(`${this.page}`, `${this.size}`)
      .subscribe((response) => {
        this.users = response.body;
        this.listOfDisplayData = this.users;
        this.loading = false;
      });
  }

  onSubmit() {
    let msgSuccess = 'Usuário cadastrado com sucesso!!!';

    if (this.userForm.value.id) {
      msgSuccess = 'Usuário atualizado com sucesso!!!';
    }

    this.userService.save(this.userForm.value).subscribe(
      (success) => {
        this.notification.create('success', 'SUCESSO!', `${msgSuccess}`);
        this.onList();
        this.closeModalEditUser();
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
          `Usuário excluido com sucesso`
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
        nzTitle: 'Deseja realmente excluir este usuário?',
        nzContent: `<b style="color: red;">${value.fullname}</b>`,
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
        `Não é possível excluir o usuário administrador!`
      );
    }
  }

  onAdd() {
    this.showModal();
  }

  onEdit(id) {
    this.userService.findById(id).subscribe((response) => {
      this.user = response;
      this.showModalEditUser(this.user);
    });
  }

  searchByFullname(): void {
    this.visibleDescription = false;
    this.userService.findByFullname(this.searchValue).subscribe((response) => {
      this.users = response.body;
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

  showModalEditUser(value) {
    if (value.id != 1) {
      this.userForm.patchValue({
        id: value.id,
        fullname: value.fullname,
        email: value.email,
        password: value.password,
        profile: value.profile,
      });
      this.isVisibleEditUserModal = true;
    } else {
      this.notification.create(
        'warning',
        'ALERTA!',
        `Não é possível editar o usuário administrador!`
      );
    }
  }

  closeModalEditUser() {
    this.isVisibleEditUserModal = false;
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
