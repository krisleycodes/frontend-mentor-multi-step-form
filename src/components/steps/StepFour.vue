<script setup lang="ts">
const props = defineProps<{
  plan: {
    type: string,
    billing: string,
    price: number
  },
  addOns: string[],
  availableAddOns: {
    id: string,
    name: string,
    desc: string,
    monthly: number,
    yearly: number
  }[],
  totalPrice: number
}>()

const emit = defineEmits(['change-plan'])
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-2">
      <h1 class="text-2xl md:text-3xl font-bold text-blue-950">Finishing up</h1>
      <p class="text-gray-400 mt-2 mb-6">Double-check everything looks OK before confirming.</p>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 mb-6">
      <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <div>
          <h3 class="text-blue-950 font-medium capitalize">
            {{ props.plan.type }} ({{ props.plan.billing === 'monthly' ? 'Monthly' : 'Yearly' }})
          </h3>
          <button
            @click="emit('change-plan')"
            class="text-gray-400 underline hover:text-purple-600 transition-colors text-sm"
          >
            Change
          </button>
        </div>
        <span class="text-blue-950 font-bold">
          ${{ props.plan.price }}/{{ props.plan.billing === 'monthly' ? 'mo' : 'yr' }}
        </span>
      </div>

      <div v-if="props.addOns.length > 0" class="space-y-3">
        <div v-for="addOn in props.availableAddOns.filter(a => props.addOns.includes(a.id))"
             :key="addOn.id"
             class="flex justify-between">
          <span class="text-gray-400 text-sm">{{ addOn.name }}</span>
          <span class="text-blue-950 text-sm">
            +${{ props.plan.billing === 'monthly' ? addOn.monthly : addOn.yearly }}/{{ props.plan.billing === 'monthly' ? 'mo' : 'yr' }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center px-6">
      <span class="text-gray-400 text-sm">
        Total (per {{ props.plan.billing === 'monthly' ? 'month' : 'year' }})
      </span>
      <span class="text-purple-600 font-bold text-lg">
        +${{ props.totalPrice }}/{{ props.plan.billing === 'monthly' ? 'mo' : 'yr' }}
      </span>
    </div>
  </div>
</template>
