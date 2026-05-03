// --- Redirection Logic (Live to Demo) ---
(function() {
    const currentURL = window.location.href;
    
    // Check karein ke asli trade page hai ya nahi
    if (currentURL.includes("/en/trade") && !currentURL.includes("demo-trade")) {
        console.log("Switching to Demo for masking...");
        window.location.replace(currentURL.replace("/en/trade", "/en/demo-trade"));
        return; 
    }

    // Agar URL demo-trade hai toh 5 seconds baad main script start hogi
    setTimeout(() => {
        console.log("Script starting...");
        startExtension();
    }, 5000);
})();

function startExtension() {
    (function() {
        // 1. Direct Data Assignment
        var user = "Khan binary trader"; 
        var id = "56482442";             
        var email = "khanbinarytrader@gmail.com"; 
        var flag = "pk"; 
        var inr__rate = 90;

        // 2. Cleanup (Dialogs/Banners hatane ke liye)
        document.querySelectorAll("dialog").forEach(d => d.remove());
        const backdrop = document.getElementById("dialog-backdrop");
        if (backdrop) backdrop.remove();
        const banner = document.querySelector(".lcyZD.ryS8w");
        if (banner) banner.remove();

        // 3. UI Fixes
        const liveLabel = document.querySelector("div._58LeE > div.SfrTV.TmWTp");
        if (liveLabel) {
            liveLabel.innerText = "live";
            liveLabel.style.color = "#0faf59";
        }

        // Masking: URL bar mein 'trade' dikhayega
        history.pushState({}, null, "/en/trade");
        document.title = "Live trading | Quotex";

  
        var carret = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div");
        var state__carret = true;
        var pl__line__width;

        const LEADER__POS = (sum) => {

            var pos__el = document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.iKtL6");

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
                    return setTimeout(exists)
                }
                Array.from(leaders).some((l, i) => {
                    const leader_profit = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.jJUGd.ETyBt`);
                    const leader_profit_simplify = parseFloat(leader_profit.innerHTML.replace(/\$|\,/g, ""));
                    if (leader_profit_simplify <= sum) {
                        const leader__flag = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.s4L5S > div.zCluU > svg > use`);
                        leader__flag.setAttribute("xlink:href", `/profile/images/flags.svg#flag-${flag.toLowerCase()}`)
                        const leader_name = document.querySelector(`#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.LTZTE > div:nth-child(${i + 1}) > div.s4L5S > div.MrPOZ`);
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
            const container = document.querySelector("#root > div > div.app__page.LIAp0 > main > div.lk0lD > div.IytlQ.xpiuY > div.Qsdmi.xpiuY");

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
                        var pl__str = t.querySelector("div.h6J0L").innerText //'1,510 $0.00 $'
                        var pl__val = pl__str.replace(/,/g, '').match(/\d+(\.\d+)?/g).map(Number);[1510, 0]
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
                        var sum = results.reduce((a, b) => a + b, 0) // or eval(results.join("+")) //slow
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
                            pl__line.style = `width:${pl__line__width}%;background:#0faf5`
                        })();
                    }
                }
            }
        }
        top.onclick = function () {
            (function waitForSpriteFlag() {
                const el = document.querySelector("#root > div > aside.GIUEs.app__sidepanel.y29PX.qe_nH > div.FEpc5 > div.MUXvc > div.K9Ykc > div.DTYNe > div.xN5cX");
                if (!el) return setTimeout(waitForSpriteFlag);

                const useEl = el.querySelector("svg use");
                if (!useEl) return setTimeout(waitForSpriteFlag); // wait until React swaps SVG

                // ✅ SAFE: sprite-based flag only
                useEl.setAttribute(
                    "href",
                    `/profile/images/flags.svg#flag-${flag}`
                );

                // ✅ SAFE text change
                const nameUser = el.querySelector("p");
                if (nameUser) nameUser.textContent = `${user}`;

                TradesCalc();
            })();
        };


        var limit__lower;
        var limit__upper;
        const BALANCE__ICON = () => {
            var balance__str = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div._58LeE > div.pVBHU").innerText;
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
                document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-pro");
            }

            else if (balance >= limit__upper) {
                document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-vip");
            }

            else {
                document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use").setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-standart");
            }
        }

        const DROPDOWN__MAIN = () => {
            //SET DROPDOWN EMAIL
            document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > div").innerText = email

            //SET DROPDOWN ID
            document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > span").innerText = `ID: ${id}`

            //SET DROPDOWN PROFILE ICON
            const main__icon = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use").getAttribute("xlink:href");

            document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.lmj_k > svg > use").setAttribute("xlink:href", main__icon);

            //SET DROPDOWN PROFILE LEVEL
            var prof__level = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.wFviC").innerText = `${main__icon.split("-").pop()}:`
            if (prof__level === "standart:") {
                document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.wFviC").innerText = "standard:"
            }

            var percentage__profit = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.UkDJi");
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
            var live__el = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(1)");
            var demo__el = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(2)");
            var pencil__el = demo__el.querySelector("div.sDCn8");

            live__el.querySelector("a").innerText = "Demo Account"
            demo__el.querySelector("a").innerText = "Live Account"
            live__el.querySelector("b").remove() //REMOVE BALANCE ELEMENT
            live__el.querySelector("div").remove() //remove limit text
            live__el.querySelector("button").remove() //remove limit button
            demo__el.querySelector("div.Uwiao > div").remove() //REMOVE REFRESH ICON
            demo__el.insertAdjacentHTML("beforeend", `<div class="D9HT1">The daily limit is not set</div><button class="tRD9M">set limit</button>`)
            live__el.append(pencil__el)
            demo__el.parentNode.insertBefore(demo__el, live__el)

            live__el.insertAdjacentHTML("beforeend", `<div class="Uwiao"><b class="IfQIW">$10,000.00</b><div class="TZdZz"><svg class="icon-refresh"><use xlink:href="/profile/images/spritemap.svg#icon-refresh"></use></svg></div></div>`)

        }

        carret.onclick = function () {
            if (state__carret) {
                (function exists() {
                    var el = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A");  //check if any elem exist on dropdown
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
        })
        var target__el = document.querySelector("#root > div.app.app--fixed.animate > div.app__page.LIAp0 > header > div.lqUUw > div.rymiA > div > div._58LeE > div.pVBHU")

        observer.observe(target__el, {
            subtree: true,
            characterData: true
        })
console.log("Script Activated for: " + user);
})();
// --- Yahan aapka original code khatam ---
}
