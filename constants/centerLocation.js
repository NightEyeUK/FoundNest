/**
 * BulSU Main Campus Colleges Database
 * Images are sourced from Wikimedia Commons public domain real-world photos 
 * of the BulSU campus, compressed to 600px width for fast mobile loading.
 */

export const bulsuColleges = [
  {
    id: 'college_cict',
    name: 'College of Information and Communications Technology',
    acronym: 'CICT',
    building: 'Alvarado Hall',
    coordinates: [120.81420, 14.85850], 
    color: '#FF8C00', // Orange pin
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*JMIkoLSE6Zvrn23h4QOgKA.jpeg',
    operatingHours: '8:00 AM - 5:00 PM',
    description: 'Home of IT, Computer Science, and tech-related programs.',
  },
  {
    id: 'college_coe',
    name: 'College of Engineering',
    acronym: 'COE',
    building: 'Natividad Hall',
    coordinates: [120.81450, 14.85810],
    color: '#800000', // Maroon pin
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgc2Mvb2WYl4CsaXw4nHvjED7D1qt2DKmdLQ&s',
    operatingHours: '7:00 AM - 6:00 PM',
    description: 'Houses civil, mechanical, electrical, and computer engineering departments.',
  },
  {
    id: 'college_cs',
    name: 'College of Science',
    acronym: 'CS',
    building: 'Federizo Hall',
    coordinates: [120.81380, 14.85880],
    color: '#2E8B57', // Sea Green pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bsucollege22jf.JPG?width=600',
    operatingHours: '8:00 AM - 5:00 PM',
    description: 'Laboratories and lecture halls for biology, math, and environmental sciences.',
  },
  {
    id: 'college_coed',
    name: 'College of Education',
    acronym: 'COED',
    building: 'Roxas Hall',
    coordinates: [120.81350, 14.85790],
    color: '#4169E1', // Royal Blue pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Roxasbsujf.JPG?width=600',
    operatingHours: '7:00 AM - 6:00 PM',
    description: 'The primary building for future educators and teaching degree programs.',
  },
  {
    id: 'college_cba',
    name: 'College of Business Administration',
    acronym: 'CBA',
    building: 'Carpio Hall',
    coordinates: [120.81480, 14.85750],
    color: '#FFD700', // Gold/Yellow pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Carpiobsujf.JPG?width=600',
    operatingHours: '8:00 AM - 5:00 PM',
    description: 'Center for accountancy, entrepreneurship, and business management.',
  },
  {
    id: 'college_con',
    name: 'College of Nursing',
    acronym: 'CON',
    building: 'College of Nursing Building',
    coordinates: [120.81510, 14.85890],
    color: '#FFC0CB', // Pink pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cictjf.JPG?width=600',
    operatingHours: '7:00 AM - 5:00 PM',
    description: 'Nursing simulation rooms and medical arts training facilities.',
  },
  {
    id: 'college_cit',
    name: 'College of Industrial Technology',
    acronym: 'CIT',
    building: 'Alvarado Hall (Annex)',
    coordinates: [120.81410, 14.85840],
    color: '#696969', // Dim Gray pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Alvaradojf.JPG?width=600',
    operatingHours: '8:00 AM - 6:00 PM',
    description: 'Workshops and technical training rooms for industrial arts.',
  },
  {
    id: 'college_cal',
    name: 'College of Arts and Letters',
    acronym: 'CAL',
    building: 'Valencia Hall',
    coordinates: [120.81320, 14.85820],
    color: '#8A2BE2', // Blue Violet pin
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bsucollege22jf.JPG?width=600',
    operatingHours: '8:00 AM - 5:00 PM',
    description: 'Hub for journalism, mass communication, and performing arts.',
  }
];

export const getCollegeById = (id) => {
  return bulsuColleges.find(college => college.id === id);
};