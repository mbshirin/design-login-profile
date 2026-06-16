<template>
  <div dir="rtl" class="home-page">
    <HeroSection />
    <ConstructionStagesSection />
    <CommercialSection />
    <PaymentSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ConstructionStagesSection from '@/components/home/ConstructionStagesSection.vue'
import CommercialSection from '@/components/home/CommercialSection.vue'
import PaymentSection from '@/components/home/PaymentSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
</script>

<style scoped>
.home-page {
  font-family: 'Peyda', Tahoma, sans-serif;
  background: #f9fafb;
}

.home-page :deep(.home-section) {
  max-width: 100%;
}

.home-page :deep(.section-header__subtitle) {
  background: #f9fafb;
}
</style>
