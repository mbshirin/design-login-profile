<template>
  <Toast />
  <div dir="rtl" class="profile-page px-4 py-4">
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
      <Card class="profile-card flex-1 w-full shadow-3 border-round-2x1">
        <template #content>
          <div class="flex flex-column align-items-center text-center mb-4">
            <div
              class="profile-avatar flex align-items-center justify-content-center border-circle bg-blue-50 text-blue-600 font-bold mb-3"
            >
              {{ userInitials }}
            </div>
            <h1 class="text-2xl font-bold text-blue-600 m-0 mb-2">پروفایل کاربری</h1>
            <p class="text-color-secondary text-sm m-0 line-height-3">
              اطلاعات حساب خود را مشاهده و ویرایش کنید.
            </p>
          </div>

          <form class="flex flex-column gap-4" @submit.prevent="handleSubmit">
            <div class="grid">
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="firstName" class="font-medium text-sm">نام</label>
                <IconField>
                  <InputIcon class="pi pi-user" />
                  <InputText
                    id="firstName"
                    v-model="form.firstName"
                    fluid
                    placeholder="نام خود را وارد کنید"
                    class="w-full border-round-lg"
                  />
                </IconField>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="lastName" class="font-medium text-sm">نام خانوادگی</label>
                <IconField>
                  <InputIcon class="pi pi-user" />
                  <InputText
                    id="lastName"
                    v-model="form.lastName"
                    fluid
                    placeholder="نام خانوادگی خود را وارد کنید"
                    class="w-full border-round-lg"
                  />
                </IconField>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
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

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="nationalId" class="font-medium text-sm">کد ملی</label>
                <IconField>
                  <InputIcon class="pi pi-id-card" />
                  <InputText
                    id="nationalId"
                    v-model="form.nationalId"
                    fluid
                    inputmode="numeric"
                    maxlength="10"
                    placeholder="کد ملی خود را وارد کنید"
                    class="w-full border-round-lg"
                  />
                </IconField>
                <small v-if="submitted && !isNationalIdValid" class="text-red-500">
                  کد ملی معتبر نیست
                </small>
              </div>

              <div class="col-12">
                <Divider align="right" type="solid">
                  <span class="text-sm text-color-secondary">تغییر رمز عبور (اختیاری)</span>
                </Divider>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="password" class="font-medium text-sm">رمز عبور جدید</label>
                <Password
                  id="password"
                  v-model="form.password"
                  :invalid="submitted && isChangingPassword && !isPasswordValid"
                  fluid
                  toggleMask
                  :feedback="false"
                  placeholder="در صورت نیاز، رمز جدید وارد کنید"
                  class="w-full"
                  inputClass="w-full border-round-lg"
                />
                <small
                  v-if="submitted && isChangingPassword && !isPasswordValid"
                  class="text-red-500"
                >
                  رمز عبور باید حداقل 8 کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد
                </small>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="confirmPassword" class="font-medium text-sm">تکرار رمز عبور جدید</label>
                <Password
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :invalid="submitted && isChangingPassword && !isPasswordMatch"
                  fluid
                  toggleMask
                  :feedback="false"
                  placeholder="رمز جدید را دوباره وارد کنید"
                  class="w-full"
                  inputClass="w-full border-round-lg"
                />
                <small
                  v-if="submitted && isChangingPassword && !isPasswordMatch"
                  class="text-red-500"
                >
                  رمز عبور و تکرار آن یکسان نیست
                </small>
              </div>
            </div>

            <div class="flex flex-column md:flex-row gap-2">
              <Button
                type="submit"
                label="ذخیره تغییرات"
                icon="pi pi-save"
                class="flex-1 border-round-lg profile-submit"
                :loading="loading"
                :disabled="!isFormValid || loading"
              />
              <Button
                type="button"
                label="بازگشت"
                icon="pi pi-arrow-right"
                severity="secondary"
                outlined
                class="flex-1 border-round-lg"
                @click="router.push('/')"
              />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
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
const authStore = useAuthStore()
const submitted = ref(false)
const loading = ref(false)
const originalUser = ref<User | null>(null)

