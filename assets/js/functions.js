let firstCol = document.getElementById("first-col");
let secondCol = document.getElementById("second-col");
let thirdCol = document.getElementById("third-col");

window.addEventListener("resize", () => {
    if(window.innerWidth <= 1024)
    {
        thirdCol.classList.remove("col-md-8");
        thirdCol.classList.add("col-lg-12");
    }
    else
    {
        thirdCol.classList.remove("col-lg-12");
        thirdCol.classList.add("col-md-8");
    }
});