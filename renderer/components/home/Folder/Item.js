import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import path from "path";
import { useState } from "react";

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
    <div className="p-3 m-3">
      <h3 className="mb-4">{getName(folder)}</h3>
      <p className="mb-2 text-muted">{folder}</p>
      <button onClick={setSettings(folder)} variant="secondary">
        Open{" "}
        {isOpeningFolder === folder ? (
          <div animation="border" size="sm" />
        ) : null}
      </button>
    </div>
  );
}
