window.onload = () => {
  const popup = document.getElementsByClassName("fishPopup");
  popup.style.visibility = "hidden";

  function openPopup() {
    popup.classList.add("open-popup");
  }
  function closePopup() {
    popup.classList.remove("open-popup");
  }
};
