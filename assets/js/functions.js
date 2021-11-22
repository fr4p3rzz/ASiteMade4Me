let firstCol = document.getElementById("first-col");
let secondCol = document.getElementById("second-col");
let thirdCol = document.getElementById("third-col");

window.addEventListener("resize", () => {
    if(window.innerWidth <= 1024)
    {
        /** if we are in ipad/mobile (or res < 720p) center the content of the third column */
        thirdCol.classList.remove("col-md-8");
        thirdCol.classList.add("col-lg-12");

        /** if we are in ipad/mobile (or res < 720p) view the second column as an offcanvas */
        secondCol.setAttribute("tabindex", -1);
        secondCol.setAttribute("aria-labelledby", "second-col-label");
        secondCol.classList.remove("main-col");
        secondCol.classList.add("offcanvas");
        secondCol.classList.add("offcanvas-start");
    }
    else
    {
        thirdCol.classList.remove("col-lg-12");
        thirdCol.classList.add("col-md-8");

        secondCol.classList.add("main-col");
        secondCol.classList.remove("offcanvas");
        secondCol.classList.remove("offcanvas-start");
        secondCol.removeAttribute("tabindex");
        secondCol.removeAttribute("aria-labelledby");
        secondCol.removeAttribute("style"); //prevent visual glitches if the user has used the offcanvas mode right before switching to desktop view
    }
});