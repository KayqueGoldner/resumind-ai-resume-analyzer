import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [ files, setFiles ] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  });

  useEffect(() => {
    if (!(isLoading || auth.isAuthenticated)) {
      navigate("/auth?next=/wipe");
    }
  }, [ isLoading, auth.isAuthenticated, navigate ]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div>
      Authenticated as: {auth.user?.username}
      <div>Existing files:</div>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <div className="flex flex-row gap-4" key={file.id}>
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => handleDelete()}
          type="button"
        >
          Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
