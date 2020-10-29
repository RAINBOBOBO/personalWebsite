let url = new URLSearchParams(window.location.search).get("link");
let tText = new URLSearchParams(window.location.search).get("top");
let bText = new URLSearchParams(window.location.search).get("bottom");
if (sessionStorage.getItem("memeCt") === null){
    sessionStorage.setItem("memeCt", 0);
} else {
    sessionStorage.setItem(sessionStorage.getItem("memeCt") + "url", url);
    sessionStorage.setItem(sessionStorage.getItem("memeCt") + "tText", tText);
    sessionStorage.setItem(sessionStorage.getItem("memeCt") + "bText", bText);
}

function memeCounter(){
    sessionStorage.setItem("memeCt", parseInt(sessionStorage.getItem('memeCt'))+1);
}

function delimg(){
    let index = this.getAttribute('index');
    this.parentElement.remove();
    sessionStorage.removeItem(index + 'url');
    sessionStorage.removeItem(index + 'tText');
    sessionStorage.removeItem(index+ 'bText');
}