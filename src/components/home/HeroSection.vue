<template>
  <section class="px-4 py-4">
    <div class="hero-grid mx-auto w-full">
      <div class="hero-main relative border-round-2xl overflow-hidden hero-card-min-h">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80"
          alt="ساخت‌وساز"
          class="hero-media"
        />
        <div class="hero-main-overlay absolute top-0 left-0 right-0 bottom-0" />
        <div class="relative z-1 p-5 flex flex-column justify-content-center h-full">
          <h1 class="text-2xl lg:text-3xl text-blue-800 font-bold m-0 mb-2 line-height-3">
            انجام فرآیندهای شهرسازی
          </h1>
          <p class="text-color m-0 mb-4 text-base">بدون مراجعه حضوری</p>
          <Button
            label="ثبت درخواست شهرسازی"
            rounded
            :pt="ctaButtonPt"
            @click="scrollTo('#construction-stages')"
          />
        </div>
      </div>

      <div class="hero-side flex flex-column gap-3">
        <div class="hero-tile relative border-round-2xl overflow-hidden hero-card-min-h">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80"
            alt="پرداخت عوارض"
            class="hero-media"
          />
          <div class="hero-overlay-dark absolute top-0 left-0 right-0 bottom-0" />
          <div class="relative z-1 p-4 h-full flex align-items-end text-white">
            <div class="hero-glass border-round-lg px-3 py-2">
              <h3 class="text-base font-bold m-0 mb-1">پرداخت عوارض</h3>
              <p class="text-sm m-0 opacity-90">عوارض ساختمان خود را مشاهده کن</p>
            </div>
          </div>
        </div>

        <div class="hero-tile relative border-round-2xl overflow-hidden hero-card-min-h">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
            alt="گزارش مردمی"
            class="hero-media"
          />
          <div class="hero-overlay-gradient absolute top-0 left-0 right-0 bottom-0" />
          <div class="relative z-1 p-4 h-full flex align-items-end gap-3 text-white">
            <div class="hero-glass border-round-lg px-3 py-2">
              <p class="text-5xl font-bold line-height-1 text-center m-0">۱۳۷</p>
              <h3 class="text-base font-bold m-0 mb-1 text-center">گزارش مردمی</h3>
              <p class="text-sm m-0 opacity-90 text-center">ثبت تخلفات ساختمانی و شهرسازی</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

const ctaButtonPt = {
  root: {
    class: 'align-self-start bg-white border-none shadow-2 font-semibold px-4 py-3 text-blue-800',
  },
}
</script>

<style scoped>
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 992px) {
  .hero-grid {
    grid-template-columns: 2fr 1fr;
    min-height: 22rem;
  }

  .hero-main {
    grid-row: span 2;
  }
}

.hero-card-min-h {
  min-height: 12rem;
}

.hero-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  transition: transform 0.4s ease;
}

.hero-main:hover .hero-media,
.hero-tile:hover .hero-media {
  transform: scale(1.03);
}

.hero-main-overlay {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.92) 40%,
    rgba(255, 255, 255, 0.3) 100%
  );
}

.hero-overlay-dark {
  background: rgba(0, 0, 0, 0.55);
}

.hero-overlay-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.2));
}

.hero-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
}
</style>
