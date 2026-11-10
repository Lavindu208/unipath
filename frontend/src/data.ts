// ===== UniPath data file =====
// NOTE: Degree names, registration dates, fees and ranks CHANGE every year.
// Confirm with UGC / the university website before showing them as final.
// To use real photos: put images in frontend/public/images and set `image: "/images/xxx.jpg"`.

export type Degree = {
  name: string;
  icon: string;
  faculty: string;
  duration: string;
  medium: string;
  description: string;
  modules: { year: string; subjects: string[] }[];
  skills: string[];
  careers: string[];
  sectors: string[];
  jobMarket: { demand: "High" | "Medium" | "Low"; notes: string; outlook: string };
};

export type University = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  website: string;
  about: string;
  emoji: string;
  color: string; // banner gradient
  image?: string; // optional real photo
  logo?: string; // university logo, e.g. "/logos/uoc.png" (file in frontend/public/logos)
  registration: {
    process: string[];
    documents: string[];
    fees: string;
    dates: string;
    officialLink: string;
  };
  degrees: Degree[];
};

const commonDocuments = [
  "UGC selection letter",
  "G.C.E. A/L results sheet",
  "Birth certificate (original + copy)",
  "National Identity Card (or copy)",
  "Medical report",
  "Passport-size photographs",
  "Payment slip for registration fee",
];

const commonProcess = [
  "Get selected through the UGC Z-score based selection.",
  "Receive the UGC selection / admission letter.",
  "Visit the university (or online portal) on the given registration date.",
  "Submit documents and pay the registration fee.",
  "Collect student ID and attend the orientation programme.",
];

const reg = (link: string) => ({
  process: commonProcess,
  documents: commonDocuments,
  fees: "Check the official registration notice (amount changes yearly).",
  dates: "Announced yearly by the university after UGC selection.",
  officialLink: link,
});

