import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NavService {
  getNotifications() {
    return [
      {recvId: 'someGroupName', name: 'someOtherName'},
      {recvId: 'someGroupName', name: 'someOtherName'},
      {recvId: 'someGroupName', name: 'someOtherName'}
    ]
  }
}
