export interface DiseaseTag {
  name: string
}

export interface ResidentInfo {
  name: string
  sex: number
  age: number
  idNumber: string
  healthArchive: string
  diseases: DiseaseTag[]
  doctorName: string
  teamName: string
  orgName: string
  expireDate: string
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
