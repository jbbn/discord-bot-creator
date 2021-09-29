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
        <div className="mt-4">
          <div className="items-stretch">
            {folders?.[0] &&
              folders.map((folder) => (
                <div key={folder} md={6}>
                  <Folder folder={folder} />
                </div>
              ))}
            <form>
              <button type="submit" onClick={createBot} className="mx-3 mt-3">
                Create new bot
              </button>
              <button onClick={pickFolder} className="mt-3">
                Add Bot
              </button>
              <Link href="/login">
                <button className="mt-3 ml-2">Login</button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
