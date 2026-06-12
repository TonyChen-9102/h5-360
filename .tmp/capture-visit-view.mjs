import { chromium } from 'playwright'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2
})
const page = await context.newPage()

// 访问就诊视图页面
await page.goto('http://localhost:8081/#/pages/medicalRecord/visitView', {
  waitUntil: 'networkidle',
  timeout: 30000
})

// 等待页面渲染
await page.waitForTimeout(2000)

// 截取全页截图
await page.screenshot({
  path: '.tmp/visit-view-current.png',
  fullPage: true
})

// 截取 Tab 栏区域
const tabElement = await page.$('.visit-view-tabs')
if (tabElement) {
  await tabElement.screenshot({ path: '.tmp/visit-view-tabs.png' })
}

// 截取第一个卡片
const firstCard = await page.$('.visit-card')
if (firstCard) {
  await firstCard.screenshot({ path: '.tmp/visit-view-first-card.png' })
}

await browser.close()
console.log('截图完成：.tmp/visit-view-current.png')
