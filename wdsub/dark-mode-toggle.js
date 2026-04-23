let toggle = document.getElementById("tog");
let on = document.getElementById("on");

  //Determine if light mode is on
  let isLight = true;

function tog_event(event) {
  //Change background color to black if light, else white
  if (isLight) document.body.style.backgroundColor = "black";
  else document.body.style.backgroundColor = "white";
  //Change text to "dark mode on" if light mode, else "dark mode off"
  if (isLight) on.innerHTML="<p>Dark mode is off</p>";
  else on.innnerHTML = "<p>Dark mode is on</p>";
  //Change text color to white if light mode, else black
  if (isLight) document.body.style.color = "white";
  else document.body.style.color = "black";
//Flip the is light switch
  isLight = !isLight;
}
