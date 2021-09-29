import { useEffect, useState } from "react";
import Head from "next/head";
import electron from "electron";
import { useRouter } from "next/router";
import path from "path";
import Link from "next/link";

const ipcRenderer = electron.ipcRenderer || false;

export default function Dashboard() {
  const [folders, setFolders] = useState("");
  const [isOpeningFolder, setIsOpeningFolder] = useState("");
  const isValidating = false;
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

  const getName = (folder) => {
    folder = folder || "";
    return folder.split(path.sep).pop();
  };

  return (
    <>
      <Head>
        <title>DBC | Dashboard</title>
      </Head>
      {isValidating ? (
        <div className="d-flex align-items-center justify-content-center">
          <div animation="border" />
        </div>
      ) : (
        <div className="mt-4">
          <div className="align-items-stretch">
            {folders?.[0] &&
              folders.map((folder) => (
                <div key={folder} md={6}>
                  <div className="m-3 p-3">
                    <h3 className="mb-4">{getName(folder)}</h3>
                    <p className="mb-2 text-muted">{folder}</p>
                    <button onClick={setSettings(folder)} variant="secondary">
                      Open{" "}
                      {isOpeningFolder === folder ? (
                        <div animation="border" size="sm" />
                      ) : null}
                    </button>
                  </div>
                </div>
              ))}
            <form>
              <button type="submit" onClick={createBot} className="mt-3 mx-3">
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
