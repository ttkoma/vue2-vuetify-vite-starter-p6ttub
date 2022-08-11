import { useVuetify as useVuetifyProxy } from "@logue/vue2-helpers/vuetify"
import { reactive } from "vue"
import { watch } from "vue"

export const useVuetify = () => {
  const vuetifyService = useVuetifyProxy()

  const vuetifyFramework = reactive(vuetifyService)

  watch(
    () => vuetifyService.breakpoint,
    (newValue) => {
      vuetifyFramework.breakpoint = newValue
    }
  )

  return {
    breakpoint: vuetifyFramework.breakpoint,
    goTo: vuetifyService.goTo,
    application: vuetifyFramework.application,
  }
}
