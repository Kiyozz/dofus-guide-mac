<script setup lang="ts">
const props = defineProps<{
  label?: string | undefined
  icon?: string | undefined
  href?: string | undefined
  size?: 'xs' | 'sm' | 'md' | 'lg' | undefined
  color?: 'light' | 'primary' | 'secondary' | 'success' | 'danger' | undefined
  iconOnly?: boolean | undefined
  disabled?: boolean | undefined
  variant?: 'outline' | 'solid' | undefined | 'soft'
}>()
const svgContent = ref<string | null>(null)
const checkIsSvg = () => {
  return props.icon.endsWith('.svg')
}

// Vérifier si l'icône est un SVG en se basant sur l'extension
watch(
  () => props.icon,
  async (newIcon) => {
    if (newIcon && newIcon?.endsWith('.svg')) {
      try {
        const response = await fetch(newIcon)
        if (response.ok) {
          svgContent.value = await response.text() // On stocke le contenu du SVG
        }
      } catch (error) {
        console.error('Erreur lors du chargement du SVG:', error)
        svgContent.value = null
      }
    } else {
      svgContent.value = null
    }
  },
  { immediate: true }
)
</script>

<template>
  <RouterLink
    v-if="href"
    :to="href"
    :class="[
      'btn',
      `btn-${props.size || 'md'}`,
      `btn-${props.color || 'secondary'}`,
      { 'btn-with-icon': props.icon && !props.iconOnly, 'btn-icon-only': props.iconOnly },
      `${props.variant ? `btn-${props.variant}` : ''}`
    ]"
    active-class="active"
  >
    <span v-if="icon && !checkIsSvg()" class="btn-icon">
      <img :src="icon" alt="" />
    </span>
    <span v-else-if="icon && checkIsSvg()" v-html="svgContent" class="btn-icon" />
    <span v-if="!iconOnly" class="btn-text">{{ label }}</span>
  </RouterLink>
  <button
    v-else
    :class="[
      'btn',
      `btn-${props.size || 'md'}`,
      `btn-${props.color || 'secondary'}`,
      { 'btn-with-icon': props.icon && !props.iconOnly, 'btn-icon-only': props.iconOnly },
      `${props.variant ? `btn-${props.variant}` : ''}`
    ]"
    :disabled="disabled"
  >
    <span v-if="icon && !checkIsSvg()" class="btn-icon">
      <img :src="icon" alt="" />
    </span>
    <span v-else-if="icon && checkIsSvg()" v-html="svgContent" class="btn-icon" />
    <span v-if="!iconOnly" class="btn-text">{{ label }}</span>
  </button>
</template>

<style scoped lang="css">
/* Base btn style */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
}

/* Size */
.btn-md {
  padding: 0.5rem;
  font-size: 1rem;
}

.btn-sm {
  padding: 0.25rem;
  font-size: 0.75rem;
}

.btn-xs {
  padding: 0.125rem;
  font-size: 0.5rem;
}

.btn-lg {
  padding: 0.5rem;
  font-size: 1.25rem;
}

/* Color */
.btn-secondary {
  background: var(--color-bg-dark);
  color: var(--color-light);
}

.btn-primary {
  background: var(--color-bg-primary);
  color: var(--color-secondary);
}

.btn-light {
  background: var(--color-bg-light);
  color: var(--color-secondary);
}

.btn-success {
  background: var(--color-success);
  color: var(--color-secondary);
}

.btn-danger {
  background: var(--color-danger);
  color: var(--color-secondary);
}

.btn-warning {
  background: var(--color-warning);
  color: var(--color-secondary);
}

/* Outline Variant */
.btn-outline {
  background: transparent;
  color: var(--color-light);
}

.btn-outline.btn-primary:hover {
  background: transparent;
  color: var(--color-primary);
}

.btn-outline.btn-light:hover {
  background: transparent;
  color: var(--color-light);
}

.btn-outline.btn-success:hover {
  background: transparent;
  color: var(--color-success);
}

.btn-outline.btn-danger:hover {
  background: transparent;
  color: var(--color-danger);
}

.btn-outline.btn-secondary:hover {
  background: transparent;
  color: var(--color-primary);
}

.btn-outline.btn-warning:hover {
  background: transparent;
  color: var(--color-warning);
}

/* Solid Variant */

.btn-solid {
  background: var(--color-bg-primary);
  color: var(--color-secondary);
}

/* Soft Variant */
.btn-soft {
  background: transparent;
  border: solid 1px var(--color-bg-light);
  color: var(--color-bg-light);
}

.btn-soft.btn-primary:hover {
  background: transparent;
  color: var(--color-primary);
  border: solid 1px var(--color-primary);
}

.btn-soft.btn-light:hover {
  background: transparent;
  color: var(--color-light);
  border: solid 1px var(--color-light);
}

.btn-soft.btn-success:hover {
  background: transparent;
  color: var(--color-success);
  border: solid 1px var(--color-success);
}

.btn-soft.btn-danger:hover {
  background: transparent;
  color: var(--color-danger);
  border: solid 1px var(--color-danger);
}

.btn-soft.btn-secondary:hover {
  background: transparent;
  color: var(--color-primary);
  border: solid 1px var(--color-primary);
}

.btn-soft.btn-warning:hover {
  background: transparent;
  color: var(--color-warning);
  border: solid 1px var(--color-warning);
}

/* Icon */
.btn-with-icon {
  display: flex;
  align-items: center;
  justify-content: start;
}

.btn-icon img {
  width: 1.5rem;
  height: 1.5rem;
}

.btn-primary:hover {
  background: var(--color-primary);
  color: var(--color-secondary);
}

.btn-light:hover {
  background: var(--color-light);
  color: var(--color-secondary);
}

.btn-success:hover {
  background: var(--color-success);
  color: var(--color-secondary);
}

.btn-danger:hover {
  background: var(--color-danger);
  color: var(--color-secondary);
}

.btn-secondary:hover {
  background: var(--color-bg-primary);
  color: var(--color-secondary);
}

.btn-warning:hover {
  background: var(--color-warning);
  color: var(--color-secondary);
}

/* Disabled */
.btn:disabled {
  background: var(--color-bg-dark);
  color: #777575;
}

.btn:disabled:hover {
  background: var(--color-bg-dark);
  color: #777575;
  cursor: not-allowed;
}

/* Active */
.active {
  background: var(--color-bg-primary);
  color: var(--color-secondary);
}
</style>
