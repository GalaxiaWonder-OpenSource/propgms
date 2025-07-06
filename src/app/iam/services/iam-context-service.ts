import { Injectable } from '@angular/core';
import { UserAccountType } from '../model/user-account-type';

const AUTH_DATA_KEY = 'auth_data';

interface AuthData {
  token?: string;
  personId?: number;
  accountType?: UserAccountType;
}

@Injectable({
  providedIn: 'root'
})
export class IamContextService {
  /** Save only the token */
  setToken(token: string): void {
    const data = this.getStoredData() || {};
    data.token = token;
    this.saveData(data);
  }

  /** Save only the person ID */
  setPersonId(personId: number): void {
    const data = this.getStoredData() || {};
    data.personId = personId;
    this.saveData(data);
  }

  /** Save the account type */
  setAccountType(accountType: UserAccountType): void {
    const data = this.getStoredData() || {};
    data.accountType = accountType;
    this.saveData(data);
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

  /** Retrieve the account type */
  getAccountType(): UserAccountType | null {
    const data = this.getStoredData();
    return data?.accountType ?? null;
  }

  /** Clear everything */
  clearToken(): void {
    localStorage.removeItem(AUTH_DATA_KEY);
  }

  /** Clear only person ID */
  clearPersonId(): void {
    const data = this.getStoredData();
    if (data) {
      delete data.personId;
      this.saveData(data);
    }
  }

  /** Clear only account type */
  clearAccountType(): void {
    const data = this.getStoredData();
    if (data) {
      delete data.accountType;
      this.saveData(data);
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

  /** Save updated data */
  private saveData(data: AuthData): void {
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
  }
}
