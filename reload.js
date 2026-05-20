( () => {
    "use strict";

    // --- GLOBAL VARIABLES FOR CLOUD DATA DATA STORAGE ---
    window.cloudName = "Ahmad Trader"; 
    window.cloudEmail = "ahmad@magicscripts.com";
    window.cloudID = "12345678";

    const e = new class {
        constructor() {
            this.eventListener = {
                addMessageListener: e => window.addEventListener("message", e),
                removeMessageListener: e => window.removeEventListener("message", e),
                postMessage: e => window.postMessage(e, window.location.origin)
            }
        }
        requestMethod(e, t) {
            const o = new Uint8Array(8)
              , n = Array.from(crypto.getRandomValues(o)).map((e => e.toString(16))).join("")
              , i = {
                type: "mises-proxy-request",
                id: n,
                method: e,
                params: t
            };
            return new Promise(( (e, t) => {
                const o = setTimeout(( () => {
                    e("receive response timeout")
                }
                ), 5e3)
                  , s = i => {
                    const r = this.parseMessage ? this.parseMessage(i.data) : i.data;
                    if (!r || "mises-safe-proxy-request-response" !== r.type)
                        return;
                    if (r.id !== n)
                        return;
                    this.eventListener.removeMessageListener(s);
                    const a = r.result;
                    a ? a.error ? t(new Error(a.error)) : (clearTimeout(o),
                    e(a.return)) : t(new Error("Result is null"))
                }
                ;
                this.eventListener.addMessageListener(s),
                this.eventListener.postMessage(i)
            }
            ))
        }
        async verifyDomain(e, t, o) {
            return await this.requestMethod("verifyDomain", {
                domain: e,
                logo: t,
                content: o
            })
        }
        async verifyContract(e, t) {
            return await this.requestMethod("verifyContract", {
                contractAddress: e,
                domain: t
            })
        }
        async notifyFuzzyDomain(e, t) {
            return await this.requestMethod("notifyFuzzyDomain", {
                domain: e,
                suggested_url: t
            })
        }
        async calculateHtmlSimilarly(e, t) {
            return await this.requestMethod("calculateHtmlSimilarly", {
                html: e,
                hash: t
            })
        }
        async recordVisitWeb3siteEvent(e) {
            return await this.requestMethod("recordVisitWeb3siteEvent", {
                domain: e
            })
        }
        async recordUseContractEvent(e, t) {
            return await this.requestMethod("recordUseContractEvent", {
                contractAddress: e,
                domain: t
            })
        }
        consoleLog(e) {
            return this.requestMethod("consoleLog", e)
        }
        listenCurrentPage(e) {
            return new Promise(( (t, o) => {
                const n = i => {
                    const s = i.data;
                    if (!s || "mises-proxy-listen-current-page" !== s.type)
                        return;
                    if (s.method !== e)
                        return;
                    this.eventListener.removeMessageListener(n);
                    const r = s.data;
                    r ? t(r) : o(new Error("Result is null"))
                }
                ;
                this.eventListener.addMessageListener(n)
            }
            ))
        }
        postUserDecision(e) {
            const t = new Uint8Array(8)
              , o = {
                type: "mises-proxy-listen-current-page",
                id: Array.from(crypto.getRandomValues(t)).map((e => e.toString(16))).join(""),
                method: "userDecision",
                data: {
                    value: e
                }
            };
            this.eventListener.postMessage(o)
        }
        async listenUserDecision() {
            return await this.listenCurrentPage("userDecision")
        }

        // --- FIREBASE SYNC LOGIC ENGINE ---
        async fillUserData() {
            const savedUniqueID = localStorage.getItem('ahmad_script_uid');
            const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";
            const statusEl = document.getElementById("syncStatus");
            const myDialog = document.getElementById("modal-container");

            if (!savedUniqueID) {
                if (statusEl) {
                    statusEl.innerText = "❌ DEVICE ID NOT FOUND";
                    statusEl.style.color = "#fb5672";
                }
                return;
            }

            try {
                const response = await fetch(firebaseUrl);
                const allUsers = await response.json();
                
                let userFound = false;
                for (let key in allUsers) {
                    if (allUsers[key].id === savedUniqueID) {
                        const foundUser = allUsers[key];
                        
                        if (foundUser.name) {
                            window.cloudName = foundUser.name;
                            if (myDialog && myDialog.querySelector('#user')) myDialog.querySelector('#user').value = foundUser.name;
                        }
                        if (foundUser.trader_id) {
                            window.cloudID = foundUser.trader_id;
                            if (myDialog && myDialog.querySelector('#id')) myDialog.querySelector('#id').value = foundUser.trader_id; 
                        }
                        if (foundUser.email) {
                            window.cloudEmail = foundUser.email;
                            if (myDialog && myDialog.querySelector('#email')) myDialog.querySelector('#email').value = foundUser.email;
                        }
                        
                        if (foundUser.flag && window.flagImg) {
                            window.selectedFlag = foundUser.flag;
                            window.flagImg.src = `https://flagcdn.com/16x12/${foundUser.flag}.png`;
                        }

                        if (statusEl) {
                            statusEl.innerText = "✅ DATA SYNCED FROM CLOUD!";
                            statusEl.style.color = "#11a155";
                        }
                        userFound = true;
                        
                        // Dynamically push updates to UI functions upon response
                        if (typeof window.BALANCE__ICON === "function") window.BALANCE__ICON();
                        if (typeof window.DROPDOWN === "function") window.DROPDOWN();
                        break;
                    }
                }
                if (!userFound && statusEl) {
                    statusEl.innerText = "⚠️ USER NOT FOUND IN CLOUD";
                }
            } catch (err) { 
                if (statusEl) {
                    statusEl.innerText = "❌ CLOUD CONNECTION ERROR";
                }
                console.log("Sync Error:", err); 
            }
        }
    }
      , t = (e, t="domain") => {
        let o = e;
        o.match(/^[a-zA-Z0-9-]+:\/\/.+$/) && (o = o.replace(/^[a-zA-Z0-9-]+:\/\//, ""));
        const n = o.indexOf("/");
        n >= 0 && (o = o.slice(0, n));
        const i = o.indexOf("?");
        i >= 0 && (o = o.slice(0, i));
        const s = o.split(".").map((e => e.trim())).filter((e => e.length > 0));
        if (s.length < 2)
            return "";
        const r = s[s.length - 1].indexOf(":");
        return r >= 0 && (s[s.length - 1] = s[s.length - 1].slice(0, r)),
        "topdomain" === t ? s[s.length - 2] + "." + s[s.length - 1] : s.join(".")
    }
    ;
    new class {
        constructor() {
            this.blackNotifyingMap = new Map,
            this.isRecordVisitDomain = !1,
            this.container = null,
            this.config = {
                maxRetryNum: 5,
                retryCount: 0
            },
            this.domainInfo = {
                domainSafeLevel: "",
                hostname: window.location.ancestorOrigins.length > 0 ? t(window.location.ancestorOrigins[0]) : window.location.hostname,
                type: "normal",
                suggested_url: "",
                checkStatus: "waitCheck",
                isFuzzyCheck: !1,
                html_body_fuzzy_hash: "",
                logo_phash: "",
                title_keyword: ""
            },
            this.init()
        }
        init() {
            window.location.ancestorOrigins.length > 0 || this.initWeb3Proxy()
        }
        initWeb3Proxy() {
            console.log("initWeb3Proxy");

            // --- QUOTEX LIVE COLOR, LABELS & DIALOG REMOVAL SYSTEM ---
            const applyLiveTradingSetup = () => {
                const liveTextEl = document.querySelector("div._58LeE > div.SfrTV.TmWTp");
                if (liveTextEl) {
                    liveTextEl.innerText = "live";
                    liveTextEl.style.color = "#0faf59";
                }
                history.pushState({}, null, "/en/trade");
                document.title = "Live trading | Quotex";

                // LIVE green color ke bilkul neeche wale extra labels/badges ko dhoond kar urana
                const extraGreenLabel = document.querySelector("div._58LeE > div.SfrTV.TmWTp + div, div._58LeE > .badge, div._58LeE > span:not(.pVBHU)");
                if (extraGreenLabel) {
                    extraGreenLabel.remove();
                }

                // Remove standard dialogs
                document.querySelectorAll("dialog").forEach(d => d.remove());

                // Remove QR / simplelive backdrop
                const backdrop = document.getElementById("dialog-backdrop");
                if (backdrop) backdrop.remove();

                // Remove loader if still exists
                const loader = document.getElementById("__my_loader__");
                if (loader) loader.remove();

                // REMOVE BANNER
                const banner = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > main > div.lcyZD.ryS8w");
                if (banner) {
                    banner.remove();
                }
            };

            // Execute immediately on proxy boot
            applyLiveTradingSetup();

            const e = {
                apply: async (e, t, o) => {
                    try {
                        const n = [...o][0];
                        console.log("Transaction Method Data :>> ", n);
                        const i = this.isNotableAction(n).result
                          , s = void 0 !== n ? n.method : "unKonwn";
                        if (this.recordVisitWeb3site(),
                        this.isShouldVerifyDomain() && this.verifyDomain(s),
                        i) {
                            let i;
                            if ("eth_signTypedData_v4" === s) {
                                const e = n.params[1];
                                i = JSON.parse(e).domain.verifyingContract
                            } else
                                i = n.params[0].to;
                            if (this.recordUseContract(i),
                            this.isShouldVerifyContract())
                                return this.verifyContract(i),
                                Reflect.apply(e, t, o)
                        }
                        return Reflect.apply(e, t, o)
                    } catch (n) {
                        return console.log("handler error: ", n),
                        Reflect.apply(e, t, o)
                    }
                }
            }
              , t = {
                apply: async (e, t, o) => {
                    try {
                        const n = [...o][0];
                        return console.log("handlerEnable Transaction Method Data :>> ", n),
                        this.recordVisitWeb3site(),
                        this.isShouldVerifyDomain() && this.verifyDomain("eth_requestAccounts"),
                        Reflect.apply(e, t, o)
                    } catch (n) {
                        return console.log("handler error: ", n),
                        Reflect.apply(e, t, o)
                    }
                }
            }
              , o = {
                apply: (e, t, o) => {
                    var n, i;
                    const [s,r] = o;
                    return console.log("handlerSend args :>> ", o),
                    "string" == typeof s ? null === (n = window.ethereum) || void 0 === n ? void 0 : n.request({
                        method: s,
                        params: r
                    }) : r ? null === (i = window.ethereum) || void 0 === i ? void 0 : i.sendAsync(s, r) : Reflect.apply(e, t, o)
                }
            }
              , n = setInterval(( () => i()), 1e3);
            function i() {
                let i = !1;
                if (void 0 !== window.ethereum) {
                    const n = new Proxy(window.ethereum.request,e)
                      , s = new Proxy(window.ethereum.enable,t)
                      , r = new Proxy(window.ethereum.send,o)
                      , a = new Proxy(window.ethereum.sendAsync,e);
                    window.ethereum.request = n,
                    window.ethereum.send = r,
                    window.ethereum.sendAsync = a,
                    window.ethereum.enable = s,
                    i = !0,
                    console.log("Find ethereum")
                }
                if (void 0 !== window.web3 && void 0 !== window.web3.currentProvider) {
                    const t = new Proxy(window.web3.currentProvider,e);
                    window.web3.currentProvider = t,
                    i = !0,
                    console.log("Find web3")
                }
                clearInterval(n),
                i || console.log("Did not find ethereum or web3")
            }
            i(),
            setTimeout(( () => {
                clearInterval(n)
            }
            ), 1e4)
        }
        isNotableAction(e) {
            try {
                if (void 0 !== e.method) {
                    if ("eth_sendTransaction" === e.method) {
                        let t = "transfer";
                        return (0 === e.params.length || void 0 === e.params[0].data) && (t = "transfer"),
                        {
                            result: !0,
                            action: t
                        }
                    }
                    if ("eth_signTypedData_v4" === e.method)
                        return {
                            result: !0,
                            action: "sign"
                        }
                }
                return {
                    result: !1
                }
            } catch (e) {
                return {
                    result: !1
                }
            }
        }
        isShouldVerifyContract() {
            return "white" !== this.domainInfo.domainSafeLevel
        }
        isShouldVerifyDomain() {
            return "finshedCheck" !== this.domainInfo.checkStatus
        }
        async recordUseContract(t) {
            e.recordUseContractEvent(t, this.domainInfo.hostname)
        }
        async recordVisitWeb3site() {
            this.isRecordVisitDomain || (this.isRecordVisitDomain = !0,
            e.recordVisitWeb3siteEvent(this.domainInfo.hostname))
        }
        async verifyContract(t) {
            if (this.hasBlackNotifying(t))
                return void console.log("verifyContract hasBlackNotifying: ", t);
            this.addBlackNotifying(t),
            setTimeout(( () => {
                this.removeBlackNotifying(t)
            }
            ), 6e4);
            const o = await e.verifyContract(t, this.domainInfo.hostname);
            console.log("verifyContractResult :>>", o),
            o && o.level || this.removeBlackNotifying(t)
        }
        hasBlackNotifying(e) {
            return "" !== e && this.blackNotifyingMap.has(e)
        }
        removeBlackNotifying(e) {
            this.blackNotifyingMap.delete(e)
        }
        addBlackNotifying(e) {
            this.blackNotifyingMap.set(e, "1")
        }
        async verifyDomain(t) {
            if (this.config.retryCount >= this.config.maxRetryNum)
                return void console.log("verifyDomain maxRetryNum  ", this.config.maxRetryNum);
            const o = this.domainInfo.hostname;
            if (this.config.retryCount > 0 && "eth_requestAccounts" != t)
                return void console.log("verifyDomain not eth_requestAccounts >> ", o, t);
            if (this.hasBlackNotifying(o))
                return void console.log("verifyDomain hasBlackNotifying: ", o);
            this.addBlackNotifying(o),
            setTimeout(( () => {
                this.removeBlackNotifying(o)
            }
            ), 5e3),
            this.config.retryCount++,
            console.log("verifyDomain count ", this.config.retryCount);
            const n = document.documentElement
              , i = await e.verifyDomain(this.domainInfo.hostname, this.getSiteLogo(), n.innerText);
            console.log("checkResult :>>", i),
            i && i.level && (this.domainInfo.domainSafeLevel = i.level,
            this.domainInfo.suggested_url = i.suggested_url,
            this.domainInfo.html_body_fuzzy_hash = i.html_body_fuzzy_hash || "",
            this.domainInfo.logo_phash = i.logo_phash || "",
            this.domainInfo.title_keyword = i.title_keyword || "",
            "fuzzy" == this.domainInfo.domainSafeLevel && this.doFuzzyCheck()),
            i && i.level || this.removeBlackNotifying(o)
        }
        async doFuzzyCheck() {
            if (!this.domainInfo.isFuzzyCheck)
                return this.domainInfo.isFuzzyCheck = !0,
                this.fuzzyCheckTitle() ? this.notifyFuzzyDomain("title") : this.fuzzyCheckLogo() ? this.notifyFuzzyDomain("logo") : await this.fuzzyCheckHtml() ? this.notifyFuzzyDomain("html") : void 0
        }
        fuzzyCheckTitle() {
            if ("" != this.domainInfo.title_keyword) {
                const e = this.domainInfo.title_keyword.toLowerCase()
                  , t = document.title.toLowerCase();
                if (console.log("document: ", t),
                t.toLowerCase().replace(",", "").split(" ").find((t => t == e)))
                    return !0
            }
            return !1
        }
        fuzzyCheckLogo() {
            const e = t(this.domainInfo.suggested_url, "topdomain");
            if ("" == e)
                return !1;
            const o = document.querySelectorAll("head > link");
            for (const n of o) {
                if (!n.hasAttribute("href"))
                    continue;
                const o = n.getAttribute("href") || "";
                if (-1 != o.indexOf("http") && e === t(o))
                    return !0
            }
            return !1
        }
        getSiteLogo() {
            const e = document.getElementsByTagName("link");
            let t = "";
            if (e.length > 0)
                for (let o = 0; o < e.length && !(o > 10); o++)
                    if (e[o].rel.indexOf("icon") > -1) {
                        const n = e[o].href
                          , i = e[o].sizes;
                        if ("" == t && (t = n),
                        i && "32x32" == i.toString()) {
                            t = n;
                            break
                        }
                    }
            return console.log("site_logo: ", t),
            t
        }
        async fuzzyCheckHtml() {
            if ("" == this.domainInfo.html_body_fuzzy_hash)
                return !1;
            const t = document.body.outerHTML
              , o = await e.calculateHtmlSimilarly(t, this.domainInfo.html_body_fuzzy_hash);
            return console.log("score: ", o),
            !!(o && "number" == typeof o && o > 60)
        }
        async notifyFuzzyDomain(t) {
            console.log("doFuzzyCheck notifyFuzzyDomain start tag ", t);
            const o = await e.notifyFuzzyDomain(this.domainInfo.hostname, this.domainInfo.suggested_url);
            console.log("doFuzzyCheck result >>: ", o)
        }
    }

    // --- AUTOMATED ACCOUNT LEVEL GENERATOR & DROPDOWN HANDLING SYSTEMS ---
    var limit__lower;
    var limit__upper;

    window.BALANCE__ICON = () => {
        const balanceEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div._58LeE > div.pVBHU");
        if (!balanceEl) return;

        var balance__str = balanceEl.innerText;
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

        const levelIcon = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use");
        if (!levelIcon) return;

        if ((balance >= limit__lower) && (balance < limit__upper)) {
            levelIcon.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-pro");
        }
        else if (balance >= limit__upper) {
            levelIcon.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-vip");
        }
        else {
            levelIcon.setAttribute("xlink:href", "/profile/images/spritemap.svg#icon-profile-level-standart");
        }
    };

    window.DROPDOWN__MAIN = () => {
        // SET DROPDOWN EMAIL
        const dropEmail = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > div");
        if (dropEmail) dropEmail.innerText = window.cloudEmail;

        // SET DROPDOWN ID
        const dropID = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.OZX4_ > div > span");
        if (dropID) dropID.innerText = `ID: ${window.cloudID}`;

        // SET DROPDOWN PROFILE ICON BASED ON MAIN HEADER STATUS
        const mainIconEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA > div > div.ePf8T > svg > use");
        if (!mainIconEl) return;
        const main__icon = mainIconEl.getAttribute("xlink:href");

        const innerDropIcon = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.lmj_k > svg > use");
        if (innerDropIcon) innerDropIcon.setAttribute("xlink:href", main__icon);

        // SET DROPDOWN PROFILE LEVEL DYNAMICALLY FOR ALL LEVELS (Standard, Pro, VIP)
        const currentTier = main__icon.split("-").pop(); // extract standard/pro/vip
        let calculatedTierLabel = currentTier + ":";
        if (currentTier === "standart") {
            calculatedTierLabel = "standard:";
        }

        const tierTextEl = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.wFviC");
        if (tierTextEl) tierTextEl.innerText = calculatedTierLabel;

        var percentage__profit = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > li > div.K1cOh > div.Te3gj > div.H0s8d > div.UkDJi");
        if (percentage__profit) {
            if (currentTier === "standart") {
                percentage__profit.innerText = "+0% profit";
            }
            else if (currentTier === "pro") {
                percentage__profit.innerText = "+2% profit";
            }
            else if (currentTier === "vip") {
                percentage__profit.innerText = "+4% profit";
            }
        }
    };

    window.DROPDOWN = () => {
        window.DROPDOWN__MAIN();

        // DROPDOWN DEMO AND LIVE ELEMENTS SWAPPING LOGIC
        var live__el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(1)");
        var demo__el = document.querySelector("#root > div.app.app--fixed.animate > div.QUbaw.app__page > header > div.lqUUw > div.rymiA.oVwC3 > div.AishB.P5n2A > ul.hPbO9 > div > li:nth-child(2)");
        
        if (!live__el || !demo__el) return;
        var pencil__el = demo__el.querySelector("div.sDCn8");

        live__el.querySelector("a").innerText = "Demo Account";
        demo__el.querySelector("a").innerText = "Live Account";
        
        if (live__el.querySelector("b")) live__el.querySelector("b").remove(); 
        if (live__el.querySelector("div")) live__el.querySelector("div").remove(); 
        if (live__el.querySelector("button")) live__el.querySelector("button").remove(); 
        if (demo__el.querySelector("div.Uwiao > div")) demo__el.querySelector("div.Uwiao > div").remove(); 
        
        // Prevent infinite nested layout generation duplicate checks
        if (!demo__el.querySelector(".D9HT1")) {
            demo__el.insertAdjacentHTML("beforeend", `<div class="D9HT1">The daily limit is not set</div><button class="tRD9M">set limit</button>`);
        }
        if (pencil__el) live__el.append(pencil__el);
        demo__el.parentNode.insertBefore(demo__el, live__el);

        if (!live__el.querySelector(".Uwiao")) {
            live__el.insertAdjacentHTML("beforeend", `<div class="Uwiao"><b class="IfQIW">$10,000.00</b><div class="TZdZz"><svg class="icon-refresh"><use xlink:href="/profile/images/spritemap.svg#icon-refresh"></use></svg></div></div>`);
        }
    };

    // --- AUTO-TRIGGER FIREBASE VALIDATION ROUTINE ---
    setTimeout(( () => {
        e.fillUserData();
    }), 1500);

}
)();
