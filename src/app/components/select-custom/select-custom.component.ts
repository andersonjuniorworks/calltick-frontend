import { Component, OnInit, Input } from '@angular/core';

export interface Options {
  id: string;
  text: string;
}

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.css']
})
export class SelectCustomComponent implements OnInit {

  @Input() options: Options[];
  @Input() labelText: string;

  constructor() { }

  ngOnInit() {
  }

}
