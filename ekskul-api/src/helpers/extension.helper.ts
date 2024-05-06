// Extension file yang disupport untuk multer
export const extensionSupport = (ext: string): boolean => {
  return [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ].includes(ext);
};
