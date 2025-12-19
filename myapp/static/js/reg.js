/* reg.js - Offline Large dataset (sample large-mode)
   - Place at static/js/reg.js
   - Works with: <select id="country">, <select id="state">, <select id="city">
*/

/* ============== DATA ============== 
   Large-mode sample dataset for ~20 countries.
   Extendable: you can add more countries/states/cities to DATA object.
*/
const DATA = {
  countries: [
    "India","United States","Canada","Australia","United Kingdom",
    "Germany","France","China","Japan","Brazil",
    "Mexico","Spain","Italy","Netherlands","Russia",
    "South Africa","UAE","Saudi Arabia","Indonesia","Turkey"
  ],

  states: {
    "India": ["Tamil Nadu","Kerala","Karnataka","Maharashtra","Delhi","Uttar Pradesh","West Bengal","Gujarat","Rajasthan","Telangana"],
    "United States": ["California","Texas","Florida","New York","Illinois","Pennsylvania","Ohio","Georgia","North Carolina","Michigan"],
    "Canada": ["Ontario","Quebec","British Columbia","Alberta","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Prince Edward Island","Newfoundland and Labrador"],
    "Australia": ["New South Wales","Victoria","Queensland","Western Australia","South Australia","Tasmania","Northern Territory","Australian Capital Territory"],
    "United Kingdom": ["England","Scotland","Wales","Northern Ireland"],
    "Germany": ["Bavaria","North Rhine-Westphalia","Baden-Württemberg","Hesse","Saxony","Lower Saxony","Rhineland-Palatinate","Thuringia"],
    "France": ["Île-de-France","Provence-Alpes-Côte d'Azur","Auvergne-Rhône-Alpes","Occitanie","Nouvelle-Aquitaine","Brittany"],
    "China": ["Guangdong","Beijing","Shanghai","Sichuan","Zhejiang","Jiangsu","Shandong","Hunan","Hubei","Fujian"],
    "Japan": ["Tokyo","Osaka","Kanagawa","Aichi","Hokkaido","Fukuoka","Hyogo","Saitama","Chiba","Shizuoka"],
    "Brazil": ["São Paulo","Rio de Janeiro","Minas Gerais","Bahia","Paraná","Pernambuco","Ceará","Rio Grande do Sul","Santa Catarina","Goiás"],
    "Mexico": ["Mexico City","Jalisco","Nuevo León","Puebla","Guanajuato","Chiapas","Veracruz","Oaxaca","Sinaloa","Yucatán"],
    "Spain": ["Madrid","Catalonia","Andalusia","Valencia","Galicia","Basque Country","Canary Islands","Balearic Islands"],
    "Italy": ["Lombardy","Lazio","Campania","Sicily","Veneto","Emilia-Romagna","Piedmont","Tuscany"],
    "Netherlands": ["North Holland","South Holland","Utrecht","North Brabant","Gelderland","Overijssel"],
    "Russia": ["Moscow","Saint Petersburg","Sverdlovsk Oblast","Novosibirsk Oblast","Krasnodar Krai","Rostov Oblast","Perm Krai"],
    "South Africa": ["Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Limpopo","Mpumalanga","North West"],
    "UAE": ["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],
    "Saudi Arabia": ["Riyadh","Makkah","Madinah","Eastern Province","Asir","Tabuk","Al-Qassim"],
    "Indonesia": ["Jakarta","West Java","East Java","Central Java","Bali","Sumatra Utara (North Sumatra)","Sulawesi Selatan (South Sulawesi)"],
    "Turkey": ["Istanbul","Ankara","Izmir","Antalya","Bursa","Adana","Konya","Gaziantep"]
  },

  cities: {
    "India": {
      "Tamil Nadu":["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Erode","Tirunelveli","Vellore","Nagercoil","Kanchipuram","Puducherry","Thanjavur","Viluppuram","Dindigul","Kumbakonam","Nagapattinam","Cuddalore","Tiruppur","Karur","Namakkal","kannyakumari"],
      "Kerala":["Kochi","Thiruvananthapuram","Kozhikode","Thrissur","Kollam","Alappuzha","Kottayam","Kannur","Malappuram","Palakkad","Nagercoil","Wayanad","Pathanamthitta","Punalur","Irinjalakuda","Payyanur","Vatakara","Vadakara","Manjeri","Kunnamkulam"],
      "Karnataka":["Bengaluru","Mysore","Mangalore","Hubli","Dharwad","Belgaum","Bijapur","Tumkur","Bellary","Gulbarga","Shimoga","Davangere","Hassan","Udupi","Chitradurga","Kolar","Raichur","Bidar","Haveri","Karwar"],
      "Maharashtra":["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur","Thane","Kalyan","Kolhapur","Amravati","Akola","Jalgaon","Nanded","Latur","Chandrapur","Dhule","Pimpri-Chinchwad","Malegaon","Bhandara","Satara"],
      "Delhi":["New Delhi","North Delhi","South Delhi","Central Delhi","Dwarka","Rohini","Karol Bagh","Chandni Chowk","Saket","Lajpat Nagar"],
      "Uttar Pradesh":["Lucknow","Kanpur","Agra","Varanasi","Allahabad (Prayagraj)","Ghaziabad","Meerut","Aligarh","Bareilly","Noida","Gorakhpur","Mathura","Moradabad","Firozabad","Saharanpur","Jhansi","Azamgarh","Chandpur","Ballia","Basti"],
      "West Bengal":["Kolkata","Howrah","Siliguri","Durgapur","Asansol","Bardhaman","Hooghly","Kalyani","Kharagpur","Raniganj","Berhampore","Malda","Darjeeling","Tamluk","Alipurduar","Cooch Behar","TAMLUK","Bongaon","Balurghat","Bansberia"],
      "Gujarat":["Ahmedabad","Vadodara","Surat","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Anand","Nadiad","Mehsana","Vapi","Bhuj","Porbandar","Junagadh","Valsad","Navsari","Surendranagar","Gondal","Patan","Morbi"],
      "Rajasthan":["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer","Alwar","Bharatpur","Sikar","Sawai Madhopur","Tonk","Barmer","Pali","Churu","Dungarpur","Pratapgarh","Hanumangarh","Banswara","Rajsamand","Nagaur"],
      "Telangana":["Hyderabad","Warangal","Nizamabad","Khammam","Karimnagar","Mahbubnagar","Adilabad","Nalgonda","Ramagundam","Medak","Suryapet","Mancherial","Jayashankar Bhupalpally","Jagtial","Jangaon","Mahabubabad","Aswaraopet","Bhupalpally","Mulugu","Siddipet"]
    },

    "United States": {
      "California":["Los Angeles","San Diego","San Jose","San Francisco","Fresno","Sacramento","Long Beach","Oakland","Bakersfield","Anaheim","Santa Ana","Irvine","Riverside","Stockton","Chula Vista","Fremont","San Bernardino","Modesto","Oxnard","Fontana","Moreno Valley","Huntington Beach","Glendale","Santa Clarita","Aurora"],
      "Texas":["Houston","San Antonio","Dallas","Austin","Fort Worth","El Paso","Arlington","Corpus Christi","Plano","Laredo","Lubbock","Garland","Irving","Amarillo","Grand Prairie","Brownsville","Pasadena","McAllen","Mesquite","Killeen"],
      "Florida":["Jacksonville","Miami","Tampa","Orlando","St. Petersburg","Hialeah","Tallahassee","Port St. Lucie","Cape Coral","Fort Lauderdale","Pembroke Pines","Hollywood","Miramar","Gainesville","Coral Springs","Clearwater","West Palm Beach","Pompano Beach","Lakeland","Davie"],
      "New York":["New York","Buffalo","Rochester","Yonkers","Syracuse","Albany","New Rochelle","Mount Vernon","Schenectady","Utica","White Plains","Troy","Rome","Niagara Falls","Binghamton","Freeport","Jamestown","Olean","Ithaca","Cortland"],
      "Illinois":["Chicago","Aurora","Rockford","Joliet","Naperville","Springfield","Peoria","Elgin","Waukegan","Cicero","Champaign","Bloomington","Arlington Heights","Evanston","Decatur","Schaumburg","Bolingbrook","Palatine","Skokie","Orland Park"]
    },

    "Canada": {
      "Ontario":["Toronto","Ottawa","Mississauga","Brampton","Hamilton","London","Markham","Vaughan","Kitchener","Windsor","Oakville","Burlington","Greater Sudbury","Barrie","St. Catharines","Cambridge","Guelph","Whitby","Ajax","Milton"],
      "Quebec":["Montreal","Quebec City","Laval","Gatineau","Longueuil","Sherbrooke","Trois-Rivières","Saint-Jean-sur-Richelieu","Drummondville","Repentigny","Chicoutimi","Saint-Jérôme","Granby","Blainville","Salaberry-de-Valleyfield","Rimouski"],
      "British Columbia":["Vancouver","Victoria","Surrey","Burnaby","Richmond","Abbotsford","Coquitlam","Kelowna","Langley","Nanaimo","Kamloops","Chilliwack","Prince George","Maple Ridge","New Westminster","Courtenay"]
    },

    "Australia": {
      "New South Wales":["Sydney","Newcastle","Wollongong","Albury","Coffs Harbour","Tamworth","Wagga Wagga","Dubbo","Nowra","Port Macquarie","Bathurst","Orange","Lismore","Cessnock","Maitland","Goulburn","Queanbeyan"],
      "Victoria":["Melbourne","Geelong","Ballarat","Bendigo","Shepparton","Melton","Wodonga","Mildura","Traralgon","Warrnambool","Sunbury","Horsham","Swan Hill","Echuca"],
      "Queensland":["Brisbane","Gold Coast","Cairns","Townsville","Toowoomba","Mackay","Rockhampton","Bundaberg","Hervey Bay","Gladstone","Maryborough","Ipswich","Caboolture"]
    },

    "United Kingdom": {
      "England":["London","Manchester","Birmingham","Leeds","Liverpool","Sheffield","Bristol","Newcastle","Sunderland","Brighton","Southampton","Portsmouth","Plymouth","Nottingham","Leicester","Coventry","Bradford","Hull","Stoke-on-Trent","Wolverhampton"],
      "Scotland":["Edinburgh","Glasgow","Aberdeen","Dundee","Inverness","Perth","Stirling","Hamilton","Paisley"],
      "Wales":["Cardiff","Swansea","Newport","Wrexham","Barry","Bangor","Cwmbran"],
      "Northern Ireland":["Belfast","Lisburn","Newry","Armagh","Derry"]
    },

    "Germany": {
      "Bavaria":["Munich","Nuremberg","Augsburg","Regensburg","Ingolstadt","Würzburg","Fürth","Passau","Bayreuth","Kempten","Rosenheim","Landshut","Schweinfurt","Amberg","Coburg","Straubing"],
      "North Rhine-Westphalia":["Cologne","Düsseldorf","Dortmund","Essen","Bonn","Bielefeld","Münster","Krefeld","Aachen","Mönchengladbach","Gelsenkirchen","Mülheim an der Ruhr","Leverkusen"],
      "Baden-Württemberg":["Stuttgart","Karlsruhe","Mannheim","Freiburg","Heilbronn","Pforzheim","Ulm","Heidenheim"],
      "Hesse":["Frankfurt","Wiesbaden","Kassel","Darmstadt","Offenbach","Hanau"]
    },

    "France": {
      "Île-de-France":["Paris","Boulogne-Billancourt","Saint-Denis","Argenteuil","Versailles","Créteil","Nanterre","Courbevoie","Colombes","Aubervilliers","Levallois-Perret","Asnières-sur-Seine"],
      "Provence-Alpes-Côte d'Azur":["Marseille","Nice","Toulon","Aix-en-Provence","Avignon","Cannes","Hyères","Arles"],
      "Auvergne-Rhône-Alpes":["Lyon","Grenoble","Saint-Étienne","Clermont-Ferrand","Villeurbanne","Annecy","Valence"]
    },

    "China": {
      "Guangdong":["Guangzhou","Shenzhen","Dongguan","Foshan","Zhuhai","Huizhou","Shantou","Zhanjiang","Jiangmen","Zhaoqing","Maoming","Shaoguan"],
      "Beijing":["Beijing"],
      "Shanghai":["Shanghai"],
      "Sichuan":["Chengdu","Mianyang","Nanchong","Deyang","Meishan","Yibin","Zigong","Luzhou","Suining","Panzhihua"],
      "Zhejiang":["Hangzhou","Ningbo","Wenzhou","Jiaxing","Huzhou","Shaoxing","Jinhua","Taizhou","Lishui","Quzhou"]
    },

    "Japan": {
      "Tokyo":["Tokyo","Hachioji","Machida","Tachikawa","Kawaguchi","Saitama"], // Saitama included for region proximity
      "Osaka":["Osaka","Sakai","Higashiōsaka","Ikeda","Toyonaka","Takatsuki"],
      "Aichi":["Nagoya","Toyota","Okazaki","Ichinomiya","Toyohashi","Kasugai","Anjō"],
      "Hokkaido":["Sapporo","Asahikawa","Hakodate","Obihiro","Kushiro","Otaru","Rumoi"],
      "Fukuoka":["Fukuoka","Kitakyushu","Kurume","Oyama","Iizuka"]
    },

    "Brazil": {
      "São Paulo":["São Paulo","Campinas","Santo André","São Bernardo do Campo","Santos","Ribeirão Preto","São José dos Campos","Sorocaba","Bauru","Osasco","Piracicaba","Franca"],
      "Rio de Janeiro":["Rio de Janeiro","Niterói","Petrópolis","Nova Iguaçu","Duque de Caxias","Campos dos Goytacazes","Macaé","Volta Redonda"],
      "Minas Gerais":["Belo Horizonte","Uberlândia","Contagem","Juiz de Fora","Betim","Montes Claros","Ribeirão das Neves"]
    },

    "Mexico": {
      "Mexico City":["Mexico City","Coyoacán","Iztapalapa","Tlalpan","Azcapotzalco","Gustavo A. Madero"],
      "Jalisco":["Guadalajara","Zapopan","Tlaquepaque","Tonala","Puerto Vallarta","Tepatitlan"],
      "Nuevo León":["Monterrey","San Nicolás de los Garza","Guadalupe","Apodaca","Santa Catarina"]
    },

    "Spain": {
      "Madrid":["Madrid","Alcalá de Henares","Leganés","Getafe","Móstoles","Fuenlabrada","Parla","Torrejón de Ardoz"],
      "Catalonia":["Barcelona","Hospitalet de Llobregat","Badalona","Sabadell","Terrassa","Mataró","Reus","Manresa"],
      "Andalusia":["Seville","Málaga","Granada","Córdoba","Jerez de la Frontera","Almería","Huelva","Jaén"]
    },

    "Italy": {
      "Lombardy":["Milan","Bergamo","Brescia","Monza","Varese","Como","Pavia","Sondrio","Cremona","Lecco"],
      "Lazio":["Rome","Latina","Frosinone","Viterbo","Rieti"],
      "Campania":["Naples","Salerno","Caserta","Avellino","Benevento"]
    },

    "Netherlands": {
      "North Holland":["Amsterdam","Haarlem","Alkmaar","Zaandam","Hilversum","Hoorn"],
      "South Holland":["Rotterdam","The Hague","Delft","Leiden","Dordrecht","Zoetermeer"],
      "Utrecht":["Utrecht","Amersfoort","Veenendaal","Nieuwegein"]
    },

    "Russia": {
      "Moscow":["Moscow","Zelenograd","Tver","Khimki"],
      "Saint Petersburg":["Saint Petersburg","Petrodvorets","Pushkin","Pavlovsk"],
      "Krasnodar Krai":["Krasnodar","Sochi","Novorossiysk","Anapa","Gelendzhik"],
      "Novosibirsk Oblast":["Novosibirsk","Berdsk","Iskitim","Koltsovo"]
    },

    "South Africa": {
      "Gauteng":["Johannesburg","Pretoria (Tshwane)","Soweto","Sandton","Benoni","Boksburg"],
      "Western Cape":["Cape Town","Stellenbosch","Paarl","George","Worcester","Somerset West"],
      "KwaZulu-Natal":["Durban","Pietermaritzburg","Richards Bay","Newcastle","Umlazi"]
    },

    "UAE": {
      "Dubai":["Dubai","Deira","Jumeirah","Al Barsha","Dubai Marina","Business Bay"],
      "Abu Dhabi":["Abu Dhabi","Al Ain","Mussafah","Zayed City","Ruweisat"],
      "Sharjah":["Sharjah","Khor Fakkan","Kalba"]
    },

    "Saudi Arabia": {
      "Riyadh":["Riyadh","Al Khobar","Al Majma'ah","Dammam (region)","Hafr Al Batin"],
      "Makkah":["Jeddah","Mecca","Ta'if","Jeddah Corniche"]
    },

    "Indonesia": {
      "Jakarta":["Jakarta","Central Jakarta","West Jakarta","South Jakarta","North Jakarta","East Jakarta"],
      "West Java":["Bandung","Bekasi","Depok","Bogor","Sukabumi","Cirebon","Tasikmalaya","Garut"],
      "East Java":["Surabaya","Malang","Sidoarjo","Kediri","Madiun","Banyuwangi"]
    },

    "Turkey": {
      "Istanbul":["Istanbul","Kadıköy","Beşiktaş","Üsküdar","Beyoğlu","Fatih"],
      "Ankara":["Ankara","Çankaya","Keçiören","Altındağ"],
      "Izmir":["Izmir","Bornova","Karşıyaka","Buca","Kemeralti"]
    }
  } // end cities object
};

/* ======= DOM references ======= */
const countryEl = document.getElementById('country');
const stateEl   = document.getElementById('state');
const cityEl    = document.getElementById('city');

/* Utility helpers */
function clearSelect(sel, placeholder) {
  sel.innerHTML = '';
  const opt = document.createElement('option');
  opt.value = '';
  opt.textContent = placeholder || 'Select';
  sel.appendChild(opt);
  sel.disabled = true;
}

/* Populate countries from DATA */
function populateCountriesFromData() {
  if (!countryEl) return;
  clearSelect(countryEl, 'Select country');
  DATA.countries.sort().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    countryEl.appendChild(opt);
  });
  countryEl.disabled = false;
  // reset states/cities
  clearSelect(stateEl, 'Select state');
  clearSelect(cityEl, 'Select city');
}

