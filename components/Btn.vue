<script setup lang="ts">
const props = defineProps<{
  label?: string | undefined
  icon?: string | undefined
  href?: string | undefined
  size?: 'sm' | 'md' | 'lg' | undefined
  color?: 'primary' | 'secondary' | 'success' | 'danger' | undefined
}>()

const getClass = () => {
  let classs = 'btn'
  if (props.size) {
    classs += ` btn-${props.size}`
  } else {
    classs += ' btn-md'
  }
  if (props.color) {
    classs += ` btn-${props.color}`
  } else {
    classs += ' btn-secondary'
  }
  if (props.icon) {
    classs += ' btn-with-icon'
  }
  return classs
}
</script>

<template>
  <RouterLink v-if="href" :to="href" :class="getClass()" active-class="active">
    <span v-if="icon" class="btn-icon"><img :src="icon" alt="" /></span>
    <span class="btn-text">{{ label }}</span>
  </RouterLink>
  <button v-else :class="getClass()">
    <span v-if="icon" class="btn-icon"><img :src="icon" alt="" /></span>
    <span class="btn-text">{{ label }}</span>
  </button>
</template>

<style scoped lang="css">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
}

.btn-md {
  padding: 6px 8px;
  font-size: 14px;
}

.btn-sm {
  padding: 4px 6px;
  font-size: 12px;
}

.btn-lg {
  padding: 8px 10px;
  font-size: 16px;
}

.btn-primary {
  background: var(--color-primary);
  color: #171717;
}

.btn-primary:hover {
  background: #00fa4c;
}

.btn-secondary {
  background: var(--color-secondary);
  color: #fff;
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: #171717;
}

.btn-success {
  background: var(--color-success);
  color: #171717;
}

.btn-success:hover {
  background: #00fa4c;
}

.btn-danger {
  background: var(--color-danger);
  color: #171717;
}

.btn-danger:hover {
  background: #fa00a0;
}

.btn-secondary.active {
  background: var(--color-primary);
  color: #171717;
}

.btn-with-icon {
  justify-content: start;
  gap: 8px;
}

.btn-with-icon .btn-icon {
  width: 24px;
  height: 24px;
}
</style>
