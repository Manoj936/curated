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

type ITheme = 'light' | 'dark' | 'readMode';

const ReactReaderComponent: React.FC<ReactReaderComponentProps> = ({
  fileUrl,
  onClose,
  fileName,
}) => {
  const rendition = useRef<Rendition | undefined>(undefined);
  const [largeText, setLargeText] = useState(false);
  const [theme, setTheme] = useState<ITheme>('dark');
  const [location, setLocation] = useState<string | number>(0);
  const [readingOptions, setReadingOptions] = useState<any | null>(null);
  const readerKey = JSON.stringify({ readingOptions, theme }); // reset on option/theme change

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.fontSize(largeText ? "140%" : "100%");
    }
  }, [largeText]);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.select(theme);
    }
  }, [theme]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col h-screen"
         style={{
           backgroundColor:
             theme === "dark"
               ? "#000"
               : theme === "readMode"
               ? "#f5f0e6"
               : "#fff",
         }}
    >
      {/* Cancel Button */}
      <div className="p-1 flex justify-center  bg-gray-100 shadow" >
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
              Toggle Font Size
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                const newTheme =
                  theme === "dark"
                    ? "light"
                    : theme === "light"
                    ? "readMode"
                    : "dark";
                setTheme(newTheme);
              }}
            >
              Switch Theme ({theme})
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                if (readingOptions == null) {
                  setReadingOptions({
                    flow: "scrolled",
                    manager: "continuous",
                  });
                } else {
                  setReadingOptions(null);
                }
              }}
            >
              Change Orientation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Reader */}
      <div className="flex-1">
        <ReactReader
          key={readerKey}
          url={fileUrl}
          title={fileName}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          getRendition={(_rendition: Rendition) => {
            rendition.current = _rendition;

            const themes = _rendition.themes;

            themes.register("light", {
              body: {
                padding:0,
                marign:0,
                background: "#ffffff",
                color: "#000000",
              },
            });

            themes.register("dark", {
              body: {
                padding:0,
                marign:0,
                background: "#0d0c0c",
                color: "#ffffff",
              },
            });

            themes.register("readMode", {
              body: {
                padding:0,
                marign:0,
                background: "#f5f0e6",
                color: "#333333",
              },
            });

            themes.select(theme);
            themes.fontSize(largeText ? "140%" : "100%");
          }}
          epubOptions={readingOptions}
        />
      </div>
    </div>
  );
};

export default ReactReaderComponent;
