import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable()
export class ModalHelperService {

  constructor(
      private modalService: NgbModal
  ) { }

  public openConfirmModal(data): Promise<any>{
      const modalRef = this.modalService.open(ConfirmModalComponent, {
          backdrop : 'static',
          keyboard : false
      });

      modalRef.componentInstance.data = data;

      return modalRef.result;
  }

}
