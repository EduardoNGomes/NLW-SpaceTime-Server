"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/upload.ts
var upload_exports = {};
__export(upload_exports, {
  uploadRoutes: () => uploadRoutes
});
module.exports = __toCommonJS(upload_exports);
var import_node_stream = require("stream");
var import_node_util = require("util");
var pump = (0, import_node_util.promisify)(import_node_stream.pipeline);
async function uploadRoutes(app) {
  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fieldSize: 5242880
        // 5mb
      }
    });
    console.log(upload);
    return { fileUrl: response?.url };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadRoutes
});
