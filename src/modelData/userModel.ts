export interface UserInfo {
  id: string
  name: string
  avatar: string
  phone: string
  token: string
  role: string
}

export class UserModel {
  static getDefault(): UserInfo {
    return {
      id: '',
      name: '',
      avatar: '',
      phone: '',
      token: '',
      role: ''
    }
  }

  static create(data: Partial<UserInfo>): UserInfo {
    return Object.assign({}, this.getDefault(), data)
  }
}
