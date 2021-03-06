// process.env.PORT и process.env.BASE_URL берутся из файла .env

module.exports = {
  // Указываем порт, на котором будет работать приложение.
  server: {
    port: process.env.PORT,
    host: "localhost",
  },

  // Передаём во фронт данные из .env. Эта переменная будет доступна через process.env.baseUrl.
  // Важно! Эти данные будут видны в коде сайта. Не передавайте таким образом пароли и т.д.
  // Если данные есть в .env, но их не передали на фронт, то их нет в коде сайта, они доступны только в бэкенде.
  env: {
    baseUrl: process.env.BASE_URL,
    googleApiKey: process.env.GOOGLE_API_KEY,
  },

  // Глобальные настройки секции Head. Можно прописать общие мета-теги, атрибуты и прочее.
  head: {
    htmlAttrs: { lang: "ru" },
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
      },
    ],
  },

  // Включаем автоматическое подключение компонентов.
  components: true,

  // Отключаем передачу анонимных данных о работе приложения в Nuxt.
  telemetry: false,

  // Отключаем индикацию загрузки страниц.
  loading: false,
  loadingIndicator: false,

  styleResources: {
    sass: ["~/sass/mixins/*.sass", "~/sass/vars.sass"],
  },
  // Отключаем предварительную загрузку контента, на который есть ссылки на текущей страницы.
  router: { prefetchLinks: false },

  // Подключаем плагины
  plugins: ["@/plugins/element-ui"],

  //Подключаем модуль Axios для выполнения запросов к бэкенду.
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios"],

  //Подключаем общий файл со стилями.
  css: ["@/sass/element-variables.sass", "~/sass/main.sass"],

  //Прописываем путь к бэку для axios
  axios: { baseURL: process.env.BASE_URL },

  build: {
    transpile: [/^element-ui/],
    // Просим стили вырезать в отдельные файлы. Иначе css будет inline.
    extractCSS: true,
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },
  },

  render: {
    // Добавляем async к скриптам Nuxt.
    asyncScripts: true,

    // Используем Content Security Policy для защиты от XSS атак.
    // Для примера я добавил записи, которые требуются для корректной работы Яндекс.Метрики и встраивания видео из Youtube.
  },
};