export const universities: University[] = [
  {
    id: "uoc",
    name: "University of Colombo",
    shortName: "UoC",
    location: "Colombo",
    website: "https://cmb.ac.lk",
    emoji: "🏛️",
    logo: "/logos/uoc.png",
    color: "linear-gradient(135deg,#1e3a8a,#3b82f6)",
    about:
      "One of the oldest and largest universities in Sri Lanka with faculties of Arts, Law, Science, Medicine, Management and more.",
    registration: reg("https://cmb.ac.lk"),
    degrees: [
      {
        name: "BSc in Computer Science",
        icon: "💻",
        faculty: "Faculty of Science / UCSC",
        duration: "3-4 years",
        medium: "English",
        description:
          "Covers programming, algorithms, databases, networks and software engineering.",
        modules: [
          { year: "Year 1", subjects: ["Programming Fundamentals", "Discrete Mathematics", "Computer Systems"] },
          { year: "Year 2", subjects: ["Data Structures & Algorithms", "Databases", "Web Development"] },
          { year: "Year 3", subjects: ["Software Engineering", "Operating Systems", "AI / Machine Learning"] },
          { year: "Year 4", subjects: ["Research Project", "Industry Training"] },
        ],
        skills: ["Programming", "Problem solving", "Databases", "Teamwork", "Cloud basics"],
        careers: ["Software Engineer", "Data Analyst", "QA Engineer", "System Administrator", "AI/ML Engineer"],
        sectors: ["Software companies", "Banking & FinTech", "Telecom", "Startups / Freelance", "Overseas remote work"],
        jobMarket: {
          demand: "High",
          notes: "IT sector demand is strong locally and for remote / overseas work.",
          outlook: "Growing: AI, cloud and cybersecurity skills are especially valued. Build projects and do internships.",
        },
      },
      {
        name: "LLB (Bachelor of Laws)",
        icon: "⚖️",
        faculty: "Faculty of Law",
        duration: "4 years",
        medium: "English / Sinhala / Tamil",
        description: "Legal theory, constitutional law, criminal law and commercial law.",
        modules: [
          { year: "Year 1", subjects: ["Legal System", "Law of Contract", "Constitutional Law"] },
          { year: "Year 2", subjects: ["Criminal Law", "Law of Property", "Law of Torts"] },
          { year: "Year 3", subjects: ["Company Law", "Evidence", "Human Rights Law"] },
          { year: "Year 4", subjects: ["Dissertation", "Electives"] },
        ],
        skills: ["Legal research", "Argumentation", "Writing", "Public speaking"],
        careers: ["Attorney-at-law (after Law College)", "Legal Officer", "Corporate Counsel", "State Counsel"],
        sectors: ["Courts & private practice", "Corporates", "Government", "NGOs"],
        jobMarket: {
          demand: "Medium",
          notes: "Further training at Sri Lanka Law College is needed to practise as an attorney.",
          outlook: "Steady. Corporate and commercial law offer the most opportunities.",
        },
      },
    ],
  },
  {
    id: "uom",
    name: "University of Moratuwa",
    shortName: "UoM",
    location: "Moratuwa",
    website: "https://uom.lk",
    emoji: "⚙️",
    logo: "/logos/uom.png",
    color: "linear-gradient(135deg,#7c2d12,#f97316)",
    about: "Sri Lanka's leading technological university: Engineering, Architecture, IT and Business.",
    registration: reg("https://uom.lk"),
    degrees: [
      {
        name: "BSc Engineering (Hons)",
        icon: "🏗️",
        faculty: "Faculty of Engineering",
        duration: "4 years",
        medium: "English",
        description: "Civil, Electrical, Mechanical, Computer, Electronic & Telecom and more streams.",
        modules: [
          { year: "Year 1", subjects: ["Engineering Mathematics", "Mechanics", "Programming"] },
          { year: "Year 2", subjects: ["Circuits", "Materials", "Data Structures"] },
          { year: "Year 3", subjects: ["Specialisation modules", "Design Project"] },
          { year: "Year 4", subjects: ["Industrial Training", "Final Year Project"] },
        ],
        skills: ["Technical design", "Mathematics", "Project management", "CAD / simulation"],
        careers: ["Civil Engineer", "Electrical Engineer", "Mechanical Engineer", "Software Engineer", "Project Engineer"],
        sectors: ["Construction", "Power & energy", "Manufacturing", "Telecom", "Overseas engineering firms"],
        jobMarket: {
          demand: "High",
          notes: "Graduates are highly sought after locally and abroad. Chartered status via IESL.",
          outlook: "Strong, especially for electrical, computer and renewable-energy related fields.",
        },
      },
      {
        name: "BSc in Information Technology",
        icon: "🖥️",
        faculty: "Faculty of Information Technology",
        duration: "4 years",
        medium: "English",
        description: "Software development, IT management, networking and data science.",
        modules: [
          { year: "Year 1", subjects: ["Programming", "Mathematics for IT", "IT Fundamentals"] },
          { year: "Year 2", subjects: ["Web Technologies", "Databases", "Networks"] },
          { year: "Year 3", subjects: ["Software Engineering", "Cloud Computing"] },
          { year: "Year 4", subjects: ["Industry Placement", "Research Project"] },
        ],
        skills: ["Software development", "Cloud", "Analysis", "Communication"],
        careers: ["Software Engineer", "Business Analyst", "DevOps Engineer", "Data Engineer"],
        sectors: ["Software industry", "BPO / KPO", "Banking", "Startups"],
        jobMarket: {
          demand: "High",
          notes: "Strong demand in the software industry.",
          outlook: "Growing: cloud, data and security roles are in demand.",
        },
      },
      {
        name: "B.Arch (Architecture)",
        icon: "📐",
        faculty: "Faculty of Architecture",
        duration: "5 years",
        medium: "English",
        description: "Architectural design, building technology, planning and urban studies.",
        modules: [
          { year: "Year 1-2", subjects: ["Design Studio", "History of Architecture", "Building Construction"] },
          { year: "Year 3", subjects: ["Structures", "Environmental Design", "Urban Studies"] },
          { year: "Year 4-5", subjects: ["Professional Practice", "Thesis Design Project"] },
        ],
        skills: ["Design thinking", "Drawing / 3D modelling", "Presentation", "Site planning"],
        careers: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect"],
        sectors: ["Architecture firms", "Construction", "Real estate", "Government planning"],
        jobMarket: {
          demand: "Medium",
          notes: "Tied closely to the construction industry; registration with SLIA needed to practise.",
          outlook: "Moderate, with good prospects overseas and in design/consultancy.",
        },
      },
    ],
  },
  {
    id: "sjp",
    name: "University of Sri Jayewardenepura",
    shortName: "USJ",
    location: "Nugegoda",
    website: "https://sjp.ac.lk",
    emoji: "📊",
    logo: "/logos/sjp.png",
    color: "linear-gradient(135deg,#065f46,#10b981)",
    about: "Known for Management & Commerce, Applied Sciences, Medical Sciences and Technology.",
    registration: reg("https://sjp.ac.lk"),
    degrees: [
      {
        name: "BSc in Business Administration",
        icon: "💼",
        faculty: "Faculty of Management Studies & Commerce",
        duration: "4 years",
        medium: "English / Sinhala",
        description: "Management, marketing, HR, finance and entrepreneurship.",
        modules: [
          { year: "Year 1", subjects: ["Principles of Management", "Financial Accounting", "Economics"] },
          { year: "Year 2", subjects: ["Marketing", "HRM", "Business Statistics"] },
          { year: "Year 3", subjects: ["Corporate Finance", "Operations Management"] },
          { year: "Year 4", subjects: ["Research Project", "Specialisation"] },
        ],
        skills: ["Leadership", "Analytical thinking", "Communication", "Excel / data basics"],
        careers: ["Management Trainee", "Marketing Executive", "HR Executive", "Business Analyst"],
        sectors: ["Banking", "FMCG", "Consulting", "Retail", "Entrepreneurship"],
        jobMarket: {
          demand: "Medium",
          notes: "Wide range of roles; professional qualifications (CA, CIMA) add a lot of value.",
          outlook: "Stable. Digital marketing and analytics skills give an edge.",
        },
      },
      {
        name: "BSc in Accounting & Finance",
        icon: "🧮",
        faculty: "Faculty of Management Studies & Commerce",
        duration: "4 years",
        medium: "English / Sinhala",
        description: "Financial reporting, auditing, taxation and financial management.",
        modules: [
          { year: "Year 1", subjects: ["Financial Accounting", "Business Law", "Microeconomics"] },
          { year: "Year 2", subjects: ["Management Accounting", "Taxation", "Auditing"] },
          { year: "Year 3", subjects: ["Financial Management", "Corporate Reporting"] },
          { year: "Year 4", subjects: ["Research Project", "Electives"] },
        ],
        skills: ["Accounting", "Attention to detail", "Excel", "Ethics"],
        careers: ["Accountant", "Auditor", "Financial Analyst", "Tax Consultant"],
        sectors: ["Audit firms", "Banks", "Corporates", "Government"],
        jobMarket: {
          demand: "High",
          notes: "Accountants are needed in almost every organisation.",
          outlook: "Steady. Finishing CA / ACCA / CIMA greatly improves prospects.",
        },
      },
    ],
  },
  {
    id: "pdn",
    name: "University of Peradeniya",
    shortName: "UoP",
    location: "Kandy",
    website: "https://pdn.ac.lk",
    emoji: "🌿",
    logo: "/logos/pdn.png",
    color: "linear-gradient(135deg,#581c87,#a855f7)",
    about: "Large residential university: Engineering, Medicine, Science, Arts, Agriculture, Dental and Veterinary.",
    registration: reg("https://pdn.ac.lk"),
    degrees: [
      {
        name: "MBBS (Medicine)",
        icon: "🩺",
        faculty: "Faculty of Medicine",
        duration: "5 years + internship",
        medium: "English",
        description: "Pre-clinical and clinical training in medicine and surgery.",
        modules: [
          { year: "Year 1-2", subjects: ["Anatomy", "Physiology", "Biochemistry"] },
          { year: "Year 3", subjects: ["Pathology", "Pharmacology", "Microbiology"] },
          { year: "Year 4-5", subjects: ["Clinical rotations", "Surgery", "Paediatrics", "Obstetrics"] },
        ],
        skills: ["Clinical reasoning", "Empathy", "Decision making", "Stamina"],
        careers: ["Medical Officer", "Specialist (after PG)", "Researcher", "Public Health Officer"],
        sectors: ["Government hospitals", "Private hospitals", "Research", "Overseas medical services"],
        jobMarket: {
          demand: "High",
          notes: "Internship then government service; strong overseas demand.",
          outlook: "Very strong. Postgraduate training opens specialist careers.",
        },
      },
      {
        name: "BSc Agriculture",
        icon: "🌾",
        faculty: "Faculty of Agriculture",
        duration: "4 years",
        medium: "English",
        description: "Crop science, soil science, agribusiness and food technology.",
        modules: [
          { year: "Year 1", subjects: ["Plant Science", "Soil Science", "Agri Economics"] },
          { year: "Year 2", subjects: ["Crop Production", "Animal Science", "Agri Engineering"] },
          { year: "Year 3", subjects: ["Food Technology", "Agribusiness"] },
          { year: "Year 4", subjects: ["Research Project", "Field Training"] },
        ],
        skills: ["Field research", "Sustainability", "Agribusiness", "Data analysis"],
        careers: ["Agricultural Officer", "Agribusiness Manager", "Food Technologist", "Researcher"],
        sectors: ["Plantations", "Export companies", "Government agriculture", "Food industry"],
        jobMarket: {
          demand: "Medium",
          notes: "Opportunities in government, plantations and agribusiness.",
          outlook: "Growing interest in sustainable farming, agri-tech and food processing.",
        },
      },
    ],
  },
];

// Sample ranking order only. Replace with the latest published list
// (e.g. uniRank, Webometrics, QS, THE) and mention the source + year.
export const rankings = {
  source: "Add your source here (e.g. Webometrics / uniRank)",
  year: "Update year",
  list: [
    { rank: 1, name: "University of Colombo" },
    { rank: 2, name: "University of Moratuwa" },
    { rank: 3, name: "University of Peradeniya" },
    { rank: 4, name: "University of Sri Jayewardenepura" },
  ],
};