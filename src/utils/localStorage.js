import { toast } from "react-toastify";

const getStoredData = (customerName) => {
  const storeData = localStorage.getItem(customerName);
  if (storeData) {
    return JSON.parse(storeData);
  } else {
    return [];
  }
};

const saveDataInLocalStore = (id) => {
  const storedData = getStoredData();
  const exist = storedData.find((dataId) => dataId === id);
  if (!exist) {
    storedData.push(id);
    localStorage.setItem("donation-data", JSON.stringify(storedData));
    toast.success("Dontaion successfully added");
  } else {
    toast.error("Already exist");
  }
};

export { getStoredData, saveDataInLocalStore };
