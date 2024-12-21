import { ref, type Ref } from 'vue';

export const useDialog = (): [Ref<boolean>, () => void]  => {
  const isOpen = ref<boolean>(false);

  function closeDialog(): void {
    isOpen.value = false;
  }

  return [isOpen, closeDialog];
};
