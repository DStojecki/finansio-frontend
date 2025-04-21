import { defineComponent, h } from 'vue'

export const ProgressBar = defineComponent({
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    return () =>
      h('div', { class: 'relative h-2 w-full overflow-hidden rounded-full bg-secondary' }, [
        h('div', {
          class: 'h-full w-full flex-1 bg-primary transition-all',
          style: {
            transform: `translateX(-${100 - (props.value / props.max) * 100}%)`,
          },
        }),
      ])
  },
}) 