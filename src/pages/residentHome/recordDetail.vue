<!--
 * @Description: 个人档案记录详情页，健康体检、儿童健康等记录共用
-->
<template>
  <view class="record-detail-page">
    <RecordDetailPersonCard :data="pageData.personInfo" />
    <RecordDetailFieldCard
      v-for="section in pageData.fieldSections"
      :key="section.key"
      :data="section"
    />
    <RecordDetailProblemCard v-if="hasSectionItems(pageData.problemSection)" :data="pageData.problemSection" />
    <RecordDetailMedicineCard v-if="hasSectionItems(pageData.medicineSection)" :data="pageData.medicineSection" />
    <RecordDetailHospitalCard v-if="hasSectionItems(pageData.hospitalSection)" :data="pageData.hospitalSection" />
    <RecordDetailVaccinationCard v-if="hasSectionItems(pageData.vaccinationSection)" :data="pageData.vaccinationSection" />
    <RecordDetailManageCard v-if="hasSectionItems(pageData.manageSection)" :data="pageData.manageSection" />
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import RecordDetailPersonCard from './comp/RecordDetailPersonCard.vue'
import RecordDetailFieldCard from './comp/RecordDetailFieldCard.vue'
import RecordDetailProblemCard from './comp/RecordDetailProblemCard.vue'
import RecordDetailMedicineCard from './comp/RecordDetailMedicineCard.vue'
import RecordDetailHospitalCard from './comp/RecordDetailHospitalCard.vue'
import RecordDetailVaccinationCard from './comp/RecordDetailVaccinationCard.vue'
import RecordDetailManageCard from './comp/RecordDetailManageCard.vue'
import {RecordDetailPageData} from './modelData/recordDetailModel'
import {mockRecordDetail, mockRecordDetailMap} from './modelData/mockData'

@Component({
  name: 'RecordDetail',
  components: {
    RecordDetailPersonCard,
    RecordDetailFieldCard,
    RecordDetailProblemCard,
    RecordDetailMedicineCard,
    RecordDetailHospitalCard,
    RecordDetailVaccinationCard,
    RecordDetailManageCard
  }
})
export default class RecordDetail extends Vue {
  pageData: RecordDetailPageData = JSON.parse(JSON.stringify(mockRecordDetail))

  onLoad(query: {detailId?: string; title?: string}): void {
    const detailId = query && query.detailId
    const source = detailId && mockRecordDetailMap[detailId] ? mockRecordDetailMap[detailId] : mockRecordDetail
    this.pageData = JSON.parse(JSON.stringify(source))
    if (query && query.title) {
      this.pageData.title = `${query.title}详情`
    }
    uni.setNavigationBarTitle({title: this.pageData.title})
  }

  hasSectionItems(section: {items?: unknown[]}): boolean {
    return Array.isArray(section.items) && section.items.length > 0
  }
}
</script>

<style lang="scss" scoped>
.record-detail-page {
  min-height: 100vh;
  padding: 1rpx 0 24rpx;
  background: linear-gradient(180deg, #D6ECFF 0%, rgba(214, 236, 255, 0) 300rpx);
}
</style>
