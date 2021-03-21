export const getASINfromURL = (url: string): string => {
  let temp = url.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
  if (temp && temp.length) return temp[1];
  else return "";
};
