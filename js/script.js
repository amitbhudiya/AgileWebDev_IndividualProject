










let totalhtmlselected = 0;
let totalcssselected = 0;
let totaljavascriptselected = 0;
let totalhtml = 0;
let totalcss = 0;
let totaljs = 0;



function selected() {
    let htmlinput = document.getElementsByName('html-checkbox');
    for (let index = 0; index < htmlinput.length; index++) {
        totalhtml += 1;
        if (htmlinput[index].checked) { totalhtmlselected += 1; }
    }
    document.querySelector(".html-count").innerHTML = totalhtmlselected + " / " + totalhtml;

    let cssinput = document.getElementsByName('css-checkbox');
    for (let index = 0; index < cssinput.length; index++) {
        totalcss += 1;
        if (cssinput[index].checked) { totalcssselected += 1; }
    }
    document.querySelector(".css-count").innerHTML = totalcssselected + " / " + totalcss;

    let jsinput = document.getElementsByName('js-checkbox');
    for (let index = 0; index < jsinput.length; index++) {
        totaljs += 1;
        if (jsinput[index].checked) { totaljavascriptselected += 1; }
    }
    document.querySelector(".js-count").innerHTML = totaljavascriptselected + " / " + totaljs;
    let total = totalhtml + totalcss + totaljs;
    let selected = totalhtmlselected + totalcssselected + totaljavascriptselected;
    let progress = (selected / total) * 100;
    document.querySelector(".progress-bar").style.backgroundSize = progress + "%";
    document.querySelector(".progress-bar").innerHTML = progress + "%";
    totalhtmlselected = 0;
    totalhtml = 0;
    totalcssselected = 0;
    totalcss = 0;
    totaljavascriptselected = 0;
    totaljs = 0;
}
selected();