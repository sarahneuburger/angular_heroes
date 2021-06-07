import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  // Adicionar ao cache
  add(message: string) {
    this.messages.push(message);
  }

  // Limpar cache
  clear() {
    this.messages = [];
  }
}