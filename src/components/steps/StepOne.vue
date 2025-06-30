<script setup lang="ts">
import { ref, watch } from 'vue';
import { Transition } from 'vue';

const props = defineProps<{
  modelValue: {
    name: string;
    email: string;
    phone: string;
  };
}>();

const emit = defineEmits(['update:modelValue']);

const localForm = ref({ ...props.modelValue });

const errors = ref({
  name: '',
  email: '',
  phone: '',
});

watch(localForm, (newVal, oldVal) => {
  // Emit the updated value
  emit('update:modelValue', newVal);

  // Clear errors when user starts typing
  if (newVal.name !== oldVal.name && errors.value.name) {
    errors.value.name = '';
  }
  if (newVal.email !== oldVal.email && errors.value.email) {
    errors.value.email = '';
  }
  if (newVal.phone !== oldVal.phone && errors.value.phone) {
    errors.value.phone = '';
  }
}, { deep: true });

const validate = () => {
  let isValid = true;
  errors.value = { name: '', email: '', phone: '' };

  if (!localForm.value.name) {
    errors.value.name = 'Name is required';
    isValid = false;
  }

  if (!localForm.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(localForm.value.email)) {
      errors.value.email = 'Enter a valid email';
      isValid = false;
    }
  }

  if (!localForm.value.phone) {
    errors.value.phone = 'Phone is required';
    isValid = false;
  }

  return isValid;
};

defineExpose({ validate });
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Personal info</h1>
    <p class="text-gray-400 mb-6">Please provide your name, email address, and phone number.</p>

    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <label class="block text-sm text-blue-950">Name</label>
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-2"
        >
          <p v-if="errors.name" class="text-red-500 text-xs font-bold">{{ errors.name }}</p>
        </Transition>
      </div>
      <input
        v-model="localForm.name"
        type="text"
        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        :class="{ 'border-red-500': errors.name }"
        placeholder="e.g. Stephen King"
      />
    </div>

    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <label class="block text-sm text-blue-950">Email Address</label>
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-2"
        >
          <p v-if="errors.email" class="text-red-500 text-xs font-bold">{{ errors.email }}</p>
        </Transition>
      </div>
      <input
        v-model="localForm.email"
        type="email"
        class="w-full border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        :class="{ 'border-red-500': errors.email }"
        placeholder="e.g. stephenking@lorem.com"
      />
    </div>

    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <label class="block text-sm text-blue-950">Phone Number</label>
        <p v-if="errors.phone" class="text-red-500 text-xs font-bold transition-opacity duration-300">{{ errors.phone }}</p>
      </div>
      <input
        v-model="localForm.phone"
        type="text"
        class="w-full border rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        :class="{ 'border-red-500': errors.phone }"
        placeholder="e.g. +1 234 567 890"
      />
    </div>
  </div>
</template>
