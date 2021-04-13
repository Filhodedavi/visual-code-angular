import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() message!: string;
  @Input() type!: 'success';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
