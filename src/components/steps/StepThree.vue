    <script setup lang="ts">
      interface AddOn {
        id:string,
        name: string,
        desc: string,
        monthly: number,
        yearly: number
      }

      const props = defineProps<{
        addOns: string[];
        billing: string
        availableAddOns: AddOn[]
      }>()

      const emit = defineEmits<{
        (e: 'toggle-add-on', addOnId: string): void
      }>()
    </script>

<template>
  <div class="h-full mt-10 flex flex-col">
    <div class="mb-2">
      <h1 class="text-2xl md:text-3xl font-bold text-blue-950">Pick add-ons</h1>
      <p class="text-gray-400 mt-2 mb-6">Add-ons help enhance your gaming experience.</p>
    </div>

    <div class="flex flex-col gap-3 space-y-3">
      <div
      v-for="addOn in props.availableAddOns"
      :key="addOn.id"
      @click="emit('toggle-add-on', addOn.id)"
      class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors"
        :class="{ 'border-purple-600 bg-gray-100': props.addOns.includes(addOn.id) }"
      >
        <input
          type="checkbox"
          :checked="props.addOns.includes(addOn.id)"
          class="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600 mr-4"
          @click.stop="emit('toggle-add-on', addOn.id)"
        >
        <div class="flex-1">
          <h3 class="text-blue-950 font-medium">{{ addOn.name }}</h3>
          <p class="text-gray-400 text-sm">{{ addOn.desc }}</p>
        </div>
        <span class="text-purple-600 text-sm whitespace-nowrap">
          +${{ props.billing === 'monthly' ? addOn.monthly + '/mo' : addOn.yearly + '/yr' }}
        </span>
      </div>
    </div>
  </div>
</template>
