<template>
  <header dir="rtl" class="header">
    <div
      v-show="!isScrolled"
      class="bg-gray-50 flex flex-column md:flex-row align-items-center justify-content-between gap-3 px-4 py-3 border-bottom-1 border-gray-200"
    >
      <div class="flex-shrink-0 text-center md:text-right">
        <div class="logo-title text-3xl line-height-2 logo-title-style">
          <span class="cursor-pointer" @click="router.push('/')">شهروندیار</span>
        </div>
        <div class="logo-tagline text-sm text-blue-400 mt-1">خدمتگزار هوشمند شهر</div>
      </div>

      <IconField class="flex-1 w-full md:max-w-40rem">
        <InputIcon class="pi pi-search text-blue-500" />
        <InputText
          v-model="searchQuery"
          fluid
          placeholder="جستجو در سایت (صفحه، خدمت، عوارض...)"
          class="w-full border-round-3xl"
        />
      </IconField>

      <div v-if="authStore.user" class="flex align-items-center gap-2">
        <Button
          label="پروفایل"
          icon="pi pi-user"
          rounded
          severity="info"
          outlined
          @click="router.push('/profile')"
        />

        <Button
          v-tooltip.bottom="'خروج'"
          icon="pi pi-sign-out"
          severity="danger"
          rounded
          outlined
          aria-label="خروج"
          :loading="logoutLoading"
          :disabled="logoutLoading"
          @click="logout"
        />
      </div>

      <Button
        v-else
        label="ورود / ثبت نام"
        icon="pi pi-user"
        iconPos="right"
        outlined
        rounded
        severity="info"
        class="flex-shrink-0 white-space-nowrap"
        @click="goToRegister"
      />
    </div>

    <!-- <div
      v-if="isScrolled"
      class="nav-placeholder"
      :style="{ height: `${navBarHeight}px` }"
      aria-hidden="true"
    /> -->

    <div
      ref="navBarRef"
      class="nav-bar w-full bg-blue-900 menubar-z"
      :class="isScrolled ? 'fixed top-0 left-0 right-0' : 'relative'"
      @mouseleave="megaMenuOpen = false"
    >
      <Menubar :model="navItems" :pt="menubarPt" />

      <Transition name="mega-fade">
        <div
          v-show="megaMenuOpen"
          class="absolute left-0 right-0 px-3 pt-1 mega-menu-z"
          style="top: 100%"
          @mouseenter="megaMenuOpen = true"
        >
          <div
            class="grid grid-nogutter bg-white border-round-xl shadow-4 overflow-hidden border-1 surface-border"
          >
            <div
              v-for="(col, index) in megaMenuColumns"
              :key="col.title"
              class="col-12 md:col-6 lg:col-2"
              :class="{ 'border-left-1 surface-border': index > 0 }"
            >
              <div
                class="text-white text-sm font-bold text-center py-2 px-2"
                :style="{ background: col.color }"
              >
                {{ col.title }}
              </div>
              <ul class="list-none m-0 py-2">
                <li v-for="link in col.items" :key="link">
                  <a
                    href="#"
                    class="flex align-items-center gap-2 px-3 py-1 text-sm text-color-secondary no-underline hover:text-blue-400"
                  >
                    <i class="pi pi-file text-xs text-color-secondary" />
                    <span>{{ link }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Tooltip from 'primevue/tooltip'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

type NavMenuItem = MenuItem & { hasMega?: boolean }

const vTooltip = Tooltip

const authStore = useAuthStore()
const searchQuery = ref('')
const isScrolled = ref(false)
const logoutLoading = ref(false)
const megaMenuOpen = ref(false)
const navBarRef = ref<HTMLElement | null>(null)


const onScroll = () => {
  isScrolled.value = window.scrollY > 20
}

watch(isScrolled, async (scrolled) => {
  if (scrolled) {
    await nextTick()
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const router = useRouter()

const goToRegister = () => {
  router.push('/register')
}

const logout = async () => {
  logoutLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    authStore.logout()
    router.push('/')
  } finally {
    logoutLoading.value = false
  }
}

const onItemMouseEnter = (item: NavMenuItem) => {
  megaMenuOpen.value = !!item.hasMega
}

const navItems: NavMenuItem[] = [
  { label: 'نقشه', icon: 'pi pi-map' },
  { label: 'ثبت درخواست', icon: 'pi pi-file-plus', hasMega: true },
  {
    label: 'پرداخت عوارض',
    icon: 'pi pi-credit-card',
  },
  { label: 'تصدیق گواهی', icon: 'pi pi-verified' },
  { label: 'خوداظهاری', icon: 'pi pi-face-smile' },
  { label: 'گزارش مردمی', icon: 'pi pi-exclamation-triangle' },
]

const menubarPt = computed(() => ({
  root: {
    class: 'border-none border-round-none px-3 py-2 bg-blue-900 w-full flex',
    style: { '--p-menubar-background': 'var(--p-blue-900)', width: '100%' },
  },
  rootList: { class: 'gap-1 flex-wrap' },
  item: { class: 'border-round-lg' },
  itemContent: ({ context }: { context: { item: NavMenuItem } }) => ({
    class: ['border-round-lg', context.item.hasMega && megaMenuOpen.value ? 'nav-item-active' : '']
      .filter(Boolean)
      .join(' '),
    onMouseenter: () => onItemMouseEnter(context.item),
  }),
  itemLink: { class: 'text-white gap-2 px-3 py-2' },
  itemIcon: { class: 'text-white' },
  itemLabel: { class: 'text-white font-medium' },
}))

const megaMenuColumns = [
  {
    title: 'پیش از ساخت',
    color: '#26a69a',
    items: ['صدور پروانه', 'توقف مجوز کسب و پیشه', 'دریافت مفاصا'],
  },
  {
    title: 'در حال ساخت',
    color: '#1565c0',
    items: ['اصلاح پروانه', 'عدم خلاف', 'تمدید', 'تجدید'],
  },
  {
    title: 'پس از ساخت',
    color: '#ef6c00',
    items: ['توسعه بنا', 'اضافه اشکوب', 'پایان کار', 'تعلیق مجوز کسب و پیشه'],
  },
  {
    title: 'سایر درخواست‌ها',
    color: '#42a5f5',
    items: ['استعلام دفترخانه', 'استعلام بانک', 'استعلام اداره برق', 'استعلام قوه قضاییه'],
  },
  {
    title: 'فرآیندهای صنفی',
    color: '#ffb300',
    items: [
      'اصلاح پروانه بهره‌برداری',
      'تعلیق پروانه بهره‌برداری',
      'توقف پروانه بهره‌برداری',
      'صدور مجوز کسب',
      'تجدید مجوز کسب',
      'اصلاح مجوز کسب',
      'تعلیق مجوز کسب',
      'توقف مجوز کسب',
    ],
  },
  {
    title: 'بازرگانی و بهره‌برداری',
    color: '#0d47a1',
    items: ['تجدید پروانه بهره‌برداری'],
  },
]
</script>

<style scoped>
.header {
  width: 100%;
  max-width: 100vw;
}

.nav-bar {
  width: 100%;
}

.header :deep(.p-menubar) {
  width: 100%;
  border: none;
}

.header :deep(.p-menubar-mobile) {
  width: 100%;
  justify-content: flex-start;
}

.logo-title-style {
  background: linear-gradient(180deg, var(--p-blue-500) 0%, var(--p-purple-500) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menubar-z {
  z-index: 1000;
}

.mega-menu-z {
  z-index: 1001;
}

.nav-item-active {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.header :deep(.p-menubar-root-list) {
  background: var(--p-blue-900) !important;
}

.header :deep(.p-menubar-item-content) {
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}

.header :deep(.p-menubar-item-icon),
.header :deep(.p-menubar-item-label) {
  transition: color 0.3s ease-in-out;
}

.header
  :deep(.p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon),
.header
  :deep(.p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-label) {
  color: #60a5fa !important;
}

.mega-fade-enter-active,
.mega-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mega-fade-enter-from,
.mega-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
