/**
 * 居民首页数据模型
 */
export interface DiseaseTag {
  name: string // 疾病标签名称
}

export interface ResidentInfo {
  name: string // 居民姓名
  sex: number // 性别标识
  age: number // 年龄
  idNumber: string // 身份证号
  healthArchive: string // 健康档案编号或标识
  diseases: DiseaseTag[] // 重点疾病标签列表
  doctorName: string // 家庭医生姓名
  teamName: string // 家医团队名称
  orgName: string // 签约机构名称
  expireDate: string // 签约到期时间
}

const avatarImages = {
  oldWoman: require('@/static/health/ic_health_old_woman.png'),
  oldMan: require('@/static/health/ic_health_old_man.png'),
  girl: require('@/static/health/ic_health_girl.png'),
  boy: require('@/static/health/ic_health_boy.png'),
  woman: require('@/static/health/ic_health_woman.png'),
  man: require('@/static/health/ic_health_man.png')
}

export class ResidentHomeModel {
  static getAvatarImage(sex: number, age: number): string {
    const isFemale = sex === 2
    if (age >= 60) {
      return isFemale ? avatarImages.oldWoman : avatarImages.oldMan
    }
    if (age < 18) {
      return isFemale ? avatarImages.girl : avatarImages.boy
    }
    return isFemale ? avatarImages.woman : avatarImages.man
  }
}
