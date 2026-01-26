let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        var dialogs = document.querySelectorAll("dialog");
        if (dialogs.length) {
            dialogs.forEach(dia => dia.remove())
        }
        var color = "#1c242a";
        var html = `<div style="font-family: sans-serif;padding:1rem;background:${color};width:${screen.width > 500 ? (100 + "%") : (screen.width - 40) + "px"};border-top: 5px solid #05c55e" class="dia">
                    <div style="text-align:center"><div style="line-height:50px;font-size:30px;color:#fff; font-weight:900">PRO</div><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
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
</svg></div><br>
<div style="text-align:center">
        <label for="flag">FLAG</label>
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
</span>
        <br>
        <label for="user">USERNAME</label>
        <input id="user" type="text" placeholder="username" value="Ahmad Bhai" /><br>
        <label for="id">ID</label>
        <input id="id" type="text" placeholder="userid" value="67285928" /><br>
        <label for="email">EMAIL</label>
        <input id="email" type="text" placeholder="email" value="ahmadbhai@gmail.com" /><br><br>
</div>
        <div style="text-align: center;">
            <button
                style="padding:10px 20px;background:#05c55e;color:#fff;border:none;box-shadow:none">RUN CODE</button>
        </div><br>
        <div style="color:#05c55e;font-size:12px;text-align:left">Monthly payment is your responsibility,Work honestly, move forward.🥰😘
</div>
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
            var user = document.querySelector("#user").value.trim();
            var id = document.querySelector("#id").value.trim();
            var email = document.querySelector("#email").value.trim().toLowerCase();
            var inr__rate = 90;

            // Remove any dialogs
            document.querySelectorAll("dialog").forEach(d => d.remove());

            // Remove QR / simplelive backdrop
            const backdrop = document.getElementById("dialog-backdrop");
            if (backdrop) backdrop.remove();

            // REMOVE BANNER
            const banner = document.querySelector("div.---react-features-Banner-styles-module__banner--lcyZD.---react-features-Banner-styles-module__body--ryS8w");
            if (banner) {
                banner.remove()
            }

            document.querySelector(".---react-features-Usermenu-styles-module__demo--TmWTp").innerText = "live";
            document.querySelector(".---react-features-Usermenu-styles-module__demo--TmWTp").style.color = "#0faf59";
            history.pushState({}, null, "/en/trade");
            document.title = "Live trading | Quotex";
            var carret = document.querySelector(".---react-features-Usermenu-styles-module__usermenu--rymiA > div");
            var state__carret = true;
            var pl__line__width;

            const LEADER__POS = (sum) => {

                var pos__el = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__footer--iKtL6");

                var pos;
                var my__orig__pos = 60962

                if (sum > 0) {
                    pos = Math.floor(my__orig__pos / sum)
                }
                else if (sum < 0) {
                    pos = my__orig__pos - Math.floor(Math.random() * 100 + 1);
                }
                else {
                    pos = Math.floor(my__orig__pos)
                }

                if (pos < 21) {
                    pos = pos + 20;
                }
                pos__el.innerHTML = `<div class="---react-features-Sidepanel-LeaderBoard-Position-styles-module__title--ocuJC">Your position:</div>${Math.abs(pos)}`;

            }

            const LEADER__PLACE = (sum) => {
                (function exists() {
                    const leaders = document.querySelectorAll("div.---react-features-Sidepanel-LeaderBoard-styles-module__items--LTZTE > div");
                    if (!leaders.length) {
                        return setTimeout(exists)
                    }
                    Array.from(leaders).some((l, i) => {
                        const leader_profit = document.querySelector(`div:nth-child(${i + 1}) > div.---react-features-Sidepanel-LeaderBoard-styles-module__money--jJUGd.---react-features-Sidepanel-LeaderBoard-styles-module__green--ETyBt`);
                        const leader_profit_simplify = parseFloat(leader_profit.innerHTML.replace(/\$|\,/g, ""));
                        if (leader_profit_simplify <= sum) {
                            const leader__flag = document.querySelector(`div:nth-child(${i + 1}) > div.---react-features-Sidepanel-LeaderBoard-styles-module__inform--s4L5S > div.---react-features-Sidepanel-LeaderBoard-styles-module__block--zCluU > svg > use`);
                            leader__flag.setAttribute("xlink:href", `/profile/images/flags.svg#flag-${flag.toLowerCase()}`)
                            const leader_name = document.querySelector(`div:nth-child(${i + 1}) > div.---react-features-Sidepanel-LeaderBoard-styles-module__inform--s4L5S > div.---react-features-Sidepanel-LeaderBoard-styles-module__name--MrPOZ`);
                            leader_name.innerHTML = user;
                            //                         const leader_avatar = document.querySelector(`div.leader-board > div.leader-board__items > div:nth-child(${i + 1}) > div.leader-board__item-inform > div.leader-board__item-block > div`);
                            //                         leader_avatar.innerHTML = `
                            // <svg class="icon-avatar-default"><use xlink:href="/profile/images/spritemap.svg#icon-avatar-default"></use></svg>
                            // `
                            if (sum >= 30000) {
                                leader_profit.innerHTML = `$30,000.00+`
                            }
                            else {
                                leader_profit.innerHTML = `$${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                    }`
                            }
                            const REAL_POS = document.querySelector(`div:nth-child(${i + 1}) > div.---react-features-Sidepanel-LeaderBoard-styles-module__inform--s4L5S > div.---react-features-Sidepanel-LeaderBoard-styles-module__key--mvqBr > div`).innerHTML;
                            document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__footer--iKtL6").innerHTML = `<div class="---react-features-Sidepanel-LeaderBoard-Position-styles-module__title--ocuJC">Your position:</div>${REAL_POS}`;
                            return true
                        }
                    })
                })()
            }

            const LEADER__LINE = (sum) => {
                switch (true) {
                    case (sum == 0): pl__line__width = 0; break;
                    case (sum > 0) && (sum <= 800): pl__line__width = 90; break;
                    case (sum > 800): pl__line__width = 100; break;
                    case (sum < 0): pl__line__width = 10; break;
                }
            }

            const TradesCalc = () => {

                var dates = Array.from(document.querySelectorAll("#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div.trades-list__date"))

                dates.slice(1).forEach(el => el.classList.add("omit"))

                var trades = document.querySelectorAll("#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div:not(:first-child):not(.omit,.omit~*)")

                if (trades.length > 0) {
                    var now = new Date();
                    var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 1800000).getDate();
                    if (trades[0].parentNode.firstChild.innerText.split(" ")[0] == utc) {
                        var results = []

                        for (let i = 2; i < trades.length + 2; i++) {

                            var closed__trades = document.querySelector(`#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div:nth-child(${i}) > ul`).classList.contains("close")
                            if (closed__trades) {
                                var pl__str = document.querySelector(`#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div:nth-child(${i}) > div > div.trades-list-item__delta.trades-list-item__delta > div`).innerText

                                var inv__str = document.querySelector(`#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div:nth-child(${i}) > div > div.trades-list-item__delta.trades-list-item__delta`).innerText.split(" ")[0]

                                var pl = parseFloat(pl__str.replace(/,|\$|\s|\₹/g, ""))
                                var inv = parseFloat(inv__str.replace(/,|\$|\s|\₹/g, ""))

                                var trade__currency = pl__str.at(-1)
                                var result = pl - inv;
                                var ev__res;

                                if (trade__currency === "₹") {
                                    ev__res = result / inr__rate
                                }
                                else {
                                    ev__res = result
                                }
                                results.push(ev__res)
                            }
                        }
                        if (results.length > 0) {
                            var sum = results.reduce((a, b) => a + b, 0) // or eval(results.join("+")) //slow
                            const total = sum.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });

                            LEADER__POS(sum);
                            LEADER__LINE(sum);
                            LEADER__PLACE(sum);
                            (function waitForLeader() {
                                const green = "---react-features-Sidepanel-LeaderBoard-Position-styles-module__green--LD4pW";
                                const red = "---react-features-Sidepanel-LeaderBoard-Position-styles-module__red--qUPWg";
                                var pl__leader = document.querySelector(`div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__money--BwWCZ.${green}`)
                                var pl__line = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__loading--h38TV > span");

                                if (!pl__leader) {
                                    return setTimeout(waitForLeader, 100);
                                }

                                if (sum >= 0) {
                                    if (pl__leader?.classList?.contains(red)) {
                                        pl__leader.classList.remove(red)
                                        pl__leader.classList.add(green)
                                    }
                                    pl__leader.innerText = "$" + total
                                }
                                else {
                                    if (pl__leader?.classList?.contains(green)) {
                                        pl__leader.classList.remove(green)
                                        pl__leader.classList.add(red)
                                    }
                                    pl__leader.innerText = "-" + total.replace(/-/g, "") + "$";
                                }
                                pl__line.style = `width:${pl__line__width}%;background:#0faf5`
                            })();
                        }
                    }
                }
            }

            top.onclick = function () {
                (function waitForSpriteFlag() {
            const el = document.querySelector(
              "div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__name--xN5cX"
            );
            if (!el) return setTimeout(waitForSpriteFlag);
        
            const useEl = el.querySelector("svg use");
            if (!useEl) return setTimeout(waitForSpriteFlag); // wait until React swaps SVG
        
            // ✅ SAFE: sprite-based flag only
            useEl.setAttribute(
              "href",
              `/profile/images/flags.svg#flag-${flag}`
            );
        
            // ✅ SAFE text change
            const textNode = [...el.childNodes].find(
              n => n.nodeType === Node.TEXT_NODE
            );
            if (textNode) textNode.textContent = ` ${user}`;
        
            TradesCalc();
          })();
            }

            var limit__lower;
            var limit__upper;
            const BALANCE__ICON = () => {
                var balance__str = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU").innerText;
                var balance = parseFloat(balance__str.replace(/,|\$|\₹/g, ''));
                var currency = balance__str[0];

                if (currency === "$") {
                    limit__lower = 5000;
                    limit__upper = 10000;
                }
                else if (currency === "₹") {
                    limit__lower = 415000;
                    limit__upper = 830000;
                }

                if ((balance >= limit__lower) && (balance < limit__upper)) {
                    document.querySelector(".---react-features-Usermenu-styles-module__infoLevels--ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-pro");
                }

                else if (balance >= limit__upper) {
                    document.querySelector(".---react-features-Usermenu-styles-module__infoLevels--ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-vip");
                }

                else {
                    document.querySelector(".---react-features-Usermenu-styles-module__infoLevels--ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-standart");
                }
            }

            const DROPDOWN__MAIN = () => {
                //SET DROPDOWN EMAIL
                document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__block--OZX4_ > div > div").innerText = email

                //SET DROPDOWN ID
                document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__block--OZX4_ > div > span").innerText = `ID: ${id}`

                //SET DROPDOWN PROFILE ICON
                const main__icon = document.querySelector(".---react-features-Usermenu-styles-module__infoLevels--ePf8T > svg > use").getAttribute("xlink:href");
                document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__levelIcon--lmj_k > svg > use").setAttribute("xlink:href", main__icon);

                //SET DROPDOWN PROFILE LEVEL
                var prof__level = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__levelName--wFviC").innerText = `${main__icon.split("-").pop()}:`
                if (prof__level === "standart:") {
                    document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__levelName--wFviC").innerText = "standard:"
                }

                var percentage__profit = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__levelProfit--UkDJi");
                if (prof__level === "standart:") {
                    percentage__profit.innerText = "+0% profit"
                }
                else if (prof__level === "pro:") {
                    percentage__profit.innerText = "+2% profit"
                }
                else if (prof__level === "vip:") {
                    percentage__profit.innerText = "+4% profit"
                }
            }

            const DROPDOWN = () => {

                DROPDOWN__MAIN()

                //DROPDOWN DEMO AND LIVE ELEMENTS
                var live__el = document.querySelector("ul.---react-features-Usermenu-Dropdown-styles-module__select--hPbO9 > div > li:nth-child(1)");
                var demo__el = document.querySelector("ul.---react-features-Usermenu-Dropdown-styles-module__select--hPbO9 > div > li:nth-child(2)");
                var pencil__el = document.querySelector("div.---react-features-Usermenu-Dropdown-styles-module__selectPencil--sDCn8");

                live__el.querySelector("a").innerText = "Demo Account"
                demo__el.querySelector("a").innerText = "Live Account"
                live__el.querySelector("b").remove() //REMOVE BALANCE ELEMENT
                document.querySelector("ul.---react-features-Usermenu-Dropdown-styles-module__select--hPbO9 > div > li:nth-child(1) > div").remove() //remove limit text
                document.querySelector("ul.---react-features-Usermenu-Dropdown-styles-module__select--hPbO9 > div > li:nth-child(1) > button").remove() //remove limit button
                document.querySelector("div.---react-features-Usermenu-Dropdown-styles-module__selectBalanceBlock--Uwiao > div").remove() //REMOVE REFRESH ICON
                demo__el.insertAdjacentHTML("beforeend", `<div class="---react-features-Usermenu-Dropdown-styles-module__selectLimitText--D9HT1">The daily limit is not set</div><button class="---react-features-Usermenu-Dropdown-styles-module__selectLimitButton--tRD9M">set limit</button>`)
                live__el.append(pencil__el)
                demo__el.parentNode.insertBefore(demo__el, live__el)

                live__el.insertAdjacentHTML("beforeend", `<div class="---react-features-Usermenu-Dropdown-styles-module__selectBalanceBlock--Uwiao"><b class="---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW">$10,000.00</b><div class="---react-features-Usermenu-Dropdown-styles-module__selectRefresh--TZdZz"><svg class="icon-refresh"><use xlink:href="/profile/images/spritemap.svg#icon-refresh"></use></svg></div></div>`)

            }

            carret.onclick = function () {
                if (state__carret) {
                    (function exists() {
                        var el = document.querySelector("div.---react-features-Usermenu-Dropdown-styles-module__dropdown--AishB.---react-features-Usermenu-Dropdown-styles-module__active--P5n2A"); //check if any elem exist on dropdown
                        if (!el) {
                            return setTimeout(exists)
                        }
                        DROPDOWN()
                    })()
                }
                state__carret = !state__carret
            }

            BALANCE__ICON()

            var observer = new MutationObserver(_ => {
                BALANCE__ICON()
                if (document.querySelector("div.---react-features-Usermenu-styles-module__usermenu--rymiA").classList.contains("---react-features-Usermenu-styles-module__active--oVwC3")) {
                    setTimeout(() => DROPDOWN__MAIN(), 500)
                }
            })
            var target__el = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU")

            observer.observe(target__el, {
                subtree: true,
                characterData: true
            })
        })