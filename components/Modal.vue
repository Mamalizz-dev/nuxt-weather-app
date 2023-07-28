<script lang="ts">

export default defineComponent({
     
  props: {
     modelValue: {
          type: Boolean,
          default: false,
     },
     closeOnBlur: {
          type: Boolean,
          default: true
     }
  },

  emits: ["update:modelValue" , 'closeModal'],

  setup(props, { emit }) {
     const { modelValue } = toRefs(props);

     const closeToastModal = () => {
          emit('update:modelValue', false)
          emit('closeModal')
     }

     return {
          modelValue,
          closeToastModal,
     };
  },
});
</script>

<template>
     <div
          class="fixed inset-0 bg-[#0000009e] animate__animated animate__fadeIn duration-75 select-none"
          style="z-index: 99999999999 !important"
          @click="closeOnBlur ? closeToastModal() : null"
     >
          <div
               class="relative flex items-center justify-center w-full h-full"
               style="z-index: 999999999 !important"
          >
               <div
                    @click.stop
                    class="flex flex-col overflow-visible items-center justify-center w-11/12 gap-4 relative px-10 py-14 md:w-[30rem] bg-white shrink-0 rounded-[2.188rem] shadow-md animate__animated animate__fadeInDown"
               >

                    <slot />
               </div>
          </div>
     </div>
</template>