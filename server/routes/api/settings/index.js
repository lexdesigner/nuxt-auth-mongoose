"use strict";

// Подключаем модель settings.
const settings = require("../../../model/settings.js");

module.exports = async function (fastify, opts) {
  //Вывод всех динамических страниц сайта.
  fastify.get("/", async function (request, reply) {
    try {
      // Выбираем только нужны поля, чтобы в запросе не передавались лишние данные.
      const data = await settings.find().select("model id name type -_id").lean();
      reply.code(200).send(data);
    } catch (e) {
      // Если возникает проблема, то возвращаем ошибку сервера.
      reply.code(500).send(e);
    }
  });

  // Получаем контент конкретной настройки.
  fastify.get("/:id", async function (request, reply) {
    try {
      // Ищем страницу с запрашиваемым id.
      const data = await settings.findOne({ id: request.params.id }).select("-_id").lean();
      if (data) {
        reply.code(200).send(data);
      } else {
        // Если страница с запрашиваемым id не найдена, то возвращаем 404 код ответа сервера.
        reply.code(404).send();
      }
    } catch (e) {
      // Если возникает прочая проблема, то возвращаем ошибку сервера с 500 кодом.
      reply.code(500).send(e);
    }
  });

  // В нижних 3 маршрутах используется декоратор для проверки авторизации.
  // Нужно быть авторизированным, чтобы публиковать, изменять и удалять страницы.
  fastify.post("/", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Получаем данных из секции body в запросе. Создаём новую страницу на их основе.
      const data = new settings(request.body);
      await data.save();
      reply.code(200).send({ message: "Страница создана" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.patch("/:id", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим страницу с запрашиваемым id и обновляем её данные.
      const data = await settings.findOneAndUpdate({ id: request.params.id }, request.body, {
        new: true,
      });
      reply.code(200).send(data);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.delete("/:id", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим страницу с запрашиваемым id и удаляем её.
      await settings.findOneAndDelete({ id: request.params.id });
      reply.code(200).send({ message: "Страница удалена" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });
};
