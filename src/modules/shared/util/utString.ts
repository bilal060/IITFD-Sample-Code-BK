export const utGetYMDHPath = (): string => {
  const d = new Date();
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/${d.getHours()}`;
};
