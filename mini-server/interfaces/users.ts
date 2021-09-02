import { createGuid } from '../utils';

export interface CollectionImpl<T> {
  total: number;
  collection: Array<T>;
}

export interface UserImpl {
  id: string;
  surname: string;
  name: string;
  middleName: string;
  birthday: Date;
  birthPlace: string;
  email: string;
  phoneNumber: string;
  registerDate: Date;
  lastUpdate: Date;
}

export interface UserRoleImpl {
  id: string;
  title: string;
}

export interface UserViewModel extends UserImpl {
  role: UserRoleImpl;
}

export interface UserCreateCommandImpl extends UserImpl {
  roleId: string;
}

export interface UserViewModel extends UserImpl {
  role: UserRoleImpl;
}

export class UserCommand implements UserCreateCommandImpl {
  id: string;
  surname: string;
  name: string;
  middleName: string;
  birthday: Date;
  birthPlace: string;
  email: string;
  roleId: string;
  phoneNumber: string;
  registerDate: Date;
  lastUpdate: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.surname = data.surname;
      this.name = data.name;
      this.middleName = data.middleName;
      this.birthday = data.birthday;
      this.roleId = data.roleId;
      this.birthPlace = data.birthPlace;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.registerDate = data.registerDate;
      this.lastUpdate = data.lastUpdate;
    }
  }
}

export class UserCreateCommand extends UserCommand {
  constructor(data?: any) {
    super(data);
    this.id = createGuid();
  }
}

export class UserUpdateCommand extends UserCommand {
  //
}
