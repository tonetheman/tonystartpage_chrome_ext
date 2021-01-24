let target = dayjs("2021-07-01");

function paint() {
    let now = dayjs();
    let days_until_target = parseInt(target.diff(now,"d"));
    let weeks_until_target = parseInt(target.diff(now,"w"));

    let e = document.getElementById("d");
    e.innerHTML = now.format();
    
    document.getElementById("days_to_target").innerHTML = days_until_target;
    document.getElementById("weeks_to_target").innerHTML = weeks_until_target;

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
    "davide-pietralunga-a__cDtgKo50-unsplash.jpg",
    "balu-gaspar-0fwVPmXE_k8-unsplash.jpg",
    "simon-berger-MtgvJIO17iA-unsplash.jpg",
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
        //chrome.tabs.update(t.id,
        //    {muted: true}, resFunc);
    });
};

function handle_dayjs_plugins() {
    dayjs.extend(window.dayjs_plugin_weekOfYear)
}

function main() {

    handle_dayjs_plugins();

    handle_muting();

    paint_background();
    paint();
    setInterval(paint, 1000);

    paintCPU();
}


window.onload = main;
