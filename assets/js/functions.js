let firstCol = document.getElementById("first-col");
let secondCol = document.getElementById("second-col");
let thirdCol = document.getElementById("third-col");
let viewportBreakpoint = 1024; //viewport width

let floatingMenu = document.getElementById("main-menu");
let mainContainer = document.getElementById("main-container");
if(window.innerWidth <= viewportBreakpoint)
{
    activateOffcanvas();
}


window.addEventListener("resize", () => {
    if(window.innerWidth <= viewportBreakpoint)
    {
        /** if we are in ipad/mobile (or res < 720p) center the content of the third column */
        thirdCol.classList.remove("col-md-8");
        thirdCol.classList.add("col-lg-12");

        activateOffcanvas();
    }
    else
    {
        thirdCol.classList.remove("col-lg-12");
        thirdCol.classList.add("col-md-8");

        deactivateOffcanvas();
    }
});

mainContainer.addEventListener("click", () => {
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
})

floatingMenu.addEventListener("click", () => {
    
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
    else
    {
        mainContainer.setAttribute("style", "opacity: 0.3;")
    }
})


function activateOffcanvas()
{
    /** if we are in ipad/mobile (or res < 720p) view the second column as an offcanvas */
    secondCol.setAttribute("tabindex", -1);
    secondCol.setAttribute("aria-labelledby", "second-col-label");
    secondCol.classList.remove("main-col");
    secondCol.classList.add("offcanvas");
    secondCol.classList.add("offcanvas-start");
}

function deactivateOffcanvas()
{
    secondCol.classList.add("main-col");
    secondCol.classList.remove("offcanvas");
    secondCol.classList.remove("offcanvas-start");
    secondCol.removeAttribute("tabindex");
    secondCol.removeAttribute("aria-labelledby");
    secondCol.removeAttribute("style"); //prevent visual glitches if the user has used the offcanvas mode right before switching to desktop view
}
