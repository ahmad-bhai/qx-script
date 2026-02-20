let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    var dialogs = document.querySelectorAll("dialog");
    if (dialogs.length) {
      dialogs.forEach(dia => dia.remove())
    }
    var color = "#1c242a";
    var html = `<div style="font-family: sans-serif;padding:1rem;background:${color};width:${screen.width>500?100+"%":(screen.width-40)+"px"}; border-top: 5px solid #05c55e" class="dia">
                    <div style="text-align:center"><div style="line-height:50px;font-size:30px;color:#fff;font-weight:900">PRO</div><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="50pt" height="50pt" viewBox="0 0 180.000000 180.000000"
 preserveAspectRatio="xMidYMid meet" style="display:inline-block;text-align:center">

<g transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)"
fill="#fff" stroke="none">
<path d="M753 1622 l-133 -77 0 -67 0 -67 87 50 c49 28 96 55 105 60 17 9 18
-23 18 -626 l0 -636 -50 28 -50 28 0 443 0 442 -55 0 -55 0 0 -405 c0 -223 -3
-405 -7 -405 -5 0 -27 10 -50 22 l-43 23 0 308 0 308 -57 -3 -58 -3 -5 -267
-5 -267 -40 22 -40 23 0 339 0 339 103 59 102 59 0 64 c0 35 -3 64 -6 64 -4 0
-78 -41 -165 -92 l-159 -92 0 -401 0 -401 342 -198 c189 -110 348 -199 353
-199 6 0 164 89 353 199 l342 199 0 400 0 400 -159 93 c-87 50 -161 92 -165
92 -3 0 -6 -29 -6 -64 l0 -63 103 -60 102 -59 0 -339 0 -340 -42 -23 -43 -23
0 270 0 271 -60 0 -60 0 0 -307 0 -308 -40 -22 c-21 -13 -41 -23 -44 -23 -4 0
-6 182 -6 405 l0 405 -60 0 -60 0 0 -443 0 -442 -46 -28 c-26 -15 -48 -26 -50
-24 -2 2 -3 288 -2 635 l3 632 103 -60 c57 -33 105 -60 108 -60 2 0 4 29 4 65
l0 64 -92 54 c-51 30 -113 66 -138 80 l-45 26 -132 -77z"/>
</g>
</svg>
</div><br>
<div style="text-align:center">
        <label for="flag__d">FLAG</label>
            <span style="position: relative; display: inline-block; width: 180px; background:#fff;color:black;">
  <span onclick="o.style.display=o.style.display=='inline-block'?'none':'inline-block'" class="s" id="s">
    <img src="https://flagcdn.com/16x12/${"PK".toLowerCase()}.png">
    ${regionNames.of("PK".toUpperCase())}
  </span>
  <div class="o" id="o">
    
      <div data-code="pk" data-name="Pakistan">
        <img src="https://flagcdn.com/16x12/pk.png" alt="Pakistan">
        Pakistan
      </div>
    
      <div data-code="in" data-name="India">
        <img src="https://flagcdn.com/16x12/in.png" alt="India">
        India
      </div>
    
      <div data-code="bd" data-name="Bangladesh">
        <img src="https://flagcdn.com/16x12/bd.png" alt="Bangladesh">
        Bangladesh
      </div>
    
      <div data-code="sa" data-name="Saudi Arabia">
        <img src="https://flagcdn.com/16x12/sa.png" alt="Saudi Arabia">
        Saudi Arabia
      </div>
    
      <div data-code="ae" data-name="United Arab Emirates">
        <img src="https://flagcdn.com/16x12/ae.png" alt="United Arab Emirates">
        United Arab Emirates
      </div>
    
      <div data-code="tr" data-name="Turkey">
        <img src="https://flagcdn.com/16x12/tr.png" alt="Turkey">
        Turkey
      </div>
    
      <div data-code="lk" data-name="Sri Lanka">
        <img src="https://flagcdn.com/16x12/lk.png" alt="Sri Lanka">
        Sri Lanka
      </div>
    
      <div data-code="au" data-name="Australia">
        <img src="https://flagcdn.com/16x12/au.png" alt="Australia">
        Australia
      </div>
    
      <div data-code="jp" data-name="Japan">
        <img src="https://flagcdn.com/16x12/jp.png" alt="Japan">
        Japan
      </div>
    
      <div data-code="np" data-name="Nepal">
        <img src="https://flagcdn.com/16x12/np.png" alt="Nepal">
        Nepal
      </div>
    
      <div data-code="eg" data-name="Egypt">
        <img src="https://flagcdn.com/16x12/eg.png" alt="Egypt">
        Egypt
      </div>
    
      <div data-code="my" data-name="Malaysia">
        <img src="https://flagcdn.com/16x12/my.png" alt="Malaysia">
        Malaysia
      </div>
    
      <div data-code="th" data-name="Thailand">
        <img src="https://flagcdn.com/16x12/th.png" alt="Thailand">
        Thailand
      </div>
    
      <div data-code="kr" data-name="South Korea">
        <img src="https://flagcdn.com/16x12/kr.png" alt="South Korea">
        South Korea
      </div>
    
      <div data-code="ng" data-name="Nigeria">
        <img src="https://flagcdn.com/16x12/ng.png" alt="Nigeria">
        Nigeria
      </div>
    
      <div data-code="mx" data-name="Mexico">
        <img src="https://flagcdn.com/16x12/mx.png" alt="Mexico">
        Mexico
      </div>
    
  </div>
</span><br>
        <label for="username">USERNAME</label>
        <input id="username" type="text" placeholder="username" value="ROYAL QUOTEX TRADER" /><br>
        <label for="amount">AMOUNT</label>
        <input id="amount" type="text" placeholder="amount" value="2570" /><br>
        <label for="length">LINE</label>
        <input id="length" type="text" placeholder="line width" value="100" /><br>
        <label for="position">POSITION</label>
        <input id="position" type="text" placeholder="position" value="43" /><br>
        <label for="pl">P̲ROFIT/L̲OSS</label>
        <input id="pl" type="text" placeholder="P/L" value="P" /><br><br>
        <div>
        <div style="text-align: center;">
            <button
                style="padding:10px 20px;background:#05c55e;color:#fff;border:none;box-shadow:none">RUN CODE</button>
        </div><br>
          <div style="color:#ff6251;font-size:12px;text-align:left">👋 HELLO ROYAL QUOTEX TRADER, PAY 20$ UNTIL THIS THURSDAY OTHERWISE THIS SCRIPT WILL BE LOCKED 🔒</div>
        <hr style="border-color:#fff">
        <div style="text-align:center;font-weight:100;color:#fff">Made with <span style="cursor: pointer;color: #fff;-webkit-animation-name: heartbeat;animation-name: heartbeat;-webkit-animation-duration: 1.42857s;animation-duration: 1.42857s;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;-webkit-animation-timing-function: ease;animation-timing-function: ease;">♥</span> by <a style="color:#fff" href="https://t.me/AhmadTrader3">@AhmadTrader3</a></div>
    </div>`;

    var myDialog = document.createElement("dialog");
        document.body.appendChild(myDialog);
        myDialog.innerHTML = html;
        var flag = "PK".toLowerCase();
        myDialog.querySelectorAll(".o div").forEach(el => {
            el.addEventListener("click", () => {
                const code = el.getAttribute("data-code");
                const name = el.getAttribute("data-name");
                s.innerHTML = `<img src="https://flagcdn.com/16x12/${code}.png">${name}`;
                o.style.display = 'none';
                flag = code;
            });
        });
        var styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = `@keyframes heartbeat {0%{color:#ffb3b3} 35%{color: #ff1a1a} 100%{color:#ffb3b3}} dialog::backdrop {background:#05c55e;opacity:.25} ::selection {background:white;color:${color}} 
        .s {cursor: pointer;display: flex;align-items: center;padding: 5px;width: 180px;position: relative;}.o {display: none;position: absolute;top: 100%;left: 0;width: 180px;overflow-y: scroll;height: 200px;background: #fff;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 1000;}.o div {padding: 5px;display: flex;align-items: center;cursor: pointer;background: #fff;}.o div:hover {background: #eee;}img {margin-right: 5px;}`;
        myDialog.showModal();
        var labels = document.querySelectorAll(".dia label");
        labels.forEach(l => {
            l.style = `display:inline-block;width:100px;font-weight:600;color:#fff;font-size:12px`
        });
        var inputs = document.querySelectorAll(".dia input");
        inputs.forEach(i => {
            i.style = `display:inline-block;width:180px;padding:5px;margin-top:2px;outline:none;border-radius:0`;
            i.blur();
        })

    myDialog.querySelector("button").addEventListener("click", () => {
      myDialog.close();
      var username = document.querySelector("#username").value.trim();
        var prof = Number(document.querySelector("#amount").value.trim()).toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var pos = document.querySelector("#position").value.trim();
        var width = document.querySelector("#length").value.trim();
        var pl = document.querySelector("#pl").value.toLowerCase().trim();
        // Remove any dialogs
        document.querySelectorAll("dialog").forEach(d => d.remove());

        // Remove QR / simplelive backdrop
        const backdrop = document.getElementById("dialog-backdrop");
        if (backdrop) backdrop.remove();

        history.pushState({}, null, "/en/trade");

        document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__name--xN5cX").innerHTML = `<svg class="flag-${flag}"><use xlink:href="/profile/images/flags.svg#flag-${flag}"></use></svg>${username}`;

        document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__loading--h38TV > span").style.width = width + "%";

        const green = "---react-features-Sidepanel-LeaderBoard-Position-styles-module__green--LD4pW";
        const red = "---react-features-Sidepanel-LeaderBoard-Position-styles-module__red--qUPWg";
        var pl_text = document.querySelector(`div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__money--BwWCZ.${green}`)
        if (pl === "p") {
            if (pl_text?.classList?.contains(red)) {
                pl_text.classList.remove(red)
                pl_text.classList.add(green)
            }
            pl_text.innerText = "$" + prof
        }
        else if (pl === "l")  {
            if (pl_text?.classList?.contains(green)) {
                pl_text.classList.remove(green)
                pl_text.classList.add(red)
            }
            pl_text.innerText = "-" + prof.replace(/-/g, "") + "$";
        }

        document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__footer--iKtL6").innerHTML = `<div class="---react-features-Sidepanel-LeaderBoard-Position-styles-module__title--ocuJC">Your position:</div>${pos}`;


    })
