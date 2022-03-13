const modalopener =(event)=>{
    const id = event.target.id;
    const captionBox = event.target.children[1].children;
    const label = captionBox[0].innerHTML;
    const desc = captionBox[1].innerHTML;
    const labelfield = document.getElementById("modal-label");
    const descfield = document.getElementById("modal-desc");
    const idfield = document.getElementById("modal-hidden-id");
    labelfield.value = label;
    descfield.value = desc;
    idfield.value = id;
}