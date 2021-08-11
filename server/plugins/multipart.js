"use strict";
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-multipart"), {
    limits: {
      fieldNameSize: 100,
      fields: 10,
      files: 1,
    },
  });
});
