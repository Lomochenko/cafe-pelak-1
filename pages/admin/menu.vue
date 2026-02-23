<template>
  <div class="menu-admin">
    <div class="admin-header-section">
      <h2 class="admin-section-title">Menu Management</h2>
      <button @click="showAddForm = true" class="btn btn-primary">Add New Item</button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm || editingItem" class="form-modal">
      <div class="form-container">
        <h3>{{ editingItem ? 'Edit Menu Item' : 'Add New Menu Item' }}</h3>
        <form @submit.prevent="saveItem">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="formData.name" id="name" type="text" required />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="formData.description" id="description" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="price">Price</label>
            <input v-model="formData.price" id="price" type="text" required />
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select v-model="formData.category" id="category" required>
              <option value="signature-blends">Signature Blends</option>
              <option value="pastries">Pastries</option>
              <option value="gourmet-treats">Gourmet Treats</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" @click="cancelEdit" class="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Menu Items List -->
    <div class="menu-items-list">
      <div v-for="item in menuItems" :key="item.id" class="menu-item-card">
        <div class="item-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <p class="item-price">{{ item.price }}</p>
          <span class="item-category">{{ item.category }}</span>
        </div>
        <div class="item-actions">
          <button @click="editItem(item)" class="btn btn-sm btn-secondary">Edit</button>
          <button @click="deleteItem(item.id)" class="btn btn-sm btn-outline">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/composables/useMenu'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu()

const showAddForm = ref(false)
const editingItem = ref<MenuItem | null>(null)
const formData = ref({
  name: '',
  description: '',
  price: '',
  category: 'signature-blends',
})

const editItem = (item: MenuItem) => {
  editingItem.value = item
  formData.value = { name: item.name, description: item.description, price: String(item.price), category: item.category }
  showAddForm.value = false
}

const saveItem = () => {
  const itemData = {
    name: formData.value.name,
    description: formData.value.description,
    price: Number(formData.value.price),
    category: formData.value.category,
  }
  if (editingItem.value) {
    updateMenuItem(editingItem.value.id, itemData)
  } else {
    addMenuItem(itemData)
  }
  cancelEdit()
}

const cancelEdit = () => {
  showAddForm.value = false
  editingItem.value = null
  formData.value = {
    name: '',
    description: '',
    price: '',
    category: 'signature-blends',
  }
}

const deleteItem = (id: number) => {
  if (confirm('Are you sure you want to delete this item?')) {
    deleteMenuItem(id)
  }
}
</script>

<style scoped>
.menu-admin {
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
.form-group textarea,
.form-group select {
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

.menu-items-list {
  display: grid;
  gap: var(--spacing-3);
}

.menu-item-card {
  background: var(--color-neutral-1);
  padding: var(--spacing-3);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.item-info h4 {
  margin-bottom: var(--spacing-1);
  color: var(--color-1-dark);
}

.item-price {
  font-weight: var(--font-weight-bold);
  color: var(--color-2);
  margin: var(--spacing-1) 0;
}

.item-category {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  background: var(--color-1-light);
  color: var(--color-1-dark);
  border-radius: var(--border-radius-sm);
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

