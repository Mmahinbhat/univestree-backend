require('dotenv').config();
const { db } = require('./firebase/admin');

async function check() {
  const snap = await db.collection('universities').get();
  let withLogo = 0, withoutLogo = 0, noWebsite = 0;
  const missing = [];

  snap.docs.forEach(doc => {
    const d = doc.data();
    if (d.logo) {
      withLogo++;
    } else {
      withoutLogo++;
      if (!d.website) noWebsite++;
      else missing.push({ id: doc.id, name: d.name, website: d.website });
    }
  });

  console.log('Total:', snap.docs.length);
  console.log('With logo:', withLogo);
  console.log('Without logo:', withoutLogo);
  console.log('No website either:', noWebsite);
  if (missing.length) {
    console.log('\nMissing logos (have website):');
    missing.slice(0, 10).forEach(u => console.log(' -', u.name, '|', u.website));
    console.log('...and', missing.length - 10, 'more');
  }
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
