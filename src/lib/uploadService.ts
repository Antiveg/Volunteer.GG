// @ts-expect-error: formidable has no types
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import path from "path";

export const parseForm = async (req: any): Promise<{ fields: any, files: any }> => {
  const uploadDir = path.join(process.cwd(), "/public/uploads");

  try {
    await stat(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err : any, fields : any, files : any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