/* When a country changes */
function onCountryChange() {
  if (!stateEl || !countryEl || !cityEl) return;
  const country = countryEl.value;
  clearSelect(stateEl, 'Loading states...');
  clearSelect(cityEl, 'Select state first');

  if (!country) {
    clearSelect(stateEl, 'Select country first');
    return;
  }

  const states = DATA.states[country] || [];
  if (!states.length) {
    clearSelect(stateEl, 'No states available');
    return;
  }

  clearSelect(stateEl, 'Select state');
  states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    stateEl.appendChild(opt);
  });
  stateEl.disabled = false;
}

/* When a state changes */
function onStateChange() {
  if (!stateEl || !countryEl || !cityEl) return;
  const country = countryEl.value;
  const state = stateEl.value;
  clearSelect(cityEl, 'Loading cities...');

  if (!country || !state) {
    clearSelect(cityEl, 'Select state first');
    return;
  }

  const cities = ((DATA.cities[country] || {})[state]) || [];
  if (!cities.length) {
    clearSelect(cityEl, 'No cities available');
    return;
  }

  clearSelect(cityEl, 'Select city');
  cities.forEach(ct => {
    const opt = document.createElement('option');
    opt.value = ct;
    opt.textContent = ct;
    cityEl.appendChild(opt);
  });
  cityEl.disabled = false;
}

/* Avatar preview (same as you had) */
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
if (avatarInput && avatarPreview) {
  avatarInput.addEventListener('change', function() {
    const f = avatarInput.files && avatarInput.files[0];
    if (!f) { avatarPreview.style.display = 'none'; return; }
    avatarPreview.src = URL.createObjectURL(f);
    avatarPreview.style.display = 'block';
  });
}

/* Init */
document.addEventListener('DOMContentLoaded', function() {
  populateCountriesFromData();
  if (countryEl) countryEl.addEventListener('change', onCountryChange);
  if (stateEl) stateEl.addEventListener('change', onStateChange);
});
