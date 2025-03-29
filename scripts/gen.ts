import path from "path";
import { contentDir, outputDir } from "@/app/settings/path";
import fs from "fs/promises"
import { DocSearchValue } from "@/app/md/types";
import { dir2MdxJsonLs, getTagsData } from "@/app/md/lib/to";


const genMdxJsonLs = async (allDocs: DocSearchValue[]) => {
  const indexPath = path.join(outputDir, "index.json")
  await fs.writeFile(indexPath, JSON.stringify(allDocs, null, 2))
}

const genTags = async (allDocs: DocSearchValue[]) => {
  const tagsPath = path.join(outputDir, "tags.json")
  const tags = getTagsData(allDocs)
  await fs.writeFile(tagsPath, JSON.stringify(tags, null, 2))
}

const main = async () => {
  const allDocs: DocSearchValue[] = await dir2MdxJsonLs(contentDir)
  genMdxJsonLs(allDocs)
  genTags(allDocs)
}

main()
  .then(() => {
    console.log("done")
  })
  .catch((err) => {
    console.error(err)
  })