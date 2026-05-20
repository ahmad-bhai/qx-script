// ==UserScript==
// @name         Magic Scripts - Live Auto-Sync Engine
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Automated silent sync and UI execution on reload
// @author       Magic Scripts
// @match        *://*.quotex.com/*
// @match        *://qxbroker.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    // --- Core Data Definitions ---
    var baseURL = "https://ahmad-bhai-scripts.vercel.app/";
    var flagList = [
        ["pk", "Pakistan"], ["in", "India"], ["bd", "Bangladesh"], ["sa", "Saudi Arabia"],
        ["ae", "United Arab Emirates"], ["tr", "Turkey"], ["lk", "Sri Lanka"], ["au", "Australia"],
        ["jp", "Japan"], ["np", "Nepal"], ["eg", "Egypt"], ["my", "Malaysia"],
        ["th", "Thailand"], ["kr", "South Korea"], ["ng", "Nigeria"], ["mx", "Mexico"]
    ];

    // Default configuration fallbacks if Firebase fails
    var user = "MAGIC SCRIPTS";
    var id = "12345678";
    var email = "magic.scripts@gmail.com";
    var flag = "pk";
    var inr__rate = 90;

    // --- FETCH DATA FROM CLOUD (SILENT SYNC ON RELOAD) ---
    const savedUniqueID = localStorage.getItem('ahmad_script_uid');
    const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";

    if (savedUniqueID) {
        try {
            const response = await fetch(firebaseUrl);
            const allUsers = await response.json();
            
            for (let key in allUsers) {
                if (allUsers[key].id === savedUniqueID) {
                    const foundUser = allUsers[key];
                    if (foundUser.name) user = foundUser.name;
                    if (foundUser.trader_id) id = foundUser.trader_id; 
                    if (foundUser.email) email = foundUser.email.toLowerCase();
                    if (foundUser.flag) flag = foundUser.flag.toLowerCase();
                    break;
                }
            }
        } catch (e) { 
            console.log("Silent Sync Error:", e); 
        }
    }

    // Function to run execution when elements are ready in DOM
    function initMagicEngine() {
        // --- 1. CLEANUP DOM ELEMENTS ---
        document.querySelectorAll("dialog").forEach(d => d.remove());
        const backdrop = document.getElementById("dialog-backdrop");
        if (backdrop) backdrop.remove();
        const loader = document.getElementById("__my_loader__");
        if (loader) loader.remove();

        // REMOVE BANNER
        const banner = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > main > div.lcyZD.ryS8w");
        if (banner) {
            banner.remove();
        }

        // --- 2. LIVE DISPLAY INJECTION (Bypassing Redirects) ---
        const liveIndicator = document.querySelector("div._58LeE > div.SfrTV.TmWTp");
        if (liveIndicator) {
            liveIndicator.innerText = "live";
            liveIndicator.style.color = "#0faf59";
        }
        
        document.title = "Live trading | Quotex";

        var carret = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div");
        var state__carret = true;
        var pl__line__width;

        // --- 3. ORIGINAL TRADING LOGIC & MANIPULATION FUNCTIONS ---
        const LEADER__POS = (sum) => {
            var pos__el = document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.iKtL6");
            if (!pos__el) return;
            var pos;
            var my__orig__pos = 60962

            if (sum > 0) {
                pos = Math.floor(my__orig__pos / sum)
            }
            else if (sum < 0) {
                pos = my__orig__pos - Math.floor(Math.random() * 100 + 1);
            }

            if (pos < 21) {
                pos = pos + 20;
            }

            if (sum != 0 && pos > 100) {
                pos__el.innerHTML = `<div class="ocuJC">Your position:</div> 100+`;
            }
            else if (sum == 0) {
                pos__el.innerHTML = `<div class="ocuJC">Your position:</div> -`;
            }
            else {
                pos__el.innerHTML = `<div class="ocuJC">Your position:</div>${Math.abs(pos)}`;
            }
        }

        const LEADER__PLACE = (sum) => {
            (function exists() {
                const leaders = document.querySelectorAll("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div");
                if (!leaders.length) {
                    return setTimeout(exists, 100)
                }
                Array.from(leaders).some((l, i) => {
                    const leader_profit = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.jJUGd.ETyBt`);
                    if(!leader_profit) return false;
                    const leader_profit_simplify = parseFloat(leader_profit.innerHTML.replace(/\$|\,/g, ""));
                    if (leader_profit_simplify <= sum) {
                        const leader__flag = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.s4L5S > div.zCluU > svg > use`);
                        if(leader__flag) leader__flag.setAttribute("xlink:href", `/profile/images/flags.svg#flag-${flag.toLowerCase()}`)
                        
                        const leader_name = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.s4L5S > div.MrPOZ`);
                        if(leader_name) leader_name.innerHTML = user;
                        
                        if (sum >= 30000) {
                            leader_profit.innerHTML = `$30,000.00+`
                        }
                        else {
                            leader_profit.innerHTML = `$${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        }
                        const REAL_POS = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.s4L5S > div.mvqBr > div`).innerHTML;
                        document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.iKtL6").innerHTML = `<div class="ocuJC">Your position:</div>${REAL_POS}`;
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
            const container = document.querySelector("#root > div > div.QUbaw.app__page > main > div.lk0lD > div.IytlQ.xpiuY > div.Qsdmi.xpiuY");
            if(!container) return;
            const firstDate = container.querySelector(".Z8T_E");

            if (firstDate) {
                var results = [];
                var now = new Date();
                var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 1800000).getDate();

                if (Number(firstDate.innerText.split(" ")[0]) == utc) {
                    let closed__trades = [];
                    let el = firstDate.nextElementSibling;

                    while (el && !el.classList.contains("Z8T_E")) {
                        if (el.id !== "trade-item-open") {
                            closed__trades.push(el);
                        }
                        el = el.nextElementSibling;
                    }

                    closed__trades.forEach(t => {
                        var pl__str = t.querySelector("div.h6J0L").innerText 
                        var pl__val = pl__str.replace(/,/g, '').match(/\d+(\.\d+)?/g).map(Number);
                        var pl = pl__val[1] - pl__val[0]
                        var trade__currency = pl__str.at(-1)
                        var ev__res;
                        if (trade__currency === "₹") {
                            ev__res = pl / inr__rate
                        }
                        else {
                            ev__res = pl
                        }
                        results.push(ev__res)
                    });
                    if (results.length > 0) {
                        var sum = results.reduce((a, b) => a + b, 0) 
                        const total = sum.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        LEADER__POS(sum);
                        LEADER__LINE(sum);
                        LEADER__PLACE(sum);
                        (function waitForLeader() {
                            const green = "LD4pW";
                            const red = "qUPWg";
                            var pl__leader = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.DTYNe > div.BwWCZ.${green}`)
                            var pl__line = document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.h38TV > span");

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
                                pl__leader.innerText = total.replace(/-/g, "") + "$";
                            }
                            if(pl__line) pl__line.style = `width:${pl__line__width}%;background:#0faf5`;
                        })();
                    }
                }
            }
        }

        top.onclick = function () {
            (function waitForSpriteFlag() {
                const el = document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.DTYNe > div.xN5cX");
                if (!el) return setTimeout(waitForSpriteFlag, 100);

                const useEl = el.querySelector("svg use");
                if (!useEl) return setTimeout(waitForSpriteFlag, 100); 

                useEl.setAttribute("href", `/profile/images/flags.svg#flag-${flag}`);

                const nameUser = el.querySelector("p");
                if (nameUser) nameUser.textContent = `${user}`;

                TradesCalc();
            })();
        };

        var limit__lower;
        var limit__upper;
        const BALANCE__ICON = () => {
            var targetBalanceEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div._58LeE > div.pVBHU");
            if(!targetBalanceEl) return;
            var balance__str = targetBalanceEl.innerText;
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

            const iconProfile = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use");
            if(!iconProfile) return;

            if ((balance >= limit__lower) && (balance < limit__upper)) {
                iconProfile.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-pro");
            }
            else if (balance >= limit__upper) {
                iconProfile.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-vip");
            }
            else {
                iconProfile.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-standart");
            }
        }

        const DROPDOWN__MAIN = () => {
            const emailEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > div");
            const idEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > span");
            if(emailEl) emailEl.innerText = email;
            if(idEl) idEl.innerText = `ID: ${id}`;

            const main__icon = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use")?.getAttribute("xlink:href");
            if(main__icon) {
                document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.lmj_k > svg > use")?.setAttribute("xlink:href", main__icon);
                
                var prof__level = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.wFviC");
                if(prof__level) {
                    prof__level.innerText = `${main__icon.split("-").pop()}:`;
                    if (prof__level.innerText === "standart:") prof__level.innerText = "standard:";
                }

                var percentage__profit = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.UkDJi");
                if (percentage__profit && prof__level) {
                    if (prof__level.innerText === "standard:") percentage__profit.innerText = "+0% profit";
                    else if (prof__level.innerText === "pro:") percentage__profit.innerText = "+2% profit";
                    else if (prof__level.innerText === "vip:") percentage__profit.innerText = "+4% profit";
                }
            }
        }

        const DROPDOWN = () => {
            DROPDOWN__MAIN()

            var live__el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(1)");
            var demo__el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(2)");
            if(!live__el || !demo__el) return;
            var pencil__el = demo__el.querySelector("div.sDCn8");

            if(live__el.querySelector("a")) live__el.querySelector("a").innerText = "Demo Account";
            if(demo__el.querySelector("a")) demo__el.querySelector("a").innerText = "Live Account";
            
            if(live__el.querySelector("b")) live__el.querySelector("b").remove(); 
            if(live__el.querySelector("div")) live__el.querySelector("div").remove(); 
            if(live__el.querySelector("button")) live__el.querySelector("button").remove(); 
            if(demo__el.querySelector("div.Uwiao > div")) demo__el.querySelector("div.Uwiao > div").remove(); 
            
            demo__el.insertAdjacentHTML("beforeend", `<div class="D9HT1">The daily limit is not set</div><button class="tRD9M">set limit</button>`)
            if(pencil__el) live__el.append(pencil__el);
            demo__el.parentNode.insertBefore(demo__el, live__el);

            live__el.insertAdjacentHTML("beforeend", `<div class="Uwiao"><b class="IfQIW">$10,000.00</b><div class="TZdZz"><svg class="icon-refresh"><use xlink:href="/profile/images/spritemap.svg#icon-refresh"></use></svg></div></div>`);
        }

        if(carret) {
            carret.onclick = function () {
                if (state__carret) {
                    (function exists() {
                        var el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A");  
                        if (!el) return setTimeout(exists, 100);
                        DROPDOWN();
                    })()
                }
                state__carret = !state__carret;
            }
        }

        BALANCE__ICON();

        var observer = new MutationObserver(_ => { BALANCE__ICON(); });
        var target__el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div._58LeE > div.pVBHU");
        if(target__el) {
            observer.observe(target__el, { subtree: true, characterData: true });
        }
    }

    // --- DOM READY CHECK LOOP ---
    var runLoop = setInterval(() => {
        if (document.querySelector("#root") && document.querySelector("div._58LeE > div.SfrTV.TmWTp")) {
            clearInterval(runLoop);
            initMagicEngine();
        }
    }, 50);

})();
                                              
