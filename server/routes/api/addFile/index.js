const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

module.exports = async function (fastify, opts) {
  fastify.post("/", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const data = await request.file();
      const fileType = data.filename.split(".").pop();
      const src = `static/uploads/${+new Date()}.${fileType}`;
      await pump(data.file, fs.createWriteStream(src));
      reply.send(src);
    } catch (e) {
      reply.code(500).send(e);
    }
  });
};
