let elem = document.createElement("div");
elem.innerhtml = "<link rel='stylesheet' href='https://yatpuetzer.github.io/web-dev/header.css'>";
document.body.prepend(elem);

fetch("https://yatpuetzer.github.io/web-dev/globalheader.html")
.then((result) => result.text())
.then((text) => {elem.innerHTML = elem.innerHTML + text;})
.catch((e) => consol.error(e));
