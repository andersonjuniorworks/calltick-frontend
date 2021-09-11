import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Options {
  id: string;
  text: string;
}

@Component({
  selector: 'select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.css']
})
export class SelectCustomComponent implements OnInit {

  @Input() options: Options[];
  @Input() labelText: string;
  @Input() controlName: string;
  @Output() changeValue = new EventEmitter();

  value: string;

  constructor() { }

  ngOnInit() {
  }

  onTeste(value) {
    this.value = value;
    this.changeValue.emit({value: this.value});
  }

}
