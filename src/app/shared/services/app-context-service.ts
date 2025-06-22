import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppContextService {
  constructor(
  ) {}

  get token(): string | undefined {
    return "tokenPlaceholder";
  }
}
