export function formatSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = [ "Bytes", "KB", "MB", "GB", "TB" ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[ i ]}`;
}
