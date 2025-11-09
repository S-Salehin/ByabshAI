import Papa from "papaparse";
import { Row } from "./store";

export function parseCsv(file: File): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (r) => resolve(r.data as Row[]),
      error: (e) => reject(e),
    });
  });
}
