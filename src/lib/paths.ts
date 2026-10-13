export const basePath = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/`;
export const path = (relative = "") =>
  `${basePath}${relative.replace(/^\//, "")}`;
