import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Message } from './banner.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  get message$(): Observable<Message | undefined> {
    return this.#message.asObservable();
  }

  #message = new ReplaySubject<Message | undefined>(1);

  constructor(private readonly dialog: MatDialog) { }

  open(message: Message): void {
    this.dialog.closeAll();
    this.#message.next(message);
  }

  close(): void {
    this.#message.next(undefined);
  }
}
