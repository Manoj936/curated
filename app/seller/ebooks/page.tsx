"use client";
import PageHeader from "@/app/components/chunks/PageHeader";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, PlusCircleIcon } from "lucide-react";
import { ManageEbookDialogue } from "@/app/components/ManageEbookDialogue";
function page() {
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  return (
    <>
      <div className="mt-10 max-w-7xl mx-auto px-4">
        <PageHeader heading="Ebooks" subheading="Manage your ebook lisitngs" />
        {/* Add new ebook */}
        <div className="grid  grid-cols-1 md:grid-cols-4 gap-2 p-1">
          <Card
            onClick={() => {
              setOpenDialog(true);
              setMode("add");
            }}
            className="rounded-sm  transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-gray-600"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div>
                <CardDescription className=" text-md text-muted-foreground lg:text-lg">
                  Add Ebook
                </CardDescription>
              </div>
              <PlusCircleIcon className="h-28 w-20"></PlusCircleIcon>
            </CardHeader>
          </Card>
        </div>

        {/* Modal for adding / updating  */}

        <ManageEbookDialogue
          open={openDialog}
          onOpenChange={setOpenDialog}
          mode={mode}
        />
      </div>
      {/* Call all the ebooks added for the seller */}
    </>
  );
}

export default page;
