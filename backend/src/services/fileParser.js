import csv from "csv-parser";
import XLSX from "xlsx";
import { Readable } from "stream";

export const parseFile = (file) => {
  return new Promise((resolve, reject) => {
    if (file.originalname.endsWith(".csv")) {
      const results = [];

      const stream = Readable.from(file.buffer.toString());

      stream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    } else if (file.originalname.endsWith(".xlsx")) {
      const workbook = XLSX.read(file.buffer);

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet);

      resolve(data);
    } else {
      reject(new Error("Unsupported file format"));
    }
  });
};
