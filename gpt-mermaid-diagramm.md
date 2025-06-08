graph TD
  subgraph 🧠 Strategisches Zentrum
    Maerki[Märki GPT 🧭\nLeadership & Ethik-Coach]
    Fallback[Fallback GPT ⚠️\nFailsafe & Standardantwort]
  end

  subgraph 🚀 Funnel & Automation
    Kaija[KaiJa GPT 🎯\nFunnel + Content AI]
    Honey[Honey GPT 💰\nPricing & Monetarisierung]
    Baschti[Baschti GPT 🧲\nSales & LinkedIn]
  end

  subgraph 📚 Onboarding & CV
    Homie[Homie GPT 📦\nTeam, SOP, Trainings]
    KaiVio[KaiVio GPT 🧑‍💼\nCV, Karriere, ATS]
  end

  subgraph 🌿 Ethik, Frequenz & Coaching
    Gabriela[SoulGuide Gabriela GPT 🌱\nWerte & Ethik]
    SoulSync[SoulSync AI 🔮\nHuman Design & Alignment]
    Jasmin[DailyJasmin 🌸\nFrequenz & Tagesimpulse]
  end

  Maerki --> Kaija
  Maerki --> Honey
  Maerki --> Gabriela
  Gabriela --> SoulSync
  Gabriela --> Jasmin
  Honey --> Baschti
  Kaija --> Homie
  KaiVio --> Maerki
  Fallback --> AllGPTs

  classDef core fill:#e0f2fe,stroke:#0369a1,stroke-width:1px;
  class Maerki,Kaija,Honey,Homie,KaiVio,Baschti,Gabriela,SoulSync,Jasmin,Fallback core;

  click Maerki "https://www.kaija-marketing.pro/gpts-entdecken" "Märki GPT"
  click Kaija "https://www.kaija-marketing.pro/fuer-coaches" "KaiJa GPT"
  click Honey "https://gpt.kaija-marketing.pro/test" "Honey GPT"
