<template>
  <section id="construction-stages" class="px-4 py-4">
    <SectionHeader
      title="ثبت درخواست‌های شهرسازی"
      subtitle="در چه مرحله‌ای از ساخت هستید؟"
    />

    <div class="grid mx-auto w-full stages-grid">
      <div v-for="stage in stages" :key="stage.title" class="col-12 sm:col-6 lg:col-3">
        <Card
          class="h-full shadow-2 hover:shadow-4 border-1 surface-border border-round-xl stage-card-interactive"
        >
          <template #content>
            <div
              class="w-5rem h-5rem border-round-xl flex align-items-center justify-content-center mx-auto mb-3 text-4xl"
              :style="{ background: stage.iconBg }"
            >
              <i :class="stage.icon" :style="{ color: stage.color }" />
            </div>

            <h3
              class="text-center text-base font-bold m-0 mb-2"
              :style="{ color: stage.color }"
            >
              {{ stage.title }}
            </h3>

            <div
              class="mx-auto mb-3 border-round-sm opacity-60"
              :style="{ background: stage.color, width: '3rem', height: '2px' }"
            />

            <ul class="list-none m-0 p-0 border-top-1 surface-border pt-3">
              <li
                v-for="item in stage.items"
                :key="item"
                class="flex align-items-center gap-2 py-2 text-color-secondary text-sm"
              >
                <i class="pi pi-file text-xs text-400" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import SectionHeader from './SectionHeader.vue'

const stages = [
  {
    title: 'پیش از ساخت',
    color: '#2e7d32',
    iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    icon: 'pi pi-compass',
    items: ['صدور پروانه', 'توقف مجوز کسب و پیشه', 'دریافت مفاصا'],
  },
  {
    title: 'در حال ساخت',
    color: '#1565c0',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    icon: 'pi pi-building',
    items: ['تمدید/ تجدید پروانه', 'اصلاح پروانه', 'عدم خلاف'],
  },
  {
    title: 'پس از ساخت',
    color: '#ef6c00',
    iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
    icon: 'pi pi-home',
    items: ['توسعه بنا/اضافه اشکوب', 'پایان کار', 'تعلیق مجوز کسب و پیشه'],
  },
  {
    title: 'سایر درخواست‌ها',
    color: '#0288d1',
    iconBg: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)',
    icon: 'pi pi-briefcase',
    items: ['استعلام'],
  },
]
</script>

<style scoped>
.stages-grid {
  max-width: 75rem;
}

.stage-card-interactive {
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.stage-card-interactive:hover {
  transform: translateY(-2px);
}
</style>
