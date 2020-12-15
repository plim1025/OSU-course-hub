"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Professor_1 = require("./entity/Professor");
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const professor1 = new Professor_1.Professor();
    professor1.name = 'mock name';
    yield connection.manager.save(professor1);
    const prof = yield connection
        .createQueryBuilder()
        .select('professor')
        .from(Professor_1.Professor, 'professor')
        .where('professor.name = :name', { name: 'mock name' })
        .getOne();
    if (prof) {
        prof === null || prof === void 0 ? void 0 : prof.difficulty.push(2);
        yield connection.manager.save(prof);
    }
}))
    .catch(error => console.log(error));
//# sourceMappingURL=index.js.map