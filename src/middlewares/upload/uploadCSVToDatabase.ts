import fs from "fs";
import csvParser from "csv-parser";
export const uploadCSVToDatabase = (filePath: fs.PathLike) => {
  const results: any[] = [];
  const header: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("headers", (headers) => {
      headers.map((head: any) => {
        header.push(head);
      });
    })
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      console.log(header);
      console.log(results.length);
    });
};
