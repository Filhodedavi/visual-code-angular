import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';


export enum AlertTypes {
  DANGER = 'danger',
  SUCCES = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number): any {

    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeOut) {
      setTimeout(() => bsModalRef.hide(), dismissTimeOut);
    }
  }

  showAlertDanger(message: string): any {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string): any {
    this.showAlert(message, AlertTypes.SUCCES);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string): any {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (bsModalRef.content as ConfirmModalComponent).confirmResult;
  }

}
