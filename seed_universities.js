const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const db = admin.firestore();
const universities = [
  { name: "Harvard University", country: "USA", city: "Cambridge, Massachusetts", ranking: 1, tuition: 54768, acceptanceRate: 4, programs: ["Law", "Medicine", "Business", "Engineering"], logo: "https://www.google.com/s2/favicons?domain=harvard.edu&sz=128", website: "harvard.edu", level: "UG,Masters,PhD" },
  { name: "Massachusetts Institute of Technology", country: "USA", city: "Cambridge, Massachusetts", ranking: 2, tuition: 55878, acceptanceRate: 4, programs: ["Engineering", "Science", "Technology"], logo: "https://www.google.com/s2/favicons?domain=mit.edu&sz=128", website: "mit.edu", level: "UG,Masters,PhD" },
  { name: "Stanford University", country: "USA", city: "Stanford, California", ranking: 3, tuition: 56169, acceptanceRate: 4, programs: ["Engineering", "Business", "Medicine"], logo: "https://www.google.com/s2/favicons?domain=stanford.edu&sz=128", website: "stanford.edu", level: "UG,Masters,PhD" },
  { name: "University of Oxford", country: "UK", city: "Oxford, England", ranking: 3, tuition: 26770, acceptanceRate: 17, programs: ["Humanities", "Law", "Medicine"], logo: "https://www.google.com/s2/favicons?domain=ox.ac.uk&sz=128", website: "ox.ac.uk", level: "UG,Masters,PhD" },
  { name: "University of Cambridge", country: "UK", city: "Cambridge, England", ranking: 2, tuition: 24507, acceptanceRate: 21, programs: ["Science", "Engineering", "Law"], logo: "https://www.google.com/s2/favicons?domain=cam.ac.uk&sz=128", website: "cam.ac.uk", level: "UG,Masters,PhD" },
  { name: "ETH Zurich", country: "Switzerland", city: "Zurich", ranking: 7, tuition: 1500, acceptanceRate: 27, programs: ["Engineering", "Science", "Technology"], logo: "https://www.google.com/s2/favicons?domain=ethz.ch&sz=128", website: "ethz.ch", level: "UG,Masters,PhD" },
  { name: "National University of Singapore", country: "Singapore", city: "Singapore", ranking: 8, tuition: 17550, acceptanceRate: 18, programs: ["Engineering", "Business", "Medicine"], logo: "https://www.google.com/s2/favicons?domain=nus.edu.sg&sz=128", website: "nus.edu.sg", level: "UG,Masters,PhD" },
  { name: "University of Toronto", country: "Canada", city: "Toronto, Ontario", ranking: 21, tuition: 45690, acceptanceRate: 43, programs: ["Medicine", "Engineering", "Business"], logo: "https://www.google.com/s2/favicons?domain=utoronto.ca&sz=128", website: "utoronto.ca", level: "UG,Masters,PhD" },
  { name: "University of Melbourne", country: "Australia", city: "Melbourne, Victoria", ranking: 33, tuition: 40000, acceptanceRate: 70, programs: ["Medicine", "Business", "Law"], logo: "https://www.google.com/s2/favicons?domain=unimelb.edu.au&sz=128", website: "unimelb.edu.au", level: "UG,Masters,PhD" },
  { name: "Peking University", country: "China", city: "Beijing", ranking: 17, tuition: 4200, acceptanceRate: 15, programs: ["Science", "Arts", "Medicine"], logo: "https://www.google.com/s2/favicons?domain=pku.edu.cn&sz=128", website: "pku.edu.cn", level: "UG,Masters,PhD" },
  { name: "Tsinghua University", country: "China", city: "Beijing", ranking: 16, tuition: 4200, acceptanceRate: 10, programs: ["Engineering", "Science", "Technology"], logo: "https://www.google.com/s2/favicons?domain=tsinghua.edu.cn&sz=128", website: "tsinghua.edu.cn", level: "UG,Masters,PhD" },
  { name: "Indian Institute of Technology Bombay", country: "India", city: "Mumbai, Maharashtra", ranking: 149, tuition: 2200, acceptanceRate: 2, programs: ["Engineering", "Science", "Technology"], logo: "https://www.google.com/s2/favicons?domain=iitb.ac.in&sz=128", website: "iitb.ac.in", level: "UG,Masters,PhD" },
  { name: "Seoul National University", country: "South Korea", city: "Seoul", ranking: 31, tuition: 5000, acceptanceRate: 15, programs: ["Engineering", "Medicine", "Law"], logo: "https://www.google.com/s2/favicons?domain=snu.ac.kr&sz=128", website: "snu.ac.kr", level: "UG,Masters,PhD" },
  { name: "University of Tokyo", country: "Japan", city: "Tokyo", ranking: 23, tuition: 5200, acceptanceRate: 35, programs: ["Engineering", "Science", "Medicine"], logo: "https://www.google.com/s2/favicons?domain=u-tokyo.ac.jp&sz=128", website: "u-tokyo.ac.jp", level: "UG,Masters,PhD" },
  { name: "Technical University of Munich", country: "Germany", city: "Munich, Bavaria", ranking: 30, tuition: 0, acceptanceRate: 8, programs: ["Engineering", "Science", "Technology"], logo: "https://www.google.com/s2/favicons?domain=tum.de&sz=128", website: "tum.de", level: "UG,Masters,PhD" }
];

async function seed() {
  console.log('Seeding ' + universities.length + ' universities...');
  let count = 0;
  for (const uni of universities) {
    await db.collection('universities').add({...uni, createdAt: new Date()});
    count++;
    console.log('✅ ' + count + ' - ' + uni.name);
  }
  console.log('\n🎉 Done! ' + universities.length + ' universities added.');
  process.exit(0);
}

seed().catch(e => { console.error('❌', e.message); process.exit(1); });
