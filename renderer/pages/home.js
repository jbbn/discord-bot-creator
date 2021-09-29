import { useEffect, useState } from "react";
import Head from "next/head";
import electron from "electron";
import Link from "next/link";
import Folder from "../components/home/Folder/Item";

const ipcRenderer = electron.ipcRenderer || false;

export default function Dashboard() {
  const [folders, setFolders] = useState("");
  const isValidating = false;

  function pickFolder() {
    ipcRenderer.send("directoryDialog");
  }

  useEffect(() => {
    ipcRenderer.on("directoryDialog", (event, folder) => {
      if (!folder) return;
      setFolders([...folders, folder]);
    });

    ipcRenderer.on("getLastDirectories", (event, folders) => {
      setFolders(folders);
    });

    ipcRenderer.send("getLastDirectories");
    return () => {
      ipcRenderer.removeAllListeners("directoryDialog");
      ipcRenderer.removeAllListeners("getLastDirectory");
    };
  }, [JSON.stringify(folders)]);

  const createBot = () => {
    ipcRenderer.send("directoryDialog");
  };

  return (
    <>
      <Head>
        <title>DBC | Dashboard</title>
      </Head>
      {isValidating ? (
        <div className="flex items-center justify-center">
          <div animation="border" />
        </div>
      ) : (
        <div className="px-3">
          <div className="flex flex-row w-full gap-3 my-4">
            <button type="submit" onClick={createBot}>
              Create new bot
            </button>
            <button onClick={pickFolder}>Add existing Bot</button>
            <Link href="/login">
              <button className="ml-auto">Login</button>
            </Link>
          </div>
          <div className="grid grid-flow-row grid-cols-2 gap-5">
            {folders?.[0] &&
              folders.map((folder) => <Folder folder={folder} key={folder} />)}
          </div>
        </div>
      )}
    </>
  );
}
