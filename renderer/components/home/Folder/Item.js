import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import path from "path";
import { useState } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

export default function Folder({ folder }) {
  const [isOpeningFolder, setIsOpeningFolder] = useState("");
  const router = useRouter();
  // Can be used to create a bot
  const setSettings = (folder) => (e) => {
    e.preventDefault();
    console.log(folder);
    window._folder = folder;
    setIsOpeningFolder(folder);
    ipcRenderer.send("chooseDirectory", folder);
    ipcRenderer.once("chooseDirectory", () => {
      console.log("Response arrived for sure");
      router.push(`/dashboard`);
      setIsOpeningFolder("");
    });
  };
  const getName = (folder) => {
    folder = folder || "";
    return folder.split(path.sep).pop();
  };

  return (
    <div
      className="grid grid-cols-2 p-3 bg-gray-800 rounded-lg cursor-pointer group"
      onClick={setSettings(folder)}
    >
      <h3 className="mb-4 text-2xl">{getName(folder)}</h3>
      <ExternalLinkIcon className="invisible w-6 h-6 ml-auto text-gray-600 group-hover:visible" />

      <p className="col-span-2 mb-2 text-gray-400 ">{folder}</p>
    </div>
  );
}
