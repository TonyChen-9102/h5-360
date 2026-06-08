<template>
  <view class="container">
    <view class="patient-info">
      <view class="avatar-bg">
        <u-image
            :src="avatarUrl"
            mode="aspectFit"
            width="280rpx"
            height="360rpx"
        ></u-image>
        <view class="avatar-mask"></view>
      </view>
      <view class="info-left">
        <view class="name-row">
          <text class="name">{{ residentInfo.name }}</text>
          <text class="gender">{{ residentInfo.sex === 1 ? '男' : '女' }}</text>
          <text class="age">{{ residentInfo.age }}岁</text>
        </view>
        <view class="id-row">
          <text class="id-label">证件号</text>
          <text class="id-value">{{ residentInfo.idNumber }}</text>
        </view>
        <view class="archive-row">
          <text class="archive-label">健康档案</text>
          <text class="archive-value">{{ residentInfo.healthArchive }}</text>
        </view>
        <view class="disease-tags">
          <view
              v-for="(disease, index) in residentInfo.diseases"
              :key="index"
              class="disease-tag"
          >
            <text class="disease-text">{{ disease.name }}</text>
          </view>
        </view>

        <view class="dotted-line"></view>

        <view class="doctor-info">
          <view class="info-item">
            <text class="info-label">签约医生</text>
            <text class="info-value">{{ residentInfo.doctorName }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">签约机构</text>
            <text class="info-value">{{ residentInfo.orgName }}</text>
          </view>
        </view>
        <view class="team-info">
          <view class="info-item">
            <text class="info-label">签约团队</text>
            <text class="info-value">{{ residentInfo.teamName }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">签约效期</text>
            <text class="info-value">{{ residentInfo.expireDate }}</text>
          </view>
        </view>
      </view>
    </view>

    <MedicalHistoryCardComp
        :card-data="medicalHistoryCard"
        @tab-change="handleMedicalHistoryTabClick"
    ></MedicalHistoryCardComp>

    <VisitRecordCardComp
        :card-data="visitRecordCard"
        @view-click="handleVisitRecordViewClick"
    ></VisitRecordCardComp>

    <InspectionRecordCardComp
        :card-data="inspectionRecordCard"
        @tab-change="handleInspectionRecordTabClick"
        @view-all-click="handleInspectionRecordViewAllClick"
    ></InspectionRecordCardComp>

    <MedicationRecordCardComp
        :card-data="medicationRecordCard"
        @view-all-click="handleMedicationRecordViewAllClick"
    ></MedicationRecordCardComp>

    <SurgeryRecordCardComp
        :card-data="surgeryRecordCard"
        @view-all-click="handleSurgeryRecordViewAllClick"
    ></SurgeryRecordCardComp>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {ResidentHomeModel, ResidentInfo} from './modelData/residentHomeModel'
import {MedicalHistoryCardData} from './modelData/medicalHistoryModel'
import {VisitRecordCardData} from './modelData/visitRecordModel'
import {InspectionRecordCardData} from './modelData/inspectionRecordModel'
import {MedicationRecordCardData} from './modelData/medicationRecordModel'
import {SurgeryRecordCardData} from './modelData/surgeryRecordModel'
import {mockMedicalHistoryCard, mockResidentInfo, mockVisitRecordCard, mockInspectionRecordCard, mockMedicationRecordCard, mockSurgeryRecordCard} from './modelData/mockData'
import MedicalHistoryCardComp from './comp/MedicalHistoryCard.vue'
import VisitRecordCardComp from './comp/VisitRecordCard.vue'
import InspectionRecordCardComp from './comp/InspectionRecordCard.vue'
import MedicationRecordCardComp from './comp/MedicationRecordCard.vue'
import SurgeryRecordCardComp from './comp/SurgeryRecordCard.vue'

@Component({
  name: 'ResidentHomeIndex',
  components: {
    MedicalHistoryCardComp,
    VisitRecordCardComp,
    InspectionRecordCardComp,
    MedicationRecordCardComp,
    SurgeryRecordCardComp
  }
})
export default class ResidentHomeIndex extends Vue {
  residentInfo: ResidentInfo = mockResidentInfo

  medicalHistoryCard: MedicalHistoryCardData = mockMedicalHistoryCard

  visitRecordCard: VisitRecordCardData = mockVisitRecordCard

  inspectionRecordCard: InspectionRecordCardData = mockInspectionRecordCard

  medicationRecordCard: MedicationRecordCardData = mockMedicationRecordCard

  surgeryRecordCard: SurgeryRecordCardData = mockSurgeryRecordCard

  get avatarUrl(): string {
    return ResidentHomeModel.getAvatarImage(this.residentInfo.sex, this.residentInfo.age)
  }

  handleMedicalHistoryTabClick(tabKey: string): void {
    this.medicalHistoryCard.activeTab = tabKey
  }

  handleVisitRecordViewClick(): void {
    // TODO: 跳转就诊视图页面
  }

  handleInspectionRecordTabClick(tabKey: string): void {
    this.inspectionRecordCard.activeTab = tabKey
  }

  handleInspectionRecordViewAllClick(): void {
    // TODO: 跳转全部检验检查记录页面
  }

  handleMedicationRecordViewAllClick(): void {
    // TODO: 跳转全部用药记录页面
  }

  handleSurgeryRecordViewAllClick(): void {
    // TODO: 跳转全部手术记录页面
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  width: 100%;
  padding-bottom: 30rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1E74FE 0%, #4587F0 400rpx, rgba(69, 135, 240, 0) 600rpx);
}

.patient-info {
  position: relative;
  padding: 20rpx 30rpx 0;
}

.avatar-bg {
  position: absolute;
  right: 30rpx;
  bottom: 40rpx;
  width: 300rpx;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
}

.avatar-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 160rpx;
  background: linear-gradient(180deg, rgba(69, 135, 240, 0) 0%, rgba(69, 135, 240, 0.8) 100%);
  pointer-events: none;
}

.info-left {
  position: relative;
  z-index: 1;
}

.name-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 16rpx;
}

.name {
  font-weight: 600;
  font-size: 36rpx;
  color: #FFFFFF;
  margin-right: 16rpx;
}

.gender {
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
  margin-right: 12rpx;
}

.age {
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
}

.id-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.id-label {
  font-weight: 400;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 12rpx;
}

.id-value {
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
}

.archive-row {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.archive-label {
  font-weight: 400;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 12rpx;
}

.archive-value {
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
}

.disease-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.disease-tag {
  background: #E8F1FF;
  border-radius: 8rpx;
  padding: 6rpx 16rpx;
}

.disease-text {
  font-weight: 400;
  font-size: 24rpx;
  color: #1E74FE;
}

.dotted-line {
  width: 100%;
  height: 2rpx;
  border-top: 2rpx dashed rgba(255, 255, 255, 0.6);
  margin: 20rpx 0;
}

.doctor-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.team-info {
  display: flex;
  justify-content: space-between;
}

.info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.info-label {
  font-weight: 400;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 8rpx;
}

.info-value {
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
}

</style>
