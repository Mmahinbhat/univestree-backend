require('dotenv').config();
const { db } = require('./firebase/admin');

// Use Google's favicon service - always works, no API key needed
async function updateLogos() {
  const snap = await db.collection('universities').get();
  let count = 0;
  for (const doc of snap.docs) {
    const data = doc.data();
    if (data.website) {
      const logo = `https://www.google.com/s2/favicons?domain=${data.website}&sz=128`;
      await doc.ref.update({ logo });
      console.log(`✅ ${data.name}`);
      count++;
    }
  }
  console.log(`\nUpdated ${count} logos`);
  process.exit(0);
}
updateLogos().catch(e => { console.error(e); process.exit(1); });
