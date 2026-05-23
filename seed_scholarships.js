require('dotenv').config();
const { db } = require('./firebase/admin');

const scholarships = [
  { name: "Chevening Scholarship", university: "Various UK Universities", country: "UK", amount: 35000, currency: "GBP", deadline: "2025-11-05", level: "Masters", description: "UK government scholarship for future global leaders.", eligibility: "2+ years work experience, leadership potential", link: "chevening.org" },
  { name: "Fulbright Scholarship", university: "Various US Universities", country: "USA", amount: 50000, currency: "USD", deadline: "2025-10-15", level: "Masters/PhD", description: "US government scholarship for international students.", eligibility: "Bachelor's degree, strong academic record", link: "fulbright.org" },
  { name: "Gates Cambridge Scholarship", university: "University of Cambridge", country: "UK", amount: 33000, currency: "GBP", deadline: "2025-12-03", level: "Masters/PhD", description: "Full-cost scholarship for outstanding students worldwide.", eligibility: "Exceptional academic achievement, leadership", link: "gatescambridge.org" },
  { name: "Rhodes Scholarship", university: "University of Oxford", country: "UK", amount: 35000, currency: "GBP", deadline: "2025-10-01", level: "Masters/PhD", description: "World's oldest and most prestigious scholarship.", eligibility: "Age 19-25, academic excellence, leadership", link: "rhodeshouse.ox.ac.uk" },
  { name: "DAAD Scholarship", university: "Various German Universities", country: "Germany", amount: 15000, currency: "EUR", deadline: "2025-11-30", level: "Masters/PhD", description: "German Academic Exchange Service full scholarship.", eligibility: "Bachelor's degree, German/English proficiency", link: "daad.de" },
  { name: "Eiffel Excellence Scholarship", university: "Various French Universities", country: "France", amount: 18000, currency: "EUR", deadline: "2026-01-08", level: "Masters", description: "French government scholarship for international students.", eligibility: "Under 30, excellent academic record", link: "campusfrance.org" },
  { name: "Australian Awards Scholarship", university: "Various Australian Universities", country: "Australia", amount: 40000, currency: "AUD", deadline: "2025-09-30", level: "Masters", description: "Australian government development scholarship.", eligibility: "Developing country citizen, 2+ years work experience", link: "australiaawards.gov.au" },
  { name: "NUS Research Scholarship", university: "National University of Singapore", country: "Singapore", amount: 29000, currency: "SGD", deadline: "2025-12-31", level: "PhD", description: "Full scholarship for PhD research at NUS.", eligibility: "First class honours, research proposal", link: "nus.edu.sg" },
  { name: "ETH Excellence Scholarship", university: "ETH Zurich", country: "Switzerland", amount: 12000, currency: "CHF", deadline: "2025-12-15", level: "Masters", description: "Merit-based scholarship for top Master's applicants.", eligibility: "Top 10% of graduating class", link: "ethz.ch" },
  { name: "Erasmus Mundus Scholarship", university: "Multiple European Universities", country: "Europe", amount: 24000, currency: "EUR", deadline: "2026-01-15", level: "Masters", description: "Joint European Master's degree with full funding.", eligibility: "Bachelor's degree, motivation letter", link: "erasmus-mundus.eu" },
  { name: "KAIST Scholarship", university: "KAIST", country: "South Korea", amount: 10000, currency: "USD", deadline: "2025-09-05", level: "Masters/PhD", description: "Full tuition + stipend for STEM students.", eligibility: "Strong STEM background, English proficiency", link: "kaist.ac.kr" },
  { name: "Commonwealth Scholarship", university: "Various UK Universities", country: "UK", amount: 30000, currency: "GBP", deadline: "2025-12-16", level: "Masters/PhD", description: "For students from Commonwealth countries.", eligibility: "Commonwealth citizen, first class degree", link: "cscuk.fcdo.gov.uk" },
  { name: "Vanier Canada Graduate Scholarship", university: "Various Canadian Universities", country: "Canada", amount: 50000, currency: "CAD", deadline: "2025-11-01", level: "PhD", description: "Canada's most prestigious doctoral scholarship.", eligibility: "Leadership, research potential, academics", link: "vanier.gc.ca" },
  { name: "Japanese MEXT Scholarship", university: "Various Japanese Universities", country: "Japan", amount: 8000, currency: "USD", deadline: "2025-06-15", level: "UG/Masters/PhD", description: "Japanese government scholarship covering all costs.", eligibility: "Age under 35, Japanese language interest", link: "mext.go.jp" },
  { name: "Aga Khan Foundation Scholarship", university: "Various Universities", country: "Various", amount: 25000, currency: "USD", deadline: "2025-03-31", level: "Masters", description: "For students from developing countries.", eligibility: "Developing country, financial need, excellence", link: "akdn.org" },
];

async function seed() {
  console.log('Seeding scholarships...');
  for (const s of scholarships) {
    await db.collection('scholarships').add({ ...s, createdAt: new Date() });
    console.log(`✅ ${s.name}`);
  }
  console.log(`\n🎉 Done! ${scholarships.length} scholarships added.`);
  process.exit(0);
}
seed().catch(e => { console.error('❌', e.message); process.exit(1); });
