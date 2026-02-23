<template>
  <div class="gallery-admin">
    <div class="admin-header-section">
      <h2 class="admin-section-title">Gallery Management</h2>
      <button @click="showAddForm = true" class="btn btn-primary">Add New Image</button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm || editingImage" class="form-modal">
      <div class="form-container">
        <h3>{{ editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image' }}</h3>
        <form @submit.prevent="saveImage">
          <div class="form-group">
            <label for="src">Image URL</label>
            <input v-model="formData.src" id="src" type="text" required />
          </div>

          <div class="form-group">
            <label for="thumb">Thumbnail URL</label>
            <input v-model="formData.thumb" id="thumb" type="text" required />
          </div>

          <div class="form-group">
            <label for="alt">Alt Text</label>
            <input v-model="formData.alt" id="alt" type="text" required />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" @click="cancelEdit" class="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Gallery Images Grid -->
    <div class="gallery-grid">
      <div v-for="image in galleryImages" :key="image.id" class="gallery-item-card">
        <img :src="image.thumb" :alt="image.alt" />
        <div class="item-overlay">
          <p>{{ image.alt }}</p>
          <div class="item-actions">
            <button @click="editImage(image)" class="btn btn-sm btn-secondary">Edit</button>
            <button @click="deleteImage(image.id)" class="btn btn-sm btn-outline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/composables/useGallery'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { galleryImages, addImage, updateImage, deleteImage: removeImage } = useGallery()

const showAddForm = ref(false)
const editingImage = ref<GalleryImage | null>(null)
const formData = ref({
  src: '',
  thumb: '',
  alt: '',
})

const editImage = (image: GalleryImage) => {
  editingImage.value = image
  formData.value = { ...image }
  showAddForm.value = false
}

const saveImage = () => {
  if (editingImage.value) {
    updateImage(editingImage.value.id, formData.value)
  } else {
    addImage(formData.value)
  }
  cancelEdit()
}

const cancelEdit = () => {
  showAddForm.value = false
  editingImage.value = null
  formData.value = {
    src: '',
    thumb: '',
    alt: '',
  }
}

const deleteImage = (id: number) => {
  if (confirm('Are you sure you want to delete this image?')) {
    removeImage(id)
  }
}
</script>

<style scoped>
.gallery-admin {
  padding: var(--spacing-4);
}

.admin-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.admin-section-title {
  font-size: var(--font-size-4);
  color: var(--color-1-dark);
}

.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.form-container {
  background: white;
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: var(--spacing-3);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-1);
  font-weight: var(--font-weight-medium);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-sm);
}

.form-actions {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-3);
}

.gallery-item-card {
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.gallery-item-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--spacing-2);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item-card:hover .item-overlay {
  transform: translateY(0);
}

.item-overlay p {
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size--1);
}

.item-actions {
  display: flex;
  gap: var(--spacing-2);
}

.btn-sm {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size--1);
}
</style>