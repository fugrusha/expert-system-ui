import { Injectable } from '@angular/core';
import { UserType } from '../models/enum/userType';

const AUTH_TOKEN_ITEM_NAME: string = "auth_token"
const USER_TYPE_ITEM_NAME: string = "user_type"
const USER_ID_ITEM_NAME: string = "user_id"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem(AUTH_TOKEN_ITEM_NAME, token)
    } else { 
      window.localStorage.removeItem(AUTH_TOKEN_ITEM_NAME)
    }
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem(AUTH_TOKEN_ITEM_NAME)
  }

  setUserId(userId: string | null): void {
    if (userId !== null) {
      window.localStorage.setItem(USER_ID_ITEM_NAME, userId)
    } else { 
      window.localStorage.removeItem(USER_ID_ITEM_NAME)
    }
  }

  getUserId(): string | null {
    return window.localStorage.getItem(USER_ID_ITEM_NAME)
  }

  setUserType(userType: UserType | null): void {
    if (userType !== null) {
      window.localStorage.setItem(USER_TYPE_ITEM_NAME, userType)
    } else { 
      window.localStorage.removeItem(USER_TYPE_ITEM_NAME)
    }
  }

  getUserType(): UserType | null {
    const type = window.localStorage.getItem(USER_TYPE_ITEM_NAME)
    if (type !== null) {
      return this.getEnumValueFromString(UserType, type)
    }
    return null
  }

  private getEnumValueFromString(enumObj: any, stringValue: string): any {
    const keys = Object.keys(enumObj).filter((key) => enumObj[key] === stringValue);
    return keys.length > 0 ? enumObj[keys[0]] : null;
  }
}
