import { fileURLToPath, URL } from 'node:url'
import { join } from 'node:path'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true, // 启动才可正确在js当中导入
        modifyVars: { // 设置一些全局变量
          namespace: "tellhow",
          defaultZIndex: 1000,
        },
        additionalData: `@use "@/assets/thVar.scss" as thVar;`
      }
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      }
    }),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [join(__dirname, "/src/assets/svg")],
      // 指定symbolId格式，就是svg.use使用的href
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    cors: true, // 默认启用并允许任何源
    // open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
