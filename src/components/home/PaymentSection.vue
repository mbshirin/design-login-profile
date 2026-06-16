<template>
  <section id="payment" class="px-4 py-4">
    <SectionHeader
      title="پرداخت عوارض"
      subtitle="عوارض ساختمان و کسب‌وکار خود را آنلاین مدیریت کنید"
    />

    <div class="grid mx-auto w-full payment-grid">
      <div v-for="item in items" :key="item.title" class="col-12 sm:col-6 lg:col-3">
        <a href="#" class="no-underline block h-full">
          <Card
            class="h-full shadow-2 hover:shadow-4 border-1 surface-border border-round-xl payment-card-interactive"
          >
            <template #content>
              <div class="flex align-items-center justify-content-between gap-3">
                <div>
                  <h3 class="text-blue-800 font-bold m-0 mb-1 text-sm">{{ item.title }}</h3>
                  <p class="text-color-secondary m-0 text-xs line-height-3">{{ item.subtitle }}</p>
                </div>
                <div
                  class="payment-card__icon flex-shrink-0 border-round-xl flex align-items-center justify-content-center text-xl"
                  :style="{ background: item.iconBg }"
                >
                  <i :class="item.icon" :style="{ color: item.color }" />
                </div>
              </div>
            </template>
          </Card>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import SectionHeader from './SectionHeader.vue'

const items = [
  {
    title: 'عوارض نوسازی',
    subtitle: 'پرداخت عوارض نوسازی ساختمان',
    icon: 'pi pi-home',
    color: '#2e7d32',
    iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
  },
  {
    title: 'عوارض درآمدی',
    subtitle: 'پرداخت عوارض درآمدی',
    icon: 'pi pi-chart-bar',
    color: '#1565c0',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
  },
  {
    title: 'عوارض کسب و پیشه',
    subtitle: 'پرداخت عوارض کسب و کار و مشاغل',
    icon: 'pi pi-shop',
    color: '#ef6c00',
    iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
  },
  {
    title: 'رهگیری فیش',
    subtitle: 'رهگیری فیش‌های عوارض',
    icon: 'pi pi-search',
    color: '#0288d1',
    iconBg: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)',
  },
]
</script>

<style scoped>
.payment-grid {
  max-width: 75rem;
}

.payment-card__icon {
  width: 3.5rem;
  height: 3.5rem;
}

.payment-card-interactive {
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.payment-card-interactive:hover {
  transform: translateY(-2px);
}
</style>
