"use client"
import { DocSearchValue } from "@/app/md/types"
import Link from "@/components/Link";
import { subtitle } from "@/components/primitives";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import { ClockIcon, HistoryIcon } from "lucide-react";

export const DocLs = ({allDocs}:{
  allDocs: DocSearchValue[]
}) => {
  return <Table hideHeader isVirtualized maxTableHeight={800}  aria-label="Blog List" className="bg-transparent Table" classNames={{
    wrapper: "p-0 bg-transparent ",
    // td: "",
  }}
  >
        <TableHeader >
          <TableColumn key={'blog'}>{"Blog"}</TableColumn>
        </TableHeader>
        <TableBody items={allDocs} className="bg-transparent TableBody">
          {(item) => (
            <TableRow key={item.slug} className="TableRow">
              <TableCell className="TableCell">
                <Card className="p-1">
                  <CardHeader className="p-4 flex-row items-center justify-between gap-2">
                    <Link href={item.url} className={`text-lg leading-none  !inline-block !border-b-0 `}>
                    {item.title}
                    </Link>
                    <div className="flex items-center">
                    {item.meta?.updated_at && <span className="text-xs text-muted-foreground ml-2  items-center  flex gap-1"><HistoryIcon /><span>{new Date(item.meta.updated_at).toLocaleDateString()}</span></span>}
                    {item.meta?.created_at && <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1"><ClockIcon /><span>{new Date(item.meta.created_at).toLocaleDateString()}</span></span>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    
                {item.description}
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
}