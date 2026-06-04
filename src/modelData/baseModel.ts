export interface BaseModelInterface {
  [key: string]: any
}

export class BaseModel {
  static getDefault(): BaseModelInterface {
    return {}
  }

  static create(data: Partial<BaseModelInterface>): BaseModelInterface {
    return Object.assign({}, this.getDefault(), data)
  }
}
