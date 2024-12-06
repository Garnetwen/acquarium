let popup;

let fishData = {
  name: "",
  status: "",
  descriptions: "",
  image: "",
};
// window.onload = () => {
//   popup = document.getElementById("fishPage");
//   popup.style.display = "none";
// };
function openPopup() {
  popup = document.getElementById("fishPage");
  popup.style.display = "block";
  fetch("/random")
    .then((res) => res.json())
    .then((json) => {
      fishData.name = json.data.name;
      document.getElementById("name").innerText = fishData.name;
      fishData.descriptions = json.data.descriptions;
      fishData.image = json.data.image;
      fishData.status = json.data.status;
      document.getElementById("descriptions").innerText = fishData.descriptions;
    });
}

// popup.classList.add("open-popup");

function closePopup() {
  console.log("yay");
  popup = document.getElementById("fishPage");
  popup.style.display = "none";
  // document.getElementById("fishinfo").value = fishData;
  console.log(JSON.stringify(fishData));
  document.getElementById("fishinfo").value = JSON.stringify(fishData);

  console.log("fishinfo:" + fishinfo.value);
  // console.log("fishData", fishData.value);
}
//cabinet pop up
