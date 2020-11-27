
function paint() {
    let mydate = new Date();
    let e = document.getElementById("d");
    e.innerHTML = mydate;
}

function paintCPU() {
    chrome.system.cpu.getInfo(function(info) {
        let cpu = document.getElementById("cpu");
        let ts = `CPUs: ${info.numOfProcessors}
        <br>arch: ${info.archName}<br>
        features: ${info.features}`;
        cpu.innerHTML = ts;
    });
}

let imgs =  [ 
    "freestocks--Qf9JKLysUg-unsplash.jpg",
    "mel-poole-LUPXhXj2ip0-unsplash.jpg",
    "toni-cuenca-CvFARq2qu8Y-unsplash.jpg"
];

function getRandomInt(maxNotInclusive) {
	return Math.floor(Math.random() * Math.floor(maxNotInclusive));
}

function paint_background() {
    let choice = getRandomInt(imgs.length);
    document.body.style.backgroundImage = `url('${imgs[choice]}')`;
}

function handle_muting() {
    function resFunc(a) {
        //console.log(a);
    }

   // get the current tab that was just opened
    chrome.tabs.getCurrent((t) => {
        //console.log(t);
	// update the tab to be muted
	// the only reason I added the callback func resFunc
	// is for debugging
        chrome.tabs.update(t.id,
            {muted: true}, resFunc);
    });
};

function main() {
    handle_muting();

    paint_background();
    paint();
    setInterval(paint, 1000);

    paintCPU();
}


window.onload = main;
