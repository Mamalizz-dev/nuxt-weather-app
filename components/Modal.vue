<script setup lang="ts">

// emits

    const emit = defineEmits(["update:modelValue" , 'closeModal'])

// props

    const props = defineProps({
        modelValue: {
          default: false,
        },
        closeOnBlur: {
            type: Boolean,
            default: true
        }
    })


// methods
    const closeToastModal = () => {
        emit('update:modelValue', false)
        emit('closeModal')
    }
    
</script>

<template>
     <div
          class="fixed inset-0 bg-[#000000d0] animate__animated animate__fadeIn duration-75 select-none"
          style="z-index: 99999999999 !important"
          @click="closeOnBlur ? closeToastModal() : null"
     >
          <div
               class="relative flex items-center justify-center w-full h-full"
               style="z-index: 999999999 !important"
          >
               <div
                    @click.stop
                    class="modal relative flex flex-col min-h-[50vh] max-h-[75vh] overflow-scroll items-center justify-center w-11/12 gap-4 px-6 pt-16 pb-14 md:w-[30rem] shrink-0 rounded-[2.188rem] shadow-md animate__animated animate__fadeInDown"
               >
                    <button  class="flex justify-end w-full h-12 pr-2" @click="closeToastModal">
                        <i class="text-lg text-white fa-solid fa-xmark"></i>
                    </button>
                    <slot />
               </div>
          </div>
     </div>
</template>

<style>

.modal {
    background: #aa25c933;
    box-shadow: 0 1px 10px 0 rgba(109, 31, 135, 1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8px);
    border: 2px solid rgba(255, 255, 255, .3);
}

</style>