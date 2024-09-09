
export function createHTML(html){
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const webElement = template.content.firstElementChild;
    document.body.appendChild(webElement);
    return webElement;
}


export function poring(){
    return `<div id="pet" class="pet"></div>`;
}

export function shadow(){
    return `<div id="shadow" class="shadow"></div>`;
}