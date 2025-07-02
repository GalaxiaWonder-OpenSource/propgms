import { Injectable } from '@angular/core';
import { TokenService } from '../../iam/services/token-service';

@Injectable({ providedIn: 'root' })
export class AppContextService {
  constructor(private tokenService: TokenService) {}

  get token(): string | undefined {
    return this.tokenService.getToken() || undefined;
  }

  set token(token: string | undefined) {
    if (token) {
      this.tokenService.setToken(token);
    } else {
      this.tokenService.clearToken();
    }
  }

  get personId(): number | undefined {
    return this.tokenService.getPersonId() ?? undefined;
  }

  set personId(id: number | undefined) {
    if (id !== undefined) {
      this.tokenService.setPersonId(id);
    } else {
      this.tokenService.clearPersonId();
    }
  }
}
