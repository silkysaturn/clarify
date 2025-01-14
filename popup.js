document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("dys_btn");
    const output = document.getElementById("output");

    button.addEventListener("click", () => {
        output.textContent = "Button Clicked!";
    })
});