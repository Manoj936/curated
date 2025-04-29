"use client";
import PageHeader from "@/app/components/chunks/PageHeader";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircleIcon,
  EyeClosedIcon,
  PencilIcon,
  EyeIcon,
  DeleteIcon,
} from "lucide-react";
import { ManageEbookDialogue } from "@/app/components/ManageEbookDialogue";
import { getDataUsingAsyncAwaitGetCall } from "@/app/libs/apiClinet";
import { URLConsatnts } from "@/app/libs/urlConstants";
import { url } from "inspector";
import { useConfirmDialog } from "@/app/components/ConfirmDialogue";
import axios from "axios";
import ReactReaderComponent from "@/app/components/Reader";

function Page() {
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [ebooks, setEbooks] = useState<any[]>([]); // Initialize with an empty array
  const [selectedEbook, setSeletedEbook] = useState<any>({}); // Initialize with null
  const { show, ConfirmDialog } = useConfirmDialog();
  const [showReader, setShowReader] = useState(false);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const checkOncloseStatus = (status: boolean) => {
    if (status) {
      fetchEbooks();
    }
 
  }
  const fetchEbooks = async () => {
    // Fetch ebooks from the server
    const response: any = await getDataUsingAsyncAwaitGetCall(
      URLConsatnts.EbookApiUrl
    );
    if (response.success) {
      setEbooks(response.data);
    } else {
      console.error("No books found", response.error);
    }
  };
  const ReadEbook = (book:any) => {
    setSeletedEbook(book);
    setShowReader(true);
  };

  const EditBook = (ebook: any) => {
    setMode("edit");
    setSeletedEbook(ebook);
    setOpenDialog(true);
  };

  const DeleteEbook = async (id: string) => {
    console.log(id);
    show({
      title: "Delete Ebook?",
      description: "Do you really want to delete this ebook permanently?",
      onConfirm: async () => {
        console.log("Delete confirmed");
        await axios.delete(`${URLConsatnts.EbookApiUrl}/${id}`);
        fetchEbooks();
      },
    });
  };
  return (
    <>
      <div className="mt-10 max-w-7xl mx-auto px-4">
        <PageHeader heading="Ebooks" subheading="Manage your ebook listings" />

        {/* Add new ebook */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <Card
            onClick={() => {
              setOpenDialog(true);
              setMode("add");
            }}
            className="rounded-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-gray-600 bg-cover bg-center"
            style={{
              height: "250px", // Adjust the card height
            }}
          >
            <CardHeader className="flex flex-row items-start justify-between gap-2 p-4 ">
              <CardDescription className="text-md text-black lg:text-2xl font-bold">
                Add Ebook
              </CardDescription>
              <PlusCircleIcon className="h-20 w-20 text-black font-bold" />
            </CardHeader>
          </Card>

          {/* Display added ebooks */}
          {ebooks.length > 0 &&
            ebooks.map((ebook) => (
              <Card
                key={ebook._id}
                className="relative overflow-hidden rounded-md group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                style={{
                  height: "250px",
                }}
              >
                {/* 🔹 Blurred Background Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-xs scale-110 z-0"
                  style={{
                    backgroundImage: `url(${ebook.ebookCoverImageUrl})`,
                  }}
                />

                {/* 🔹 Foreground Content */}
                <div className="relative z-10 flex flex-col  h-full p-4 item-center justify-center text-white">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl">{ebook.name}</CardTitle>
                    <CardContent className="p-0 text-sm font-bold">
                      👤{ebook.author}
                    </CardContent>
                    <div className="flex justify-start gap-3 mt-2 item-left">
                      <EyeIcon onClick={() => ReadEbook(ebook)} />

                      <PencilIcon onClick={() => EditBook(ebook)} />

                      <DeleteIcon onClick={() => DeleteEbook(ebook._id)} />
                    </div>
                  </CardHeader>
                </div>
              </Card>
            ))}
        </div>

        {/* Modal for adding/updating */}
        <ManageEbookDialogue
          open={openDialog}
          onOpenChange={setOpenDialog}
          mode={mode}
          data={selectedEbook}
          onClose = {checkOncloseStatus}
        />
        {/* Alert confirm dialogue before deletion */}
        <ConfirmDialog />
        {/* View ebook */}
        {showReader && (
        <ReactReaderComponent
          fileUrl={selectedEbook.ebookFileUrl}
          onClose={() => setShowReader(false)}
          fileName={selectedEbook.name}
        />
      )}
      </div>
    </>
  );
}

export default Page;
