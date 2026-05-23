require('dotenv').config();
const { db } = require('./firebase/admin');

const universities = [
  { name: "Massachusetts Institute of Technology", country: "USA", city: "Cambridge", ranking: 1, tuition: 57986, acceptanceRate: 4, programs: ["Engineering", "Computer Science", "Business"] },
  { name: "Harvard University", country: "USA", city: "Cambridge", ranking: 2, tuition: 54269, acceptanceRate: 4, programs: ["Law", "Medicine", "Business", "Arts"] },
  { name: "Stanford University", country: "USA", city: "Stanford", ranking: 3, tuition: 56169, acceptanceRate: 4, programs: ["Computer Science", "Engineering", "MBA"] },
  { name: "University of Oxford", country: "UK", city: "Oxford", ranking: 4, tuition: 35000, acceptanceRate: 17, programs: ["Law", "Medicine", "Computer Science", "Philosophy"] },
  { name: "University of Cambridge", country: "UK", city: "Cambridge", ranking: 5, tuition: 33000, acceptanceRate: 21, programs: ["Science", "Engineering", "Law", "Medicine"] },
  { name: "University College London", country: "UK", city: "London", ranking: 9, tuition: 32000, acceptanceRate: 38, programs: ["Architecture", "Data Science", "Law"] },
  { name: "ETH Zurich", country: "Switzerland", city: "Zurich", ranking: 7, tuition: 1500, acceptanceRate: 27, programs: ["Engineering", "Computer Science", "Architecture"] },
  { name: "University of Toronto", country: "Canada", city: "Toronto", ranking: 18, tuition: 45000, acceptanceRate: 43, programs: ["Engineering", "Business", "Medicine"] },
  { name: "McGill University", country: "Canada", city: "Montreal", ranking: 46, tuition: 42000, acceptanceRate: 46, programs: ["MBA", "Medicine", "Arts"] },
  { name: "TU Munich", country: "Germany", city: "Munich", ranking: 50, tuition: 0, acceptanceRate: 8, programs: ["Engineering", "Computer Science", "MBA"] },
  { name: "University of Melbourne", country: "Australia", city: "Melbourne", ranking: 33, tuition: 38000, acceptanceRate: 70, programs: ["Engineering", "Business", "Law"] },
  { name: "National University of Singapore", country: "Singapore", city: "Singapore", ranking: 8, tuition: 29000, acceptanceRate: 11, programs: ["Computer Science", "Engineering", "Business"] },
  { name: "Peking University", country: "China", city: "Beijing", ranking: 14, tuition: 5000, acceptanceRate: 15, programs: ["Medicine", "Law", "Engineering"] },
  { name: "University of Tokyo", country: "Japan", city: "Tokyo", ranking: 23, tuition: 7000, acceptanceRate: 35, programs: ["Engineering", "Science", "Medicine"] },
  { name: "Seoul National University", country: "South Korea", city: "Seoul", ranking: 41, tuition: 6000, acceptanceRate: 30, programs: ["Engineering", "Business", "Medicine"] },
  { name: "Lomonosov Moscow State University", country: "Russia", city: "Moscow", ranking: 87, tuition: 8000, acceptanceRate: 25, programs: ["Engineering", "Physics", "Mathematics", "Law"] },
  { name: "Saint Petersburg State University", country: "Russia", city: "Saint Petersburg", ranking: 242, tuition: 6000, acceptanceRate: 30, programs: ["Law", "Economics", "Medicine", "Arts"] },
  { name: "Novosibirsk State University", country: "Russia", city: "Novosibirsk", ranking: 246, tuition: 5000, acceptanceRate: 35, programs: ["Physics", "Mathematics", "Computer Science"] },
  { name: "Tomsk State University", country: "Russia", city: "Tomsk", ranking: 501, tuition: 4000, acceptanceRate: 40, programs: ["Engineering", "Physics", "Economics"] },
  { name: "ITMO University", country: "Russia", city: "Saint Petersburg", ranking: 401, tuition: 5500, acceptanceRate: 32, programs: ["Computer Science", "Photonics", "Engineering"] }
];

async function seed() {
  console.log('Seeding universities...');
  for (const uni of universities) {
    await db.collection('universities').add(uni);
    console.log(`✅ Added: ${uni.name}`);
  }
  console.log('\n🎉 All 20 universities added!');
  process.exit(0);
}

seed().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
