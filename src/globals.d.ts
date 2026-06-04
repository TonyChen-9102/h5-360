import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $Router: any
    $store: any
  }
}

declare const process: {
  env: {
    NODE_ENV: string
    UNI_PLATFORM: string
    UNI_ENV_PREFIX: string
  }
}
