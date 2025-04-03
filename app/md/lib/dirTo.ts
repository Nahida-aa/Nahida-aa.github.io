import { DocBase } from "../types";
import { dir2MdxJsonLs } from "./to";

export const toDocBaseList = async (contentDir: string): Promise<DocBase[]> => {
  const allDocs = await dir2MdxJsonLs(contentDir);
  return allDocs.map((doc) => ({
    url: doc.url,
    meta: doc.meta,
  }));
};