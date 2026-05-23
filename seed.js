require('dotenv').config();
const { db } = require('./firebase/admin');

const universities = [
  // USA
  { name: "Massachusetts Institute of Technology", country: "USA", city: "Cambridge", ranking: 1, tuition: 57986, acceptanceRate: 4, programs: ["Engineering", "Computer Science", "Business"], logo: "https://logo.clearbit.com/mit.edu", website: "mit.edu" },
  { name: "Harvard University", country: "USA", city: "Cambridge", ranking: 2, tuition: 54269, acceptanceRate: 4, programs: ["Law", "Medicine", "Business"], logo: "https://logo.clearbit.com/harvard.edu", website: "harvard.edu" },
  { name: "Stanford University", country: "USA", city: "Stanford", ranking: 3, tuition: 56169, acceptanceRate: 4, programs: ["Computer Science", "Engineering", "MBA"], logo: "https://logo.clearbit.com/stanford.edu", website: "stanford.edu" },
  { name: "California Institute of Technology", country: "USA", city: "Pasadena", ranking: 6, tuition: 58680, acceptanceRate: 4, programs: ["Engineering", "Physics", "Chemistry"], logo: "https://logo.clearbit.com/caltech.edu", website: "caltech.edu" },
  { name: "University of Chicago", country: "USA", city: "Chicago", ranking: 10, tuition: 62241, acceptanceRate: 7, programs: ["Economics", "Law", "Business"], logo: "https://logo.clearbit.com/uchicago.edu", website: "uchicago.edu" },
  { name: "Princeton University", country: "USA", city: "Princeton", ranking: 12, tuition: 57410, acceptanceRate: 4, programs: ["Engineering", "Public Policy", "Arts"], logo: "https://logo.clearbit.com/princeton.edu", website: "princeton.edu" },
  { name: "Yale University", country: "USA", city: "New Haven", ranking: 14, tuition: 62250, acceptanceRate: 5, programs: ["Law", "Medicine", "Arts"], logo: "https://logo.clearbit.com/yale.edu", website: "yale.edu" },
  { name: "Columbia University", country: "USA", city: "New York", ranking: 16, tuition: 65524, acceptanceRate: 4, programs: ["Journalism", "Business", "Law"], logo: "https://logo.clearbit.com/columbia.edu", website: "columbia.edu" },
  { name: "University of Pennsylvania", country: "USA", city: "Philadelphia", ranking: 18, tuition: 63452, acceptanceRate: 7, programs: ["Business", "Medicine", "Law"], logo: "https://logo.clearbit.com/upenn.edu", website: "upenn.edu" },
  { name: "Cornell University", country: "USA", city: "Ithaca", ranking: 20, tuition: 61015, acceptanceRate: 9, programs: ["Engineering", "Agriculture", "Architecture"], logo: "https://logo.clearbit.com/cornell.edu", website: "cornell.edu" },
  { name: "Johns Hopkins University", country: "USA", city: "Baltimore", ranking: 25, tuition: 60480, acceptanceRate: 8, programs: ["Medicine", "Public Health", "Engineering"], logo: "https://logo.clearbit.com/jhu.edu", website: "jhu.edu" },
  { name: "Duke University", country: "USA", city: "Durham", ranking: 28, tuition: 62688, acceptanceRate: 7, programs: ["Medicine", "Law", "Business"], logo: "https://logo.clearbit.com/duke.edu", website: "duke.edu" },
  { name: "Northwestern University", country: "USA", city: "Evanston", ranking: 30, tuition: 63468, acceptanceRate: 7, programs: ["Journalism", "Business", "Law"], logo: "https://logo.clearbit.com/northwestern.edu", website: "northwestern.edu" },
  { name: "UCLA", country: "USA", city: "Los Angeles", ranking: 35, tuition: 43473, acceptanceRate: 11, programs: ["Film", "Engineering", "Business"], logo: "https://logo.clearbit.com/ucla.edu", website: "ucla.edu" },
  { name: "University of Michigan", country: "USA", city: "Ann Arbor", ranking: 33, tuition: 52266, acceptanceRate: 18, programs: ["Engineering", "Business", "Law"], logo: "https://logo.clearbit.com/umich.edu", website: "umich.edu" },

  // UK
  { name: "University of Oxford", country: "UK", city: "Oxford", ranking: 4, tuition: 35000, acceptanceRate: 17, programs: ["Law", "Medicine", "Philosophy"], logo: "https://logo.clearbit.com/ox.ac.uk", website: "ox.ac.uk" },
  { name: "University of Cambridge", country: "UK", city: "Cambridge", ranking: 5, tuition: 33000, acceptanceRate: 21, programs: ["Science", "Engineering", "Law"], logo: "https://logo.clearbit.com/cam.ac.uk", website: "cam.ac.uk" },
  { name: "Imperial College London", country: "UK", city: "London", ranking: 8, tuition: 38000, acceptanceRate: 15, programs: ["Engineering", "Medicine", "Business"], logo: "https://logo.clearbit.com/imperial.ac.uk", website: "imperial.ac.uk" },
  { name: "University College London", country: "UK", city: "London", ranking: 9, tuition: 32000, acceptanceRate: 38, programs: ["Architecture", "Data Science", "Law"], logo: "https://logo.clearbit.com/ucl.ac.uk", website: "ucl.ac.uk" },
  { name: "London School of Economics", country: "UK", city: "London", ranking: 45, tuition: 25000, acceptanceRate: 12, programs: ["Economics", "Finance", "Political Science"], logo: "https://logo.clearbit.com/lse.ac.uk", website: "lse.ac.uk" },
  { name: "University of Edinburgh", country: "UK", city: "Edinburgh", ranking: 27, tuition: 26000, acceptanceRate: 43, programs: ["Medicine", "Law", "Arts"], logo: "https://logo.clearbit.com/ed.ac.uk", website: "ed.ac.uk" },
  { name: "University of Manchester", country: "UK", city: "Manchester", ranking: 32, tuition: 25000, acceptanceRate: 57, programs: ["Engineering", "Business", "Science"], logo: "https://logo.clearbit.com/manchester.ac.uk", website: "manchester.ac.uk" },
  { name: "King's College London", country: "UK", city: "London", ranking: 40, tuition: 24000, acceptanceRate: 15, programs: ["Law", "Medicine", "Arts"], logo: "https://logo.clearbit.com/kcl.ac.uk", website: "kcl.ac.uk" },

  // Canada
  { name: "University of Toronto", country: "Canada", city: "Toronto", ranking: 18, tuition: 45000, acceptanceRate: 43, programs: ["Engineering", "Business", "Medicine"], logo: "https://logo.clearbit.com/utoronto.ca", website: "utoronto.ca" },
  { name: "McGill University", country: "Canada", city: "Montreal", ranking: 46, tuition: 42000, acceptanceRate: 46, programs: ["MBA", "Medicine", "Arts"], logo: "https://logo.clearbit.com/mcgill.ca", website: "mcgill.ca" },
  { name: "University of British Columbia", country: "Canada", city: "Vancouver", ranking: 47, tuition: 38000, acceptanceRate: 52, programs: ["Engineering", "Forestry", "Business"], logo: "https://logo.clearbit.com/ubc.ca", website: "ubc.ca" },
  { name: "University of Waterloo", country: "Canada", city: "Waterloo", ranking: 149, tuition: 36000, acceptanceRate: 53, programs: ["Computer Science", "Engineering", "Math"], logo: "https://logo.clearbit.com/uwaterloo.ca", website: "uwaterloo.ca" },

  // Australia
  { name: "University of Melbourne", country: "Australia", city: "Melbourne", ranking: 33, tuition: 38000, acceptanceRate: 70, programs: ["Engineering", "Business", "Law"], logo: "https://logo.clearbit.com/unimelb.edu.au", website: "unimelb.edu.au" },
  { name: "Australian National University", country: "Australia", city: "Canberra", ranking: 34, tuition: 35000, acceptanceRate: 35, programs: ["Science", "Law", "Arts"], logo: "https://logo.clearbit.com/anu.edu.au", website: "anu.edu.au" },
  { name: "University of Sydney", country: "Australia", city: "Sydney", ranking: 41, tuition: 40000, acceptanceRate: 30, programs: ["Medicine", "Law", "Engineering"], logo: "https://logo.clearbit.com/sydney.edu.au", website: "sydney.edu.au" },
  { name: "University of Queensland", country: "Australia", city: "Brisbane", ranking: 43, tuition: 36000, acceptanceRate: 55, programs: ["Agriculture", "Engineering", "Business"], logo: "https://logo.clearbit.com/uq.edu.au", website: "uq.edu.au" },

  // Germany
  { name: "TU Munich", country: "Germany", city: "Munich", ranking: 50, tuition: 0, acceptanceRate: 8, programs: ["Engineering", "Computer Science", "MBA"], logo: "https://logo.clearbit.com/tum.de", website: "tum.de" },
  { name: "LMU Munich", country: "Germany", city: "Munich", ranking: 59, tuition: 0, acceptanceRate: 30, programs: ["Medicine", "Law", "Science"], logo: "https://logo.clearbit.com/lmu.de", website: "lmu.de" },
  { name: "Heidelberg University", country: "Germany", city: "Heidelberg", ranking: 65, tuition: 0, acceptanceRate: 20, programs: ["Medicine", "Law", "Natural Sciences"], logo: "https://logo.clearbit.com/uni-heidelberg.de", website: "uni-heidelberg.de" },
  { name: "Humboldt University of Berlin", country: "Germany", city: "Berlin", ranking: 80, tuition: 0, acceptanceRate: 25, programs: ["Philosophy", "Medicine", "Law"], logo: "https://logo.clearbit.com/hu-berlin.de", website: "hu-berlin.de" },

  // Switzerland
  { name: "ETH Zurich", country: "Switzerland", city: "Zurich", ranking: 7, tuition: 1500, acceptanceRate: 27, programs: ["Engineering", "Computer Science", "Architecture"], logo: "https://logo.clearbit.com/ethz.ch", website: "ethz.ch" },
  { name: "EPFL", country: "Switzerland", city: "Lausanne", ranking: 16, tuition: 1500, acceptanceRate: 22, programs: ["Engineering", "Life Sciences", "Computer Science"], logo: "https://logo.clearbit.com/epfl.ch", website: "epfl.ch" },

  // Singapore
  { name: "National University of Singapore", country: "Singapore", city: "Singapore", ranking: 8, tuition: 29000, acceptanceRate: 11, programs: ["Computer Science", "Engineering", "Business"], logo: "https://logo.clearbit.com/nus.edu.sg", website: "nus.edu.sg" },
  { name: "Nanyang Technological University", country: "Singapore", city: "Singapore", ranking: 15, tuition: 28000, acceptanceRate: 20, programs: ["Engineering", "Business", "Science"], logo: "https://logo.clearbit.com/ntu.edu.sg", website: "ntu.edu.sg" },

  // China
  { name: "Peking University", country: "China", city: "Beijing", ranking: 14, tuition: 5000, acceptanceRate: 15, programs: ["Medicine", "Law", "Engineering"], logo: "https://logo.clearbit.com/pku.edu.cn", website: "pku.edu.cn" },
  { name: "Tsinghua University", country: "China", city: "Beijing", ranking: 16, tuition: 5000, acceptanceRate: 10, programs: ["Engineering", "Computer Science", "Architecture"], logo: "https://logo.clearbit.com/tsinghua.edu.cn", website: "tsinghua.edu.cn" },
  { name: "Fudan University", country: "China", city: "Shanghai", ranking: 34, tuition: 4500, acceptanceRate: 20, programs: ["Medicine", "Economics", "Science"], logo: "https://logo.clearbit.com/fudan.edu.cn", website: "fudan.edu.cn" },
  { name: "Shanghai Jiao Tong University", country: "China", city: "Shanghai", ranking: 47, tuition: 4000, acceptanceRate: 18, programs: ["Engineering", "Medicine", "Business"], logo: "https://logo.clearbit.com/sjtu.edu.cn", website: "sjtu.edu.cn" },

  // Japan
  { name: "University of Tokyo", country: "Japan", city: "Tokyo", ranking: 23, tuition: 7000, acceptanceRate: 35, programs: ["Engineering", "Science", "Medicine"], logo: "https://logo.clearbit.com/u-tokyo.ac.jp", website: "u-tokyo.ac.jp" },
  { name: "Kyoto University", country: "Japan", city: "Kyoto", ranking: 38, tuition: 6500, acceptanceRate: 40, programs: ["Science", "Engineering", "Medicine"], logo: "https://logo.clearbit.com/kyoto-u.ac.jp", website: "kyoto-u.ac.jp" },
  { name: "Osaka University", country: "Japan", city: "Osaka", ranking: 68, tuition: 6000, acceptanceRate: 45, programs: ["Medicine", "Engineering", "Science"], logo: "https://logo.clearbit.com/osaka-u.ac.jp", website: "osaka-u.ac.jp" },

  // South Korea
  { name: "Seoul National University", country: "South Korea", city: "Seoul", ranking: 41, tuition: 6000, acceptanceRate: 30, programs: ["Engineering", "Business", "Medicine"], logo: "https://logo.clearbit.com/snu.ac.kr", website: "snu.ac.kr" },
  { name: "KAIST", country: "South Korea", city: "Daejeon", ranking: 56, tuition: 7000, acceptanceRate: 25, programs: ["Engineering", "Computer Science", "Science"], logo: "https://logo.clearbit.com/kaist.ac.kr", website: "kaist.ac.kr" },
  { name: "Yonsei University", country: "South Korea", city: "Seoul", ranking: 79, tuition: 18000, acceptanceRate: 20, programs: ["Business", "Medicine", "Arts"], logo: "https://logo.clearbit.com/yonsei.ac.kr", website: "yonsei.ac.kr" },

  // India
  { name: "Indian Institute of Technology Bombay", country: "India", city: "Mumbai", ranking: 118, tuition: 2000, acceptanceRate: 1, programs: ["Engineering", "Computer Science", "Design"], logo: "https://logo.clearbit.com/iitb.ac.in", website: "iitb.ac.in" },
  { name: "Indian Institute of Technology Delhi", country: "India", city: "New Delhi", ranking: 150, tuition: 2000, acceptanceRate: 1, programs: ["Engineering", "Computer Science", "Management"], logo: "https://logo.clearbit.com/iitd.ac.in", website: "iitd.ac.in" },
  { name: "Indian Institute of Science", country: "India", city: "Bangalore", ranking: 155, tuition: 1000, acceptanceRate: 3, programs: ["Science", "Engineering", "Research"], logo: "https://logo.clearbit.com/iisc.ac.in", website: "iisc.ac.in" },
  { name: "University of Delhi", country: "India", city: "New Delhi", ranking: 521, tuition: 500, acceptanceRate: 15, programs: ["Arts", "Science", "Commerce", "Law"], logo: "https://logo.clearbit.com/du.ac.in", website: "du.ac.in" },

  // Netherlands
  { name: "Delft University of Technology", country: "Netherlands", city: "Delft", ranking: 57, tuition: 18000, acceptanceRate: 30, programs: ["Engineering", "Architecture", "Computer Science"], logo: "https://logo.clearbit.com/tudelft.nl", website: "tudelft.nl" },
  { name: "University of Amsterdam", country: "Netherlands", city: "Amsterdam", ranking: 61, tuition: 12000, acceptanceRate: 40, programs: ["Business", "Law", "Social Sciences"], logo: "https://logo.clearbit.com/uva.nl", website: "uva.nl" },

  // France
  { name: "École Polytechnique", country: "France", city: "Paris", ranking: 52, tuition: 15000, acceptanceRate: 15, programs: ["Engineering", "Computer Science", "Physics"], logo: "https://logo.clearbit.com/polytechnique.edu", website: "polytechnique.edu" },
  { name: "Paris Sciences et Lettres", country: "France", city: "Paris", ranking: 26, tuition: 4000, acceptanceRate: 10, programs: ["Science", "Arts", "Engineering"], logo: "https://logo.clearbit.com/psl.eu", website: "psl.eu" },
  { name: "Sorbonne University", country: "France", city: "Paris", ranking: 59, tuition: 3000, acceptanceRate: 25, programs: ["Medicine", "Law", "Arts"], logo: "https://logo.clearbit.com/sorbonne-universite.fr", website: "sorbonne-universite.fr" },

  // Sweden
  { name: "KTH Royal Institute of Technology", country: "Sweden", city: "Stockholm", ranking: 89, tuition: 0, acceptanceRate: 20, programs: ["Engineering", "Computer Science", "Architecture"], logo: "https://logo.clearbit.com/kth.se", website: "kth.se" },
  { name: "Karolinska Institute", country: "Sweden", city: "Stockholm", ranking: 40, tuition: 0, acceptanceRate: 15, programs: ["Medicine", "Nursing", "Biomedicine"], logo: "https://logo.clearbit.com/ki.se", website: "ki.se" },

  // Saudi Arabia
  { name: "King Abdulaziz University", country: "Saudi Arabia", city: "Jeddah", ranking: 115, tuition: 0, acceptanceRate: 30, programs: ["Engineering", "Medicine", "Business"], logo: "https://logo.clearbit.com/kau.edu.sa", website: "kau.edu.sa" },
  { name: "King Fahd University", country: "Saudi Arabia", city: "Dhahran", ranking: 198, tuition: 0, acceptanceRate: 25, programs: ["Engineering", "Computer Science", "Science"], logo: "https://logo.clearbit.com/kfupm.edu.sa", website: "kfupm.edu.sa" },

  // UAE
  { name: "Khalifa University", country: "UAE", city: "Abu Dhabi", ranking: 201, tuition: 18000, acceptanceRate: 20, programs: ["Engineering", "Computer Science", "Nuclear Engineering"], logo: "https://logo.clearbit.com/ku.ac.ae", website: "ku.ac.ae" },
  { name: "American University of Sharjah", country: "UAE", city: "Sharjah", ranking: 380, tuition: 22000, acceptanceRate: 40, programs: ["Engineering", "Business", "Architecture"], logo: "https://logo.clearbit.com/aus.edu", website: "aus.edu" },

  // Brazil
  { name: "University of São Paulo", country: "Brazil", city: "São Paulo", ranking: 96, tuition: 0, acceptanceRate: 20, programs: ["Engineering", "Medicine", "Law"], logo: "https://logo.clearbit.com/usp.br", website: "usp.br" },
  { name: "Universidade Estadual de Campinas", country: "Brazil", city: "Campinas", ranking: 201, tuition: 0, acceptanceRate: 15, programs: ["Engineering", "Science", "Arts"], logo: "https://logo.clearbit.com/unicamp.br", website: "unicamp.br" },

  // South Africa
  { name: "University of Cape Town", country: "South Africa", city: "Cape Town", ranking: 226, tuition: 8000, acceptanceRate: 35, programs: ["Medicine", "Law", "Engineering"], logo: "https://logo.clearbit.com/uct.ac.za", website: "uct.ac.za" },
  { name: "University of the Witwatersrand", country: "South Africa", city: "Johannesburg", ranking: 331, tuition: 7000, acceptanceRate: 40, programs: ["Mining Engineering", "Medicine", "Law"], logo: "https://logo.clearbit.com/wits.ac.za", website: "wits.ac.za" },

  // Russia
  { name: "Lomonosov Moscow State University", country: "Russia", city: "Moscow", ranking: 87, tuition: 8000, acceptanceRate: 25, programs: ["Engineering", "Physics", "Mathematics"], logo: "https://logo.clearbit.com/msu.ru", website: "msu.ru" },
  { name: "Saint Petersburg State University", country: "Russia", city: "Saint Petersburg", ranking: 242, tuition: 6000, acceptanceRate: 30, programs: ["Law", "Economics", "Arts"], logo: "https://logo.clearbit.com/spbu.ru", website: "spbu.ru" },
  { name: "ITMO University", country: "Russia", city: "Saint Petersburg", ranking: 401, tuition: 5500, acceptanceRate: 32, programs: ["Computer Science", "Photonics", "Engineering"], logo: "https://logo.clearbit.com/itmo.ru", website: "itmo.ru" },
  { name: "Novosibirsk State University", country: "Russia", city: "Novosibirsk", ranking: 246, tuition: 5000, acceptanceRate: 35, programs: ["Physics", "Mathematics", "Computer Science"], logo: "https://logo.clearbit.com/nsu.ru", website: "nsu.ru" },

  // Hong Kong
  { name: "University of Hong Kong", country: "Hong Kong", city: "Hong Kong", ranking: 26, tuition: 21000, acceptanceRate: 20, programs: ["Medicine", "Law", "Business"], logo: "https://logo.clearbit.com/hku.hk", website: "hku.hk" },
  { name: "Hong Kong University of Science and Technology", country: "Hong Kong", city: "Hong Kong", ranking: 34, tuition: 20000, acceptanceRate: 18, programs: ["Engineering", "Business", "Science"], logo: "https://logo.clearbit.com/ust.hk", website: "ust.hk" },

  // Malaysia
  { name: "University of Malaya", country: "Malaysia", city: "Kuala Lumpur", ranking: 65, tuition: 5000, acceptanceRate: 30, programs: ["Engineering", "Medicine", "Business"], logo: "https://logo.clearbit.com/um.edu.my", website: "um.edu.my" },

  // Taiwan
  { name: "National Taiwan University", country: "Taiwan", city: "Taipei", ranking: 68, tuition: 4000, acceptanceRate: 25, programs: ["Engineering", "Medicine", "Science"], logo: "https://logo.clearbit.com/ntu.edu.tw", website: "ntu.edu.tw" },

  // Egypt
  { name: "Cairo University", country: "Egypt", city: "Cairo", ranking: 551, tuition: 1000, acceptanceRate: 40, programs: ["Medicine", "Law", "Engineering"], logo: "https://logo.clearbit.com/cu.edu.eg", website: "cu.edu.eg" },

  // Pakistan
  { name: "Quaid-i-Azam University", country: "Pakistan", city: "Islamabad", ranking: 386, tuition: 500, acceptanceRate: 20, programs: ["Science", "Social Sciences", "Natural Sciences"], logo: "https://logo.clearbit.com/qau.edu.pk", website: "qau.edu.pk" },
  { name: "LUMS", country: "Pakistan", city: "Lahore", ranking: 651, tuition: 10000, acceptanceRate: 12, programs: ["Business", "Computer Science", "Law"], logo: "https://logo.clearbit.com/lums.edu.pk", website: "lums.edu.pk" },
  { name: "NUST", country: "Pakistan", city: "Islamabad", ranking: 451, tuition: 3000, acceptanceRate: 5, programs: ["Engineering", "Computer Science", "Business"], logo: "https://logo.clearbit.com/nust.edu.pk", website: "nust.edu.pk" },

  // Turkey
  { name: "Middle East Technical University", country: "Turkey", city: "Ankara", ranking: 476, tuition: 500, acceptanceRate: 10, programs: ["Engineering", "Architecture", "Science"], logo: "https://logo.clearbit.com/metu.edu.tr", website: "metu.edu.tr" },
  { name: "Bogazici University", country: "Turkey", city: "Istanbul", ranking: 451, tuition: 600, acceptanceRate: 5, programs: ["Engineering", "Business", "Arts"], logo: "https://logo.clearbit.com/boun.edu.tr", website: "boun.edu.tr" },

  // Italy
  { name: "University of Bologna", country: "Italy", city: "Bologna", ranking: 154, tuition: 3000, acceptanceRate: 50, programs: ["Law", "Medicine", "Engineering"], logo: "https://logo.clearbit.com/unibo.it", website: "unibo.it" },
  { name: "Politecnico di Milano", country: "Italy", city: "Milan", ranking: 139, tuition: 4000, acceptanceRate: 35, programs: ["Engineering", "Architecture", "Design"], logo: "https://logo.clearbit.com/polimi.it", website: "polimi.it" },

  // Spain
  { name: "University of Barcelona", country: "Spain", city: "Barcelona", ranking: 148, tuition: 2000, acceptanceRate: 40, programs: ["Medicine", "Law", "Science"], logo: "https://logo.clearbit.com/ub.edu", website: "ub.edu" },
  { name: "Autonomous University of Madrid", country: "Spain", city: "Madrid", ranking: 195, tuition: 2000, acceptanceRate: 35, programs: ["Science", "Medicine", "Law"], logo: "https://logo.clearbit.com/uam.es", website: "uam.es" },

  // New Zealand
  { name: "University of Auckland", country: "New Zealand", city: "Auckland", ranking: 65, tuition: 28000, acceptanceRate: 55, programs: ["Engineering", "Business", "Medicine"], logo: "https://logo.clearbit.com/auckland.ac.nz", website: "auckland.ac.nz" },

  // Ireland
  { name: "Trinity College Dublin", country: "Ireland", city: "Dublin", ranking: 81, tuition: 18000, acceptanceRate: 30, programs: ["Arts", "Engineering", "Medicine"], logo: "https://logo.clearbit.com/tcd.ie", website: "tcd.ie" },

  // Denmark
  { name: "Technical University of Denmark", country: "Denmark", city: "Copenhagen", ranking: 98, tuition: 0, acceptanceRate: 25, programs: ["Engineering", "Computer Science", "Physics"], logo: "https://logo.clearbit.com/dtu.dk", website: "dtu.dk" },

  // Finland
  { name: "Aalto University", country: "Finland", city: "Helsinki", ranking: 115, tuition: 0, acceptanceRate: 20, programs: ["Engineering", "Business", "Arts"], logo: "https://logo.clearbit.com/aalto.fi", website: "aalto.fi" },

  // Norway
  { name: "University of Oslo", country: "Norway", city: "Oslo", ranking: 119, tuition: 0, acceptanceRate: 40, programs: ["Law", "Medicine", "Science"], logo: "https://logo.clearbit.com/uio.no", website: "uio.no" },

  // Belgium
  { name: "KU Leuven", country: "Belgium", city: "Leuven", ranking: 71, tuition: 1000, acceptanceRate: 40, programs: ["Engineering", "Medicine", "Law"], logo: "https://logo.clearbit.com/kuleuven.be", website: "kuleuven.be" },

  // Mexico
  { name: "UNAM", country: "Mexico", city: "Mexico City", ranking: 105, tuition: 0, acceptanceRate: 10, programs: ["Medicine", "Law", "Engineering"], logo: "https://logo.clearbit.com/unam.mx", website: "unam.mx" },

  // Argentina
  { name: "University of Buenos Aires", country: "Argentina", city: "Buenos Aires", ranking: 171, tuition: 0, acceptanceRate: 25, programs: ["Medicine", "Law", "Architecture"], logo: "https://logo.clearbit.com/uba.ar", website: "uba.ar" },

  // Ghana
  { name: "University of Ghana", country: "Ghana", city: "Accra", ranking: 801, tuition: 2000, acceptanceRate: 30, programs: ["Business", "Law", "Science"], logo: "https://logo.clearbit.com/ug.edu.gh", website: "ug.edu.gh" },

  // Kenya
  { name: "University of Nairobi", country: "Kenya", city: "Nairobi", ranking: 801, tuition: 1500, acceptanceRate: 35, programs: ["Medicine", "Engineering", "Law"], logo: "https://logo.clearbit.com/uonbi.ac.ke", website: "uonbi.ac.ke" },
];

async function seed() {
  console.log(`Seeding ${universities.length} universities...`);
  for (const uni of universities) {
    await db.collection('universities').add({...uni, createdAt: new Date()});
    console.log(`✅ ${uni.name}`);
  }
  console.log(`\n🎉 Done! ${universities.length} universities added.`);
  process.exit(0);
}

seed().catch(e => { console.error('❌', e.message); process.exit(1); });
