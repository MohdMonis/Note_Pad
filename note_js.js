const main_bdy = document.querySelector("#mainbody");

const note_page = document.querySelector("#n_note");
const add_btn = document.querySelector("#add");
const close_btn = document.querySelector("#card>i");
const open_note = document.querySelector("#open");
const o_card = document.querySelector("#card");
const create = document.querySelector("#save");
const inpt = document.querySelectorAll("input");
const note_bg = document.querySelector("#new_note");

const titl = document.querySelector("#title");
const bdy = document.querySelector("#body");

let array = [];

function set_local(val) {
    localStorage.setItem("note_info", JSON.stringify(val))
};

function get_local() {
    if (localStorage.getItem("note_info") == null) {
        // console.log("array created");
        localStorage.setItem("note_info", JSON.stringify(array))
    } else {
        // console.log("array updated");
        return JSON.parse(localStorage.getItem("note_info"));
    };
};

// add note
function add_note() {
    note_page.innerHTML = `<div id="new_note">
                                <i onclick="close_note()" class="ri-close-fill"></i>
                                <div id="opt">
                                    <div id="theme">
                                        <h4>Select theme: </h4>
                                        <label onclick="color_white()" for="t_white">White: </label>
                                        <input onclick="color_white()" checked type="radio" name="theme" id="t_white">
                                        <label onclick="color_blue()" for="t_blue">Blue: </label>
                                        <input onclick="color_blue()" type="radio" name="theme" id="t_blue">
                                        <label onclick="color_yellow()" for="t_yellow">Yellow: </label>
                                        <input onclick="color_yellow()" type="radio" name="theme" id="t_yellow">
                                    </div>
                                    <button onclick="save_note()" id="save">Create</button>
                                </div>
                                <div id="note_top">
                                    <input autofocus type="text" name="title" id="title" placeholder="Enter the title for this note">
                                    <textarea name="body" id="body" placeholder="Create your note"></textarea>
                                </div>
                            </div>`;
    // console.log("add");
    note_page.style = `transform: translate(-100%, 100%);`;
};

// close note
function close_note() {
    note_page.style = `transform: initial;`;
};

// update note
function update_note(params) {
    if ((document.querySelector("#body").value.trim().length <= 0)) {
        alert("body can't be empty. Please write something.")
    } else {
        let data = get_local();
        data[params].NB = document.querySelector("#body").value;
        set_local(data);
        // console.log("your note updated sucessfully");
        note_page.style = `transform: initial;`;
        displaycard();
    };
};

const o_title = document.querySelector("#crdtitl>h4");
const o_body = document.querySelector("#crdbody>p");

// open note 
main_bdy.addEventListener("click", (dets) => {
    if (dets.target.id == "open") {
        note_page.style = `transform: translate(-100%, 100%);`;
        let arr = get_local();
        arr.forEach((data, i) => {
            if (i == dets.target.dataset.indx) {
                note_page.innerHTML = `<div id="card">
                                            <i onclick="close_note()" class="ri-close-fill"></i>
                                            <div id="crdtitl">
                                                <h4>${data.NT}</h4>
                                            </div>
                                            <div id="crdbody">
                                                <p>${data.NB}</p>
                                            </div>
                                        </div>`;
                document.querySelector("#card").style = data.NC;
            };
        });
    } else if (dets.target.id == "edit") {
        note_page.style = `transform: translate(-100%, 100%);`;
        let arr = get_local();
        arr.forEach((data, i) => {
            if (i == dets.target.dataset.indx) {
                note_page.innerHTML = `<div id="new_note">
                                            <i onclick="close_note()" class="ri-close-fill"></i>
                                            <div id="note_top">
                                                <div class="crdtitl">
                                                    <h4>${data.NT}</h4>
                                                </div>
                                                <textarea style="margin-bottom: 6px;" name="body" id="body">${data.NB}</textarea>
                                            </div>
                                            <button onclick="update_note(${i})" id="update">Update</button>
                                        </div>`;
                document.querySelector("#new_note").style = data.NC;
            };
        });

    } else if (dets.target.id == "delete") {
        let arr = get_local();
        arr.splice(dets.target.dataset.indx, 1);
        set_local(arr);
        displaycard();
    }
});


let note_clrs = `background-color: rgb(240, 234, 226); box-shadow: 0 0 10px 2px rgb(182, 182, 199) inset;`;

function save_note() {
    if (((document.querySelector("#title").value.trim().length <= 0) || (document.querySelector("#body").value.trim().length <= 0)) || (document.querySelector("#title").value.length >= 15)) {
        // console.log("your title ");
    } else {
        // console.log("note created sucessfully.");
        note_page.style = `transform: none;`;
        let arr = get_local();
        arr.push({ NC: note_clrs, NT: document.querySelector("#title").value, NB: document.querySelector("#body").value });
        set_local(arr);
        note_clrs = `background-color: rgb(240, 234, 226); box-shadow: 0 0 10px 2px rgb(182, 182, 199) inset;`;
        displaycard();
    }
};

const mbdl = document.querySelector("#md_left"),
    mbdm = document.querySelector("#md_mid"),
    mbdr = document.querySelector("#md_right"),
    trick = document.querySelectorAll(".trick");

function append_card(kisme, konsa, kaisa, naam, kaam) {
    kisme.innerHTML += `<div id="crd_bg-${konsa}" style="${kaisa}" class="card">
                            <div class="overlay">
                                <button data-indx="${konsa}" id="open">Open</button>
                                <button data-indx="${konsa}" id="edit">Edit</button>
                                <button data-indx="${konsa}" id="delete">Delete</button>
                            </div>
                            <div class="crdtitl">
                                <h4>${naam}</h4>
                            </div>
                            <div class="crdbody">
                                <p>${kaam}</p>
                            </div>
                        </div>`;
}

function displaycard() {
    mbdl.innerHTML = '';
    mbdm.innerHTML = '';
    mbdr.innerHTML = '';
    let arr = get_local();
    arr.forEach((elem, i) => {
        if (((trick[0].getBoundingClientRect().height <= trick[1].getBoundingClientRect().height) && (trick[0].getBoundingClientRect().height <= trick[2].getBoundingClientRect().height))) {
            append_card(mbdl, i, elem.NC, elem.NT, elem.NB);
        } else if (((trick[1].getBoundingClientRect().height <= trick[0].getBoundingClientRect().height) && (trick[1].getBoundingClientRect().height <= trick[2].getBoundingClientRect().height))) {
            append_card(mbdm, i, elem.NC, elem.NT, elem.NB);
        } else if (((trick[2].getBoundingClientRect().height <= trick[0].getBoundingClientRect().height) && (trick[2].getBoundingClientRect().height <= trick[1].getBoundingClientRect().height))) {
            append_card(mbdr, i, elem.NC, elem.NT, elem.NB);
        }
    });
}
displaycard()

function color_white() {
    note_clrs = `background-color: rgb(240, 234, 226); box-shadow: 0 0 10px 2px rgb(182, 182, 199) inset;`;
    document.querySelector("#new_note").style = note_clrs;
};

function color_blue() {
    note_clrs = `background-color: rgb(181, 223, 243); box-shadow: 0 0 10px 2px rgb(143, 175, 190) inset;`;
    document.querySelector("#new_note").style = note_clrs;
};

function color_yellow() {
    note_clrs = `background-color: rgb(240, 238, 149); box-shadow: 0 0 10px 2px rgb(194, 193, 121) inset;`;
    document.querySelector("#new_note").style = note_clrs;
};