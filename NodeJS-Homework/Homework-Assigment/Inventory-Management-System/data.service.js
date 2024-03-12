import { readFile, writeFile } from "fs/promises";

export class DataService {
    static async readJSONFile(path) {
        const stringData = await readFile(path, "utf-8");

        return JSON.parse(stringData);
    };

    static async saveJSONFile(path, data) {
        return writeFile(path, JSON.stringify(data, null, 2));
    }
};