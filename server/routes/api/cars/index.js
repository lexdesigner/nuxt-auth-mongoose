"use strict";

// Подключаем модель models.
const models = require("../../../model/cars.js");

module.exports = async function (fastify, opts) {
  //Вывод всех авто сайта.
  fastify.get("/", async function (request, reply) {
    try {
      // Выбираем только нужны поля, чтобы в запросе не передавались лишние данные.
      const cars = await models
        .find()
        .select("image colors photos sale credit type gasoline speed power benefit price name url -_id")
        .sort("price")
        .lean();
      reply.code(200).send(cars);
    } catch (e) {
      // Если возникает проблема, то возвращаем ошибку сервера.
      reply.code(500).send(e);
    }
  });

  // Получаем контент конкретного авто.
  fastify.get("/:url", async function (request, reply) {
    try {
      // Ищем авто с запрашиваемым URL.
      const car = await models.findOne({ url: request.params.url }).select("-_id").lean();
      if (car) {
        reply.code(200).send(car);
      } else {
        // Если авто с запрашиваемым URL не найдена, то возвращаем 404 код ответа сервера.
        reply.code(404).send();
      }
    } catch (e) {
      // Если возникает прочая проблема, то возвращаем ошибку сервера с 500 кодом.
      reply.code(500).send(e);
    }
  });

  // В нижних 3 маршрутах используется декоратор для проверки авторизации.
  // Нужно быть авторизированным, чтобы публиковать, изменять и удалять авто.
  fastify.post("/", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Получаем данных из секции body в запросе. Создаём новое авто на их основе.
      const car = new models(request.body);
      await car.save();
      reply.code(200).send({ message: "Авто добавлено" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.patch("/:url", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим авто с запрашиваемым URL и обновляем его данные.
      const car = await models.findOneAndUpdate({ url: request.params.url }, request.body, {
        new: true,
      });
      reply.code(200).send({ message: "Данные обновлены" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.delete("/:url", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим авто с запрашиваемым URL и удаляем его.
      await models.findOneAndDelete({ url: request.params.url });
      reply.code(200).send({ message: "Авто удалено" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });
};
