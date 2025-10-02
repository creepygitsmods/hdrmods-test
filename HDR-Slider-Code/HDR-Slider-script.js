const divisor = document.getElementById("divisor");
const handle = document.getElementById("handle");
const slider = document.getElementById("slider");
const img2 = document.getElementById("img2");
const input = document.getElementById("img2");


function moveDivisor() {
  img2.style.clipPath = `rect(0px ${slider.value}% 100% 0px)`;
  handle.style.left = `${slider.valueAsNumber}%`;
	divisor.style.width = `${slider.valueAsNumber}%`;
}
slider.addEventListener('input', moveDivisor);

window.onload = function() {
	moveDivisor();
};