const breadcrumbHome = {
  icon: 'pi pi-home',
  route: '/',
}

const breadcrumbItems = [{ label: 'پروفایل' }]

const form = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  nationalId: '',
  password: '',
  confirmPassword: '',
})

const userInitials = computed(() => {
  const first = form.firstName.trim().charAt(0)
  const last = form.lastName.trim().charAt(0)
  return `${first}${last}` || '؟'
})

const isChangingPassword = computed(() => {
  return Boolean(form.password.trim() || form.confirmPassword.trim())
})

const isFormValid = computed(() => {
  return (
    form.firstName.trim() && form.lastName.trim() && form.mobile.trim() && form.nationalId.trim()
  )
})

const isMobileValid = computed(() => {
  return /^09\d{9}$/.test(form.mobile)
})

const isNationalIdValid = computed(() => {
  return /^\d{10}$/.test(form.nationalId)
})

const isPasswordValid = computed(() => {
  return (
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /\d/.test(form.password)
  )
})

const isPasswordMatch = computed(() => {
  return form.password === form.confirmPassword
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

const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}

const fillForm = (user: User) => {
  form.firstName = user.firstName
  form.lastName = user.lastName
  form.mobile = user.mobile
  form.nationalId = user.nationalId
  form.password = ''
  form.confirmPassword = ''
}

onMounted(() => {
  if (!authStore.user) {
    router.push('/login')
    return
  }

  originalUser.value = { ...authStore.user }
  fillForm(authStore.user)
})

const handleSubmit = async () => {
  submitted.value = true

  if (!isMobileValid.value) {
    showToast('error', 'خطا', 'شماره موبایل معتبر نیست')
    return
  }

  if (!isNationalIdValid.value) {
    showToast('error', 'خطا', 'کد ملی معتبر نیست')
    return
  }

  if (isChangingPassword.value) {
    if (!isPasswordValid.value) {
      showToast('error', 'خطا', 'رمز عبور جدید معتبر نیست')
      return
    }

    if (!isPasswordMatch.value) {
      showToast('error', 'خطا', 'رمز عبور و تکرار آن یکسان نیست')
      return
    }
  }

  const users = getUsers()
  const current = originalUser.value

  if (!current) {
    return
  }

  const userIndex = users.findIndex(
    (user) => user.mobile === current.mobile && user.nationalId === current.nationalId,
  )

  if (userIndex === -1) {
    showToast('error', 'خطا', 'کاربر یافت نشد')
    return
  }

  const duplicate = users.some(
    (user, index) =>
      index !== userIndex && (user.mobile === form.mobile || user.nationalId === form.nationalId),
  )

  if (duplicate) {
    showToast('error', 'خطا', 'شماره موبایل یا کد ملی قبلاً ثبت شده است')
    return
  }

  loading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser: User = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      mobile: form.mobile.trim(),
      nationalId: form.nationalId.trim(),
      password: isChangingPassword.value ? form.password : current.password
    }

    users[userIndex] = updatedUser
    saveUsers(users)
    authStore.login(updatedUser)
    originalUser.value = { ...updatedUser }

    form.password = ''
    form.confirmPassword = ''
    submitted.value = false

    showToast('success', 'موفق', 'اطلاعات پروفایل با موفقیت ذخیره شد')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-page {
  font-family: 'Peyda', Tahoma, sans-serif;
}

:deep(.p-password-toggle-mask-icon) {
  cursor: pointer;
}

.profile-card {
  max-width: 100%;
}

@media (min-width: 769px) {
  .profile-card {
    max-width: 50%;
  }
}

.profile-card :deep(.p-card-body) {
  padding: 2rem;
}

.profile-card :deep(.p-card-content) {
  padding: 0;
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}

.profile-submit {
  background: #14b8a6 !important;
  border-color: #14b8a6 !important;
}

.profile-submit:hover {
  background: #0d9488 !important;
  border-color: #0d9488 !important;
}
</style>
