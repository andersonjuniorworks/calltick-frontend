import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  page: number = 0;
  size: number = 5;

  listOfDisplayData: Client[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.onList();
  }

  reset(): void {
    this.onList();
  }

  onList():void {
    this.clientService.findAll(`${this.page}`, `${this.size}`).subscribe(response => {
      this.clients = response.body;
      this.listOfDisplayData = this.clients;
    })
  }

  onEdit(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onDelete(value) {
    let client: Client = value;
    this.clientService.delete(client.id).subscribe(
      (success) => {
        this.onList();
      },
      (error) => {

      }
    );
  }

}
