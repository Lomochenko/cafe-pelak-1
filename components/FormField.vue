<template>
  <div class="form-field" :class="{ 'has-error': error }">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="required-indicator" aria-hidden="true">*</span>
    </label>

    <div class="form-control-wrapper">
      <!-- Text, Email, Password, Number -->
      <input
        v-if="isTextInput"
        :id="inputId"
        :type="effectiveType"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="describedById"
        v-model="modelValue"
        @blur="$emit('blur')"
        class="form-input"
      />

      <!-- Textarea -->
      <textarea
        v-else-if="type === 'textarea'"
        :id="inputId"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :aria-invalid="!!error"
        :aria-describedby="describedById"
        v-model="modelValue"
        @blur="$emit('blur')"
        class="form-input form-textarea"
      ></textarea>

      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        :id="inputId"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="describedById"
        v-model="modelValue"
        @blur="$emit('blur')"
        class="form-input form-select"
      >
        <option v-for="opt in selectOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        <slot />
      </select>

      <!-- File Upload -->
      <div
        v-else-if="type === 'file'"
        class="file-drop-zone"
        :class="{ 'has-file': filePreview, 'drag-over': dragOver }"
        @click="$refs.fileInput?.click()"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false"
        @drop.prevent="handleDrop"
      >
        <input
          ref="fileInput"
          type="file"
          :accept="accept"
          @change="handleFileSelect"
          class="file-input"
          aria-label="Choose file"
        />

        <div v-if="!filePreview" class="drop-zone-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p>Drag & drop an image here, or click to browse</p>
          <span class="file-hint">{{ accept }}</span>
        </div>

        <div v-else class="file-preview">
          <img :src="filePreview" :alt="fileName" />
          <div class="file-info">
            <span class="file-name">{{ fileName }}</span>
            <span class="file-size">{{ formatFileSize(fileSize) }}</span>
          </div>
          <button type="button" class="file-remove" @click.stop="removeFile" aria-label="Remove file">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="hint && !error" :id="describedById" class="form-hint">{{ hint }}</div>
    <div v-else-if="error" :id="describedById" class="form-error" role="alert">{{ error }}</div>

    <button
      v-if="type === 'password'"
      type="button"
      class="password-toggle"
      @click="showPassword = !showPassword"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
      :aria-pressed="showPassword"
    >
      <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: any
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'file'
  id?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  hint?: string
  error?: string
  rows?: number
  accept?: string
  selectOptions?: { value: string; label: string }[]
}

interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showPassword = ref(false)
const dragOver = ref(false)
const filePreview = ref<string | null>(null)
const fileName = ref('')
const fileSize = ref(0)

const inputId = computed(() => props.id || `field-${Math.random().toString(36).slice(2, 9)}`)
const describedById = computed(() => `${inputId.value}-hint`)
const isTextInput = computed(() => ['text', 'email', 'password', 'number'].includes(props.type || 'text'))
const effectiveType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type || 'text'
})

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files?.[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB')
    return
  }
  fileName.value = file.name
  fileSize.value = file.size
  const reader = new FileReader()
  reader.onload = (e) => {
    filePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
  emit('update:modelValue', file)
}

const removeFile = () => {
  filePreview.value = null
  fileName.value = ''
  fileSize.value = 0
  emit('update:modelValue', null)
  ;(document.getElementById(props.id || '') as HTMLInputElement)?.value = ''
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-headings);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required-indicator {
  color: var(--color-error-content);
}

.form-control-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-bg-primary);
  box-shadow: 0 0 0 3px var(--color-bg-primary-light);
  background: var(--color-bg-neutral);
}

.form-input::placeholder {
  color: var(--color-text-light);
  opacity: 0.7;
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239fa1a1' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}

.file-drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  background: var(--color-bg);
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}

.file-drop-zone:hover,
.file-drop-zone.drag-over {
  border-color: var(--color-bg-primary);
  background: var(--color-bg-neutral);
}

.file-drop-zone.has-file {
  padding: 0;
  border-style: solid;
  border-width: 1px;
}

.drop-zone-content {
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.drop-zone-content p {
  margin: 0;
  font-size: 0.9rem;
}

.drop-zone-content svg {
  opacity: 0.5;
}

.file-hint {
  font-size: 0.75rem;
  opacity: 0.7;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.file-preview img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  color: var(--color-headings);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.file-remove:hover {
  background: var(--color-error);
  border-color: var(--color-error-content);
  color: var(--color-error-content);
}

.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.form-error {
  font-size: 0.75rem;
  color: var(--color-error-content);
}

.password-toggle {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.25rem;
  color: var(--color-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}

.password-toggle:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.has-error .form-input {
  border-color: var(--color-error-content);
}

.has-error .form-input:focus {
  box-shadow: 0 0 0 3px var(--color-error);
}
</style>