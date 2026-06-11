<template>
  <Toast />
  <div dir="rtl" class="register-page px-4 py-4">
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
      <Card class="register-card flex-1 w-full shadow-3 border-round-2x1">
        <template #content>
          <div class="flex flex-column align-items-center text-center mb-4">
            <div
              class="flex align-items-center justify-content-center border-circle bg-blue-50 text-blue-500 mb-3"
              style="width: 3.5rem; height: 3.5rem"
            >
              <i class="pi pi-user text-2xl" />
            </div>
            <h1 class="text-2xl font-bold text-blue-600 m-0 mb-2">ثبت نام در شهروندیار</h1>
            <p class="text-color-secondary text-sm m-0 line-height-3">
              اطلاعات خود را وارد کنید تا حساب کاربری شما ایجاد شود.
            </p>
            <p class="text-red-500">فیلد‌ها ضروری هستند.</p>
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
                  <small v-if="submitted && !isMobileValid" style="color: red">
                    شماره موبایل معتبر نیست
                  </small>
                </IconField>
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
                  <small v-if="submitted && !isNationalIdValid" style="color: red">
                    کد ملی معتبر نیست
                  </small>
                </IconField>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="password" class="font-medium text-sm">رمز عبور</label>
                <Password
                  id="password"
                  :invalid="submitted && !isPasswordValid"
                  v-model="form.password"
                  fluid
                  toggleMask
                  :feedback="false"
                  placeholder="رمز عبور خود را وارد کنید"
                  class="w-full"
                  inputClass="w-full border-round-lg"
                />
                <small v-if="submitted && !isPasswordValid" class="text-red-500">
                  رمز عبور باید حداقل 8 کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد
                </small>
              </div>

              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="confirmPassword" class="font-medium text-sm">تکرار رمز عبور</label>
                <Password
                  id="confirmPassword"
                  :invalid="submitted && !isPasswordMatch"
                  v-model="form.confirmPassword"
                  fluid
                  toggleMask
                  :feedback="false"
                  placeholder="رمز عبور خود را دوباره وارد کنید"
                  class="w-full"
                  inputClass="w-full border-round-lg"
                />
                <small v-if="submitted && !isPasswordMatch" class="text-red-500">
                  رمز عبور و تکرار آن یکسان نیست
                </small>
              </div>
            </div>

            <Button
              type="submit"
              label="ثبت نام"
              class="w-full border-round-lg register-submit"
              :loading="loading"
              :disabled="!isFormValid || loading"
            />

            <p class="text-center text-sm m-0">
              قبلاً حساب کاربری دارید؟
              <router-link to="/login" class="text-primary no-underline font-medium mr-1">
                ورود به حساب
              </router-link>
            </p>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'

const toast = useToast()
const submitted = ref(false)
const loading = ref(false)

interface User {
  firstName: string
  lastName: string
  mobile: string
  nationalId: string
  password: string
}

const breadcrumbHome = {
  icon: 'pi pi-home',
  route: '/',
}

const breadcrumbItems = [
  {
    label: 'ثبت نام',
  },
]

const form = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  nationalId: '',
  password: '',
  confirmPassword: '',
})

const isFormValid = computed(() => {
  return (
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.mobile.trim() &&
    form.nationalId.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim()
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

const resetForm = () => {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
  })
}

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

  if (!isPasswordValid.value) {
    showToast('error', 'خطا', 'رمز عبور باید حداقل 8 کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد')
    return
  }

  if (!isPasswordMatch.value) {
    showToast('error', 'خطا', 'رمز عبور و تکرار آن یکسان نیست')
    return
  }

  const users = getUsers()

  const userExists = users.some(
    (user) => user.mobile === form.mobile || user.nationalId === form.nationalId,
  )

  if (userExists) {
    showToast('error', 'خطا', 'این کاربر قبلاً ثبت نام کرده است')
    return
  }

  loading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      firstName: form.firstName,
      lastName: form.lastName,
      mobile: form.mobile,
      nationalId: form.nationalId,
      password: form.password,
    }

    users.push(newUser)
    saveUsers(users)

    showToast('success', 'موفق', 'ثبت نام با موفقیت انجام شد')

    resetForm()
    submitted.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  font-family: 'Peyda', Tahoma, sans-serif;
}

:deep(.p-password-toggle-mask-icon) {
  cursor: pointer;
}

.register-card {
  max-width: 100%;
}

@media (min-width: 769px) {
  .register-card {
    max-width: 50%;
  }
}

.register-card :deep(.p-card-body) {
  padding: 2rem;
}

.register-card :deep(.p-card-content) {
  padding: 0;
}

.register-submit {
  background: #14b8a6 !important;
  border-color: #14b8a6 !important;
}

.register-submit:hover {
  background: #0d9488 !important;
  border-color: #0d9488 !important;
}

.illustration-clipboard {
  width: 14rem;
  height: 16rem;
  background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
  border: 2px solid #dbeafe;
}

.illustration-check {
  position: absolute;
  bottom: -0.75rem;
  left: -0.75rem;
  width: 3rem;
  height: 3rem;
}

.register-illustration :deep(.p-icon) {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
