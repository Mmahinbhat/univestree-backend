require('dotenv').config();
const { db } = require('./firebase/admin');

const courses = [
  { name: "Computer Science BSc", field: "Computer Science", level: "UG", duration: "4 years", university: "MIT", country: "USA", tuition: 57986, description: "Core CS fundamentals, algorithms, AI, and systems." },
  { name: "Artificial Intelligence MSc", field: "Computer Science", level: "Masters", duration: "2 years", university: "Stanford University", country: "USA", tuition: 56169, description: "Deep learning, NLP, robotics, and AI ethics." },
  { name: "MBA", field: "Business", level: "Masters", duration: "2 years", university: "Harvard University", country: "USA", tuition: 54269, description: "Leadership, finance, strategy and entrepreneurship." },
  { name: "Medicine MBBS", field: "Medicine", level: "UG", duration: "6 years", university: "Johns Hopkins University", country: "USA", tuition: 60480, description: "Clinical training at one of the world's top hospitals." },
  { name: "Law LLB", field: "Law", level: "UG", duration: "3 years", university: "University of Oxford", country: "UK", tuition: 35000, description: "English and EU law with mooting and internships." },
  { name: "Data Science MSc", field: "Computer Science", level: "Masters", duration: "1 year", university: "University College London", country: "UK", tuition: 32000, description: "Machine learning, statistics, and big data engineering." },
  { name: "Mechanical Engineering BEng", field: "Engineering", level: "UG", duration: "4 years", university: "Imperial College London", country: "UK", tuition: 38000, description: "Thermodynamics, robotics, and manufacturing." },
  { name: "Economics BSc", field: "Economics", level: "UG", duration: "3 years", university: "London School of Economics", country: "UK", tuition: 25000, description: "Micro/macro economics, econometrics, and finance." },
  { name: "Architecture BArch", field: "Architecture", level: "UG", duration: "5 years", university: "Politecnico di Milano", country: "Italy", tuition: 4000, description: "Design, urban planning, and sustainable architecture." },
  { name: "Biomedical Engineering MSc", field: "Engineering", level: "Masters", duration: "2 years", university: "ETH Zurich", country: "Switzerland", tuition: 1500, description: "Medical devices, biomechanics, and tissue engineering." },
  { name: "Physics PhD", field: "Science", level: "PhD", duration: "4 years", university: "Caltech", country: "USA", tuition: 58680, description: "Quantum mechanics, astrophysics, and particle physics." },
  { name: "Finance MSc", field: "Business", level: "Masters", duration: "1 year", university: "London School of Economics", country: "UK", tuition: 25000, description: "Investment banking, risk management, and derivatives." },
  { name: "Public Health MPH", field: "Medicine", level: "Masters", duration: "1 year", university: "Johns Hopkins University", country: "USA", tuition: 60480, description: "Epidemiology, health policy, and global health." },
  { name: "Computer Engineering BSc", field: "Engineering", level: "UG", duration: "4 years", university: "National University of Singapore", country: "Singapore", tuition: 29000, description: "Hardware, embedded systems, and VLSI design." },
  { name: "International Relations BA", field: "Arts", level: "UG", duration: "3 years", university: "University of Cambridge", country: "UK", tuition: 33000, description: "Diplomacy, geopolitics, and international law." },
  { name: "Electrical Engineering BTech", field: "Engineering", level: "UG", duration: "4 years", university: "IIT Bombay", country: "India", tuition: 2000, description: "Circuits, signal processing, and power systems." },
  { name: "Psychology BSc", field: "Science", level: "UG", duration: "3 years", university: "University of Melbourne", country: "Australia", tuition: 38000, description: "Cognitive, clinical, and developmental psychology." },
  { name: "Chemical Engineering BEng", field: "Engineering", level: "UG", duration: "4 years", university: "MIT", country: "USA", tuition: 57986, description: "Process design, thermodynamics, and reaction engineering." },
  { name: "Journalism MA", field: "Arts", level: "Masters", duration: "1 year", university: "Columbia University", country: "USA", tuition: 65524, description: "Investigative reporting, digital media, and broadcast." },
  { name: "Quantum Computing PhD", field: "Computer Science", level: "PhD", duration: "4 years", university: "University of Waterloo", country: "Canada", tuition: 36000, description: "Quantum algorithms, cryptography, and error correction." },
];

async function seed() {
  console.log('Seeding courses...');
  for (const c of courses) {
    await db.collection('courses').add({ ...c, createdAt: new Date() });
    console.log(`✅ ${c.name}`);
  }
  console.log(`\n🎉 Done! ${courses.length} courses added.`);
  process.exit(0);
}
seed().catch(e => { console.error('❌', e.message); process.exit(1); });
