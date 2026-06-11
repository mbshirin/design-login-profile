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

    <div v-if="isScrolled" class="menubar-spacer" aria-hidden="true" />

    <Menubar :model="navItems" :pt="menubarPt" :class="{ 'menubar-fixed': isScrolled }" />
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
// import type { MenuItem } from 'primevue/menuitem'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Tooltip from 'primevue/tooltip'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const vTooltip = Tooltip

const authStore = useAuthStore()
const searchQuery = ref('')
const isScrolled = ref(false)
const logoutLoading = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
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

const navItems = [
  { label: 'نقشه', icon: 'pi pi-map' },
  { label: 'ثبت درخواست', icon: 'pi pi-file-plus' },
  { label: 'پرداخت عوارض', icon: 'pi pi-credit-card' },
  { label: 'تصدیق گواهی', icon: 'pi pi-verified' },
  { label: 'خوداظهاری', icon: 'pi pi-face-smile' },
  { label: 'گزارش مردمی', icon: 'pi pi-exclamation-triangle' },
]

const menubarPt = {
  root: {
    class: 'border-none border-round-none px-3 py-2 bg-blue-900',
    style: { '--p-menubar-background': 'var(--p-blue-900)' },
  },
  rootList: { class: 'gap-1 flex-wrap' },
  item: { class: 'border-round-lg' },
  itemContent: { class: 'border-round-lg' },
  itemLink: { class: 'text-white gap-2 px-3 py-2' },
  itemIcon: { class: 'text-white' },
  itemLabel: { class: 'text-white font-medium' },
}
</script>

<style scoped>
.menubar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.menubar-spacer {
  height: 3rem;
}

.logo-title-style {
  background: linear-gradient(180deg, var(--p-blue-500) 0%, var(--p-purple-500) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
</style>
