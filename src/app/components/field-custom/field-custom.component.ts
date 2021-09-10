import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field-custom',
  templateUrl: './field-custom.component.html',
  styleUrls: ['./field-custom.component.css']
})
export class FieldCustomComponent implements OnInit {

  @Input() labelText: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() name: string;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }

}
