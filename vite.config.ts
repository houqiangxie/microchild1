import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from "path"
import { writeFileSync } from "fs"
// import Components from 'unplugin-vue-components/vite'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import html from 'vite-plugin-html'
// // import legacy from '@vitejs/plugin-legacy'
// import viteCompression from 'vite-plugin-compression'
// import { ElementPlusResolver, AntDesignVueResolver, VantResolver, HeadlessUiResolver, ElementUiResolver} from 'unplugin-vue-components/resolvers'
// import styleImport, {  AndDesignVueResolve,  VantResolve,  ElementPlusResolve,  NutuiResolve,  AntdResolve} from 'vite-plugin-style-import'
// import AutoImport from 'unplugin-auto-import/vite'
// import WindiCSS from 'vite-plugin-windicss'


const pathResolve = (dir: string): string => resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default  ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 环境变量
  const env = loadEnv(mode, process.cwd())
  // 开发环境判断
  const isDev = mode === 'dev'
  // vite插件
  const plugins = [
    vue({
      script: {
        refSugar: true, //ref转换
      },
    }),
    // 自定义插件
    (function () {
      let basePath = "";
      return {
        name: "vite:micro-app",
        apply: "build",
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`;
        },
        writeBundle(options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName];
              if (chunk.fileName && chunk.fileName.endsWith(".js")) {
                chunk.code = chunk.code.replace(
                  /(from|import\()(\s*['"])(\.\.?\/)/g,
                  (all, $1, $2, $3) => {
                    return all.replace($3, new URL($3, basePath));
                  }
                );
                const fullPath = join(options.dir, chunk.fileName);
                writeFileSync(fullPath, chunk.code);
              }
            }
          }
        },
      };
    })() as any,
    // vueJsx(), //jsx
    /**
     *  注入环境变量到html模板中
     *  如在  .env文件中有环境变量  VITE_APP_APP_TITLE=admin
     *  则在 html模板中  可以这样获取  <%- VITE_APP_APP_TITLE %>
     *  文档：  https://github.com/anncwb/vite-plugin-html
     */
    // html({
    //   inject: {
    //     // injectData: { ...env },
    //     data: {
    //       env: env,
    //     },
    //   },
    //   minify: true,
    // }),
    // elementUi组件自动引入
    // Components({
    //   resolvers: [ElementPlusResolver()],
    //   dts: 'src/components.d.ts',
    // }),
    // styleImport({
    //   // resolves: [
    //   //   ElementPlusResolve(),
    //   // ],
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `element-plus/theme-chalk/${name}.css`
    //       },
    //     },
    //   ],
    // }),
    // // 自动引入
    // AutoImport({
    //   imports: ['vue', 'vue-router'],
    //   // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
    //   dts: 'src/auto-import.d.ts'
    // }),
    // WindiCSS(),
    // //     // gzip插件，打包压缩代码成gzip  文档： https://github.com/anncwb/vite-plugin-compression
    // viteCompression(),

    /**
     *  把src/icons 下的所有svg 自动加载到body下，供组件使用
     *  类似于webpack中的svg-sprite-loader
     *  文档：https://github.com/anncwb/vite-plugin-svg-icons
     */
    // viteSvgIcons({
    //   // 指定需要缓存的图标文件夹
    //   iconDirs: [resolve(process.cwd(), 'src/icons')],
    //   // 指定symbolId格式
    //   symbolId: 'icon-[name]'
    // })
  ];

  // if (!isDev) {
  //   plugins.push(
  //     // 兼容插件
  //     legacy({
  //       targets: ['defaults', 'not IE 11'],
  //     }),

  //     // gzip插件，打包压缩代码成gzip  文档： https://github.com/anncwb/vite-plugin-compression
      // viteCompression()
  //   )
  // } else {
  //   // plugins.push(
  //   //   // mock  文档：https://github.com/anncwb/vite-plugin-mock
  //   //   viteMockServe({
  //   //     mockPath: 'mock',
  //   //     localEnabled: command === 'serve',
  //   //     logger: true
  //   //   })
  //   // )
  // }

  // https://vitejs.dev/config/
  return defineConfig({
    plugins,
    // base: isDev ? "./" : "/microappchild1", // 设置打包路径
    base:"/microappchild1/", // 设置打包路径
    //静态资源服务的文件夹
    publicDir: "public",
    server: {
      // 设置代理，根据我们项目实际情况配置
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      port: 8080,
      hmr: { overlay: false },
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://172.16.15.190:30003/",
          // target:  'http://172.16.16.145:8080/',
          changeOrigin: true, // 是否跨域
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: [
        { find: "@", replacement: pathResolve("src") },
        // 解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        // {
        //   find: "vue-i18n",
        //   replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        // },
      ],
    },
    build: {
      target: "es2015",
      outDir: env.VITE_APP_outputDir,
      assetsDir: "assets",
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      // Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
      minify: isDev ? "esbuild" : "terser",
      terserOptions: {
        compress: {
          // 生产环境去除console
          // drop_console: !isDev,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          //   additionalData: `
          //   @import '@/assets/styles/_variables.scss';
          //   @import '@/assets/styles/common.scss';
          //  `,
        },
      },
    },
  });
}
