<template>
  <section id="faq" class="px-4 py-4 pb-5">
    <SectionHeader subtitle="سوالات متداول" />

    <div
      class="faq-container mx-auto w-full surface-0 border-1 surface-border border-round-xl shadow-2 overflow-hidden"
    >
      <Accordion :value="0" :multiple="false">
        <AccordionPanel v-for="(item, index) in faqItems" :key="index" :value="index">
          <AccordionHeader :pt="accordionHeaderPt">{{ item.question }}</AccordionHeader>
          <AccordionContent :pt="accordionContentPt">
            <p class="m-0 text-color-secondary line-height-3 text-sm">{{ item.answer }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <Button
        v-if="!showAll"
        type="button"
        icon="pi pi-angle-down"
        label="مشاهده بیشتر"
        class="w-full border-none border-round-none"
        :pt="moreButtonPt"
        @click="showAll = true"
      />

      <Accordion v-if="showAll" :multiple="false" class="border-top-1 surface-border">
        <AccordionPanel v-for="(item, index) in extraFaqItems" :key="index" :value="index">
          <AccordionHeader :pt="accordionHeaderPt">{{ item.question }}</AccordionHeader>
          <AccordionContent :pt="accordionContentPt">
            <p class="m-0 text-color-secondary line-height-3 text-sm">{{ item.answer }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import SectionHeader from './SectionHeader.vue'

const showAll = ref(false)

const accordionHeaderPt = {
  root: { class: 'font-semibold text-sm' },
}

const accordionContentPt = {
  content: { class: 'bg-gray-50' },
}

const moreButtonPt = {
  root: {
    class: 'w-full border-none border-round-none font-semibold text-sm faq-more-btn',
    style: { backgroundColor: '#b2dfdb', color: '#00695c' },
  },
}

const faqItems = [
  {
    question: 'سامانه شهروندیار چیست؟',
    answer:
      'سامانه شهروندیار بستری یکپارچه برای ارائه خدمات شهرسازی، امور ملکی و تعامل شهروندان با سازمان مناطق آزاد است. از طریق این سامانه می‌توانید درخواست‌های شهرسازی ثبت کنید، عوارض را پرداخت کنید، گزارش مردمی ارسال کنید و به سایر خدمات دسترسی داشته باشید.',
  },
  {
    question: 'آیا برای استفاده از خدمات سامانه حتماً باید ثبت‌نام کنم؟',
    answer:
      'برای برخی خدمات مانند مشاهده نقشه و سوالات متداول نیازی به ثبت‌نام نیست. اما برای ثبت درخواست، پرداخت عوارض و پیگیری پرونده‌ها، ثبت‌نام و ورود به سامانه الزامی است.',
  },
]

const extraFaqItems = [
  {
    question: 'چگونه از تسویه شدن عوارض خود مطمئن شوم؟',
    answer:
      'پس از پرداخت موفق، فیش پرداخت برای شما صادر می‌شود. همچنین می‌توانید از بخش «رهگیری فیش» وضعیت پرداخت عوارض خود را بررسی کنید.',
  },
  {
    question: 'برای شروع ساخت‌وساز در یک زمین خالی یا کلنگی چه درخواستی ثبت کنم؟',
    answer:
      'برای شروع ساخت‌وساز، ابتدا باید درخواست «صدور پروانه» را در بخش «پیش از ساخت» ثبت کنید. پس از تأیید و صدور پروانه، می‌توانید عملیات ساخت را آغاز کنید.',
  },
]
</script>

<style scoped>
.faq-container {
  max-width: 75rem;
}

.faq-more-btn:hover {
  background-color: #80cbc4 !important;
}
</style>
