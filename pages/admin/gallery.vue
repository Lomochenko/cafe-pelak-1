<template>
  <AdminLayout dir="rtl">
    <div class="gallery-admin">
      <div class="admin-header-section">
        <div>
          <h2 class="admin-section-title">تصاویر گالری</h2>
          <p class="admin-section-subtitle">{{ galleryImages.length }} تصویر در گالری</p>
        </div>
        <button @click="openAddForm" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          افزودن تصویر
        </button>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="gallery-grid">
        <div class="cards-grid">
          <div v-for="n in 6" :key="n" class="gallery-item-card skeleton-card">
            <div class="skeleton skeleton--rect skeleton--thumbnail"></div>
            <div class="card-content">
              <div class="skeleton skeleton--text skeleton--title"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Images Grid -->
      <div v-else-if="galleryImages.length" class="gallery-grid">
        <TransitionGroup name="card" tag="div" class="cards-grid">
          <div
            v-for="image in galleryImages"
            :key="image.id"
            class="gallery-item-card"
          >
            <div class="card-thumbnail">
              <img :src="image.thumb" :alt="image.alt" loading="lazy" />
            </div>
            <div class="card-content" dir="rtl">
              <p class="card-alt">{{ image.alt }}</p>
            </div>
            <div class="card-actions">
              <button @click="editImage(image)" class="action-btn" aria-label="Edit image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ویرایش
              </button>
              <button @click="confirmDelete(image)" class="action-btn action-btn--danger" aria-label="Delete image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                حذف
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div v-else class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <h3>هنوز تصویری وجود ندارد</h3>
        <p>اولین تصویر را آپلود کنید</p>
        <button @click="openAddForm" class="btn btn-primary">افزودن تصویر</button>
      </div>
    </div>

    <!-- Add/Edit Form Modal -->
    <Teleport to="body">
      <Transition name="modal" dir="rtl">
        <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">{{ editingImage ? 'ویرایش تصویر' : 'افزودن تصویر' }}</h3>
              <button class="modal-close" @click="closeForm" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form @submit.prevent="saveImage" class="modal-body">
              <div class="form-group">
                <label class="form-label">متن جایگزین (Alt) *</label>
                <input v-model="formData.alt" type="text" class="form-input" placeholder="توضیح تصویر برای دسترسی‌ پذیری" required />
                <span class="form-hint">متن توضیح برای دسترسی‌ پذیری ضروری است</span>
              </div>
              <div class="form-group">
                <label class="form-label">{{ editingImage ? 'تعویض تصویر (اختیاری)' : 'تصویر *' }}</label>
                <div 
                  class="file-drop-zone"
                  :class="{ 'has-file': filePreview, 'drag-over': dragOver }"
                  @click="$refs.fileInput.click()"
                  @dragover.prevent="dragOver = true"
                  @dragleave.prevent="dragOver = false"
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="file-input"
                  />
                  <div v-if="!filePreview" class="drop-zone-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>تصویر را بکشید و رها کنید، یا برای انتخاب کلیک کنید</p>
                    <span class="file-hint">فرمت‌های JPG, PNG, WebP (حداکثر ۵ مگابایت)</span>
                  </div>
                  <div v-else class="file-preview">
                    <img :src="filePreview" alt="پیش‌نمایش" />
                    <div class="file-info">
                      <span class="file-name">{{ fileName }}</span>
                      <span class="file-size">{{ formatFileSize(fileSize) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" @click="closeForm" class="btn btn-outline">انصراف</button>
                <button type="submit" class="btn btn-primary" :disabled="saving || (!formData.file && !editingImage)">
                  {{ saving ? 'در حال ذخیره...' : (editingImage ? 'به روز رسانی' : 'افزودن') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal" dir="rtl">
        <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
          <div class="modal-container modal-sm">
            <div class="modal-header">
              <h3 class="modal-title">حذف تصویر</h3>
              <button class="modal-close" @click="cancelDelete" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p>از حذف این تصویر مطمئن هستید؟</p>
              <p class="delete-warning">این عمل قابل بازگشت نیست.</p>
            </div>
            <div class="modal-footer">
              <button @click="cancelDelete" class="btn btn-outline">انصراف</button>
              <button @click="executeDelete" class="btn btn-danger" :disabled="deleting">
                {{ deleting ? 'در حال حذف...' : 'حذف' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGallery } from '~/composables/useGallery'
import { useToast } from '~/composables/useToast'
import AdminLayout from '~/components/AdminLayout.vue'

const toast = useToast()

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { galleryImages, addImage, updateImage, deleteImage: removeImage, fetchGallery } = useGallery()

onMounted(async () => {
  loading.value = true
  await fetchGallery()
  loading.value = false
})

const showForm = ref(false)
const showDeleteConfirm = ref(false)
const editingImage = ref(null)
const imageToDelete = ref(null)
const saving = ref(false)
const deleting = ref(false)
const dragOver = ref(false)
const loading = ref(false)

const formData = ref({
  src: '',
  thumb: '',
  alt: '',
  file: null,
})

const filePreview = ref(null)
const fileName = ref('')
const fileSize = ref(0)

const openAddForm = () => {
  editingImage.value = null
  formData.value = { src: '', thumb: '', alt: '', file: null }
  filePreview.value = null
  fileName.value = ''
  fileSize.value = 0
  showForm.value = true
}

const editImage = (image) => {
  editingImage.value = image
  formData.value = {
    src: image.src,
    thumb: image.thumb,
    alt: image.alt,
    file: null,
  }
  filePreview.value = image.thumb
  fileName.value = 'تصویر فعلی'
  fileSize.value = 0
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingImage.value = null
  formData.value = { src: '', thumb: '', alt: '', file: null }
  filePreview.value = null
  fileName.value = ''
  fileSize.value = 0
}

const handleFileSelect = (event) => {
  const input = event.target
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

const handleDrop = (event) => {
  dragOver.value = false
  if (event.dataTransfer?.files?.[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = (file) => {
  if (!file.type.startsWith('image/')) {
    toast.add('لطفاً یک فایل تصویری انتخاب کنید', 'error')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.add('حجم فایل نباید بیشتر از ۵ مگابایت باشد', 'error')
    return
  }
  fileName.value = file.name
  fileSize.value = file.size
  formData.value.file = file
  const reader = new FileReader()
  reader.onload = (e) => {
    filePreview.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const saveImage = async () => {
  if (!formData.value.file && !editingImage.value) return
  saving.value = true
  try {
    let imagePath = editingImage.value?.src || ''

    if (formData.value.file) {
      const fd = new FormData()
      fd.append('file', formData.value.file)
      const { path } = await $fetch('/api/upload', { method: 'POST', body: fd })
      imagePath = path
    }

    const imageData = { alt: formData.value.alt, src: imagePath, thumb: imagePath }

    if (editingImage.value) {
      await updateImage(editingImage.value.id, imageData)
    } else {
      await addImage(imageData)
    }
    closeForm()
  } catch (error) {
    console.error('Failed to save image:', error)
    toast.add('خطا در ذخیره تصویر: ' + (error?.message || 'خطای ناشناخته'), 'error')
  } finally {
    saving.value = false
  }
}

const confirmDelete = (image) => {
  imageToDelete.value = image
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  imageToDelete.value = null
}

const executeDelete = async () => {
  if (!imageToDelete.value) return
  deleting.value = true
  try {
    await removeImage(imageToDelete.value.id)
  } catch (error) {
    console.error('Failed to delete image:', error)
    toast.add('خطا در حذف تصویر: ' + (error?.message || 'خطای ناشناخته'), 'error')
  } finally {
    deleting.value = false
    cancelDelete()
  }
}
</script>

<style scoped>
.gallery-admin {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.admin-section-title {
  font-size: x-large;
  color: var(--color-headings);
  margin: 0 0 0.25rem;
  font-family: var(--font-digi);
}

.admin-section-subtitle {
  color: var(--color-text-light);
  font-size: 1.5rem;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-digi);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.gallery-item-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s var(--ease-snappy-polished), box-shadow 0.2s var(--ease-snappy-polished);
}

.gallery-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-thumbnail {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--color-bg-neutral);
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s var(--ease-snappy-polished);
}

.gallery-item-card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.card-content {
  padding: 1rem;
  flex: 1;
}

.card-alt {
  margin: 0;
  font-size: 1.375rem;
  color: var(--color-text-light);
  font-family: var(--font-digi);
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-neutral-light);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.6rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  font-size: large;
  font-family: var(--font-digi);
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy-polished);
}

.action-btn:hover {
  color: var(--color-text);
  border-color: var(--color-bg-primary);
}

.action-btn--danger:hover {
  color: #fff;
  border-color: #dc2626;
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-light);
  font-family: var(--font-digi);
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: var(--color-headings);
  font-family: var(--font-digi);
  font-size: x-large;
}

.empty-state p {
  margin: 0 0 1.5rem;
  font-size: large;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-container {
  background: var(--color-bg-neutral);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-sm {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  margin: 0;
  color: var(--color-headings);
  font-size: large;
  font-weight: 600;
  font-family: var(--font-digi);
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  display: flex;
}

.modal-close:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  font-family: var(--font-digi);
}
.modal-body strong {
  font-size: x-large;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: 1rem;
}
.form-group:last-child {
  margin-bottom: 0;
}

input, input::placeholder, textarea {
  font-family: var(--font-digi) !important;
  font-size: large !important;
  color: var(--color-text);
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: larger;
  font-weight: 500;
  color: var(--color-headings);
  font-family: var(--font-digi);
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  font-size: 1.4rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-bg-primary);
  box-shadow: 0 0 0 3px var(--color-bg-primary-light);
  font-size: large;
  color: var(--color-text);
}

.form-hint {
  display: block;
  /* margin-top: 0.25rem; */
  font-size: large;
  color: var(--color-text-light);
  font-family: var(--font-digi);
}

/* File Upload */
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
  padding: 1rem;
  border-style: solid;
  border-width: 1px;
}

.drop-zone-content {
  color: var(--color-text-light);
}

.drop-zone-content p {
  margin: 0.5rem 0;
  font-size: large;
  font-family: var(--font-digi);
}

.drop-zone-content svg {
  opacity: 0.5;
}

.file-hint {
  font-size: medium;
  opacity: 0.7;
  font-family: var(--font-digi);
}

.file-input {
  display: none;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-preview img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  margin: auto 0;
}

.file-info {
  /* flex: ; */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: right;
  margin-right: auto !important;
}

.file-name {
  font-weight: 500;
  font-size: large;
  color: var(--color-headings);
  font-family: var(--font-digi);
}

.file-size {
  font-size: large;
  color: var(--color-text-light);
}

.delete-warning {
  color: #dc2626;
  font-size: large;
  margin-top: 0.5rem;
}

/* Button Styles */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy-polished);
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--color-bg-primary);
  color: #fff;
  border-color: var(--color-bg-primary);
  font-size: large;
}

.btn-primary:hover {
  background: var(--color-bg-primary-dark);
}

.btn-outline {
  background: var(--color-bg-neutral-dark);
  color: var(--color-text);
  border-color: var(--color-border);
  font-size: large;
}

.btn-outline:hover {
  background: var(--color-bg);
  border-color: var(--color-text-light);
}

.btn-danger {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Transitions */
.card-enter-active,
.card-leave-active {
  transition: all 0.3s var(--ease-snappy-polished);
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s var(--ease-snappy-polished);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .admin-header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-header-section .btn {
    width: 100%;
    justify-content: center;
  }

  .modal-container {
    max-width: 100%;
    margin: 0.5rem;
  }

  .modal-footer {
    flex-direction: column;
  }

  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

/* Skeleton Loader */
.skeleton-card {
  pointer-events: none;
}

.skeleton-card .card-thumbnail {
  background: var(--color-bg-neutral-dark, #171a19);
}

.skeleton {
  background: linear-gradient(90deg, var(--color-bg-neutral-dark, #171a19) 25%, var(--color-bg-neutral-light, #232625) 50%, var(--color-bg-neutral-dark, #171a19) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm, 0.25rem);
}

.skeleton--rect {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md, 0.5rem);
}

.skeleton--text {
  height: 14px;
  margin-bottom: 0.6rem;
}

.skeleton--title {
  width: 65%;
  height: 18px;
}

.skeleton--thumbnail {
  aspect-ratio: 16/10;
  border-radius: var(--radius-md, 0.5rem);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>