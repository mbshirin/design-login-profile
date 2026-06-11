<template>
  <Toast />
  <div dir="rtl" class="login-page px-4 py-4">
    <Breadcrumb
      :home="breadcrumbHome"
      :model="breadcrumbItems"
      class="mb-4 border-none bg-transparent p-0"
    >
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>

    <div class="flex flex-column lg:flex-row align-items-center justify-content-center gap-5">
      <Card class="login-card flex-1 w-full shadow-3 border-round-2x1">
        <template #content>
          <div class="flex flex-column align-items-center text-center mb-4">
            <div
              class="flex align-items-center justify-content-center border-circle bg-blue-50 text-blue-500 mb-3"
              style="width: 3.5rem; height: 3.5rem"
            >
              <i class="pi pi-sign-in text-2xl" />
            </div>
            <h1 class="text-2xl font-bold text-blue-600 m-0 mb-2">ورود به شهروندیار</h1>
            <p class="text-color-secondary text-sm m-0 line-height-3">
              برای استفاده از خدمات، وارد حساب کاربری خود شوید.
            </p>
          </div>

          <form class="flex flex-column gap-4" @submit.prevent="handleSubmit">
            <div class="flex flex-column gap-2">
              <label for="mobile" class="font-medium text-sm">شماره موبایل</label>
              <IconField>
                <InputIcon class="pi pi-phone" />
                <InputText
                  id="mobile"
                  v-model="form.mobile"
                  fluid
                  inputmode="numeric"
                  placeholder="شماره موبایل خود را وارد کنید"
                  class="w-full border-round-lg"
                />
              </IconField>
              <small v-if="submitted && !isMobileValid" class="text-red-500">
                شماره موبایل معتبر نیست
              </small>
            </div>

            <div class="flex flex-column gap-2">
              <label for="password" class="font-medium text-sm">رمز عبور</label>
              <Password
                id="password"
                v-model="form.password"
                :invalid="submitted && !form.password.trim()"
                fluid
                toggleMask
                :feedback="false"
                placeholder="رمز عبور خود را وارد کنید"
                class="w-full"
                inputClass="w-full border-round-lg"
              />
              <small v-if="submitted && !form.password.trim()" class="text-red-500">
                رمز عبور را وارد کنید
              </small>
            </div>

            <Button
              type="submit"
              label="ورود"
              class="w-full border-round-lg login-submit"
              :loading="loading"
              :disabled="!isFormValid || loading"
            />

            <p class="text-center text-sm m-0">
              حساب کاربری ندارید؟
              <router-link to="/register" class="text-primary no-underline font-medium mr-1">
                ثبت نام
              </router-link>
            </p>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useAuthStore } from '@/stores/auth'

interface User {
  firstName: string
  lastName: string
  mobile: string
  nationalId: string
  password: string
}

const router = useRouter()
const toast = useToast()
const submitted = ref(false)
const loading = ref(false)
const authStore = useAuthStore()

const breadcrumbHome = {
  icon: 'pi pi-home',
  route: '/',
}

const breadcrumbItems = [{ label: 'ورود' }]

const form = reactive({
  mobile: '',
  password: '',
})

const isFormValid = computed(() => {
  return form.mobile.trim() && form.password.trim()
})

const isMobileValid = computed(() => {
  return /^09\d{9}$/.test(form.mobile)
})

const showToast = (severity: 'success' | 'error', summary: string, detail: string) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  })
}

const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

const handleSubmit = async () => {
  submitted.value = true

  if (!isMobileValid.value) {
    showToast('error', 'خطا', 'شماره موبایل معتبر نیست')
    return
  }

  if (!form.password.trim()) {
    showToast('error', 'خطا', 'رمز عبور را وارد کنید')
    return
  }

  loading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = getUsers().find(
      (item) => item.mobile === form.mobile && item.password === form.password,
    )

    if (!user) {
      showToast('error', 'خطا', 'شماره موبایل یا رمز عبور اشتباه است')
      return
    }

    authStore.login(user)
    showToast('success', 'موفق', `خوش آمدید ${user.firstName} ${user.lastName}`)

    submitted.value = false
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  font-family: 'Peyda', Tahoma, sans-serif;
}

:deep(.p-password-toggle-mask-icon) {
  cursor: pointer;
}

.login-card {
  max-width: 100%;
}

@media (min-width: 769px) {
  .login-card {
    max-width: 50%;
  }
}

.login-card :deep(.p-card-body) {
  padding: 2rem;
}

.login-card :deep(.p-card-content) {
  padding: 0;
}

.login-submit {
  background: #14b8a6 !important;
  border-color: #14b8a6 !important;
}

.login-submit:hover {
  background: #0d9488 !important;
  border-color: #0d9488 !important;
}
</style>
