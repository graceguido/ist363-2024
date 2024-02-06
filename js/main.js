//console.log("js has been loaded");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu")
//"event name", callback function
menuBtn.addEventListener("click", function(){
 //   console.log("clicked!");
    mobileMenu.classList.add("active");
});
closeBtn.addEventListener("click", function(){
    mobileMenu.classList.remove("active")
})