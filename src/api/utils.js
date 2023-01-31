
import { GetArkPrice_Swap } from "./arkfi";

export const backupData = async () => {
  const opts = {
    types: [{
      description: 'Text file',
      accept: {'text/plain': ['.txt']},
    }],
    suggestedName: "arkFiWallets"
  };
  const data = localStorage.getItem("arkFiWallets");
  if (window.showSaveFilePicker) {
    const handle = await window.showSaveFilePicker(opts);
    const writable = await handle.createWritable();
    await writable.write(data);
    writable.close();
  } else {
    const element = document.createElement("a");
    const file = new Blob([data], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "arkFiWallets.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
};

const getArkPrice = async () => {
  return await GetArkPrice_Swap();
}