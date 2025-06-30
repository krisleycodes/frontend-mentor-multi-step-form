<script setup lang="ts">
import {
  computed
} from 'vue'

import arcadeIcon from '../../assets/icon-arcade.svg'
import advancedIcon from "../../assets/icon-advanced.svg"
import proIcon from "../../assets/icon-pro.svg"

const icons = {
  arcade: arcadeIcon,
  advanced: advancedIcon,
  pro: proIcon
}

const props = defineProps < {
  modelValue: {
    type: string,
    billing: string,
    price: number
  }
  plans: Record<string, any>
} > ()

const emit = defineEmits(['update:modelValue'])



const toggleBilling = () => {
  const newBilling = props.modelValue.billing === 'monthly' ? 'yearly' : 'monthly'
  emit('update:modelValue', {
    ...props.modelValue,
    billing: newBilling,
    price: props.plans[newBilling][props.modelValue.type]?.price ?? 0,
  })
}
</script>

<template>
<div class="h-full mb-9 flex flex-col">
    <div class="mb-10 mt-5 space-y-2">
      <h2 class="font-bold text-4xl text-blue-950">Select your Plan</h2>
      <p class="text-gray-500 text-[17px]">You have the option of monthly or yearly billing.</p>
    </div>

    <div class="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
  <div
    v-for="(plan, key) in props.plans[props.modelValue.billing]"
    :key="key"
    @click="emit('update:modelValue', { ...props.modelValue, type: key, price:plan.price })"
    class="flex-1 flex md:flex-col md:items-start items-center gap-4 px-3 py-6 border rounded-lg cursor-pointer hover:border-purple-600 border-gray-300 transition-colors"
    :class="{ 'border-purple-600 bg-gray-100': props.modelValue.type === key }">
    <img :src="icons[key]">
    <div class="">
      <h3 class="text-purple-600 font-medium capitalize">{{ key }}</h3>
      <p class="text-gray-500 text-sm">
        ${{ plan.price }}/{{ props.modelValue.billing === 'monthly' ? 'mo' : 'yr' }}
      </p>
      <p v-if="props.modelValue.billing === 'yearly'" class="text-blue-950 text-xs mt-1">
        {{ plan.freeMonths }} months free
      </p>
    </div>
  </div>
</div>

<div class="flex items-center justify-center gap-6 bg-gray-100 p-4 rounded-lg">
  <span class="text-blue-950 font-medium" :class="{ 'opacity-50': props.modelValue.billing !== 'monthly' }">Monthly</span>
  <button @click="toggleBilling" class="w-12 h-6 transition-all items-center flex p-1 rounded-full bg-blue-950">
    <span class="block w-4 h-4 bg-white rounded-full transition-transform"
          :class="{ 'translate-x-6': props.modelValue.billing === 'yearly' }"></span>
  </button>
  <span class="text-blue-950 font-medium" :class="{ 'opacity-50': props.modelValue.billing !== 'yearly' }">Yearly</span>
</div>
</div>
</template>

<style scoped>
</style>
