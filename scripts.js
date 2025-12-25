const kotak = document.querySelector(".navlist");
function hidemenu() {
  kotak.style.right = "-200px";
}
function sidemenu() {
  kotak.style.right = "0";
}

// document.addEventListener("click", function (e) {
//   if (!kotak.contains(e.target) && !e.target.closest(".menu")) {
//     hidemenu();
//   }
// });
let menu = document.querySelector(".menu");
document.addEventListener("click", function (e) {
  if (!kotak.contains(e.target) && !menu.contains(e.target)) {
    hidemenu();
  }
});
