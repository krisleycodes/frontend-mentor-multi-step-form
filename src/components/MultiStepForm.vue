<script setup lang="ts">
import { ref, computed } from 'vue';
import ThankYou from './steps/ThankYou.vue'
import StepOne from './steps/StepOne.vue';
import StepTwo from './steps/StepTwo.vue';
import StepThree from './steps/StepThree.vue';
import StepFour from './steps/StepFour.vue';
import { motion } from 'motion-v';

const currentStep = ref(1);

const plans = {
  monthly: {
    arcade: { price: 9, freeMonths: 0 },
    advanced: { price: 12, freeMonths: 0 },
    pro: { price: 15, freeMonths: 0 }
  },
  yearly: {
    arcade: { price: 90, freeMonths: 2 },
    advanced: { price: 120, freeMonths: 2 },
    pro: { price: 150, freeMonths: 2 }
  }
};

const availableAddOns = [
  {
    id: 'online-service',
    name: 'Online Service',
    desc: 'Access to multiplayer games',
    monthly: 1,
    yearly: 10
  },
  {
    id: 'larger-storage',
    name: 'Larger Storage',
    desc: 'Extra 1TB of cloud save',
    monthly: 2,
    yearly: 20
  },
  {
    id: 'customizable-profile',
    name: 'Customizable Profile',
    desc: 'Custom theme on your profile',
    monthly: 2,
    yearly: 20
  }
];

const formData = ref({
  name: '',
  email: '',
  phone: '',
  plan: {
    type: 'arcade',
    billing: 'monthly',
    price: plans.monthly.arcade.price
  },
  addOns: [] as string[]
});

const computedTotalPrice = computed(() => {
  let total = formData.value.plan.price;
  for (const addOn of availableAddOns) {
    if (formData.value.addOns.includes(addOn.id)) {
      total += formData.value.plan.billing === 'monthly' ? addOn.monthly : addOn.yearly;
    }
  }
  return total;
});

const toggleAddOn = (id: string) => {
  const index = formData.value.addOns.indexOf(id);
  if (index > -1) {
    formData.value.addOns.splice(index, 1);
  } else {
    formData.value.addOns.push(id);
  }
};

const nextStep = () => {
  if (currentStep.value === 1) {
    if (stepOneRef.value && !stepOneRef.value.validate()) {
      return;
    }
  }
  if (currentStep.value === 2 && !formData.value.plan.type) {
    alert('Please select a plan.');
    return;
  }
  if (currentStep.value < 5) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const handleChangePlan = () => {
  currentStep.value = 2;
};

const stepOneRef = ref()
</script>

<template>
<div class="bg-blue-100 flex items-center justify-center min-h-screen p-4 md:p-0 overflow-auto">
    <motion.div
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="flex flex-col md:flex-row overflow-hidden w-full max-w-[1200px] min-h-[600px] bg-white shadow-xl p-0 md:p-5 justify-between rounded-lg"
    >
      <!-- Mobile Step Indicator -->
      <motion.div
        class="md:hidden w-full h-[172px] relative"
      >
        <img src="../assets/bg-sidebar-mobile.svg" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 z-[2] flex gap-4">
          <div
            v-for="(step, index) in [1, 2, 3, 4]"
            :key="index"
            class="step-number w-8 h-8 rounded-full flex items-center justify-center font-bold border border-blue-200 transition-colors"
            :class="{ 'bg-blue-200 text-blue-950': currentStep === step, 'text-white': currentStep !== step }"
          >
            {{ step }}
          </div>
        </div>
      </motion.div>

      <!-- Desktop Sidebar -->
      <motion.div
        :initial="{ x: -50, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        class="sidebar hidden md:block relative w-[274px] h-[568px]"
      >
        <img src="../assets/bg-sidebar-desktop.svg" class="absolute inset-0 w-full h-full" />
        <div class="absolute top-11 left-9 z-[2] flex flex-col gap-6">
          <motion.div
            v-for="(step, index) in [1, 2, 3, 4]"
            :key="index"
            :initial="{ x: -30, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.4, delay: 0.3 + index * 0.1, ease: 'easeOut' }"
            class="flex gap-4 items-center"
          >
            <div
              class="step-number w-8 h-8 rounded-full flex items-center justify-center font-bold border border-blue-200 transition-colors"
              :class="{ 'bg-blue-200 text-blue-950': currentStep === step, 'text-white': currentStep !== step }"
            >
              {{ step }}
            </div>
            <div class="step-text text-white">
              <div class="text-xs opacity-75">STEP {{ step }}</div>
              <div class="font-semibold text-sm tracking-wider">
                {{ ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'][step - 1] }}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        :initial="{ x: 50, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
        class="content flex-1 lg:pt-10 px-4 md:px-8 lg:px-16 xl:px-24 h-full w-full flex flex-col"
      >
        <div class="flex-1 pb-10 md:pb-20">
        <motion.div
          v-if="currentStep === 1"
          :initial="{ x: 100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        >
          <StepOne v-model="formData" ref="stepOneRef"/>
        </motion.div>

        <motion.div
          v-if="currentStep === 2"
          :initial="{ x: 100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        >
          <StepTwo v-model="formData.plan" :plans="plans" />
        </motion.div>

        <motion.div
          v-if="currentStep === 3"
          :initial="{ x: 100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        >
          <StepThree
            :addOns="formData.addOns"
            :billing="formData.plan.billing"
            :availableAddOns="availableAddOns"
            @toggle-add-on="toggleAddOn"
          />
        </motion.div>

        <motion.div
          v-if="currentStep === 4"
          :initial="{ x: 100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        >
          <StepFour
            :plan="formData.plan"
            :addOns="formData.addOns"
            :availableAddOns="availableAddOns"
            :totalPrice="computedTotalPrice"
            @change-plan="handleChangePlan"
          />
        </motion.div>
      </div>

      <motion.div
        v-if="currentStep === 5"
        :initial="{ x: 100, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.4, ease: 'easeOut' }"
      >
        <ThankYou />
      </motion.div>

      <div v-if="currentStep < 5" class="flex items-center justify-between bg-white p-4 md:p-0 md:bg-transparent fixed md:static bottom-0 left-0 right-0">
          <motion.div
            v-if="currentStep > 1"
            :whileHover="{ x: -5, scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            :transition="{ duration: 0.2 }"
          >
            <button @click="prevStep" class="text-gray-400 hover:text-blue-950 font-medium transition-colors">
              Go Back
            </button>
          </motion.div>

          <div v-if="currentStep === 1"></div>

          <motion.div
            :whileHover="{ scale: 1.05, y: -2 }"
            :whileTap="{ scale: 0.95 }"
            :transition="{ duration: 0.2, ease: 'easeOut' }"
          >
            <button
              @click="currentStep === 4 ? nextStep() : nextStep()"
              :class="[
                'text-white px-4 py-2 md:px-6 md:py-3 rounded-md hover:opacity-75 transition-all duration-300',
                currentStep === 4 ? 'bg-purple-600' : 'bg-blue-950'
              ]"
            >
              {{ currentStep === 4 ? 'Confirm' : 'Next Step' }}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</template>

<style>

.step-number {
  transition: all 0.2s ease;
}
@media (max-width: 768px) {
  .content {
    margin-top: -40px;
    background: white;
    border-radius: 10px;
    padding-top: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: relative;
  }
}
</style>
