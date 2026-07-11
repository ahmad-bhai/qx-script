// api/save.js - Anti-Crash Stream Architecture
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { user, userid, email, flag, id } = req.body;
    if (!id) return res.status(400).send("ERROR: ID MISSING");

    const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";

    try {
        const fbResponse = await fetch(firebaseUrl);
        if (!fbResponse.ok) return res.status(500).send("FIREBASE_FETCH_FAILED");
        
        const allUsers = await fbResponse.json();
        let targetFirebaseKey = null;

        if (allUsers) {
            // Memory efficient object verification sequence
            const keys = Object.keys(allUsers);
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (allUsers[k] && String(allUsers[k].id) === String(id)) {
                    targetFirebaseKey = k;
                    break;
                }
            }
        }

        if (targetFirebaseKey) {
            const updateUrl = `https://reactions-maker-site-default-rtdb.firebaseio.com/users/${targetFirebaseKey}.json`;
            const patchRes = await fetch(updateUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user,
                    trader_id: userid,
                    email: email,
                    flag: flag,
                    date: new Date().toLocaleDateString('en-US')
                })
            });

            if (patchRes.ok) return res.status(200).send("OK");
            return res.status(500).send("PATCH_ERROR");
        }

        return res.status(404).send("USER_NOT_FOUND");
    } catch (error) {
        return res.status(500).send("INTERNAL_SERVER_ERROR");
    }
}
