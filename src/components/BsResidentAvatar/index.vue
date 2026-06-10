<!--
 * @Description: 居民头像组件，根据头像、性别和年龄展示居民头像
 * @Usage: 用于居民相关页面头像展示，支持自定义宽高
-->
<template>
  <u-image
    :src="avatarSrc"
    mode="aspectFill"
    :width="imageWidth"
    :height="imageHeight"
    border-radius="50%"
  ></u-image>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

const avatarMap = {
  boy: require('@/static/base/ic-boy@2x.png'),
  girl: require('@/static/base/ic-girl@2x.png'),
  man: require('@/static/base/ic-man@2x.png'),
  woman: require('@/static/base/ic-woman@2x.png'),
  oldMan: require('@/static/base/ic-oldman@2x.png'),
  oldWoman: require('@/static/base/ic-oldwoman@2x.png'),
  unknownMale: require('@/static/base/ic-mr@2x.png')
}

@Component({
  name: 'BsResidentAvatar'
})
export default class BsResidentAvatar extends Vue {
  @Prop({type: String, default: ''}) avatar!: string
  @Prop({type: [String, Number], default: 1}) sex!: string | number
  @Prop({type: [String, Number], default: 0}) age!: string | number
  @Prop({type: [String, Number], default: 100}) width!: string | number
  @Prop({type: [String, Number], default: 100}) height!: string | number

  get imageWidth(): string {
    return `${this.width}rpx`
  }

  get imageHeight(): string {
    return `${this.height}rpx`
  }

  get avatarSrc(): string {
    if (this.avatar) {
      return this.$jktImgView(this.avatar)
    }
    return this.defaultAvatarSrc
  }

  get defaultAvatarSrc(): string {
    const sexValue = Number(this.sex)
    const ageValue = Number(this.age)
    const isFemale = sexValue === 2
    if (ageValue > 0 && ageValue < 18) {
      return isFemale ? avatarMap.girl : avatarMap.boy
    }
    if (ageValue >= 60) {
      return isFemale ? avatarMap.oldWoman : avatarMap.oldMan
    }
    if (isFemale) {
      return avatarMap.woman
    }
    if (sexValue === 1) {
      return avatarMap.man
    }
    return avatarMap.unknownMale
  }
}
</script>
