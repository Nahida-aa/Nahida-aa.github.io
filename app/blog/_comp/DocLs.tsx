"use client"
import { DocBase, DocSearchValue } from "@/app/md/types"
import Link from "@/components/Link";
import { subtitle } from "@/components/primitives";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import { ClockIcon, HistoryIcon } from "lucide-react";

export const DocLs = ({allDocs}:{
  allDocs: DocBase[]
}) => {
  return <Table hideHeader 
  // isVirtualized maxTableHeight={800} 
  aria-label="Blog List" className="bg-transparent Table" classNames={{
    wrapper: "p-0 bg-transparent shadow-none",
    // td: "",
  }}
  >
        <TableHeader >
          <TableColumn key={'blog'}>{"Blog"}</TableColumn>
        </TableHeader>
        <TableBody items={allDocs} className="bg-transparent TableBody">
          {(item) => (
            <TableRow key={item.url} className="TableRow">
              <TableCell className="TableCell ">
                <Card className="p-1 bg-card/20 backdrop-blur-md  border-none border-0 shadow-none">
                  <CardHeader className="p-4 flex-row items-center justify-between gap-2">
                    <Link href={item.url} className={`text-lg leading-none  !inline-block !border-b-0 `}>
                    <h3 id={item.url} className="!leading-none !m-0">
                    {item.meta?.nav_title || item.meta?.title}
                    </h3>
                    </Link>
                    <div className="flex items-center">
                    {item.meta?.updated_at && <span className="text-xs text-muted-foreground ml-2  items-center  flex gap-1"><HistoryIcon /><span>{new Date(item.meta.updated_at).toLocaleDateString()}</span></span>}
                    {item.meta?.created_at && <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1"><ClockIcon /><span>{new Date(item.meta.created_at).toLocaleDateString()}</span></span>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {item.meta?.description||'应该不会没有吧'}
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
}