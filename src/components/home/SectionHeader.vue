<template>
  <div v-if="title || hasSubtitle" class="section-header flex align-items-end w-full mb-4">
    <div v-if="title" class="section-header__tab font-semibold text-sm">
      {{ title }}
    </div>

    <div
      v-if="hasSubtitle"
      class="section-header__track relative flex align-items-end justify-content-center min-w-0"
      :class="title ? 'flex-1' : 'w-full'"
    >
      <div class="section-header__line absolute w-full" aria-hidden="true" />
      <span
        class="section-header__subtitle relative text-sm text-color-secondary px-3 text-center"
      >
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  subtitle?: string
}>()

const hasSubtitle = computed(() => Boolean(props.subtitle?.trim()))
</script>

<style scoped>
.section-header {
  max-width: 100%;
  min-width: 0;
}

.section-header__tab {
  background: #35a08d;
  color: #fff;
  padding: 0.625rem 1.25rem;
  border-top-left-radius: 0.625rem;
  flex-shrink: 0;
  z-index: 1;
  max-width: 55%;
}

.section-header__track {
  min-height: 2.5rem;
  min-width: 0;
}

.section-header__line {
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    transparent 0%,
    rgba(53, 160, 141, 0.2) 25%,
    #35a08d 50%,
    #35a08d 100%
  );
}

.section-header__subtitle {
  background: #f9fafb;
  transform: translateY(50%);
}
</style>
