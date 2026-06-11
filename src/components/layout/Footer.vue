<template>
  <footer dir="rtl" class="footer bg-blue-900 text-white px-4 py-5">
    <div class="flex flex-column md:flex-row align-items-start gap-4 w-full">
      <div class="flex flex-column gap-3 md:w-3">
        <div>
          <div class="logo-title text-3xl line-height-2 logo-title-style">شهروندیار</div>
          <div class="logo-tagline text-sm text-blue-300 mt-1">خدمتگزار هوشمند شهر</div>
        </div>
        <p class="text-sm line-height-3 m-0 text-blue-100 text-justify">
          سامانه شهروندیار بستری یکپارچه برای ارائه خدمات شهرسازی، امور ملکی و تعامل شهروندان با
          سازمان مناطق آزاد است؛ دسترسی سریع به نقشه، ثبت درخواست، پرداخت عوارض و سایر خدمات در
          یک محیط واحد.
        </p>
      </div>

      <div class="md:w-3">
        <h3 class="footer-heading text-lg font-semibold m-0 mb-3">خدمات سامانه</h3>
        <ul class="list-none m-0 p-0 flex flex-column gap-2">
          <li v-for="item in serviceLinks" :key="item.label">
            <a href="#" class="footer-link flex align-items-center gap-2 text-white no-underline">
              <i :class="item.icon" class="text-sm" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="md:w-3">
        <h3 class="footer-heading text-lg font-semibold m-0 mb-3">لینک‌های مفید</h3>
        <ul class="list-none m-0 p-0 flex flex-column gap-2">
          <li v-for="item in usefulLinks" :key="item.label">
            <a href="#" class="footer-link flex align-items-center gap-2 text-white no-underline">
              <span class="footer-bullet" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="md:w-3">
        <h3 class="footer-heading text-lg font-semibold m-0 mb-3">تماس با ما</h3>
        <ul class="list-none m-0 p-0 flex flex-column gap-2">
          <li v-for="item in contactItems" :key="item.label">
            <component
              :is="item.href ? 'a' : 'span'"
              :href="item.href"
              class="footer-link flex align-items-start gap-2 text-white no-underline"
              :class="{ 'cursor-default': !item.href }"
            >
              <i :class="item.icon" class="text-sm mt-1 flex-shrink-0" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </component>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const serviceLinks = [
  { label: 'نقشه', icon: 'pi pi-map' },
  { label: 'ثبت درخواست‌های شهرسازی', icon: 'pi pi-file-edit' },
  { label: 'پرداخت عوارض', icon: 'pi pi-credit-card' },
  { label: 'گزارش مردمی', icon: 'pi pi-comments' },
  { label: 'تصدیق گواهی', icon: 'pi pi-verified' },
  { label: 'خوداظهاری', icon: 'pi pi-file' },
  { label: 'کیف ملک', icon: 'pi pi-home' },
  { label: 'پیام‌ها و ابلاغیه‌ها', icon: 'pi pi-inbox' },
]

const usefulLinks = [
  { label: 'سازمان مناطق آزاد ایران' },
  { label: 'منطقه آزاد چابهار' },
  { label: 'شورای عالی مناطق آزاد' },
  { label: 'پایگاه خبری مناطق آزاد' },
  { label: 'سازمان سرمایه‌گذاری و کمک‌های اقتصادی و فنی' },
]

const contactItems = [
  { label: '۰۵۴۳۵۳۱۲۲۰۰', icon: 'pi pi-phone', href: 'tel:05435312200' },
  { label: '۳۰۰۰۵۰۱۵', icon: 'pi pi-phone', href: 'tel:30005015' },
  { label: '۰۵۴۳۵۳۱۲۲۲۹', icon: 'pi pi-phone', href: 'tel:05435312229' },
  { label: 'info@cfzo.ir', icon: 'pi pi-envelope', href: 'mailto:info@cfzo.ir' },
  { label: 'شورای عالی مناطق آزاد', icon: 'pi pi-map-marker' },
  { label: 'شناسه ملی سازمان : ۱۰۱۰۰۴۰۴۲۰۰', icon: 'pi pi-id-card' },
]
</script>

<style scoped>
.logo-title-style {
  background: linear-gradient(180deg, #93c5fd 0%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-bullet {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: #ffffff;
  flex-shrink: 0;
}

.footer-link {
  transition: color 0.3s ease-in-out;
}

.footer-link:hover {
  color: #93c5fd !important;
}
</style>
