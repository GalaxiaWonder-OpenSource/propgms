import { Injectable } from '@angular/core';

const AUTH_DATA_KEY = 'auth_data';

interface AuthData {
  token?: string;
  personId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class IamContextService {
  /** Save only the token */
  setToken(token: string): void {
    const data = this.getStoredData() || {};
    data.token = token;
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
  }

  /** Save only the person ID */
  setPersonId(personId: number): void {
    const data = this.getStoredData() || {};
    data.personId = personId;
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
  }

  /** Retrieve the token from local storage */
  getToken(): string | null {
    const data = this.getStoredData();
    return data?.token ?? null;
  }

  /** Retrieve the person ID from local storage */
  getPersonId(): number | null {
    const data = this.getStoredData();
    return typeof data?.personId === 'number' ? data.personId : null;
  }

  /** Remove both token and person ID */
  clearToken(): void {
    localStorage.removeItem(AUTH_DATA_KEY);
  }

  /** Remove only the person ID */
  clearPersonId(): void {
    const data = this.getStoredData();
    if (data) {
      delete data.personId;
      localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
    }
  }

  /** Check whether a token exists */
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  /** Helper to parse stored JSON safely */
  private getStoredData(): AuthData | null {
    const raw = localStorage.getItem(AUTH_DATA_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
