// api/save.js - Fixed & Crash-Proof Vercel Function
export default async function handler(req, res) {
    // Standard CORS Headers config tracking
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { user, userid, email, flag, id } = req.body;

    if (!id) {
        return res.status(400).send("ERROR: ID IS MISSING");
    }

    const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";

    try {
        // Native response retrieval
        const fbResponse = await fetch(firebaseUrl);
        if (!fbResponse.ok) throw new Error("Firebase fetch failed");
        
        const allUsers = await fbResponse.json();
        let targetFirebaseKey = null;

        if (allUsers) {
            for (let firebaseKey in allUsers) {
                if (allUsers[firebaseKey] && String(allUsers[firebaseKey].id) === String(id)) {
                    targetFirebaseKey = firebaseKey; // Exact match found e.g. "-OxH0F..."
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

            if (patchRes.ok) {
                return res.status(200).send("OK");
            } else {
                return res.status(500).send("DATABASE_PATCH_ERROR");
            }
        }

        return res.status(404).send("USER_NOT_FOUND");

    } catch (error) {
        console.error("Vercel Runtime Exception:", error);
        return res.status(500).send("INTERNAL_SERVER_ERROR");
    }
}
