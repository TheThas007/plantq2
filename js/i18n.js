/* ============================================================
   PlantIQ — Internationalization (i18n) Module
   Supports: English (en), Tamil (ta), Sinhala (si)
   ============================================================ */

const PlantIQi18n = (() => {

  /* ---- Translation Dictionaries ---- */
  const translations = {

    // ==================== ENGLISH ====================
    en: {
      // Navbar
      "nav.home": "Home",
      "nav.features": "Features",
      "nav.scan": "Plant Scan",
      "nav.dashboard": "Dashboard",
      "nav.pricing": "Pricing",
      "nav.community": "Community",
      "nav.contact": "Contact",
      "nav.login": "Login",
      "nav.signup": "Sign Up",

      // Hero
      "hero.badge": "AI-Powered Intelligence",
      "hero.title.1": "AI-Powered",
      "hero.title.2": "Plant Health",
      "hero.title.3": "Intelligence",
      "hero.desc": "Scan, detect, monitor, and improve plant health instantly using intelligent AI diagnostics. Your smart companion for healthier, happier plants.",
      "hero.btn.scan": "🔬 Scan Plant",
      "hero.btn.learn": "Learn More →",
      "hero.stat.scanned": "Plants Scanned",
      "hero.stat.diseases": "Diseases Detected",
      "hero.stat.accuracy": "Accuracy Rate",

      // Features
      "features.label": "🚀 Features",
      "features.title": "Intelligent Plant Care, Reimagined",
      "features.subtitle": "Leverage the power of AI to understand, diagnose, and nurture your plants like never before.",
      "feature.1.title": "AI Disease Scanner",
      "feature.1.desc": "Upload a photo or scan in real-time. Our AI identifies diseases with 98% accuracy and provides instant treatment recommendations.",
      "feature.2.title": "Health Dashboard",
      "feature.2.desc": "Monitor all your plants in one beautiful dashboard. Track health scores, watering schedules, and growth progress over time.",
      "feature.3.title": "Smart Recommendations",
      "feature.3.desc": "Get personalized care advice based on your plant's species, environment, season, and current health condition.",
      "feature.4.title": "Plant Identification",
      "feature.4.desc": "Discover any plant species in seconds. Our database covers 10,000+ plants with detailed care guides and toxicity info.",
      "feature.5.title": "Market Prices",
      "feature.5.desc": "Stay updated with real-time vegetable and crop market prices from Sri Lankan markets. Perfect for farmers and traders.",
      "feature.6.title": "Expert Community",
      "feature.6.desc": "Connect with plant experts, join discussions, share knowledge, and get professional help for complex plant issues.",

      // Scanner
      "scanner.label": "🔬 AI Scanner",
      "scanner.title": "AI Plant Disease Scanner",
      "scanner.subtitle": "Upload or capture a plant photo. Our AI analyzes it in seconds, identifies diseases, and recommends treatments.",
      "scanner.upload.title": "Upload Plant Image",
      "scanner.upload.desc": "Drag & drop your plant photo here, or click to browse",
      "scanner.btn.browse": "📁 Browse Files",
      "scanner.btn.camera": "📷 Use Camera",
      "scanner.btn.analyze": "🔬 Analyze with AI",
      "scanner.btn.analyzing": "Analyzing with AI...",
      "scanner.btn.complete": "🔬 Scan Complete!",
      "scanner.btn.again": "🔬 Scan Again",
      "scanner.result.health": "Health Score",
      "scanner.result.confidence": "Confidence",
      "scanner.result.severity": "Severity",
      "scanner.result.overallHealth": "Overall Plant Health",
      "scanner.result.diagnosis": "🧠 AI Diagnosis",
      "scanner.result.treatment": "💊 Recommended Treatment",
      "scanner.result.prevention": "🛡️ Prevention Tips",

      // Camera Modal
      "camera.title": "📷 Plant Scanner",
      "camera.capture": "Capture",
      "camera.switch": "Switch Camera",
      "camera.close": "Close",
      "camera.permDenied": "Camera access required to scan plant disease",
      "camera.permDesc": "Please allow camera permission in your browser settings, or use the file upload option instead.",
      "camera.useUpload": "📁 Use File Upload Instead",
      "camera.scanning": "Scanning leaf...",
      "camera.notSupported": "Camera is not supported on this browser",

      // Dashboard
      "dash.label": "📊 Dashboard",
      "dash.title": "Plant Health Dashboard",
      "dash.subtitle": "Monitor and manage all your plant's vitals from a single, beautiful analytics dashboard.",
      "dash.health": "Overall Health Score",
      "dash.watering": "Next Watering",
      "dash.fertilizer": "Fertilizer Level",
      "dash.soil": "Soil Health",
      "dash.sunlight": "Sunlight Today",
      "dash.growth": "Growth This Month",
      "dash.chart.weekly": "📈 Weekly Health Trend",
      "dash.chart.activity": "🕐 Recent Activity",
      "dash.activity.1.title": "Watered — Monstera",
      "dash.activity.1.desc": "250ml, filtered water",
      "dash.activity.2.title": "Scan Complete — Tomato",
      "dash.activity.2.desc": "Leaf spot detected, treatment applied",
      "dash.activity.3.title": "Fertilized — Rose Bush",
      "dash.activity.3.desc": "NPK 10-10-10, quarter dose",
      "dash.activity.4.title": "Growth Photo — Snake Plant",
      "dash.activity.4.desc": "New leaf emerging, +2cm growth",

      // Smart Care
      "care.label": "💡 Smart Care",
      "care.title": "Personalized Care Recommendations",
      "care.subtitle": "AI-powered tips tailored to each plant's species, environment, and real-time health data.",
      "care.1.title": "Watering Guide",
      "care.1.desc": "Smart watering schedules based on soil moisture, humidity, season, and plant species requirements.",
      "care.2.title": "Fertilizer Plan",
      "care.2.desc": "Customized fertilization schedules with NPK ratio recommendations for optimal growth and flowering.",
      "care.3.title": "Soil Analysis",
      "care.3.desc": "pH level monitoring, nutrient content analysis, and soil amendment recommendations for healthy roots.",
      "care.4.title": "Weather-Based Care",
      "care.4.desc": "Adjust your care routine based on local weather forecasts, temperature, and humidity predictions.",
      "care.5.title": "Sunlight Optimization",
      "care.5.desc": "Track light exposure and get placement suggestions for optimal photosynthesis and growth.",
      "care.6.title": "Preventive Care",
      "care.6.desc": "Early warning alerts for potential pest infestations, diseases, and environmental stress factors.",

      // Plant Identification
      "plantid.label": "🌿 Plant ID",
      "plantid.title": "Plant Identification & Library",
      "plantid.subtitle": "Search and discover thousands of plant species with detailed care guides, toxicity info, and growing tips.",
      "plantid.search.placeholder": "Search plants by name, species, or family...",

      // Market
      "market.label": "📈 Farmer Mode",
      "market.title": "Sri Lanka Market Prices",
      "market.subtitle": "Real-time vegetable, fruit, crop, and seed prices from major Sri Lankan markets. Updated daily.",
      "market.search.placeholder": "🔍 Search crops...",
      "market.table.crop": "Crop",
      "market.table.change": "Change",

      // Community
      "community.label": "🤝 Community",
      "community.title": "Community & Expert Help",
      "community.subtitle": "Connect with fellow plant enthusiasts, ask experts, and explore our knowledge base.",
      "community.forum.title": "💬 Community Forum",
      "community.expert.title": "🧑‍🔬 Ask an Expert",
      "community.blog.1.tag": "Plant Care",
      "community.blog.1.title": "10 Common Mistakes Killing Your Houseplants",
      "community.blog.1.excerpt": "Learn about overwatering, poor drainage, and other mistakes that even experienced plant parents make.",
      "community.blog.2.tag": "AI Technology",
      "community.blog.2.title": "How AI is Revolutionizing Plant Disease Detection",
      "community.blog.2.excerpt": "Deep learning models can now identify plant diseases faster and more accurately than trained agronomists.",
      "community.blog.3.tag": "Agriculture",
      "community.blog.3.title": "Sri Lanka's Journey Towards Sustainable Farming",
      "community.blog.3.excerpt": "How local farmers are adopting smart technology and organic practices for a greener future.",

      // FAQ
      "faq.title": "Frequently Asked Questions",
      "faq.1.q": "How accurate is the AI plant disease scanner?",
      "faq.1.a": "Our AI model has been trained on over 500,000 plant images and achieves 98% accuracy across 200+ diseases. We continuously improve our models with new data from our growing community of users and botanical experts.",
      "faq.2.q": "Is PlantIQ free to use?",
      "faq.2.a": "Yes! PlantIQ offers a generous free tier with 10 scans per month, basic dashboard access, and community features. Our Pro and Enterprise plans offer unlimited scans, advanced analytics, API access, and priority expert support.",
      "faq.3.q": "Can I use PlantIQ for commercial farming?",
      "faq.3.a": "Absolutely! Our Farmer Mode is specifically designed for commercial agriculture. It includes market price tracking, bulk scanning, crop management tools, and integration with farm management systems. Many Sri Lankan farmers already rely on PlantIQ.",
      "faq.4.q": "What plant species does PlantIQ support?",
      "faq.4.a": "PlantIQ currently supports over 10,000 plant species including houseplants, vegetables, fruits, ornamentals, and tropical plants. We're constantly adding new species based on user requests and regional relevance.",
      "faq.5.q": "How are market prices updated?",
      "faq.5.a": "Market prices are updated daily at 6:00 AM Sri Lanka time. We source data from the Colombo, Dambulla, Pettah, and Nuwara Eliya wholesale markets. Historical price trend data is available for the past 12 months.",

      // Footer
      "footer.desc": "AI-powered plant health intelligence platform. Scan, diagnose, and care for your plants with precision and ease. Built with love for a greener world.",
      "footer.product": "Product",
      "footer.product.features": "Features",
      "footer.product.scanner": "Plant Scanner",
      "footer.product.dashboard": "Dashboard",
      "footer.product.market": "Market Prices",
      "footer.product.library": "Plant Library",
      "footer.company": "Company",
      "footer.company.about": "About Us",
      "footer.company.careers": "Careers",
      "footer.company.blog": "Blog",
      "footer.company.press": "Press Kit",
      "footer.company.partners": "Partners",
      "footer.newsletter.title": "Stay Updated",
      "footer.newsletter.desc": "Get weekly plant care tips and product updates.",
      "footer.newsletter.placeholder": "your@email.com",
      "footer.copyright": "© 2026 PlantIQ. All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.cookies": "Cookie Settings",

      // Buttons (generic)
      "btn.scanNow": "Scan Now",
      "btn.save": "Save",
      "btn.cancel": "Cancel",
      "btn.upload": "Upload",
      "btn.viewDetails": "View Details",
    },

    // ==================== TAMIL ====================
    ta: {
      // Navbar
      "nav.home": "முகப்பு",
      "nav.features": "அம்சங்கள்",
      "nav.scan": "செடியை ஸ்கேன் செய்",
      "nav.dashboard": "டாஷ்போர்டு",
      "nav.pricing": "விலை நிர்ணயம்",
      "nav.community": "சமூகம்",
      "nav.contact": "தொடர்பு",
      "nav.login": "உள்நுழை",
      "nav.signup": "பதிவு செய்",

      // Hero
      "hero.badge": "AI-இயங்கும் நுண்ணறிவு",
      "hero.title.1": "AI-இயங்கும்",
      "hero.title.2": "தாவர ஆரோக்கியம்",
      "hero.title.3": "நுண்ணறிவு",
      "hero.desc": "புத்திசாலி AI கண்டறிதலைப் பயன்படுத்தி தாவர ஆரோக்கியத்தை உடனடியாக ஸ்கேன் செய்யுங்கள், கண்டறியுங்கள், கண்காணிக்கவும், மேம்படுத்தவும். ஆரோக்கியமான தாவரங்களுக்கான உங்கள் திறமையான துணை.",
      "hero.btn.scan": "🔬 செடியை ஸ்கேன் செய்",
      "hero.btn.learn": "மேலும் அறிக →",
      "hero.stat.scanned": "ஸ்கேன் செய்யப்பட்ட தாவரங்கள்",
      "hero.stat.diseases": "கண்டறியப்பட்ட நோய்கள்",
      "hero.stat.accuracy": "துல்லிய விகிதம்",

      // Features
      "features.label": "🚀 அம்சங்கள்",
      "features.title": "புத்திசாலி தாவர பராமரிப்பு, மறுவடிவமைப்பு",
      "features.subtitle": "AI இன் சக்தியைப் பயன்படுத்தி உங்கள் தாவரங்களை புரிந்துகொள்ளுங்கள், கண்டறியுங்கள், வளர்க்கவும்.",
      "feature.1.title": "AI நோய் ஸ்கேனர்",
      "feature.1.desc": "புகைப்படத்தைப் பதிவேற்றவும் அல்லது நேரடியாக ஸ்கேன் செய்யவும். எங்கள் AI 98% துல்லியத்துடன் நோய்களை கண்டறிந்து உடனடி சிகிச்சை பரிந்துரைகளை வழங்குகிறது.",
      "feature.2.title": "ஆரோக்கிய டாஷ்போர்டு",
      "feature.2.desc": "உங்கள் அனைத்து தாவரங்களையும் ஒரு அழகான டாஷ்போர்டில் கண்காணிக்கவும். ஆரோக்கிய மதிப்பெண்கள், நீர்ப்பாசன அட்டவணைகள் மற்றும் வளர்ச்சி நிலையைக் கண்காணிக்கவும்.",
      "feature.3.title": "திறமையான பரிந்துரைகள்",
      "feature.3.desc": "உங்கள் தாவரத்தின் இனம், சூழல், பருவம் மற்றும் தற்போதைய ஆரோக்கிய நிலையின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பராமரிப்பு ஆலோசனைகளைப் பெறுங்கள்.",
      "feature.4.title": "தாவர அடையாளம்",
      "feature.4.desc": "எந்த தாவர இனத்தையும் நொடிகளில் கண்டறியுங்கள். எங்கள் தரவுத்தளம் 10,000+ தாவரங்களை விரிவான பராமரிப்பு வழிகாட்டிகளுடன் உள்ளடக்கியது.",
      "feature.5.title": "சந்தை விலைகள்",
      "feature.5.desc": "இலங்கை சந்தைகளில் இருந்து நிகழ்நேர காய்கறி மற்றும் பயிர் சந்தை விலைகளுடன் புதுப்பித்த நிலையில் இருங்கள்.",
      "feature.6.title": "நிபுணர் சமூகம்",
      "feature.6.desc": "தாவர நிபுணர்களுடன் இணையுங்கள், விவாதங்களில் பங்கேற்கவும், அறிவைப் பகிர்ந்துகொள்ளவும்.",

      // Scanner
      "scanner.label": "🔬 AI ஸ்கேனர்",
      "scanner.title": "AI தாவர நோய் ஸ்கேனர்",
      "scanner.subtitle": "தாவர புகைப்படத்தைப் பதிவேற்றவும் அல்லது எடுக்கவும். எங்கள் AI நொடிகளில் பகுப்பாய்வு செய்கிறது.",
      "scanner.upload.title": "தாவர படத்தைப் பதிவேற்றவும்",
      "scanner.upload.desc": "உங்கள் தாவர புகைப்படத்தை இங்கே இழுத்து விடுங்கள், அல்லது உலாவ கிளிக் செய்யுங்கள்",
      "scanner.btn.browse": "📁 கோப்புகளை உலாவு",
      "scanner.btn.camera": "📷 கேமரா பயன்படுத்து",
      "scanner.btn.analyze": "🔬 AI உடன் பகுப்பாய்வு",
      "scanner.btn.analyzing": "AI பகுப்பாய்வு செய்கிறது...",
      "scanner.btn.complete": "🔬 ஸ்கேன் முடிந்தது!",
      "scanner.btn.again": "🔬 மீண்டும் ஸ்கேன்",
      "scanner.result.health": "ஆரோக்கிய மதிப்பெண்",
      "scanner.result.confidence": "நம்பகத்தன்மை",
      "scanner.result.severity": "தீவிரம்",
      "scanner.result.overallHealth": "ஒட்டுமொத்த தாவர ஆரோக்கியம்",
      "scanner.result.diagnosis": "🧠 AI கண்டறிதல்",
      "scanner.result.treatment": "💊 பரிந்துரைக்கப்பட்ட சிகிச்சை",
      "scanner.result.prevention": "🛡️ தடுப்பு குறிப்புகள்",

      // Camera Modal
      "camera.title": "📷 தாவர ஸ்கேனர்",
      "camera.capture": "படம் எடு",
      "camera.switch": "கேமரா மாற்று",
      "camera.close": "மூடு",
      "camera.permDenied": "தாவர நோயை ஸ்கேன் செய்ய கேமரா அணுகல் தேவை",
      "camera.permDesc": "உங்கள் உலாவி அமைப்புகளில் கேமரா அனுமதியை அனுமதிக்கவும், அல்லது கோப்பு பதிவேற்ற விருப்பத்தைப் பயன்படுத்தவும்.",
      "camera.useUpload": "📁 கோப்பு பதிவேற்றத்தைப் பயன்படுத்து",
      "camera.scanning": "இலையை ஸ்கேன் செய்கிறது...",
      "camera.notSupported": "இந்த உலாவியில் கேமரா ஆதரிக்கப்படவில்லை",

      // Dashboard
      "dash.label": "📊 டாஷ்போர்டு",
      "dash.title": "தாவர ஆரோக்கிய டாஷ்போர்டு",
      "dash.subtitle": "உங்கள் தாவரத்தின் அனைத்து உயிர்நிலைகளையும் ஒரே அழகான பகுப்பாய்வு டாஷ்போர்டில் கண்காணிக்கவும்.",
      "dash.health": "ஒட்டுமொத்த ஆரோக்கிய மதிப்பெண்",
      "dash.watering": "அடுத்த நீர்ப்பாசனம்",
      "dash.fertilizer": "உர நிலை",
      "dash.soil": "மண் ஆரோக்கியம்",
      "dash.sunlight": "இன்றைய சூரிய ஒளி",
      "dash.growth": "இந்த மாத வளர்ச்சி",
      "dash.chart.weekly": "📈 வாராந்திர ஆரோக்கிய போக்கு",
      "dash.chart.activity": "🕐 சமீபத்திய செயல்பாடு",
      "dash.activity.1.title": "நீர் ஊற்றப்பட்டது — மான்ஸ்டெரா",
      "dash.activity.1.desc": "250ml, வடிகட்டிய தண்ணீர்",
      "dash.activity.2.title": "ஸ்கேன் முடிந்தது — தக்காளி",
      "dash.activity.2.desc": "இலை புள்ளி கண்டறியப்பட்டது, சிகிச்சை அளிக்கப்பட்டது",
      "dash.activity.3.title": "உரம் இடப்பட்டது — ரோஜா புதர்",
      "dash.activity.3.desc": "NPK 10-10-10, கால் அளவு",
      "dash.activity.4.title": "வளர்ச்சி புகைப்படம் — பாம்பு செடி",
      "dash.activity.4.desc": "புதிய இலை வெளிப்படுகிறது, +2cm வளர்ச்சி",

      // Smart Care
      "care.label": "💡 திறமையான பராமரிப்பு",
      "care.title": "தனிப்பயனாக்கப்பட்ட பராமரிப்பு பரிந்துரைகள்",
      "care.subtitle": "ஒவ்வொரு தாவரத்தின் இனம், சூழல் மற்றும் நிகழ்நேர ஆரோக்கிய தரவின் அடிப்படையில் AI-இயங்கும் குறிப்புகள்.",
      "care.1.title": "நீர்ப்பாசன வழிகாட்டி",
      "care.1.desc": "மண் ஈரப்பதம், ஈரப்பதம், பருவம் மற்றும் தாவர இன தேவைகளின் அடிப்படையில் திறமையான நீர்ப்பாசன அட்டவணைகள்.",
      "care.2.title": "உர திட்டம்",
      "care.2.desc": "உகந்த வளர்ச்சி மற்றும் பூக்களுக்கான NPK விகித பரிந்துரைகளுடன் தனிப்பயனாக்கப்பட்ட உர அட்டவணைகள்.",
      "care.3.title": "மண் பகுப்பாய்வு",
      "care.3.desc": "pH நிலை கண்காணிப்பு, ஊட்டச்சத்து உள்ளடக்க பகுப்பாய்வு மற்றும் ஆரோக்கியமான வேர்களுக்கான மண் திருத்த பரிந்துரைகள்.",
      "care.4.title": "வானிலை அடிப்படையிலான பராமரிப்பு",
      "care.4.desc": "உள்ளூர் வானிலை முன்னறிவிப்புகள், வெப்பநிலை மற்றும் ஈரப்பத கணிப்புகளின் அடிப்படையில் உங்கள் பராமரிப்பு நடைமுறையை சரிசெய்யுங்கள்.",
      "care.5.title": "சூரிய ஒளி உகந்ததாக்குதல்",
      "care.5.desc": "ஒளி வெளிப்பாட்டைக் கண்காணித்து, உகந்த ஒளிச்சேர்க்கை மற்றும் வளர்ச்சிக்கான இடம் பரிந்துரைகளைப் பெறுங்கள்.",
      "care.6.title": "தடுப்பு பராமரிப்பு",
      "care.6.desc": "சாத்தியமான பூச்சி தொற்றுகள், நோய்கள் மற்றும் சுற்றுச்சூழல் அழுத்த காரணிகளுக்கான முன் எச்சரிக்கை எச்சரிக்கைகள்.",

      // Plant Identification
      "plantid.label": "🌿 தாவர ID",
      "plantid.title": "தாவர அடையாளம் & நூலகம்",
      "plantid.subtitle": "விரிவான பராமரிப்பு வழிகாட்டிகள், நச்சுத்தன்மை தகவல் மற்றும் வளர்ப்பு குறிப்புகளுடன் ஆயிரக்கணக்கான தாவர இனங்களைத் தேடுங்கள்.",
      "plantid.search.placeholder": "பெயர், இனம் அல்லது குடும்பத்தால் தேடுங்கள்...",

      // Market
      "market.label": "📈 விவசாய பயன்முறை",
      "market.title": "இலங்கை சந்தை விலைகள்",
      "market.subtitle": "இலங்கையின் முக்கிய சந்தைகளில் இருந்து நிகழ்நேர காய்கறி, பழம், பயிர் மற்றும் விதை விலைகள். தினசரி புதுப்பிக்கப்படுகிறது.",
      "market.search.placeholder": "🔍 பயிர்களைத் தேடுங்கள்...",
      "market.table.crop": "பயிர்",
      "market.table.change": "மாற்றம்",

      // Community
      "community.label": "🤝 சமூகம்",
      "community.title": "சமூகம் & நிபுணர் உதவி",
      "community.subtitle": "தாவர ஆர்வலர்களுடன் இணையுங்கள், நிபுணர்களிடம் கேளுங்கள், எங்கள் அறிவுத் தளத்தை ஆராயுங்கள்.",
      "community.forum.title": "💬 சமூக மன்றம்",
      "community.expert.title": "🧑‍🔬 நிபுணரிடம் கேளுங்கள்",
      "community.blog.1.tag": "தாவர பராமரிப்பு",
      "community.blog.1.title": "உங்கள் வீட்டுச் செடிகளை அழிக்கும் 10 பொதுவான தவறுகள்",
      "community.blog.1.excerpt": "அதிக நீர்ப்பாசனம், மோசமான வடிகால் மற்றும் அனுபவமுள்ள தாவர பெற்றோரும் செய்யும் பிற தவறுகளைப் பற்றி அறிக.",
      "community.blog.2.tag": "AI தொழில்நுட்பம்",
      "community.blog.2.title": "AI எவ்வாறு தாவர நோய் கண்டறிதலை புரட்சி செய்கிறது",
      "community.blog.2.excerpt": "ஆழ்ந்த கற்றல் மாதிரிகள் இப்போது பயிற்சி பெற்ற விவசாய நிபுணர்களை விட வேகமாகவும் துல்லியமாகவும் தாவர நோய்களை கண்டறிய முடியும்.",
      "community.blog.3.tag": "விவசாயம்",
      "community.blog.3.title": "நிலையான விவசாயத்தை நோக்கி இலங்கையின் பயணம்",
      "community.blog.3.excerpt": "உள்ளூர் விவசாயிகள் பசுமையான எதிர்காலத்திற்காக திறமையான தொழில்நுட்பம் மற்றும் கரிம நடைமுறைகளை எவ்வாறு ஏற்றுக்கொள்கிறார்கள்.",

      // FAQ
      "faq.title": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      "faq.1.q": "AI தாவர நோய் ஸ்கேனர் எவ்வளவு துல்லியமானது?",
      "faq.1.a": "எங்கள் AI மாதிரி 500,000 க்கும் மேற்பட்ட தாவர படங்களில் பயிற்சி பெற்றுள்ளது மற்றும் 200+ நோய்களில் 98% துல்லியத்தை அடைகிறது.",
      "faq.2.q": "PlantIQ இலவசமா?",
      "faq.2.a": "ஆம்! PlantIQ மாதம் 10 ஸ்கேன்கள், அடிப்படை டாஷ்போர்டு அணுகல் மற்றும் சமூக அம்சங்களுடன் தாராளமான இலவச நிலையை வழங்குகிறது.",
      "faq.3.q": "வணிக விவசாயத்திற்கு PlantIQ ஐ பயன்படுத்த முடியுமா?",
      "faq.3.a": "நிச்சயமாக! எங்கள் விவசாய பயன்முறை வணிக விவசாயத்திற்காக சிறப்பாக வடிவமைக்கப்பட்டுள்ளது.",
      "faq.4.q": "PlantIQ எந்த தாவர இனங்களை ஆதரிக்கிறது?",
      "faq.4.a": "PlantIQ தற்போது 10,000 க்கும் மேற்பட்ட தாவர இனங்களை ஆதரிக்கிறது.",
      "faq.5.q": "சந்தை விலைகள் எவ்வாறு புதுப்பிக்கப்படுகின்றன?",
      "faq.5.a": "சந்தை விலைகள் தினசரி காலை 6:00 மணிக்கு இலங்கை நேரத்தில் புதுப்பிக்கப்படுகின்றன.",

      // Footer
      "footer.desc": "AI-இயங்கும் தாவர ஆரோக்கிய நுண்ணறிவு தளம். உங்கள் தாவரங்களை துல்லியமாகவும் எளிதாகவும் ஸ்கேன் செய்யுங்கள், கண்டறியுங்கள் மற்றும் பராமரிக்கவும்.",
      "footer.product": "தயாரிப்பு",
      "footer.product.features": "அம்சங்கள்",
      "footer.product.scanner": "தாவர ஸ்கேனர்",
      "footer.product.dashboard": "டாஷ்போர்டு",
      "footer.product.market": "சந்தை விலைகள்",
      "footer.product.library": "தாவர நூலகம்",
      "footer.company": "நிறுவனம்",
      "footer.company.about": "எங்களைப் பற்றி",
      "footer.company.careers": "வேலை வாய்ப்புகள்",
      "footer.company.blog": "வலைப்பதிவு",
      "footer.company.press": "செய்தி தொகுப்பு",
      "footer.company.partners": "பங்காளிகள்",
      "footer.newsletter.title": "புதுப்பித்த நிலையில் இருங்கள்",
      "footer.newsletter.desc": "வாராந்திர தாவர பராமரிப்பு குறிப்புகள் மற்றும் தயாரிப்பு புதுப்பிப்புகளைப் பெறுங்கள்.",
      "footer.newsletter.placeholder": "your@email.com",
      "footer.copyright": "© 2026 PlantIQ. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      "footer.privacy": "தனியுரிமைக் கொள்கை",
      "footer.terms": "சேவை விதிமுறைகள்",
      "footer.cookies": "குக்கீ அமைப்புகள்",

      // Buttons
      "btn.scanNow": "இப்போது ஸ்கேன் செய்",
      "btn.save": "சேமி",
      "btn.cancel": "ரத்து செய்",
      "btn.upload": "பதிவேற்றம்",
      "btn.viewDetails": "விவரங்களைக் காண்க",
    },

    // ==================== SINHALA ====================
    si: {
      // Navbar
      "nav.home": "මුල් පිටුව",
      "nav.features": "විශේෂාංග",
      "nav.scan": "පැළ ස්කෑන් කරන්න",
      "nav.dashboard": "උපකරණ පුවරුව",
      "nav.pricing": "මිල ගණන්",
      "nav.community": "ප්‍රජාව",
      "nav.contact": "සම්බන්ධ වන්න",
      "nav.login": "පිවිසෙන්න",
      "nav.signup": "ලියාපදිංචි වන්න",

      // Hero
      "hero.badge": "AI-බලගැන්වූ බුද්ධිය",
      "hero.title.1": "AI-බලගැන්වූ",
      "hero.title.2": "ශාක සෞඛ්‍ය",
      "hero.title.3": "බුද්ධිය",
      "hero.desc": "බුද්ධිමත් AI රෝග විනිශ්චය භාවිතයෙන් ශාක සෞඛ්‍යය ක්ෂණිකව ස්කෑන් කරන්න, හඳුනාගන්න, නිරීක්ෂණය කරන්න සහ වැඩිදියුණු කරන්න. සෞඛ්‍ය සම්පන්න ශාක සඳහා ඔබේ ස්මාර්ට් සහකරු.",
      "hero.btn.scan": "🔬 පැළ ස්කෑන් කරන්න",
      "hero.btn.learn": "තව දැනගන්න →",
      "hero.stat.scanned": "ස්කෑන් කළ ශාක",
      "hero.stat.diseases": "හඳුනාගත් රෝග",
      "hero.stat.accuracy": "නිරවද්‍යතා අනුපාතය",

      // Features
      "features.label": "🚀 විශේෂාංග",
      "features.title": "බුද්ධිමත් ශාක සත්කාරය, නැවත නිර්මාණය",
      "features.subtitle": "ඔබේ ශාක තේරුම් ගැනීමට, රෝග විනිශ්චය කිරීමට සහ පෝෂණය කිරීමට AI හි බලය ප්‍රයෝජනයට ගන්න.",
      "feature.1.title": "AI රෝග ස්කෑනරය",
      "feature.1.desc": "ඡායාරූපයක් උඩුගත කරන්න හෝ තත්‍ය කාලීනව ස්කෑන් කරන්න. අපගේ AI 98% නිරවද්‍යතාවයෙන් රෝග හඳුනාගෙන ක්ෂණික ප්‍රතිකාර නිර්දේශ ලබාදෙයි.",
      "feature.2.title": "සෞඛ්‍ය උපකරණ පුවරුව",
      "feature.2.desc": "ඔබේ සියලුම ශාක එක් සුන්දර උපකරණ පුවරුවකින් නිරීක්ෂණය කරන්න.",
      "feature.3.title": "ස්මාර්ට් නිර්දේශ",
      "feature.3.desc": "ඔබේ ශාකයේ විශේෂය, පරිසරය, සෘතුව සහ වර්තමාන සෞඛ්‍ය තත්ත්වය මත පදනම්ව පුද්ගලාරෝපිත සත්කාර උපදෙස් ලබාගන්න.",
      "feature.4.title": "ශාක හඳුනාගැනීම",
      "feature.4.desc": "තත්පර කිහිපයකින් ඕනෑම ශාක විශේෂයක් සොයාගන්න. අපගේ දත්ත සමුදාය 10,000+ ශාක ආවරණය කරයි.",
      "feature.5.title": "වෙළඳපොළ මිල",
      "feature.5.desc": "ශ්‍රී ලංකා වෙළඳපොළවල සිට තත්‍ය කාලීන එළවළු සහ බෝග වෙළඳපොළ මිල සමඟ යාවත්කාලීනව සිටින්න.",
      "feature.6.title": "විශේෂඥ ප්‍රජාව",
      "feature.6.desc": "ශාක විශේෂඥයින් සමඟ සම්බන්ධ වන්න, සාකච්ඡාවලට සම්බන්ධ වන්න, දැනුම බෙදාගන්න.",

      // Scanner
      "scanner.label": "🔬 AI ස්කෑනරය",
      "scanner.title": "AI ශාක රෝග ස්කෑනරය",
      "scanner.subtitle": "ශාක ඡායාරූපයක් උඩුගත කරන්න හෝ ගන්න. අපගේ AI තත්පර කිහිපයකින් විශ්ලේෂණය කරයි.",
      "scanner.upload.title": "ශාක රූපය උඩුගත කරන්න",
      "scanner.upload.desc": "ඔබේ ශාක ඡායාරූපය මෙහි ඇදගෙන එන්න, හෝ බ්‍රව්ස් කිරීමට ක්ලික් කරන්න",
      "scanner.btn.browse": "📁 ගොනු බ්‍රව්ස් කරන්න",
      "scanner.btn.camera": "📷 කැමරාව භාවිතා කරන්න",
      "scanner.btn.analyze": "🔬 AI සමඟ විශ්ලේෂණය",
      "scanner.btn.analyzing": "AI විශ්ලේෂණය කරමින්...",
      "scanner.btn.complete": "🔬 ස්කෑන් සම්පූර්ණයි!",
      "scanner.btn.again": "🔬 නැවත ස්කෑන්",
      "scanner.result.health": "සෞඛ්ය ලකුණු",
      "scanner.result.confidence": "විශ්වාසය",
      "scanner.result.severity": "බරපතලකම",
      "scanner.result.overallHealth": "සමස්ත ශාක සෞඛ්‍යය",
      "scanner.result.diagnosis": "🧠 AI රෝග විනිශ්චය",
      "scanner.result.treatment": "💊 නිර්දේශිත ප්‍රතිකාරය",
      "scanner.result.prevention": "🛡️ වැළැක්වීමේ ඉඟි",

      // Camera Modal
      "camera.title": "📷 ශාක ස්කෑනරය",
      "camera.capture": "ග්‍රහණය",
      "camera.switch": "කැමරාව මාරු කරන්න",
      "camera.close": "වසන්න",
      "camera.permDenied": "ශාක රෝග ස්කෑන් කිරීමට කැමරා ප්‍රවේශය අවශ්‍යයි",
      "camera.permDesc": "කරුණාකර ඔබේ බ්‍රව්සර සැකසීම් තුළ කැමරා අවසරය ලබාදෙන්න, නැතහොත් ගොනු උඩුගත කිරීමේ විකල්පය භාවිතා කරන්න.",
      "camera.useUpload": "📁 ගොනු උඩුගත කිරීම භාවිතා කරන්න",
      "camera.scanning": "කොළ ස්කෑන් කරමින්...",
      "camera.notSupported": "මෙම බ්‍රව්සරයේ කැමරාව සහාය නොදක්වයි",

      // Dashboard
      "dash.label": "📊 උපකරණ පුවරුව",
      "dash.title": "ශාක සෞඛ්‍ය උපකරණ පුවරුව",
      "dash.subtitle": "ඔබේ ශාකයේ සියලුම ජීවිතාන්ත කරුණු එකම සුන්දර විශ්ලේෂණ උපකරණ පුවරුවකින් නිරීක්ෂණය කරන්න.",
      "dash.health": "සමස්ත සෞඛ්‍ය ලකුණු",
      "dash.watering": "ඊළඟ ජලය දැමීම",
      "dash.fertilizer": "පොහොර මට්ටම",
      "dash.soil": "පස සෞඛ්‍යය",
      "dash.sunlight": "අද හිරු එළිය",
      "dash.growth": "මෙම මාසයේ වර්ධනය",
      "dash.chart.weekly": "📈 සතිපතා සෞඛ්‍ය ප්‍රවණතාව",
      "dash.chart.activity": "🕐 මෑත ක්‍රියාකාරකම්",
      "dash.activity.1.title": "ජලය දැමුවා — මොන්ස්ටෙරා",
      "dash.activity.1.desc": "250ml, පෙරන ලද ජලය",
      "dash.activity.2.title": "ස්කෑන් සම්පූර්ණයි — තක්කාලි",
      "dash.activity.2.desc": "පත්‍ර පුල්ලි හඳුනාගත්තා, ප්‍රතිකාරය යෙදුවා",
      "dash.activity.3.title": "පොහොර යෙදුවා — රෝස පඳුර",
      "dash.activity.3.desc": "NPK 10-10-10, කාල් මාත්‍රාව",
      "dash.activity.4.title": "වර්ධන ඡායාරූපය — සර්ප ශාකය",
      "dash.activity.4.desc": "නව කොළයක් මතුවෙමින්, +2cm වර්ධනය",

      // Smart Care
      "care.label": "💡 ස්මාර්ට් සත්කාරය",
      "care.title": "පුද්ගලාරෝපිත සත්කාර නිර්දේශ",
      "care.subtitle": "සෑම ශාකයකගේ විශේෂය, පරිසරය සහ තත්‍ය කාලීන සෞඛ්‍ය දත්ත මත පදනම් වූ AI-බලගැන්වූ ඉඟි.",
      "care.1.title": "ජල මාර්ගෝපදේශය",
      "care.1.desc": "පස ආර්ද්‍රතාව, ආර්ද්‍රතාව, සෘතුව සහ ශාක විශේෂ අවශ්‍යතා මත පදනම් වූ ස්මාර්ට් ජල කාලසටහන්.",
      "care.2.title": "පොහොර සැලැස්ම",
      "care.2.desc": "ප්‍රශස්ත වර්ධනය සහ මල් පිපීම සඳහා NPK අනුපාත නිර්දේශ සමඟ අභිරුචිකරණය කළ පොහොර කාලසටහන්.",
      "care.3.title": "පස විශ්ලේෂණය",
      "care.3.desc": "pH මට්ටම් නිරීක්ෂණය, පෝෂක අන්තර්ගත විශ්ලේෂණය සහ සෞඛ්‍ය සම්පන්න මුල් සඳහා පස සංශෝධන නිර්දේශ.",
      "care.4.title": "කාලගුණය මත පදනම් සත්කාරය",
      "care.4.desc": "ප්‍රාදේශීය කාලගුණ පුරෝකථන, උෂ්ණත්වය සහ ආර්ද්‍රතා අනාවැකි මත ඔබේ සත්කාර දිනචර්යාව සකස් කරන්න.",
      "care.5.title": "හිරු එළිය ප්‍රශස්තකරණය",
      "care.5.desc": "ආලෝක නිරාවරණය නිරීක්ෂණය කර ප්‍රශස්ත ප්‍රකාශ සංශ්ලේෂණය සහ වර්ධනය සඳහා ස්ථාන යෝජනා ලබාගන්න.",
      "care.6.title": "වැළැක්වීමේ සත්කාරය",
      "care.6.desc": "විභව පළිබෝධ ආක්‍රමණ, රෝග සහ පාරිසරික ආතතිය සඳහා කල්තියා අනතුරු ඇඟවීමේ සංඥා.",

      // Plant Identification
      "plantid.label": "🌿 ශාක ID",
      "plantid.title": "ශාක හඳුනාගැනීම සහ පුස්තකාලය",
      "plantid.subtitle": "සවිස්තරාත්මක සත්කාර මාර්ගෝපදේශ, විෂ තොරතුරු සහ වගා ඉඟි සමඟ දහස් ගණන් ශාක විශේෂ සොයන්න.",
      "plantid.search.placeholder": "නම, විශේෂය හෝ පවුලෙන් සොයන්න...",

      // Market
      "market.label": "📈 ගොවි ප්‍රකාරය",
      "market.title": "ශ්‍රී ලංකා වෙළඳපොළ මිල",
      "market.subtitle": "ශ්‍රී ලංකාවේ ප්‍රධාන වෙළඳපොළවල සිට තත්‍ය කාලීන එළවළු, පලතුරු, බෝග සහ බීජ මිල. දිනපතා යාවත්කාලීන වේ.",
      "market.search.placeholder": "🔍 බෝග සොයන්න...",
      "market.table.crop": "බෝගය",
      "market.table.change": "වෙනස",

      // Community
      "community.label": "🤝 ප්‍රජාව",
      "community.title": "ප්‍රජාව සහ විශේෂඥ උපකාරය",
      "community.subtitle": "සහෝදර ශාක ලෝලීන් සමඟ සම්බන්ධ වන්න, විශේෂඥයින්ගෙන් අසන්න, අපගේ දැනුම පදනම ගවේෂණය කරන්න.",
      "community.forum.title": "💬 ප්‍රජා සංසදය",
      "community.expert.title": "🧑‍🔬 විශේෂඥයෙකුගෙන් අසන්න",
      "community.blog.1.tag": "ශාක සත්කාරය",
      "community.blog.1.title": "ඔබේ ගෘහ ශාක මරන පොදු වැරදි 10",
      "community.blog.1.excerpt": "අධික ජලය දැමීම, දුර්වල ජලාපවහනය සහ අත්දැකීම් ඇති ශාක මාපියන් පවා කරන අනෙකුත් වැරදි ගැන ඉගෙන ගන්න.",
      "community.blog.2.tag": "AI තාක්ෂණය",
      "community.blog.2.title": "AI ශාක රෝග හඳුනාගැනීම විප්ලවීය කරන අන්දම",
      "community.blog.2.excerpt": "ගැඹුරු ඉගෙනුම් ආකෘති දැන් පුහුණු කෘෂි විශේෂඥයින්ට වඩා වේගයෙන් සහ නිවැරදිව ශාක රෝග හඳුනාගත හැකිය.",
      "community.blog.3.tag": "කෘෂිකර්මය",
      "community.blog.3.title": "තිරසාර ගොවිතැන කරා ශ්‍රී ලංකාවේ ගමන",
      "community.blog.3.excerpt": "දේශීය ගොවියන් පිරිසිදු අනාගතයක් සඳහා ස්මාර්ට් තාක්ෂණය සහ කාබනික ක්‍රම අනුගමනය කරන අන්දම.",

      // FAQ
      "faq.title": "නිතර අසන ප්‍රශ්න",
      "faq.1.q": "AI ශාක රෝග ස්කෑනරය කෙතරම් නිවැරදිද?",
      "faq.1.a": "අපගේ AI ආකෘතිය ශාක රූප 500,000 කට වඩා පුහුණු කර ඇති අතර 200+ රෝග හරහා 98% නිරවද්‍යතාවයක් ලබා ගනී.",
      "faq.2.q": "PlantIQ භාවිතයට නොමිලේද?",
      "faq.2.a": "ඔව්! PlantIQ මසකට ස්කෑන් 10ක්, මූලික උපකරණ පුවරු ප්‍රවේශය සහ ප්‍රජා විශේෂාංග සමඟ නොමිලේ ස්තරයක් ලබාදෙයි.",
      "faq.3.q": "වාණිජ ගොවිතැන සඳහා PlantIQ භාවිතා කළ හැකිද?",
      "faq.3.a": "නිසැකවම! අපගේ ගොවි ප්‍රකාරය වාණිජ කෘෂිකර්මය සඳහා විශේෂයෙන් නිර්මාණය කර ඇත.",
      "faq.4.q": "PlantIQ කුමන ශාක විශේෂ සඳහා සහය දක්වයිද?",
      "faq.4.a": "PlantIQ දැනට ශාක විශේෂ 10,000 කට වඩා සහාය දක්වයි.",
      "faq.5.q": "වෙළඳපොළ මිල යාවත්කාලීන වන්නේ කෙසේද?",
      "faq.5.a": "වෙළඳපොළ මිල දිනපතා ශ්‍රී ලංකා වේලාවෙන් පෙරවරු 6:00ට යාවත්කාලීන වේ.",

      // Footer
      "footer.desc": "AI-බලගැන්වූ ශාක සෞඛ්‍ය බුද්ධි වේදිකාව. ඔබේ ශාක නිරවද්‍යව සහ පහසුවෙන් ස්කෑන් කරන්න, රෝග විනිශ්චය කරන්න සහ රැකබලා ගන්න.",
      "footer.product": "නිෂ්පාදනය",
      "footer.product.features": "විශේෂාංග",
      "footer.product.scanner": "ශාක ස්කෑනරය",
      "footer.product.dashboard": "උපකරණ පුවරුව",
      "footer.product.market": "වෙළඳපොළ මිල",
      "footer.product.library": "ශාක පුස්තකාලය",
      "footer.company": "සමාගම",
      "footer.company.about": "අප ගැන",
      "footer.company.careers": "රැකියා",
      "footer.company.blog": "බ්ලොග්",
      "footer.company.press": "මාධ්‍ය කට්ටලය",
      "footer.company.partners": "හවුල්කරුවන්",
      "footer.newsletter.title": "යාවත්කාලීනව සිටින්න",
      "footer.newsletter.desc": "සතිපතා ශාක සත්කාර ඉඟි සහ නිෂ්පාදන යාවත්කාලීන ලබාගන්න.",
      "footer.newsletter.placeholder": "your@email.com",
      "footer.copyright": "© 2026 PlantIQ. සියලුම අයිතිවාසිකම් ආරක්ෂිතයි.",
      "footer.privacy": "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
      "footer.terms": "සේවා කොන්දේසි",
      "footer.cookies": "කුකී සැකසීම්",

      // Buttons
      "btn.scanNow": "දැන් ස්කෑන් කරන්න",
      "btn.save": "සුරකින්න",
      "btn.cancel": "අවලංගු කරන්න",
      "btn.upload": "උඩුගත කරන්න",
      "btn.viewDetails": "විස්තර බලන්න",
    }
  };

  /* ---- State ---- */
  let currentLang = 'en';

  /* ---- Core Functions ---- */

  function t(key) {
    const dict = translations[currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('plantiq-lang', lang);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated) {
        el.textContent = translated;
      }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated) {
        el.setAttribute('placeholder', translated);
      }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update language switcher active state
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
  }

  function getCurrentLang() {
    return currentLang;
  }

  function detectLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem('plantiq-lang');
    if (saved && translations[saved]) return saved;

    // Auto-detect from browser
    const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    if (translations[browserLang]) return browserLang;

    return 'en';
  }

  function init() {
    const lang = detectLanguage();
    setLanguage(lang);
  }

  /* ---- Public API ---- */
  return {
    t,
    setLanguage,
    getCurrentLang,
    detectLanguage,
    init,
    translations
  };

})();
