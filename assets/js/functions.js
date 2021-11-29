let firstCol = document.getElementById("first-col");
let secondCol = document.getElementById("second-col");
let thirdCol = document.getElementById("third-col");
let viewportBreakpoint = 1024; //viewport width
let crabs = 7; //Neven enough crabs
let midCol = "col-md-6";
let fullCol = "col-lg-12";
let lesCrabes = ".....(\\/)(°,,,,°)(\\/)"
let lesOtherCrabes = "(\\/)(°,,,,°)(\\/)....."
let floatingMenu = document.getElementById("main-menu");
let mainContainer = document.getElementById("main-container");
let crabCounter = 0;

if(window.innerWidth <= viewportBreakpoint)
{
    activateOffcanvas();
    activateMobileStyle();
}


window.addEventListener("resize", () => {
    if(window.innerWidth <= viewportBreakpoint)
    {
        /** if we are in ipad/mobile (or res < 720p) center the content of the third column */
        thirdCol.classList.remove(midCol);
        thirdCol.classList.add(fullCol);

        activateOffcanvas();
        activateMobileStyle();

    }
    else
    {
        thirdCol.classList.remove(fullCol);
        thirdCol.classList.add(midCol);

        deactivateOffcanvas();
        deactivateMobileStyle();
    }
});

mainContainer.addEventListener("click", () => {
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
})

document.getElementById("dropdown-menu").addEventListener("click", () => {
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

document.getElementById("les-crabes").addEventListener("click", () =>{

    document.getElementById("les-crabes").innerHTML +=  lesOtherCrabes;
    crabCounter++;

    if(crabCounter == 10)
    {
        document.getElementById("les-crabes").style.color = "#cd7f84";
    }

    if(crabCounter == 35)
    {
        document.getElementById("les-crabes").style.fontSize = "30px";
    }

    if(crabCounter == 60)
    {
        document.getElementById("les-crabes").style.fontSize = "50px";
        let allStrings = Array.from(document.querySelectorAll("p"));
        for(let i = 0; i < allStrings.length; i++)
        {
            allStrings[i].innerHTML = lesCrabes + ".....";
        }
    }

    if(crabCounter == 100)
    {
        let url = "https://www.youtube.com/watch?v=cE0wfjsybIQ&ab_channel=Noisestorm"
        window.open(url,'_blank');
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

function activateMobileStyle()
{
    document.getElementById("les-crabes").innerHTML=  lesCrabes + ".....";
}

function deactivateMobileStyle()
{
    document.getElementById("les-crabes").innerHTML= "";

    for(let i = 0; i < crabs; i++)
    {
        document.getElementById("les-crabes").innerHTML += lesCrabes;
    }

    document.getElementById("les-crabes").innerHTML += ".....";
}