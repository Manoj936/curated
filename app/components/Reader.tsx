import { Rendition } from "epubjs";
import React, { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
interface ReactReaderComponentProps {
  fileUrl: string;
  onClose: () => void;
  fileName: string;
}

type ITheme = 'light' | 'dark'

function updateTheme(rendition: Rendition, theme: ITheme) {
  const themes = rendition.themes
  switch (theme) {
    case 'dark': {
      themes.override('color', '#fff')
      themes.override('background', '#000')
      break
    }
    case 'light': {
      themes.override('color', '#000')
      themes.override('background', '#fff')
      break
    }
  }
}
const ReactReaderComponent: React.FC<ReactReaderComponentProps> = ({
  fileUrl,
  onClose,
  fileName,
}) => {
  const rendition = useRef<Rendition | undefined>(undefined);
  const [largeText, setLargeText] = useState(false);
  const [theme, setTheme] = useState<ITheme>('dark')
  const [location, setLocation] = useState<string | number>(0);
  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-screen">
      {/* Cancel Button */}
      <div className="p-3 flex justify-end bg-gray-100 shadow">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={onClose}
              className="text-red-500 font-bold"
            >
              Close
            </DropdownMenuItem>
            <DropdownMenuSeparator />
           
            <DropdownMenuItem onClick={() => setLargeText(!largeText)}>
              Toogle Size
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
              Dark Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Reader */}
      <div className="flex-1">
        <ReactReader
          url={fileUrl}
          title={fileName}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          //readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
          getRendition={(_rendition: Rendition) => {
            rendition.current = _rendition;
            rendition.current.themes.fontSize(largeText ? "140%" : "100%");
          }}
        />
      </div>
    </div>
  );
};



export default ReactReaderComponent;
