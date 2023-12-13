import store from "@/store";

const isImg = (name) => {
    const lowerCaseFileName = name.toLowerCase();
    return lowerCaseFileName.endsWith('.png') || lowerCaseFileName.endsWith('.jpeg');
}

const findAndToggle = (array, id) => {
  const index = array.findIndex(obj => obj.id === id);
  if (index !== -1) {
    array[index].active = !array[index].active;
  }
  return array
}

function isUserLoggedIn() {
    return store.getters['isLoggedIn']
}

export default {
    isImg,
    findAndToggle,
    isUserLoggedIn
}
