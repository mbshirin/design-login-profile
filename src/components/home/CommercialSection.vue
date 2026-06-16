<template>
  <section class="px-4 py-4">
    <SectionHeader title="ثبت درخواست‌های تجاری" subtitle="صاحب کسب و کار هستید؟" />

    <div class="grid mx-auto w-full commercial-grid">
      <div v-for="card in cards" :key="card.title" class="col-12 md:col-6">
        <Card class="h-full shadow-2 border-1 surface-border border-round-xl">
          <template #content>
            <div
              class="w-5rem h-5rem border-round-xl flex align-items-center justify-content-center mx-auto mb-3 text-4xl"
              :style="{ background: card.iconBg }"
            >
              <i :class="card.icon" :style="{ color: card.color }" />
            </div>

            <h3 class="text-center text-base font-bold m-0 mb-2" :style="{ color: card.color }">
              {{ card.title }}
            </h3>

            <div
              class="mx-auto mb-3 border-round-sm opacity-60"
              :style="{ background: card.color, width: '3rem', height: '2px' }"
            />

            <Button
              type="button"
              outlined
              severity="secondary"
              class="w-full"
              :pt="toggleButtonPt"
            >
              <span class="flex align-items-center justify-content-between w-full gap-2">
                <span class="text-sm">نمایش لیست درخواست‌ها</span>
                <i class="pi pi-angle-down" />
              </span>
            </Button>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import SectionHeader from './SectionHeader.vue'

const toggleButtonPt = {
  root: { class: 'bg-gray-50 hover:surface-100 border-1 surface-border' },
}

const cards = [
  {
    title: 'فرآیندهای صنفی',
    color: '#ef6c00',
    iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
    icon: 'pi pi-shop',
  },
  {
    title: 'بازرگانی و بهره‌برداری',
    color: '#1565c0',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    icon: 'pi pi-globe',
  },
]
</script>

<style scoped>
.commercial-grid {
  max-width: 75rem;
}
</style>
