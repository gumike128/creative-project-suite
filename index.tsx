/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {GoogleGenAI} from '@google/genai';
import {useEffect, useState, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const MODULES = {
  PROJECT_MANAGEMENT: 'projectManagement',
  ASSET_GENERATION: 'assetGeneration',
  APP_CONCEPT_GENERATOR: 'appConceptGenerator',
  DEV_PROMPT_GENERATOR: 'devPromptGenerator', // Nový hlavný modul
  VIP_TOOLS: 'vipTools',
};

const PM_SUB_FUNCTIONS = {
  PLAN_OUTLINE: 'planOutline',
  RISK_ANALYSIS: 'riskAnalysis',
  STAKEHOLDER_EMAIL: 'stakeholderEmail',
  MEETING_MINUTES: 'meetingMinutes',
  TASK_DELEGATION: 'taskDelegation',
  SWOT_ANALYSIS: 'swotAnalysis',
  COMMUNICATION_PLAN: 'communicationPlan',
  PROJECT_READINESS_CHECKLIST: 'projectReadinessChecklist',
  POST_MORTEM_ANALYSIS: 'postMortemAnalysis',
  SMART_GOALS: 'smartGoals',
  MEETING_AGENDA: 'meetingAgenda',
  PRESENTATION_PREP: 'presentationPrep',
  PROJECT_ELEVATOR_PITCH: 'projectElevatorPitch',
  KICK_OFF_CHECKLIST: 'kickOffChecklist',
};

const VIP_SUB_FUNCTIONS = {
  DIRECT_DESIGN_ANALYSIS: 'directDesignAnalysis',
  APP_DEV_PROMPT_GENERATOR: 'appDevPromptGenerator', // Generuje koncept + prompt pre vývojára
  CRAFT_PROMPT_GENERATOR: 'craftPromptGenerator',
  CUSTOM_APP_DEV_PROMPT_GENERATOR: 'customAppDevPromptGenerator', // Nová VIP sub-funkcia
};

function App() {
  const [activeModule, setActiveModule] = useState(MODULES.PROJECT_MANAGEMENT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccessMessage, setCopySuccessMessage] = useState('');

  // Project Management State
  const [projectDescription, setProjectDescription] = useState('');
  const [projectManagementSubFunction, setProjectManagementSubFunction] = useState(PM_SUB_FUNCTIONS.PLAN_OUTLINE);
  const [stakeholderInfo, setStakeholderInfo] = useState('');
  const [meetingAttendees, setMeetingAttendees] = useState('');
  const [meetingDiscussionPoints, setMeetingDiscussionPoints] = useState('');
  const [teamMembersInput, setTeamMembersInput] = useState('');
  const [keyStakeholdersInput, setKeyStakeholdersInput] = useState('');
  const [projectPostMortemSummary, setProjectPostMortemSummary] = useState('');
  const [meetingDurationEstimate, setMeetingDurationEstimate] = useState('');
  const [presentationAudienceContext, setPresentationAudienceContext] = useState('');
  const [pmOutput, setPmOutput] = useState('');


  // Asset Generation State
  const [assetType, setAssetType] = useState('corporateIdentityConcept');
  const [brandDescription, setBrandDescription] = useState('');
  const [productKeyFeatures, setProductKeyFeatures] = useState('');
  const [faqKeyQuestions, setFaqKeyQuestions] = useState('');
  const [nameKeywordsStyle, setNameKeywordsStyle] = useState('');
  const [videoTargetAudience, setVideoTargetAudience] = useState('');
  const [newsletterKeyPointsCTA, setNewsletterKeyPointsCTA] = useState('');
  const [caseStudyResults, setCaseStudyResults] = useState('');
  const [linkedinAudienceMessage, setLinkedinAudienceMessage] = useState('');
  const [generatedAsset, setGeneratedAsset] = useState('');

  // App Concept Generator State
  const [appIdea, setAppIdea] = useState('');
  const [generatedAppConcept, setGeneratedAppConcept] = useState('');
  const [generateUserStories, setGenerateUserStories] = useState(false);
  const [generateElevatorPitch, setGenerateElevatorPitch] = useState(false);
  const [generateUIStructure, setGenerateUIStructure] = useState(false);
  const [generateProblemsSolutions, setGenerateProblemsSolutions] = useState(false);
  const [generateKPIs, setGenerateKPIs] = useState(false);
  const [generateLandingPageConcept, setGenerateLandingPageConcept] = useState(false);
  const [generateCompetitorAnalysis, setGenerateCompetitorAnalysis] = useState(false);
  const [generateMarketingChannels, setGenerateMarketingChannels] = useState(false);
  const [generateMVPFeatures, setGenerateMVPFeatures] = useState(false);
  const [generateUserPersona, setGenerateUserPersona] = useState(false);
  const [generateAboutAppText, setGenerateAboutAppText] = useState(false);
  const [generateOnboardingFlow, setGenerateOnboardingFlow] = useState(false);
  const [generateASOKeywords, setGenerateASOKeywords] = useState(false);

  // Developer Prompt Generator State (Nový hlavný modul)
  const [devPromptAppIdeaInput, setDevPromptAppIdeaInput] = useState('');
  const [devPromptOutput, setDevPromptOutput] = useState('');

  // VIP Tools State
  const [vipSubFunction, setVipSubFunction] = useState(VIP_SUB_FUNCTIONS.DIRECT_DESIGN_ANALYSIS);
  const [vipUrlInput, setVipUrlInput] = useState('');
  const [vipCraftTopicInput, setVipCraftTopicInput] = useState('');
  const [vipCustomAppIdeaInput, setVipCustomAppIdeaInput] = useState(''); // Nový stav pre VIP
  const [vipOutput, setVipOutput] = useState('');


  useEffect(() => {
    if (!process.env.API_KEY) {
        setError("Chýba API_KEY. Nastavte ho prosím v environmentálnych premenných vášho projektu.");
        console.error("Chýba API_KEY. Nastavte ho prosím v environmentálnych premenných vášho projektu.");
    }
  }, []);

  const handlePMSubFunctionChange = (newSubFunction) => {
    setProjectManagementSubFunction(newSubFunction);
    setStakeholderInfo('');
    setMeetingAttendees('');
    setMeetingDiscussionPoints('');
    setTeamMembersInput('');
    setKeyStakeholdersInput('');
    setProjectPostMortemSummary('');
    setMeetingDurationEstimate('');
    setPresentationAudienceContext('');
    setPmOutput('');
  };

  const handleAssetTypeChange = (newAssetType) => {
    setAssetType(newAssetType);
    setProductKeyFeatures('');
    setFaqKeyQuestions('');
    setNameKeywordsStyle('');
    setVideoTargetAudience('');
    setNewsletterKeyPointsCTA('');
    setCaseStudyResults('');
    setLinkedinAudienceMessage('');
    setGeneratedAsset('');
  };

  const handleVipSubFunctionChange = (newSubFunction) => {
    setVipSubFunction(newSubFunction);
    setVipUrlInput('');
    setVipCraftTopicInput('');
    setVipCustomAppIdeaInput(''); // Vyčistiť nový vstup
    setVipOutput('');
  };


  const handleCopyToClipboard = async (textToCopy, moduleKey) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccessMessage(`Výstup pre modul "${getModuleName(moduleKey)}" bol skopírovaný!`);
      setTimeout(() => setCopySuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Nepodarilo sa skopírovať text do schránky.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const getModuleName = (moduleKey) => {
    switch(moduleKey) {
      case MODULES.PROJECT_MANAGEMENT: return "Projektový Manažment";
      case MODULES.ASSET_GENERATION: return "Generovanie Aktív";
      case MODULES.APP_CONCEPT_GENERATOR: return "Koncepty Aplikácií";
      case MODULES.DEV_PROMPT_GENERATOR: return "Vývojárske Prompty"; // Názov pre nový modul
      case MODULES.VIP_TOOLS: return "VIP Nástroje";
      default: return "Creative Project Suite";
    }
  }


  const handlePMGenerate = async () => {
    if (!process.env.API_KEY) {
        setError("API Kľúč nie je nakonfigurovaný.");
        return;
    }
    
    let baseDescriptionLabel = "popis projektu";
    const subFunctionLabels = {
        [PM_SUB_FUNCTIONS.MEETING_MINUTES]: "tému/názov stretnutia",
        [PM_SUB_FUNCTIONS.TASK_DELEGATION]: "popis projektu (kontext pre delegovanie)",
        [PM_SUB_FUNCTIONS.SWOT_ANALYSIS]: "popis projektu/firmy pre SWOT analýzu",
        [PM_SUB_FUNCTIONS.COMMUNICATION_PLAN]: "popis projektu pre komunikačný plán",
        [PM_SUB_FUNCTIONS.PROJECT_READINESS_CHECKLIST]: "popis projektu pre checklist pripravenosti",
        [PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS]: "popis projektu pre post-mortem analýzu",
        [PM_SUB_FUNCTIONS.SMART_GOALS]: "všeobecný cieľ / popis projektu pre definíciu SMART cieľov",
        [PM_SUB_FUNCTIONS.MEETING_AGENDA]: "tému/cieľ stretnutia pre návrh agendy",
        [PM_SUB_FUNCTIONS.PRESENTATION_PREP]: "popis projektu pre prípravu prezentácie",
        [PM_SUB_FUNCTIONS.PROJECT_ELEVATOR_PITCH]: "popis projektu pre vytvorenie elevator pitchu",
        [PM_SUB_FUNCTIONS.KICK_OFF_CHECKLIST]: "popis projektu pre checklist úvodného stretnutia",
    };
    baseDescriptionLabel = subFunctionLabels[projectManagementSubFunction] || baseDescriptionLabel;
    
    if (!projectDescription.trim()) {
        setError(`Prosím, zadajte ${baseDescriptionLabel}.`);
        return;
    }
    // Specific validations
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.STAKEHOLDER_EMAIL && !stakeholderInfo.trim()) {
      setError('Prosím, zadajte informácie o stakeholderovi pre koncept emailu.'); return;
    }
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.MEETING_MINUTES && (!meetingAttendees.trim() || !meetingDiscussionPoints.trim())) {
        setError('Prosím, zadajte účastníkov a kľúčové body diskusie pre zápis zo stretnutia.'); return;
    }
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.MEETING_AGENDA && !meetingDurationEstimate.trim()) {
        setError('Prosím, zadajte odhadovanú dĺžku trvania stretnutia pre návrh agendy.'); return;
    }
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.TASK_DELEGATION && !teamMembersInput.trim()) {
        setError('Prosím, zadajte členov tímu pre návrh delegovania úloh.'); return;
    }
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS && !projectPostMortemSummary.trim()) {
        setError('Prosím, zadajte stručné zhrnutie priebehu projektu pre post-mortem analýzu.'); return;
    }
    if (projectManagementSubFunction === PM_SUB_FUNCTIONS.COMMUNICATION_PLAN && !keyStakeholdersInput.trim()) {
        // Warning instead of error, as it's optional
    }
     if (projectManagementSubFunction === PM_SUB_FUNCTIONS.PRESENTATION_PREP && !presentationAudienceContext.trim()) {
        // Optional
    }


    setIsLoading(true);
    setError(null);
    setPmOutput('');

    let promptContent = '';
    switch (projectManagementSubFunction) {
      case PM_SUB_FUNCTIONS.PLAN_OUTLINE:
        promptContent = `Vygeneruj stručnú osnovu projektového plánu pre nasledujúci projekt: "${projectDescription}". Zahrň 3-5 kľúčových fáz a pre každú fázu 2-3 hlavné úlohy alebo míľniky. Odpoveď formátuj prehľadne s odrážkami.`;
        break;
      case PM_SUB_FUNCTIONS.RISK_ANALYSIS:
        promptContent = `Pre projekt s popisom: "${projectDescription}", identifikuj 5-7 potenciálnych rizík. Pre každé riziko uveď krátky popis (1-2 vety) a možný dopad (nízky, stredný, vysoký). Formátuj ako zoznam.`;
        break;
      case PM_SUB_FUNCTIONS.STAKEHOLDER_EMAIL:
        promptContent = `Pre projekt s popisom: "${projectDescription}", napíš koncept emailu pre stakeholderov (${stakeholderInfo}) o aktuálnom stave projektu. Zahrň: 1. Krátky úvod a poďakovanie. 2. Kľúčové úspechy/pokrok od posledného reportu. 3. Aktuálne výzvy alebo prekážky. 4. Nasledujúce kroky a plán na najbližšie obdobie. 5. Výzva na spätnú väzbu alebo otázky. Tón by mal byť profesionálny a informatívny.`;
        break;
      case PM_SUB_FUNCTIONS.MEETING_MINUTES:
        promptContent = `Vygeneruj štruktúrovaný zápis zo stretnutia.
        Téma/Názov stretnutia: "${projectDescription}"
        Účastníci: ${meetingAttendees}
        Priebeh stretnutia (kľúčové body diskusie, prezentované informácie, prijaté rozhodnutia, pridelené úlohy):
        "${meetingDiscussionPoints}"

        Formát zápisu:
        1. **Dátum Stretnutia:** (uveď aktuálny dátum, alebo navrhni formát pre doplnenie)
        2. **Účastníci:** (zoznam účastníkov)
        3. **Téma Stretnutia:** ${projectDescription}
        4. **Hlavné Body Diskusie / Prezentované Informácie:** (sumarizuj na základe vstupu)
        5. **Prijaté Rozhodnutia / Závery:** (sumarizuj na základe vstupu)
        6. **Pridelené Úlohy:** (Ak sú vo vstupe, uveď ich vo formáte: Úloha - Zodpovedná osoba - Termín. Ak nie sú explicitne uvedené, navrhni 2-3 možné úlohy vyplývajúce z diskusie.)
        Zápis by mal byť profesionálny a prehľadný.`;
        break;
      case PM_SUB_FUNCTIONS.TASK_DELEGATION:
        promptContent = `Pre projekt s popisom: "${projectDescription}", a s nasledujúcimi členmi tímu (meno - rola/zručnosti):
        ${teamMembersInput}

        Navrhni rozdelenie 3-5 kľúčových úloh projektu medzi týchto členov tímu. Pre každú delegovanú úlohu uveď:
        - **Úloha:** (stručný popis úlohy)
        - **Delegované Komu:** (meno člena tímu)
        - **Odôvodnenie/Poznámka:** (prečo je daný člen vhodný, alebo čo by mal pri úlohe zvážiť - 1-2 vety)
        Formátuj výstup prehľadne, napríklad ako zoznam úloh.`;
        break;
      case PM_SUB_FUNCTIONS.SWOT_ANALYSIS:
        promptContent = `Vykonaj SWOT analýzu pre projekt/firmu s nasledujúcim popisom: "${projectDescription}". Pre každú časť (Silné stránky, Slabé stránky, Príležitosti, Hrozby) uveď 3-4 kľúčové body. Formátuj odpoveď prehľadne s jasnými nadpismi pre každú sekciu SWOT (napr. **Silné stránky:**).`;
        break;
      case PM_SUB_FUNCTIONS.COMMUNICATION_PLAN:
        promptContent = `Vygeneruj návrh základného komunikačného plánu pre projekt s popisom: "${projectDescription}".
        ${keyStakeholdersInput.trim() ? `Kľúčoví stakeholderi projektu sú:\n${keyStakeholdersInput}\n\n` : ''}
        Komunikačný plán by mal obsahovať nasledujúce časti:
        1.  **Kľúčové Správy:** (Aké sú hlavné informácie, ktoré potrebujeme komunikovať o projekte? 2-3 body)
        2.  **Cieľové Skupiny / Stakeholderi:** (Komu budeme tieto správy adresovať? Ak sú uvedení stakeholderi, použi ich, inak navrhni všeobecné typy.)
        3.  **Komunikačné Kanály:** (Aké kanály použijeme pre jednotlivé skupiny/správy? Napr. email, meetingy, reporty, intranet, sociálne siete projektu.)
        4.  **Frekvencia Komunikácie:** (Ako často budeme komunikovať s jednotlivými skupinami/cez jednotlivé kanály? Napr. týždenne, mesačne, pri dosiahnutí míľnika.)
        5.  **Zodpovednosť (návrh):** (Kto by mohol byť zodpovedný za jednotlivé komunikačné aktivity? Navrhni roly, napr. Projektový Manažér, Marketingový Tím.)
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
      case PM_SUB_FUNCTIONS.PROJECT_READINESS_CHECKLIST:
        promptContent = `Na základe projektu s popisom: "${projectDescription}", vygeneruj checklist (5-7 kľúčových otázok alebo kritérií) pre posúdenie pripravenosti projektu (tzv. Go/No-Go rozhodnutie pred ďalšou fázou alebo spustením). Otázky by mali pokrývať aspekty ako:
        *   Zdroje a Rozpočet (Sú dostatočné a zabezpečené?)
        *   Jasnosť Rozsahu a Cieľov (Sú ciele SMART? Je rozsah jasne definovaný a odsúhlasený?)
        *   Analýza Rizík (Boli identifikované hlavné riziká a existujú plány na ich zmiernenie?)
        *   Súhlas a Podpora Stakeholderov (Sú kľúčoví stakeholderi informovaní a podporujú projekt?)
        *   Pripravenosť Tímu (Má tím potrebné zručnosti, kapacity a nástroje?)
        *   Technická Pripravenosť (Ak relevantné, sú technické požiadavky splnené alebo riešiteľné?)
        Každá položka checklistu by mala byť formulovaná ako otázka vyžadujúca zhodnotenie alebo odpoveď áno/nie, prípadne s priestorom pre krátky komentár. Formátuj ako zoznam otázok.`;
        break;
      case PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS:
        promptContent = `Vygeneruj štruktúrovanú osnovu pre analýzu po ukončení projektu (post-mortem) na základe nasledujúcich informácií:
        Popis projektu: "${projectDescription}"
        Stručné zhrnutie priebehu projektu (úspechy, problémy, ponaučenia): "${projectPostMortemSummary}"

        Osnova by mala obsahovať nasledujúce sekcie:
        1.  **Zhrnutie Projektu:** (Stručné porovnanie pôvodných cieľov projektu s dosiahnutými výsledkami.)
        2.  **Čo Fungovalo Dobre?:** (Identifikuj 3-5 kľúčových úspechov, pozitívnych aspektov, silných stránok tímu alebo procesov, ktoré prispeli k dobrým výsledkom.)
        3.  **Čo Sa Mohlo Urobiť Lepšie?:** (Identifikuj 3-5 oblastí, kde sa vyskytli problémy, výzvy, prekážky alebo slabé stránky. Buď konkrétny.)
        4.  **Kľúčové Ponaučenia (Lessons Learned):** (Aké sú hlavné ponaučenia z tohto projektu? 2-4 body.)
        5.  **Návrhy na Zlepšenie pre Budúce Projekty:** (Navrhni 2-3 konkrétne akčné kroky alebo odporúčania, ktoré by sa mali implementovať v budúcich projektoch na základe tejto analýzy.)
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
      case PM_SUB_FUNCTIONS.SMART_GOALS:
        promptContent = `Pre projekt s všeobecným cieľom alebo popisom: "${projectDescription}", pomôž sformulovať 2-3 kľúčové ciele projektu podľa SMART kritérií. Pre každý SMART cieľ uveď:
        *   **Cieľ:** (Jasne formulovaný cieľ)
        *   **S (Špecifický):** (Vysvetlenie, prečo je cieľ špecifický)
        *   **M (Merateľný):** (Ako sa bude merať dosiahnutie cieľa?)
        *   **A (Dosiahnuteľný - Achievable):** (Je cieľ reálne dosiahnuteľný s dostupnými zdrojmi?)
        *   **R (Relevantný):** (Prečo je tento cieľ dôležitý pre celkový úspech projektu?)
        *   **T (Časovo ohraničený - Time-bound):** (Aký je časový rámec pre dosiahnutie tohto cieľa?)
        Formátuj výstup prehľadne, s jasným oddelením pre každý SMART cieľ a jeho komponenty.`;
        break;
      case PM_SUB_FUNCTIONS.MEETING_AGENDA:
        promptContent = `Vygeneruj návrh agendy pre stretnutie.
        Téma/Cieľ stretnutia: "${projectDescription}"
        Odhadovaná dĺžka trvania stretnutia: "${meetingDurationEstimate}"

        Agenda by mala obsahovať nasledujúce časti:
        1.  **Názov/Téma Stretnutia:** (zodpovedá vstupu)
        2.  **Cieľ Stretnutia:** (stručne odvodiť z témy, alebo explicitne uviesť ak je v popise)
        3.  **Dátum a Čas:** (navrhni formát pre doplnenie, napr. [Doplniť Dátum a Čas])
        4.  **Miesto/Platforma:** (navrhni formát, napr. [Miestnosť X / Online Link])
        5.  **Účastníci (voliteľné):** (navrhni formát, napr. [Pozvaní Účastníci])
        6.  **Predpokladaná Dĺžka:** ${meetingDurationEstimate}
        7.  **Body Programu (Agenda):** (Navrhni 3-5 kľúčových bodov programu. Pre každý bod uveď:
            *   Stručný názov bodu.
            *   Navrhovaný časový slot (napr. 10 min, 15 min - rozdeľ celkovú dĺžku stretnutia medzi body).
            *   Krátky popis cieľa alebo očakávaného výstupu daného bodu (1-2 vety).
            *   Kto je zodpovedný za bod (ak je možné odvodiť alebo ako návrh, napr. [Moderátor], [Meno Prezentujúceho]).
            Príklad bodu: "- Úvod a privítanie (5 min) - Stručné otvorenie stretnutia. [Moderátor]")
        8.  **Príprava na Stretnutie (voliteľné):** (Ak relevantné, navrhni 1-2 body, čo by si mali účastníci pripraviť alebo prečítať vopred.)
        9.  **Záver a Nasledujúce Kroky (posledný bod agendy):** (Zhrnutie, priestor pre otázky, dohodnutie ďalších krokov.)
        Formátuj agendu prehľadne a profesionálne.`;
        break;
      case PM_SUB_FUNCTIONS.PRESENTATION_PREP:
        promptContent = `Na základe projektu s popisom: "${projectDescription}"${presentationAudienceContext.trim() ? ` a s cieľovou skupinou/kontextom prezentácie: "${presentationAudienceContext}"` : ''}, vygeneruj osnovu pre prezentáciu projektu.
        Osnova by mala obsahovať nasledujúce sekcie s návrhom kľúčových bodov pre každú:
        1.  **Titulný Snímok:** (Návrh názvu prezentácie, meno prezentujúceho/tímu, dátum)
        2.  **Úvod:** (Krátky pútavý úvod - "hook", predstavenie témy a cieľa prezentácie, stručná agenda)
        3.  **Identifikovaný Problém / Príležitosť:** (Popis problému, ktorý projekt rieši, alebo príležitosti, ktorú využíva. Prečo je to dôležité?)
        4.  **Navrhované Riešenie / Prehľad Projektu:** (Ako projekt rieši daný problém alebo využíva príležitosť? Stručný popis hlavnej myšlienky projektu.)
        5.  **Kľúčové Funkcie / Míľniky / Aktivity:** (Aké sú najdôležitejšie časti projektu alebo jeho výstupy? 2-4 body.)
        6.  **Očakávané Prínosy / Dopad:** (Aké pozitívne výsledky alebo zmeny projekt prinesie? Pre koho?)
        7.  **Súčasný Stav / Dotazované Pokroky (ak relevantné):** (Kde sa projekt aktuálne nachádza?)
        8.  **Výzva na Akciu / Nasledujúce Kroky:** (Čo očakávate od publika? Aké sú ďalšie kroky v projekte?)
        9.  **Záver a Priestor pre Otázky (Q&A):** (Krátke zhrnutie a otvorenie diskusie.)
        Pre každú sekciu navrhni 2-3 kľúčové hovorené body alebo typy vizuálov (napr. graf, obrázok, demo), ktoré by mohli byť použité.
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
      case PM_SUB_FUNCTIONS.PROJECT_ELEVATOR_PITCH:
        promptContent = `Pre projekt s popisom: "${projectDescription}", vygeneruj krátky, pútavý a presvedčivý "elevator pitch". Pitch by mal byť dlhý približne 30-60 sekúnd (textovo to zodpovedá asi 75-150 slovám). Zameraj sa na:
        1.  **Problém/Potreba:** Stručné pomenovanie problému, ktorý projekt rieši, alebo potreby, ktorú napĺňa.
        2.  **Riešenie:** Jasné predstavenie projektu ako riešenia.
        3.  **Unikátna Hodnota/Prínosy:** Čím je projekt výnimočný? Aké sú jeho kľúčové prínosy pre cieľovú skupinu? (2-3 hlavné body)
        4.  **Výzva na Akciu (voliteľné, ak sa hodí):** Čo by mal poslucháč urobiť alebo si zapamätať?
        Tón by mal byť energický a zrozumiteľný. Formátuj ako jeden súvislý odsek alebo 2-3 krátke odseky.`;
        break;
      case PM_SUB_FUNCTIONS.KICK_OFF_CHECKLIST:
        promptContent = `Pre projekt s popisom: "${projectDescription}", vygeneruj checklist (zoznam kľúčových bodov a aktivít) pre efektívne úvodné stretnutie projektu (kick-off meeting). Checklist by mal pomôcť zabezpečiť, že všetky dôležité aspekty sú pokryté. Zahrň nasledujúce oblasti:
        1.  **Predstavenie a Zosúladenie Tímu:**
            *   Predstavenie členov tímu a ich rolí v projekte.
            *   Očakávania od členov tímu.
        2.  **Ciele a Rozsah Projektu:**
            *   Jasné definovanie a zosúladenie cieľov projektu (SMART ciele, ak je možné).
            *   Diskusia a potvrdenie rozsahu projektu (čo je a čo nie je súčasťou).
            *   Definícia úspechu projektu (kľúčové metriky).
        3.  **Kľúčové Míľniky a Časový Rámec:**
            *   Prehľad hlavných fáz a míľnikov projektu.
            *   Diskusia o predbežnom časovom harmonograme.
        4.  **Komunikačný Plán a Nástroje:**
            *   Ako bude prebiehať komunikácia v tíme a so stakeholdermi? (Frekvencia, kanály)
            *   Aké nástroje pre projektový manažment a kolaboráciu sa budú používať?
        5.  **Riziká a Výzvy (predbežná diskusia):**
            *   Identifikácia potenciálnych počiatočných rizík.
        6.  **Úlohy a Zodpovednosti (počiatočné):**
            *   Pridelenie prvých úloh a zodpovedností.
        7.  **Nasledujúce Kroky a Otázky:**
            *   Zhrnutie dohodnutých nasledujúcich krokov.
            *   Priestor pre otázky a odpovede.
        Formátuj výstup ako prehľadný checklist s odrážkami alebo číslovanými bodmi.`;
        break;
      default:
        setError('Neznáma pod-funkcia projektového manažmentu.');
        setIsLoading(false);
        return;
    }

    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: promptContent,
      });
      setPmOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať výstup pre projektový manažment. Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleGenerateAsset = async () => {
    if (!process.env.API_KEY) {
        setError("API Kľúč nie je nakonfigurovaný.");
        return;
    }
    
    let baseAssetDescriptionLabel = "popis značky/produktu/projektu/webstránky";
    const assetLabels = {
        'metaDescriptions': "popis obsahu pre generovanie meta popisov",
        'blogPostOutline': "tému alebo kľúčové slová pre blog post",
        'nameSuggestions': "popis produktu/firmy/projektu pre návrhy názvov",
        'shortVideoScript': "popis produktu/služby pre scenár videa",
        'tweetXPost': "tému / kľúčovú myšlienku pre Tweet / X príspevok",
        'newsletter': "hlavnú tému newslettera alebo popis cieľovej skupiny/firmy",
        'caseStudyOutline': "popis úspešného projektu / produktu pre prípadovú štúdiu",
        'pressReleaseOutline': "kľúčové informácie o novinke/udalosti pre tlačovú správu",
        'linkedinArticleOutline': "tému článku pre LinkedIn",
    };
    baseAssetDescriptionLabel = assetLabels[assetType] || baseAssetDescriptionLabel;

    if (!brandDescription.trim()) {
      setError(`Prosím, zadajte ${baseAssetDescriptionLabel}.`);
      return;
    }
    // Specific validations
    if (assetType === 'productDescription' && !productKeyFeatures.trim()) {
      // It's optional, so maybe a soft warning or proceed
    }
    if (assetType === 'faqSection' && !faqKeyQuestions.trim()) {
       // Optional
    }
    if (assetType === 'nameSuggestions' && !nameKeywordsStyle.trim()) {
        // Optional
    }
    if (assetType === 'shortVideoScript' && !videoTargetAudience.trim()) {
        // Optional
    }
    if (assetType === 'newsletter' && !newsletterKeyPointsCTA.trim()) {
        // Optional
    }
    if (assetType === 'caseStudyOutline' && !caseStudyResults.trim()) {
        // Optional
    }
     if (assetType === 'linkedinArticleOutline' && !linkedinAudienceMessage.trim()) {
        // Optional
    }


    setIsLoading(true);
    setError(null);
    setGeneratedAsset('');

    let promptContent = '';
    switch (assetType) {
      case 'corporateIdentityConcept': // Should be before specific ones to set correct labels
        promptContent = `Pre značku/firmu s popisom: "${brandDescription}", vygeneruj základný koncept firemnej identity. Zahrň nasledujúce body:
        1. **Návrhy Názvu Značky (ak relevantné alebo nie je explicitne uvedený v popise):** 3-5 návrhov. Ak je názov jasný, tento bod preskoč.
        2. **Základné Hodnoty Značky:** 3-5 kľúčových hodnôt, ktoré značka reprezentuje.
        3. **Cieľová Skupina (stručne):** Popis ideálneho zákazníka v 1-3 vetách.
        4. **Tón Komunikácie:** (napr. priateľský a prístupný, profesionálny a dôveryhodný, hravý a energický, sofistikovaný a luxusný, odborný a informatívny).
        5. **Farebná Paleta (konceptuálne):** Popíš atmosféru farieb (napr. teplé a energické farby; chladné a profesionálne; prírodné a zemité) a navrhni 2-3 kľúčové farby s krátkym vysvetlením ich významu alebo asociácie pre značku.
        6. **Typografia (konceptuálne):** Popíš charakter písma, ktorý by sa hodil k značke (napr. moderné bezpätkové písmo pre čistý vzhľad; elegantné pätkové písmo pre tradíciu; dynamické skriptové písmo pre kreativitu).
        7. **Návrh Loga (textový popis):** 2-3 nápady na symboliku alebo vizuálny štýl loga (bez generovania obrázku, len slovný popis konceptu).
        Formátuj odpoveď prehľadne s nadpismi pre každú sekciu.`;
        break;
      case 'logoConcept':
        promptContent = `Navrhni 3 textové koncepty pre logo pre značku/produkt s nasledujúcim popisom: "${brandDescription}". Pre každý koncept popíš vizuálne prvky, farebnosť a celkový dojem v 2-3 vetách.`;
        break;
      case 'slogan':
        promptContent = `Vytvor 5 chytľavých sloganov (každý maximálne 10 slov) pre značku/produkt s nasledujúcim popisom: "${brandDescription}".`;
        break;
      case 'websiteHeadline':
        promptContent = `Napíš 3 silné a pútavé nadpisy pre domovskú stránku webu pre značku/produkt s nasledujúcim popisom: "${brandDescription}". Každý nadpis by mal byť stručný a výstižný.`;
        break;
      case 'businessCard':
        promptContent = `Vygeneruj textový obsah pre vizitku pre osobu/firmu s nasledujúcim popisom: "${brandDescription}". Zahrň návrhy pre: Meno a Titul (ak relevantné), Názov Spoločnosti, Telefón, Email, Webstránka (ak existuje), a voliteľne krátky slogan alebo tagline (max 5 slov). Formátuj prehľadne.`;
        break;
      case 'emailSignature':
        promptContent = `Navrhni textový obsah pre profesionálny emailový podpis pre osobu, ktorej popis/firma je: "${brandDescription}". Zahrň: Meno, Pozícia/Titul, Názov Spoločnosti, Telefón (voliteľne), Email, Webstránka. Voliteľne pridaj odkaz na LinkedIn profil alebo iný relevantný sociálny profil.`;
        break;
      case 'socialMediaPost':
        promptContent = `Vytvor 2 krátke a pútavé príspevky pre sociálne médiá (napr. jeden pre Twitter/X a jeden pre LinkedIn/Facebook) na propagáciu produktu/služby/značky s popisom: "${brandDescription}". Zahrň 2-3 relevantné hashtagy pre každý príspevok. Jasne označ, pre ktorú platformu je každý príspevok určený.`;
        break;
      case 'productDescription':
        promptContent = `Vygeneruj pútavý popis produktu pre e-shop na základe nasledujúcich informácií:
        Základný popis produktu/značky: "${brandDescription}"
        ${productKeyFeatures.trim() ? `Kľúčové vlastnosti produktu (jedna na riadok):\n${productKeyFeatures}` : ''}

        Štruktúra popisu by mala byť nasledovná:
        1. **Pútavý Nadpis/Názov Produktu:** (Výrazný a lákavý)
        2. **Úvodný Odsek:** (Krátke predstavenie produktu a jeho hlavnej výhody - 2-3 vety)
        3. **Kľúčové Vlastnosti/Výhody:** (3-5 bodov vo forme odrážok, každá vlastnosť vysvetlená jednou vetou)
        4. **Záverečná Výzva na Akciu (CTA):** (Povzbudenie k nákupu alebo ďalšej akcii - 1-2 vety)
        Formátuj odpoveď prehľadne s nadpismi pre každú sekciu alebo jasným oddelením.`;
        break;
      case 'faqSection':
        promptContent = `Vygeneruj FAQ sekciu pre web na základe nasledujúceho popisu produktu/služby/firmy: "${brandDescription}".
        ${faqKeyQuestions.trim() ? `Používateľom zadané kľúčové otázky (ak sú, vytvor k nim odpovede; ak nie sú relevantné alebo ich je málo, doplň vlastné):\n${faqKeyQuestions}` : 'Používateľ nezadal konkrétne otázky, vygeneruj 3-5 relevantných otázok a odpovedí.'}

        Štruktúra pre každú FAQ položku:
        **Q: [Otázka]**
        A: [Krátka a výstižná odpoveď]

        Celkovo vygeneruj 3-5 otázok a odpovedí. Otázky by mali byť také, ktoré by si zákazníci alebo používatelia mohli bežne klásť. Odpovede by mali byť informatívne a priamočiare.`;
        break;
      case 'websiteStructure':
        promptContent = `Pre značku/firmu/projekt s popisom: "${brandDescription}", navrhni textovú štruktúru pre základnú informačnú webstránku. Zameraj sa na nasledujúce:
        1.  **Hlavné Sekcie Navigácie:** (Navrhni 4-6 kľúčových položiek pre hlavné menu, napr. Domov, O nás, Služby/Produkty, Cenník, Blog/Novinky, Kontakt).
        2.  **Obsah pre Hlavné Sekcie:** Pre každú navrhnutú hlavnú sekciu (okrem "Domov", ktorú môžeš poňať všeobecnejšie) navrhni 2-4 kľúčové podsekcie, témy alebo typy obsahu, ktoré by sa tam mali nachádzať.
            Napríklad pre sekciu "O nás":
            *   História firmy
            *   Náš tím
            *   Misia a vízia
            *   Referencie/Partneri
        Formátuj výstup prehľadne, s jasným oddelením hlavných sekcií a ich podsekcií.`;
        break;
      case 'metaDescriptions':
        promptContent = `Pre webovú stránku/obsah s popisom: "${brandDescription}", vygeneruj 3 optimalizované meta popisy pre SEO. Každý meta popis by mal byť lákavý, obsahovať relevantné kľúčové slová (ak je možné odvodiť z popisu) a nepresiahnuť 155-160 znakov. Označ každý návrh číslom. Príklad formátu:
        1. Meta popis 1...
        2. Meta popis 2...
        3. Meta popis 3...`;
        break;
      case 'blogPostOutline':
        promptContent = `Vygeneruj štruktúrovanú osnovu pre blogový príspevok na tému: "${brandDescription}". Osnova by mala obsahovať:
        1.  **Návrh Nadpisu Blogu:** (Chytľavý a relevantný k téme)
        2.  **Krátky Úvod:** (1-2 vety, ktoré vtiahnu čitateľa a načrtnú tému)
        3.  **Hlavné Sekcie/Nadpisy (3-5):**
            *   Pre každú hlavnú sekciu uveď 2-3 kľúčové podbody alebo myšlienky, ktoré by sa mali v danej sekcii rozobrať.
        4.  **Záver:** (Krátke zhrnutie a prípadná výzva na akciu, napr. komentár, zdieľanie, otázka pre čitateľov)
        Formátuj výstup prehľadne, s jasným oddelením jednotlivých častí osnovy.`;
        break;
      case 'nameSuggestions':
        promptContent = `Pre produkt/firmu/projekt s nasledujúcim popisom: "${brandDescription}"${nameKeywordsStyle.trim() ? ` a s týmito kľúčovými slovami/požadovaným štýlom: "${nameKeywordsStyle}"` : ''}, vygeneruj 5-7 originálnych návrhov názvov. 
        Pre každý návrh uveď veľmi stručnú (1 veta) myšlienku alebo pocit, ktorý by mal názov evokovať. Ak je to vhodné, skús navrhnúť názvy z rôznych kategórií (napr. popisné, abstraktné, evokatívne, moderné, tradičné).
        Formátuj výstup prehľadne, napríklad ako zoznam názvov s ich krátkym popisom.`;
        break;
      case 'shortVideoScript':
        promptContent = `Vygeneruj návrh scenára pre krátke reklamné video (cca 30-60 sekúnd) pre produkt/službu s popisom: "${brandDescription}".
        ${videoTargetAudience.trim() ? `Cieľová skupina pre video je: "${videoTargetAudience}".\n` : ''}
        Scenár by mal obsahovať:
        1.  **Názov/Téma Videa:** (Krátky a výstižný)
        2.  **Cieľ Videa:** (Čo má video dosiahnuť? Napr. Zvýšenie povedomia o značke, Predstavenie novej funkcie, Generovanie dopytu, Podpora predaja.)
        3.  **Kľúčová Správa:** (Hlavná myšlienka, ktorú si má divák odniesť - 1 veta.)
        4.  **Stručný Popis Scén (3-5 scén):**
            *   **Scéna 1:** (Čo vidíme? Aká je atmosféra? Kľúčové vizuálne prvky.)
            *   **Scéna 2:** (Ako sa scéna mení alebo pokračuje?)
            *   ...
        5.  **Návrh Textu pre Voice-over / Hlavné Dialógy:** (Text, ktorý bude sprevádzať video alebo kľúčové repliky.)
        6.  **Hudba/Zvukové Efekty (návrh):** (Aký typ hudby alebo zvukov by podporil atmosféru?)
        7.  **Výzva na Akciu (Call-to-Action) na Konci Videa:** (Čo má divák urobiť po zhliadnutí? Napr. Navštívte náš web, Stiahnite si aplikáciu, Kontaktujte nás.)
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
      case 'tweetXPost':
        promptContent = `Vygeneruj 3 varianty krátkeho a pútavého príspevku pre platformu X (predtým Twitter) na tému alebo kľúčovú myšlienku: "${brandDescription}".
        Každý variant by mal:
        *   Byť stručný (ideálne do 280 znakov, ale zameraj sa na obsah, nie presný počet znakov).
        *   Obsahovať 2-4 relevantné hashtagy.
        *   Byť formulovaný tak, aby podporil interakciu (napr. otázka, zaujímavý fakt, výzva na názor).
        *   Ponúknuť mierne odlišný tón alebo uhol pohľadu.
        Označ každý variant číslom (1., 2., 3.).`;
        break;
      case 'newsletter':
        promptContent = `Vygeneruj návrh pre newsletter na základe nasledujúcich informácií:
        Hlavná téma newslettera / Popis cieľovej skupiny alebo firmy: "${brandDescription}"
        ${newsletterKeyPointsCTA.trim() ? `Kľúčové body na pokrytie / CTA pre newsletter (nepovinné):\n${newsletterKeyPointsCTA}` : ''}

        Návrh by mal obsahovať:
        1.  **Návrhy Predmetu Emailu (2-3 varianty):** (Krátke, pútavé a vystihujúce obsah newslettera)
        2.  **Úvodník (1-2 odseky):** (Pútavý úvod, ktorý osloví čitateľa a predstaví hlavnú tému alebo hodnotu newslettera)
        3.  **Kľúčové Témy / Sekcie Newslettera (2-3):** (Pre každú tému/sekciu navrhni stručný nadpis a 2-3 vety popisujúce jej obsah. Ak používateľ zadal kľúčové body, zakomponuj ich.)
        4.  **Návrh Výzvy na Akciu (Call-to-Action - CTA):** (Čo by mal čitateľ urobiť po prečítaní? Napr. Prečítať si viac na blogu, Navštíviť web, Zaregistrovať sa na udalosť. Ak používateľ zadal CTA, použi ho.)
        5.  **Záver (voliteľné):** (Krátke poďakovanie alebo odkaz na ďalšie vydanie.)
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
      case 'caseStudyOutline':
        promptContent = `Vygeneruj osnovu pre prípadovú štúdiu na základe nasledujúceho úspešného projektu/produktu: "${brandDescription}".
        ${caseStudyResults.trim() ? `Kľúčové dosiahnuté výsledky alebo metriky úspechu sú:\n${caseStudyResults}\n` : ''}
        Osnova by mala zahŕňať nasledujúce sekcie:
        1.  **Názov Prípadovej Štúdie:** (Navrhni pútavý a výstižný názov)
        2.  **Zhrnutie (Executive Summary):** (Krátky prehľad (2-3 vety) problému, riešenia a hlavných výsledkov)
        3.  **Klient / Kontext (voliteľné, ak nie je súčasťou popisu):** (Stručné predstavenie klienta alebo situácie)
        4.  **Výzva / Problém:** (Aký konkrétny problém alebo výzvu klient riešil, alebo akú príležitosť chcel využiť?)
        5.  **Navrhnuté Riešenie:** (Ako produkt/služba/projekt adresoval túto výzvu/problém? Popíš kľúčové aspekty riešenia.)
        6.  **Proces Implementácie (stručne):** (Ako prebiehalo zavedenie riešenia? Kľúčové kroky.)
        7.  **Výsledky a Prínosy:** (Aké konkrétne a merateľné výsledky boli dosiahnuté? Použi zadané metriky, ak sú k dispozícii. Aké boli hlavné prínosy pre klienta?)
        8.  **Záver / Kľúčové Ponaučenia:** (Stručné zhrnutie a hlavné myšlienky, ktoré si má čitateľ odniesť.)
        9.  **Výzva na Akciu (Call-to-Action - voliteľné):** (Napr. "Zistite, ako môžeme pomôcť aj vám", "Prečítajte si ďalšie prípadové štúdie")
        Formátuj výstup prehľadne s nadpismi pre každú sekciu.`;
        break;
       case 'pressReleaseOutline':
        promptContent = `Vygeneruj osnovu alebo návrh tlačovej správy na základe nasledujúcich kľúčových informácií o novinke/udalosti: "${brandDescription}".
        Tlačová správa by mala mať nasledujúcu štruktúru:
        1.  **NADPIS:** (Pútavý a informatívny nadpis veľkými písmenami, napr. NÁZOV SPOLOČNOSTI UVÁDZA REVOLUČNÝ PRODUKT X)
        2.  **Podnadpis (voliteľné):** (Krátke rozšírenie nadpisu)
        3.  **PRE OKAMŽITÉ ZVEREJNENIE (alebo uveď embargo dátum, ak je)**
        4.  **Miesto, Dátum –** (Napr. Bratislava, 15. mája 2024 –) Úvodný odsek (tzv. "lead") by mal odpovedať na základné otázky: Kto? Čo? Kedy? Kde? Prečo? a Ako? (2-4 vety).
        5.  **Telo Tlačovej Správy (2-4 odseky):**
            *   Rozveď kľúčové informácie z úvodu.
            *   Poskytni dôležité detaily, štatistiky alebo fakty.
            *   Zahrň 1-2 relevantné citácie od kľúčových osôb (napr. CEO, produktový manažér).
        6.  **Informácie o Spoločnosti/Projekte (tzv. "Boilerplate"):** (Krátky odsek (3-5 vet) o spoločnosti, jej misii, produktoch alebo projekte.)
        7.  **Kontaktné Informácie pre Médiá:** (Meno kontaktnej osoby, Pozícia, Email, Telefón (voliteľné), Webstránka)
        8.  **### (Značka konca tlačovej správy)**
        Formátuj výstup prehľadne s jasnými nadpismi alebo oddelením pre jednotlivé sekcie.`;
        break;
      case 'linkedinArticleOutline':
        promptContent = `Vygeneruj štruktúrovanú osnovu pre článok na LinkedIn na tému: "${brandDescription}".
        ${linkedinAudienceMessage.trim() ? `Cieľová profesionálna skupina / Hlavný odkaz článku je: "${linkedinAudienceMessage}".\n` : ''}
        Osnova by mala obsahovať:
        1.  **Návrh Pútavého Nadpisu Článku:** (Mal by byť profesionálny, relevantný a vzbudiť záujem cieľovej skupiny na LinkedIn.)
        2.  **Úvod (Hook):** (Krátky odsek, ktorý predstaví tému, jej dôležitosť a čo sa čitateľ dozvie. 2-3 vety.)
        3.  **Hlavné Sekcie Článku (3-5):**
            *   Pre každú sekciu navrhni výstižný nadpis.
            *   Pod každý nadpis uveď 2-4 kľúčové body, argumenty alebo príklady, ktoré by sa mali v danej sekcii rozvinúť.
        4.  **Záver:** (Zhrnutie hlavných myšlienok a výzva na interakciu - napr. "Aký je váš názor?", "Podeľte sa o svoje skúsenosti v komentároch.", "Sledujte ma pre ďalší obsah.")
        5.  **Návrh Relevantných Hashtagov (3-5):** (Hashtagy vhodné pre LinkedIn, ktoré pomôžu zvýšiť dosah článku.)
        Formátuj výstup prehľadne s jasným oddelením jednotlivých častí osnovy.`;
        break;
      default:
        setError('Neznámy typ aktíva.');
        setIsLoading(false);
        return;
    }

    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: promptContent,
      });
      setGeneratedAsset(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať aktívum. Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAppConcept = async () => {
     if (!process.env.API_KEY) {
        setError("API Kľúč nie je nakonfigurovaný.");
        return;
    }
    if (!appIdea.trim()) {
      setError('Prosím, zadajte vašu myšlienku pre mini-aplikáciu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedAppConcept('');

    let promptContent = `Používateľ má nasledujúcu základnú myšlienku pre mini-aplikáciu: "${appIdea}". Vygeneruj podrobnejší koncept pre túto mini-aplikáciu, ktorý zahŕňa: 
    1. **Návrh Názvu Aplikácie:** (1-3 návrhy)
    2. **Kľúčové Funkcie:** (3-5 funkcií, stručne popísaných)
    3. **Cieľová Skupina Používateľov:** (stručný popis)
    4. **Potenciálne Technológie alebo Nástroje:** (napr. React Native pre mobil, Python/Flask pre backend, Firebase pre databázu - len ako príklady, uveď relevantné pre daný typ appky)
    5. **Monetizačný Model (voliteľné):** (ak je relevantné, napr. freemium, reklamy, predplatné)
    Formátuj odpoveď prehľadne s nadpismi pre každú sekciu.`;

    const appConceptOptions = [
      { checked: generateUserStories, text: `\n\n---\n\n**Používateľské Príbehy (User Stories):**\nVygeneruj aj 3-5 používateľských príbehov pre túto aplikáciu vo formáte: "Ako [typ používateľa], chcem [akcia], aby som [dosiahol cieľ]."` },
      { checked: generateElevatorPitch, text: `\n\n---\n\n**Elevator Pitch (30-60 sekúnd):**\nVygeneruj krátky a pútavý "elevator pitch" pre túto aplikáciu. Mal by jasne komunikovať problém, riešenie a unikátnu hodnotu aplikácie.` },
      { checked: generateUIStructure, text: `\n\n---\n\n**Návrh Štruktúry UI (Textový Popis):**\nPopíš základnú štruktúru používateľského rozhrania pre túto aplikáciu. Zameraj sa na 2-4 kľúčové obrazovky/pohľady a ich hlavné prvky/komponenty (napr. Obrazovka 1: Zoznam položiek s tlačidlom na pridanie novej položky. Obrazovka 2: Detail položky s možnosťou úpravy...). Popis by mal byť textový a konceptuálny.` },
      { checked: generateProblemsSolutions, text: `\n\n---\n\n**Možné Problémy a Riešenia:**\nIdentifikuj 2-3 potenciálne problémy alebo výzvy (napr. používateľské, technické, trhové), s ktorými by sa mohlo pri vývoji alebo používaní tejto aplikácie stretnúť. Pre každý problém navrhni stručné možné riešenie alebo prístup.` },
      { checked: generateKPIs, text: `\n\n---\n\n**Návrh Kľúčových Metrík (KPIs):**\nNavrhni 3-5 kľúčových metrík (KPIs), ktoré by bolo vhodné sledovať pre posúdenie úspešnosti tejto aplikácie. Pre každú metriku stručne vysvetli, prečo je dôležitá (1-2 vety).` },
      { checked: generateLandingPageConcept, text: `\n\n---\n\n**Návrh Cieľovej Stránky (Landing Page) - Textový Koncept:**\nVygeneruj textový koncept pre cieľovú stránku (landing page) tejto mini-aplikácie. Zahrň:\n1.  **Hlavný Nadpis (Headline):** (Krátky, pútavý, vystihujúci hlavnú hodnotu)\n2.  **Podnadpis (Sub-headline):** (Rozširujúci headline, 1-2 vety)\n3.  **Kľúčové Sekcie Stránky:** (Navrhni 3-5 sekcií, napr. "Problém, ktorý riešime", "Naše Riešenie/Ako to funguje", "Hlavné Funkcie a Výhody", "Pre Koho je Aplikácia Určená?", "Výzva na Akciu (CTA - napr. Stiahnuť, Registrovať sa)")\n4.  **Obsah pre Sekcie:** Pre každú navrhnutú sekciu stručne popíš (1-3 body/vety), aký typ obsahu alebo kľúčové informácie by mala obsahovať.\nKoncept by mal byť zameraný na presvedčenie návštevníka k akcii.` },
      { checked: generateCompetitorAnalysis, text: `\n\n---\n\n**Analýza Konkurencie (stručný prehľad):**\nNa základe myšlienky mini-aplikácie: "${appIdea}", vykonaj stručnú analýzu potenciálnej konkurencie. Identifikuj 2-3 typy existujúcich riešení alebo kategórií konkurentov, ktoré by mohli riešiť podobný problém alebo oslovovať podobnú cieľovú skupinu. Pre každý identifikovaný typ konkurencie stručne (1-2 vety) popíš, v čom by sa navrhovaná aplikácia mohla odlíšiť alebo akú unikátnu hodnotu (USP - Unique Selling Proposition) by mohla priniesť. Zameraj sa na konceptuálne odlíšenie, nie na konkrétne mená firiem, pokiaľ to nie je nevyhnutné pre pochopenie kontextu.` },
      { checked: generateMarketingChannels, text: `\n\n---\n\n**Návrh Marketingových Kanálov a Stratégií:**\nPre mini-aplikáciu s myšlienkou: "${appIdea}", navrhni 3-4 vhodné marketingové kanály na jej propagáciu. Pre každý kanál stručne (1-2 vety) odôvodni jeho vhodnosť a navrhni 1-2 konkrétne marketingové stratégie alebo typy obsahu, ktoré by na danom kanáli mohli byť efektívne na oslovenie potenciálnych používateľov. Zváž aj cieľovú skupinu, ak je možné ju z myšlienky odvodiť.` },
      { checked: generateMVPFeatures, text: `\n\n---\n\n**Návrh MVP (Minimum Viable Product) Funkcií:**\nPre mini-aplikáciu s myšlienkou: "${appIdea}", identifikuj 3-4 absolútne esenciálne funkcie, ktoré by mali byť súčasťou MVP. Pre každú MVP funkciu stručne (1-2 vety) vysvetli, prečo je kľúčová pre prvotné spustenie, získanie spätnej väzby a testovanie základnej hodnoty aplikácie na trhu. Tieto funkcie by mali tvoriť jadro aplikácie.` },
      { checked: generateUserPersona, text: `\n\n---\n\n**Persona Používateľa (základný návrh):**\nNa základe myšlienky mini-aplikácie: "${appIdea}", vygeneruj 1-2 základné persony používateľov. Každá persona by mala zahŕňať:\n*   **Meno Persony:** (Fiktívne meno)\n*   **Demografia (stručne):** (Napr. Vek, Povolanie, Zájmy - relevantné pre aplikáciu)\n*   **Kľúčové Ciele a Potreby (v súvislosti s aplikáciou):** (Čo chce persona dosiahnuť používaním aplikácie?)\n*   **Frustrácie / "Bolesti" (Pain Points):** (Aké problémy alebo frustrácie persona zažíva, ktoré by aplikácia mohla riešiť?)\n*   **Krátky Citát:** (Výrok, ktorý vystihuje postoj alebo potrebu persony)\nFormátuj každú personu prehľadne.` },
      { checked: generateAboutAppText, text: `\n\n---\n\n**'O Aplikácii' Text (pre app store/web):**\nVygeneruj stručný a pútavý text "O tejto aplikácii", vhodný pre zoznam v obchode s aplikáciami alebo pre sekciu "O nás" na webovej stránke aplikácie s myšlienkou: "${appIdea}". Text by mal:\n1.  Jasne komunikovať hlavný účel aplikácie.\n2.  Zdôrazniť kľúčové prínosy pre používateľa.\n3.  Stručne spomenúť 2-3 najdôležitejšie funkcie.\n4.  Obsahovať výzvu na akciu (napr. "Stiahnite si teraz a objavte...", "Zistite viac na našom webe...").\nCieľom je vytvoriť 2-3 krátke, presvedčivé odseky.` },
      { checked: generateOnboardingFlow, text: `\n\n---\n\n**Používateľský Onboarding (konceptuálne kroky):**\nPre mini-aplikáciu s myšlienkou: "${appIdea}", navrhni konceptuálne kroky pre používateľský onboarding (proces prvého spustenia a úvodného nastavenia). Popíš 3-5 kľúčových krokov, ktoré nového používateľa prevedú základnými funkciami alebo nastaveniami a pomôžu mu rýchlo pochopiť hodnotu aplikácie. Pre každý krok uveď:\n*   **Názov/Cieľ Kroku:** (Napr. Úvodná obrazovka, Výber preferencií, Ukážka kľúčovej funkcie)\n*   **Stručný Popis:** (Čo používateľ vidí a robí? Aký je hlavný odkaz alebo akcia?)\n*   **Očakávaný Výstup/Pochopenie Používateľa:** (Čo by mal používateľ po tomto kroku vedieť alebo nastaviť?)\nFormátuj výstup prehľadne.` },
      { checked: generateASOKeywords, text: `\n\n---\n\n**Kľúčové Slová pre ASO (App Store Optimization):**\nNa základe myšlienky mini-aplikácie: "${appIdea}" a jej potenciálnej cieľovej skupiny, navrhni:\n1.  **5-7 relevantných kľúčových slov:** (Slová alebo krátke frázy, ktoré by používatelia mohli zadávať do vyhľadávania v obchodoch s aplikáciami, keď hľadajú podobnú aplikáciu.)\n2.  **1-2 krátke popisné frázy (short description / promotional text):** (Približne 50-100 znakov, pútavé frázy, ktoré by sa dali použiť ako krátky popis v app store.)\nKľúčové slová by mali byť špecifické a relevantné k hlavným funkciám a prínosom aplikácie.` },
    ];
    
    appConceptOptions.forEach(opt => {
        if (opt.checked) promptContent += opt.text;
    });


    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: promptContent,
      });
      setGeneratedAppConcept(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať koncept aplikácie. Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDeveloperPrompt = async () => {
    if (!process.env.API_KEY) {
        setError("API Kľúč nie je nakonfigurovaný.");
        return;
    }
    if (!devPromptAppIdeaInput.trim()) {
      setError('Prosím, zadajte vašu hlavnú myšlienku pre aplikáciu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setDevPromptOutput('');

    const developerPromptMetaTemplate = `
Si expert na rozpracovanie konceptov pre prelomové digitálne produkty a zároveň skúsený prompt inžinier s hlbokými znalosťami moderných technológií a trendov. Používateľ ti poskytol nasledujúcu základnú myšlienku pre aplikáciu: "${devPromptAppIdeaInput}". 

Tvojou úlohou je túto myšlienku najprv detailne rozpracovať na komplexný koncept pre **revolučnú webovú aplikáciu** s **unikátnou, prakticky využiteľnou a komerčne životaschopnou funkcionalitou**, ktorá rieši **reálny, neuspokojený trh**. 

AŽ POTOM, na základe tohto tebou rozpracovaného konceptu, vygeneruj vysoko-kvalitný, actionable prompt určený priamo pre senior AI vývojára s cieľom túto aplikáciu reálne implementovať a pripraviť na produkčné nasadenie.

**Prompt pre AI vývojára musí bezpodmienečne spĺňať tieto POKROČILÉ kritériá:**

1. **ROLE DEFINITION & EXPERTISE LEVEL (Povinné)**
   - Jasne definuj rolu AI vývojára s konkrétnou technickou expertízou (napr. Senior Full-Stack Developer so špecializáciou na React, Node.js a cloudové služby AWS/Google Cloud).
   - Zdôrazni požiadavku na **enterprise-grade, škálovateľnú a bezchybnú implementáciu**.
   - Špecifikuj očakávanú úroveň kvality (produkčná vs. prototyp).

2. **KONCEPT ARCHITEKTÚRA (Rozšírené požiadavky na základe rozpracovanej myšlienky)**
   - **Názov Aplikácie + USP (Unique Selling Proposition):** (Navrhni pútavý názov a jasne definuj unikátnu hodnotu aplikácie)
   - **Problém-Riešenie Analýza:** (Podrobne popíš problém, ktorý aplikácia rieši, pre koho a ako. Kvantifikuj veľkosť trhu alebo dopad problému, ak je to možné.)
   - **Core Differentiating Features:** (Detailne popíš 3-5 kľúčových a odlišujúcich funkcií s technickými špecifikáciami a používateľskými benefitmi.)
   - **Business Model a Monetizácia:** (Navrhni konkrétny biznis model - napr. SaaS predplatné, freemium, jednorazový nákup, reklama - a ako bude aplikácia generovať príjem.)
   - **Cieľová Skupina a User Personas:** (Definuj presne cieľovú skupinu a vytvor 2-3 stručné user personas s ich potrebami a cieľmi.)
   - **Technologická Inovatívnosť a Competitive Advantage:** (V čom spočíva technologická inovatívnosť alebo konkurenčná výhoda aplikácie?)
   - **Škálovateľnosť a Future-Proofing:** (Aké aspekty dizajnu a technológie zabezpečia škálovateľnosť a budúcu udržateľnosť?)

3. **TECHNICKÉ ŠPECIFIKÁCIE (Detailné)**
   - **Navrhovaný Technologický Stack:** (Konkrétne odporúčania pre frontend, backend, databázu, cloudovú platformu, napr. React/Next.js + Node.js/Express + PostgreSQL + Docker + Kubernetes na AWS/Google Cloud/Azure). Odôvodni výber.
   - **Architektonické Patterns a Best Practices:** (Odporúčané patterny - napr. Microservices, Monolith, Serverless. Best practices - CI/CD, Test-Driven Development, Code Reviews).
   - **Performance a Security Požiadavky:** (Definuj očakávané časy odozvy, požiadavky na záťaž, kritické bezpečnostné aspekty - napr. OWASP Top 10, GDPR compliance).
   - **API Integrácie a Third-Party Services:** (Identifikuj potrebné externé API alebo služby - napr. platobné brány, mapové služby, autentifikačné služby, AI API).
   - **Data Modeling a Storage Stratégie:** (Návrh hlavných dátových entít, ich vzťahov a odporúčania pre typ databázy a stratégiu ukladania dát).

4. **EXECUTION DIRECTIVE (Autoritatívne)**
   - **Priamy Rozkaz na Implementáciu:** (Jasná inštrukcia AI vývojárovi, aby začal s implementáciou na základe poskytnutého briefu).
   - **Navrhované Milestones a Deliverables:** (Rozdeľ projekt na 3-5 hlavných míľnikov s konkrétnymi výstupmi pre každý z nich).
   - **Kvalitatívne Štandardy a Acceptance Criteria:** (Ako bude hodnotená kvalita kódu a funkčnosti? Aké sú kritériá pre prijatie jednotlivých častí?).
   - **Očakávaný Časový Rámec (hrubý odhad) a Priority:** (Napr. MVP do 3 mesiacov. Prioritizuj kľúčové funkcie).

**DODATOČNÉ POŽIADAVKY PRE FINÁLNY PROMPT PRE VÝVOJÁRA:**
- Výsledný prompt pre vývojára musí byť **technicky realizovateľný** s dostupnými technológiami.
- Koncept aplikácie v ňom popísaný musí mať **jasný business case** a monetizačný potenciál.
- Riešenie musí byť navrhnuté ako **škálovateľné** na tisíce simultánnych používateľov.
- Implementácia podľa promptu musí zahŕňať **moderné UX/UI trendy** a accessibility standards (WCAG 2.1 AA).

**META-INŠTRUKCIA:**
Teraz, na základe MYŠLIENKY OD POUŽÍVATEĽA ("${devPromptAppIdeaInput}"), najprv túto myšlienku detailne rozpracuj na vyššie popísaný KONCEPT ARCHITEKTÚRY. Následne, na základe tohto tebou vytvoreného konceptu, vygeneruj kompletný a optimalizovaný prompt pre AI vývojára, ktorý spĺňa všetky uvedené kritériá (ROLE DEFINITION, KONCEPT ARCHITEKTÚRA - už tebou rozpracovaná, TECHNICKÉ ŠPECIFIKÁCIE, EXECUTION DIRECTIVE) a predstavuje najlepší možný brief pre implementáciu revolučnej webovej aplikácie s dôrazom na okamžitú realizovateľnosť a komerčný úspech. Finálny výstup by mal byť len samotný prompt pre AI vývojára.
`;

    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: developerPromptMetaTemplate,
      });
      setDevPromptOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať vývojársky prompt. Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleVipDesignAnalysisDirectly = async () => {
    if (!process.env.API_KEY) {
      setError("API Kľúč nie je nakonfigurovaný.");
      return;
    }
    if (!vipUrlInput.trim()) {
      setError('Prosím, zadajte URL adresu pre analýzu.');
      return;
    }
    try {
      new URL(vipUrlInput); 
    } catch (_) {
      setError('Prosím, zadajte platnú URL adresu.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVipOutput('');

    const designAnalysisPromptTemplate = `
Si expert senior UX/UI dizajnér s 15+ rokmi skúseností v tvorbe digitálnych produktov, špecializujúci sa na webové aplikácie a moderné dizajnové trendy. Máš hlboké znalosti color theory, typografie, kompozície, používateľskej psychológie a accessibility štandardov. Disponuješ pokročilými znalosťami CSS, moderných UI frameworkov a najnovších dizajnových nástrojov.

### ÚLOHA: KOMPLEXNÁ DIZAJNOVÁ ANALÝZA

Navštív a dôkladne analyzuj webovú aplikáciu na adrese: **${vipUrlInput}**

Vykonaj systematickú analýzu cez tieto dimenzie:

---

## 1. VIZUÁLNA IDENTITA & BRANDING

**Farebná paleta:**
- Identifikuj primárne, sekundárne a akcentové farby (s hex kódmi)
- Analyzuj farebné kontrasty a accessibility compliance
- Popíš psychologický dopad farebných volieb
- Vyhodnoť konzistentnosť použitia farieb across the app

**Typografia:**
- Identifikuj použité font families (hlavičky, body text, UI elementy)
- Analyzuj hierarchiu písma (H1-H6, sizes, weights)
- Vyhodnoť readability a spacing (line-height, letter-spacing)
- Posúď typografickú konzistentnosť a modernosť

**Logo & ikonografia:**
- Popíš štýl loga a jeho integráciu do layoutu
- Analyzuj používané ikony (štýl, konzistentnosť, zrozumiteľnosť)
- Vyhodnoť visual language a brand personality

---

## 2. LAYOUT & KOMPOZÍCIA

**Grid systém:**
- Identifikuj použitý grid (12-column, custom, CSS Grid, Flexbox)
- Analyzuj breakpoints a responsive behavior
- Vyhodnoť spacing system (margins, paddings, gaps)

**Navigácia:**
- Popíš navigačnú štruktúru a UX patterns
- Analyzuj navigation hierarchy a information architecture
- Vyhodnoť mobile navigation riešenie

**Kompozičné princípy:**
- Visual balance a weight distribution
- White space utilization
- Content prioritization a focal points

---

## 3. UI KOMPONENTY & PATTERNS

**Buttons & CTA:**
- Analyzuj button styles (primary, secondary, states)
- Vyhodnoť CTA placement a visual prominence
- Popíš hover/active/disabled states

**Forms & inputs:**
- Input field styling a validation feedback
- Form layout a user guidance
- Error handling a success states

**Cards & containers:**
- Container styling a elevation/shadows
- Content organization patterns
- Hover effects a interactions

---

## 4. POUŽÍVATEĽSKÁ SKÚSENOSŤ (UX)

**Navigation flow:**
- User journey mapping cez key features
- Logical information flow a task completion
- Friction points identification

**Interaction design:**
- Micro-interactions a animations
- Loading states a feedback mechanisms
- Gesture support a touch-friendly design

**Accessibility:**
- WCAG compliance level assessment
- Keyboard navigation support
- Screen reader compatibility

---

## 5. TECHNICKÁ IMPLEMENTÁCIA

**Performance dizajnu:**
- Image optimization a loading strategies
- CSS efficiency a render performance
- Mobile-first vs desktop-first approach

**Modern techniques:**
- CSS Grid/Flexbox utilization
- CSS custom properties usage
- Animation performance (GPU acceleration)

---

## 6. TRENDOVOSŤ & INOVATÍVNOSŤ

**Aktuálne trendy:**
- Alignment s 2025 design trends
- Use of modern techniques (glassmorphism, neumorphism, etc.)
- Innovation level vs industry standards

**Konkurenčné postavenie:**
- Porovnanie s industry benchmarks
- Unique selling points dizajnu
- Areas for improvement

---

## VÝSTUPNÉ POŽIADAVKY:

### A. DETAILNÁ ANALÝZA REPORT
Vytvor systematický report pokrývajúci všetky vyššie spomenuté oblasti s konkrétnymi pozorováaniami, measurements a doporučeniami.

### B. DIZAJNOVÉ ŠPECIFIKÁCIE
**Farebná paleta:**
\`\`\`css
:root {
  --primary-color: #_______;
  --secondary-color: #_______;
  --accent-color: #_______;
  --background-color: #_______;
  --text-primary: #_______;
  --text-secondary: #_______;
}
\`\`\`

**Typografické špecifikácie:**
\`\`\`css
--font-primary: “____", sans-serif;
--font-secondary: "____", serif;
--font-size-h1: __rem;
--font-size-body: __rem;
--line-height-base: __;
\`\`\`

**Spacing system:**
\`\`\`css
--spacing-xs: __px;
--spacing-sm: __px;
--spacing-md: __px;
--spacing-lg: __px;
--spacing-xl: __px;
\`\`\`

### C. ACTIONABLE DESIGN SYSTEM
Vytvor kompletný design system guide zahŕňajúci:
- Component library specifications
- Interaction states definitions
- Responsive behavior rules
- Accessibility guidelines
- Implementation notes pre developerov

### D. IMPROVEMENT ROADMAP
- Prioritizované zoznam dizajnových vylepšení
- Modern trends integration opportunities
- Performance optimization suggestions
- User experience enhancement recommendations

---

## KVALITNÉ ŠTANDARDY:

1. **Presnosť:** Všetky farby, fonty a measurements musia byť presne identifikované
2. **Kompletnosť:** Pokryť všetky aspekty dizajnu od macro po micro level
3. **Praktickosť:** Všetky odporúčania musia byť implementovateľné
4. **Modernosť:** Reflektovať najnovšie dizajnové trendy a best practices
5. **Accessibility:** Všetky návrhy musia spĺňať WCAG 2.1 AA štandardy

---

## FINÁLNE POVERENIE:

Vykonaj túto analýzu s maximálnou profesionalitou a detailnosťou senior dizajnéra. Výsledok musí byť tak kompletný a presný, že môže slúžiť ako master template pre vytvorenie podobnej aplikácie alebo pre complete redesign existujúcej aplikácie bez potreby ďalších konzultácií či doplnení.
`;

    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: designAnalysisPromptTemplate,
      });
      setVipOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať analýzu dizajnu. Upozornenie: Tento model nemusí mať prístup k externým URL adresám. Analýza môže byť založená len na všeobecných znalostiach alebo interpretácii URL štruktúry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAppDevPromptFromVipNoInput = async () => {
    // Táto funkcia je pre VIP sub-funkciu, ktorá *nevychádza* z používateľského vstupu myšlienky
    // ale AI vymyslí koncept sama.
    if (!process.env.API_KEY) {
      setError("API Kľúč nie je nakonfigurovaný.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setVipOutput('');

    const appDevMetaPromptNoInput = `
Si expert na vymýšľanie prelomových digitálnych produktov a zároveň skúsený prompt inžinier s hlbokými znalosťami moderných technológií a trendov. Tvojou úlohou je **najprv navrhnúť koncept** pre **revolučnú webovú aplikáciu** s **unikátnou, prakticky využiteľnou a komerčne životaschopnou funkcionalitou**, ktorá rieši **reálny, neuspokojený trh**. 

AŽ POTOM, na základe tohto tebou vymysleného konceptu, **vygeneruj vysoko-kvalitný, actionable prompt určený priamo pre senior AI vývojára** s cieľom túto aplikáciu reálne implementovať a pripraviť na produkčné nasadenie.

**Prompt pre AI vývojára musí bezpodmienečne spĺňať tieto POKROČILÉ kritériá:**

1. **ROLE DEFINITION & EXPERTISE LEVEL (Povinné)**
   - Jasne definuj rolu AI vývojára s konkrétnou technickou expertízou (napr. Senior Full-Stack Developer so špecializáciou na React, Node.js a cloudové služby AWS/Google Cloud).
   - Zdôrazni požiadavku na **enterprise-grade, škálovateľnú a bezchybnú implementáciu**.
   - Špecifikuj očakávanú úroveň kvality (produkčná vs. prototyp).

2. **KONCEPT ARCHITEKTÚRA (Rozšírené požiadavky na základe TEBOU VYMYSLELNÉHO konceptu)**
   - **Názov Aplikácie + USP (Unique Selling Proposition):** (Navrhni pútavý názov a jasne definuj unikátnu hodnotu aplikácie)
   - **Problém-Riešenie Analýza:** (Podrobne popíš problém, ktorý aplikácia rieši, pre koho a ako. Kvantifikuj veľkosť trhu alebo dopad problému, ak je to možné.)
   - **Core Differentiating Features:** (Detailne popíš 3-5 kľúčových a odlišujúcich funkcií s technickými špecifikáciami a používateľskými benefitmi.)
   - **Business Model a Monetizácia:** (Navrhni konkrétny biznis model - napr. SaaS predplatné, freemium, jednorazový nákup, reklama - a ako bude aplikácia generovať príjem.)
   - **Cieľová Skupina a User Personas:** (Definuj presne cieľovú skupinu a vytvor 2-3 stručné user personas s ich potrebami a cieľmi.)
   - **Technologická Inovatívnosť a Competitive Advantage:** (V čom spočíva technologická inovatívnosť alebo konkurenčná výhoda aplikácie?)
   - **Škálovateľnosť a Future-Proofing:** (Aké aspekty dizajnu a technológie zabezpečia škálovateľnosť a budúcu udržateľnosť?)

3. **TECHNICKÉ ŠPECIFIKÁCIE (Detailné)**
   - **Navrhovaný Technologický Stack:** (Konkrétne odporúčania pre frontend, backend, databázu, cloudovú platformu). Odôvodni výber.
   - **Architektonické Patterns a Best Practices:** (Odporúčané patterny a best practices).
   - **Performance a Security Požiadavky:** (Definuj očakávané časy odozvy, požiadavky na záťaž, kritické bezpečnostné aspekty).
   - **API Integrácie a Third-Party Services:** (Identifikuj potrebné externé API alebo služby).
   - **Data Modeling a Storage Stratégie:** (Návrh hlavných dátových entít a ich vzťahov).

4. **EXECUTION DIRECTIVE (Autoritatívne)**
   - **Priamy Rozkaz na Implementáciu:** (Jasná inštrukcia AI vývojárovi, aby začal s implementáciou).
   - **Navrhované Milestones a Deliverables:** (Rozdeľ projekt na hlavné míľniky s výstupmi).
   - **Kvalitatívne Štandardy a Acceptance Criteria:** (Ako bude hodnotená kvalita?).
   - **Očakávaný Časový Rámec (hrubý odhad) a Priority.**

**DODATOČNÉ POŽIADAVKY PRE FINÁLNY PROMPT PRE VÝVOJÁRA:**
- Výsledný prompt pre vývojára musí byť **technicky realizovateľný**.
- Koncept aplikácie musí mať **jasný business case** a monetizačný potenciál.
- Riešenie musí byť **škálovateľné**.
- Implementácia musí zahŕňať **moderné UX/UI trendy** a accessibility standards.

**META-INŠTRUKCIA:**
Najprv vymysli a stručne si premysli koncept pre revolučnú webovú aplikáciu. Následne, na základe tohto tebou vytvoreného konceptu, vygeneruj kompletný a optimalizovaný prompt pre AI vývojára, ktorý spĺňa všetky uvedené kritériá. Finálny výstup by mal byť len samotný prompt pre AI vývojára.
`;
    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: appDevMetaPromptNoInput,
      });
      setVipOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať prompt pre AI vývojára (VIP). Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCraftPrompt = async () => {
    if (!process.env.API_KEY) {
      setError("API Kľúč nie je nakonfigurovaný.");
      return;
    }
    if (!vipCraftTopicInput.trim()) {
      setError('Prosím, zadajte tému pre C.R.A.F.T. prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVipOutput('');

    const craftMetaPrompt = `
CONTEXT:
We are going to create one of the best ChatGPT prompts ever written. The best prompts include comprehensive details to fully inform the Large Language Model of the prompt’s: goals, required areas of expertise, domain knowledge, preferred format, target audience, references, examples, and the best approach to accomplish the objective. Based on this and the following information, you will be able to write this exceptional prompt.

ROLE:
You are an LLM prompt generation expert. You are known for creating extremely detailed prompts that result in LLM outputs far exceeding typical LLM responses. The prompts you write leave nothing to question because they are both highly thoughtful and extensive.

ACTION:
The topic for the C.R.A.F.T. prompt you are to generate is: "${vipCraftTopicInput}"

Based on this topic, and after reviewing the Format and Target Audience sections below, write the best C.R.A.F.T. prompt ever created. If necessary, the C.R.A.F.T. prompt you generate should include “fill in the blank” elements (like [Your Specific Detail Here] or __USER_INPUT__) for the end-user to populate based on their specific needs related to the topic. Take a deep breath and take it one step at a time.

FORMAT:
For organizational purposes, the C.R.A.F.T. prompt you generate will use an acronym called "C.R.A.F.T." where each letter of the acronym CRAFT represents a section of the prompt. Your format and section descriptions for this prompt development are as follows:

-Context: This section describes the current context that outlines the situation for which the C.R.A.F.T. prompt is needed. It helps the LLM (that will eventually process this C.R.A.F.T. prompt) understand what knowledge and expertise it should reference when creating its response to the C.R.A.F.T. prompt.

-Role: This section defines the type of experience the LLM (that will eventually process this C.R.A.F.T. prompt) should embody, its skill set, and its level of expertise relative to the requested C.R.A.F.T. prompt. In all cases, the role described will need to be an industry-leading expert with more than two decades of relevant experience and thought leadership.

-Action: This is the action that the C.R.A.F.T. prompt will ask the LLM (that will eventually process this C.R.A.F.T. prompt) to take. It should be a numbered list of sequential steps that will make the most sense for an LLM to follow in order to maximize success in responding to the C.R.A.F.T. prompt.

-Format: This refers to the structural arrangement or presentation style of the LLM’s generated content when it processes the C.R.A.F.T. prompt. It determines how information is organized, displayed, or encoded to meet specific user preferences or requirements for the output of the C.R.A.F.T. prompt. Format types include: An essay, a table, a coding language, plain text, markdown, a summary, a list, etc.

-Target Audience: This will be the ultimate consumer of the output that your generated C.R.A.F.T. prompt creates (i.e., the audience for the LLM's response to the C.R.A.F.T. prompt). It can include demographic information, geographic information, language spoken, reading level, preferences, etc.

TARGET AUDIENCE (for the C.R.A.F.T. prompt you are generating):
The target audience for the C.R.A.F.T. prompt you are creating is a user who will then use this C.R.A.F.T. prompt with an advanced LLM like ChatGPT 4o or a similar model. The C.R.A.F.T. prompt should be structured to guide that advanced LLM to produce a high-quality output on the given topic: "${vipCraftTopicInput}".

Now, please write the C.R.A.F.T. prompt based on the topic: "${vipCraftTopicInput}".
Ensure the generated C.R.A.F.T. prompt is comprehensive, detailed, and leaves nothing to question for the LLM that will eventually process it.
`;
    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: craftMetaPrompt,
      });
      setVipOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať C.R.A.F.T. prompt. Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateCustomAppDevPrompt = async () => {
    if (!process.env.API_KEY) {
        setError("API Kľúč nie je nakonfigurovaný.");
        return;
    }
    if (!vipCustomAppIdeaInput.trim()) {
      setError('Prosím, zadajte vašu hlavnú myšlienku pre aplikáciu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setVipOutput('');

    const customAppDevMetaPrompt = `
Si expert na rozpracovanie konceptov pre prelomové digitálne produkty a zároveň skúsený prompt inžinier s hlbokými znalosťami moderných technológií a trendov. Používateľ ti poskytol nasledujúcu základnú myšlienku pre aplikáciu: "${vipCustomAppIdeaInput}". 

Tvojou úlohou je túto myšlienku najprv detailne rozpracovať na komplexný koncept pre **revolučnú webovú aplikáciu** s **unikátnou, prakticky využiteľnou a komerčne životaschopnou funkcionalitou**, ktorá rieši **reálny, neuspokojený trh**. 

AŽ POTOM, na základe tohto tebou rozpracovaného konceptu, vygeneruj vysoko-kvalitný, actionable prompt určený priamo pre senior AI vývojára s cieľom túto aplikáciu reálne implementovať a pripraviť na produkčné nasadenie.

**Prompt pre AI vývojára musí bezpodmienečne spĺňať tieto POKROČILÉ kritériá:**

1. **ROLE DEFINITION & EXPERTISE LEVEL (Povinné)**
   - Jasne definuj rolu AI vývojára s konkrétnou technickou expertízou (napr. Senior Full-Stack Developer so špecializáciou na React, Node.js a cloudové služby AWS/Google Cloud).
   - Zdôrazni požiadavku na **enterprise-grade, škálovateľnú a bezchybnú implementáciu**.
   - Špecifikuj očakávanú úroveň kvality (produkčná vs. prototyp).

2. **KONCEPT ARCHITEKTÚRA (Rozšírené požiadavky na základe rozpracovanej myšlienky)**
   - **Názov Aplikácie + USP (Unique Selling Proposition):** (Navrhni pútavý názov a jasne definuj unikátnu hodnotu aplikácie)
   - **Problém-Riešenie Analýza:** (Podrobne popíš problém, ktorý aplikácia rieši, pre koho a ako. Kvantifikuj veľkosť trhu alebo dopad problému, ak je to možné.)
   - **Core Differentiating Features:** (Detailne popíš 3-5 kľúčových a odlišujúcich funkcií s technickými špecifikáciami a používateľskými benefitmi.)
   - **Business Model a Monetizácia:** (Navrhni konkrétny biznis model - napr. SaaS predplatné, freemium, jednorazový nákup, reklama - a ako bude aplikácia generovať príjem.)
   - **Cieľová Skupina a User Personas:** (Definuj presne cieľovú skupinu a vytvor 2-3 stručné user personas s ich potrebami a cieľmi.)
   - **Technologická Inovatívnosť a Competitive Advantage:** (V čom spočíva technologická inovatívnosť alebo konkurenčná výhoda aplikácie?)
   - **Škálovateľnosť a Future-Proofing:** (Aké aspekty dizajnu a technológie zabezpečia škálovateľnosť a budúcu udržateľnosť?)

3. **TECHNICKÉ ŠPECIFIKÁCIE (Detailné)**
   - **Navrhovaný Technologický Stack:** (Konkrétne odporúčania pre frontend, backend, databázu, cloudovú platformu). Odôvodni výber.
   - **Architektonické Patterns a Best Practices:** (Odporúčané patterny a best practices).
   - **Performance a Security Požiadavky:** (Definuj očakávané časy odozvy, požiadavky na záťaž, kritické bezpečnostné aspekty).
   - **API Integrácie a Third-Party Services:** (Identifikuj potrebné externé API alebo služby).
   - **Data Modeling a Storage Stratégie:** (Návrh hlavných dátových entít a ich vzťahov).

4. **EXECUTION DIRECTIVE (Autoritatívne)**
   - **Priamy Rozkaz na Implementáciu:** (Jasná inštrukcia AI vývojárovi, aby začal s implementáciou).
   - **Navrhované Milestones a Deliverables:** (Rozdeľ projekt na hlavné míľniky s výstupmi).
   - **Kvalitatívne Štandardy a Acceptance Criteria:** (Ako bude hodnotená kvalita?).
   - **Očakávaný Časový Rámec (hrubý odhad) a Priority.**

**DODATOČNÉ POŽIADAVKY PRE FINÁLNY PROMPT PRE VÝVOJÁRA:**
- Výsledný prompt pre vývojára musí byť **technicky realizovateľný**.
- Koncept aplikácie musí mať **jasný business case** a monetizačný potenciál.
- Riešenie musí byť **škálovateľné**.
- Implementácia musí zahŕňať **moderné UX/UI trendy** a accessibility standards.

**META-INŠTRUKCIA:**
Teraz, na základe MYŠLIENKY OD POUŽÍVATEĽA ("${vipCustomAppIdeaInput}"), najprv túto myšlienku detailne rozpracuj na vyššie popísaný KONCEPT ARCHITEKTÚRY. Následne, na základe tohto tebou vytvoreného konceptu, vygeneruj kompletný a optimalizovaný prompt pre AI vývojára, ktorý spĺňa všetky uvedené kritériá (ROLE DEFINITION, KONCEPT ARCHITEKTÚRA - už tebou rozpracovaná, TECHNICKÉ ŠPECIFIKÁCIE, EXECUTION DIRECTIVE) a predstavuje najlepší možný brief pre implementáciu revolučnej webovej aplikácie s dôrazom na okamžitú realizovateľnosť a komerčný úspech. Finálny výstup by mal byť len samotný prompt pre AI vývojára.
`;
    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: customAppDevMetaPrompt,
      });
      setVipOutput(response.text);
    } catch (e) {
      console.error(e);
      setError('Nepodarilo sa vygenerovať vývojársky prompt (VIP - vlastná myšlienka). Skúste to znova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVipAction = () => {
    setError(null); 
    if (vipSubFunction === VIP_SUB_FUNCTIONS.DIRECT_DESIGN_ANALYSIS) {
      if (!vipUrlInput.trim()) {
        setError('Prosím, zadajte URL adresu pre priamu analýzu dizajnu.');
        return;
      }
      try { new URL(vipUrlInput); } catch { setError('Prosím, zadajte platnú URL adresu.'); return; }
      handleVipDesignAnalysisDirectly();
    } else if (vipSubFunction === VIP_SUB_FUNCTIONS.APP_DEV_PROMPT_GENERATOR) {
      handleGenerateAppDevPromptFromVipNoInput();
    } else if (vipSubFunction === VIP_SUB_FUNCTIONS.CRAFT_PROMPT_GENERATOR) {
      if (!vipCraftTopicInput.trim()) {
        setError('Prosím, zadajte tému pre C.R.A.F.T. prompt.');
        return;
      }
      handleGenerateCraftPrompt();
    } else if (vipSubFunction === VIP_SUB_FUNCTIONS.CUSTOM_APP_DEV_PROMPT_GENERATOR) {
        if (!vipCustomAppIdeaInput.trim()) {
            setError('Prosím, zadajte vašu hlavnú myšlienku pre aplikáciu.');
            return;
        }
        handleGenerateCustomAppDevPrompt();
    }
  };


  const renderOutput = (text) => {
    if (!text) return null;
    
    let formattedText = text;

    formattedText = formattedText.replace(/```css\n([\s\S]*?)\n```/g, (match, p1) => {
        const escapedCode = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre class="code-block css-code"><code>${escapedCode}</code></pre>`;
    });
     formattedText = formattedText.replace(/```([\s\S]*?)```/g, (match, p1) => { 
        const escapedCode = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre class="code-block"><code>${escapedCode}</code></pre>`;
    });

    formattedText = formattedText.replace(/^\s*---\s*$/gm, '<hr class="section-divider" />');
    formattedText = formattedText.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>'); 
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');     
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');         
    
    let inUl = false;
    let inOl = false;
    const lines = formattedText.split('\n');
    let processedLines = [];

    for (const line of lines) {
        let currentLine = line;
        if (currentLine.includes('<pre class="code-block')) {
            if (inUl) { processedLines.push('</ul>'); inUl = false; }
            if (inOl) { processedLines.push('</ol>'); inOl = false; }
            processedLines.push(currentLine);
            continue;
        }

        const isUlItem = currentLine.match(/^(\s*)(\*|-|\+)\s+(.*)/);
        const isOlItem = currentLine.match(/^(\s*)\d+\.\s+(.*)/);  

        if (isUlItem) {
            if (inOl) { processedLines.push('</ol>'); inOl = false; }
            if (!inUl) { processedLines.push('<ul>'); inUl = true; }
            processedLines.push(`<li>${isUlItem[3]}</li>`);
        } else if (isOlItem) {
            if (inUl) { processedLines.push('</ul>'); inUl = false; }
            if (!inOl) { processedLines.push('<ol>'); inOl = true; }
            processedLines.push(`<li>${isOlItem[2]}</li>`);
        } else {
            if (inUl) { processedLines.push('</ul>'); inUl = false; }
            if (inOl) { processedLines.push('</ol>'); inOl = false; }
            processedLines.push(currentLine);
        }
    }
    if (inUl) processedLines.push('</ul>');
    if (inOl) processedLines.push('</ol>');
    
    formattedText = processedLines.join('\n');

    formattedText = formattedText.replace(/\n/g, (match, offset, fullString) => {
        let inPre = false;
        let tempOffset = offset;
        while (tempOffset >= 0) {
            const openPre = fullString.lastIndexOf('<pre', tempOffset);
            const closePre = fullString.lastIndexOf('</pre>', tempOffset);
            if (openPre !== -1 && openPre > closePre) {
                inPre = true;
                break;
            }
            if (closePre > openPre) break; 
            if (openPre === -1 && closePre === -1) break; 
            tempOffset = Math.max(openPre, closePre) -1; 
        }
        if (inPre) return '\n';

        const preceding = fullString.substring(Math.max(0, offset - 7), offset).trim(); 
        const succeeding = fullString.substring(offset + 1, offset + 8).trim(); 

        if (preceding.endsWith('</ol>') || preceding.endsWith('</ul>') || preceding.endsWith('</li>') || preceding.endsWith('<hr class="section-divider" />') || preceding.endsWith('</pre>')) {
            if (succeeding.match(/^<(ul|ol|li|p|h[1-6]|hr|pre)/i)) return '';
            return '<br />'; 
        }
        if (succeeding.startsWith('<ol>') || succeeding.startsWith('<ul>') || succeeding.startsWith('<li>')|| succeeding.startsWith('<hr class="section-divider" />') || succeeding.startsWith('<pre')) {
             return ''; 
        }
        if (preceding.endsWith('>') && !preceding.match(/<\/(ul|ol|li|p|h[1-6]|pre)>$/i) && !succeeding.match(/^<(ul|ol|li|p|h[1-6]|pre)/i) ) { 
             return '\n'; 
        }
        return '<br />';
    });
    
    formattedText = formattedText.replace(/<br \/>\s*<br \/>/g, '<br /><br />'); 
    formattedText = formattedText.replace(/(<br \/>\s*){3,}/g, '<br /><br />'); 
    formattedText = formattedText.replace(/<br \/>\s*<hr class="section-divider" \/>/g, '<hr class="section-divider" />');
    formattedText = formattedText.replace(/<hr class="section-divider" \/>\s*<br \/>/g, '<hr class="section-divider" />');

    return <div className="output-area" dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const renderProjectManagement = () => {
    const subFunctionDetails = {
        [PM_SUB_FUNCTIONS.MEETING_MINUTES]: { label: "Téma / Názov stretnutia:", placeholder: "Napr. Týždenný update k projektu Phoenix..." },
        [PM_SUB_FUNCTIONS.TASK_DELEGATION]: { label: "Popíšte váš projekt (kontext pre delegovanie):", placeholder: "Napr. Vývoj novej webovej platformy..." },
        [PM_SUB_FUNCTIONS.SWOT_ANALYSIS]: { label: "Popíšte projekt/firmu pre SWOT analýzu:", placeholder: "Napr. Naša firma 'EcoSviečky s.r.o.'..." },
        [PM_SUB_FUNCTIONS.COMMUNICATION_PLAN]: { label: "Popíšte projekt pre návrh komunikačného plánu:", placeholder: "Napr. Uvedenie nového softvérového produktu..." },
        [PM_SUB_FUNCTIONS.PROJECT_READINESS_CHECKLIST]: { label: "Popíšte projekt pre checklist pripravenosti (Go/No-Go):", placeholder: "Napr. Vývoj novej mobilnej aplikácie pre seniorov..." },
        [PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS]: { label: "Popíšte ukončený projekt:", placeholder: "Napr. Marketingová kampaň 'Leto 2024'..." },
        [PM_SUB_FUNCTIONS.SMART_GOALS]: { label: "Všeobecný cieľ / Popis projektu pre definíciu SMART cieľov:", placeholder: "Napr. 'Zvýšiť spokojnosť zákazníkov'..." },
        [PM_SUB_FUNCTIONS.MEETING_AGENDA]: { label: "Téma / Cieľ stretnutia pre návrh agendy:", placeholder: "Napr. Plánovanie kvartálnej stratégie..." },
        [PM_SUB_FUNCTIONS.PRESENTATION_PREP]: { label: "Popis projektu pre prípravu prezentácie:", placeholder: "Napr. Predstavenie kvartálnych výsledkov..." },
        [PM_SUB_FUNCTIONS.PROJECT_ELEVATOR_PITCH]: { label: "Popis projektu pre vytvorenie Elevator Pitchu:", placeholder: "Napr. 'Náš projekt EcoSmart City znižuje emisie...'" },
        [PM_SUB_FUNCTIONS.KICK_OFF_CHECKLIST]: { label: "Popis projektu pre checklist úvodného stretnutia (kick-off):", placeholder: "Napr. Projekt 'Vývoj novej e-commerce platformy'..." },
        default: { label: "Popíšte váš projekt:", placeholder: "Napr. Vývoj novej mobilnej aplikácie pre zdieľanie receptov..." }
    };
    const currentDetails = subFunctionDetails[projectManagementSubFunction] || subFunctionDetails.default;
    const projectDescriptionLabel = currentDetails.label;
    const projectDescriptionPlaceholder = currentDetails.placeholder;

    return (
    <div className="module-content">
      <h2>Projektový Manažment</h2>
      <p className="module-description">Zefektívnite plánovanie a riadenie vašich projektov.</p>
      
      <div className="form-group">
        <label>Čo potrebujete vygenerovať?</label>
        <div className="radio-group">
          {[
            { value: PM_SUB_FUNCTIONS.PLAN_OUTLINE, label: "Osnova Plánu" },
            { value: PM_SUB_FUNCTIONS.RISK_ANALYSIS, label: "Analýza Rizík" },
            { value: PM_SUB_FUNCTIONS.STAKEHOLDER_EMAIL, label: "Koncept Emailu Stakeholderom" },
            { value: PM_SUB_FUNCTIONS.MEETING_MINUTES, label: "Zápis zo Stretnutia" },
            { value: PM_SUB_FUNCTIONS.MEETING_AGENDA, label: "Návrh Agendy Stretnutia" },
            { value: PM_SUB_FUNCTIONS.TASK_DELEGATION, label: "Delegovanie Úloh (návrh)" },
            { value: PM_SUB_FUNCTIONS.SWOT_ANALYSIS, label: "SWOT Analýza" },
            { value: PM_SUB_FUNCTIONS.COMMUNICATION_PLAN, label: "Komunikačný Plán (návrh)" },
            { value: PM_SUB_FUNCTIONS.PROJECT_READINESS_CHECKLIST, label: "Checklist Pripravenosti (Go/No-Go)" },
            { value: PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS, label: "Analýza Po Ukončení (Post-Mortem)" },
            { value: PM_SUB_FUNCTIONS.SMART_GOALS, label: "Definícia Cieľov (SMART)" },
            { value: PM_SUB_FUNCTIONS.PRESENTATION_PREP, label: "Príprava na Prezentáciu Projektu" },
            { value: PM_SUB_FUNCTIONS.PROJECT_ELEVATOR_PITCH, label: "Elevator Pitch pre Projekt" },
            { value: PM_SUB_FUNCTIONS.KICK_OFF_CHECKLIST, label: "Checklist pre Úvodné Stretnutie" },
          ].map(func => (
            <label htmlFor={`pm_${func.value}`} key={func.value}>
              <input type="radio" id={`pm_${func.value}`} name="pmSubFunction" value={func.value} checked={projectManagementSubFunction === func.value} onChange={(e) => handlePMSubFunctionChange(e.target.value)} />
              {func.label}
            </label>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="projectDescriptionInputPm">{projectDescriptionLabel}</label>
        <textarea
            id="projectDescriptionInputPm"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder={projectDescriptionPlaceholder}
            rows={4}
            aria-label={projectDescriptionLabel}
        />
      </div>

      {projectManagementSubFunction === PM_SUB_FUNCTIONS.STAKEHOLDER_EMAIL && (
        <div className="form-group conditional-field">
          <label htmlFor="stakeholderInfoInput">Informácie o stakeholderovi/adresátovi emailu:</label>
          <input
            type="text"
            id="stakeholderInfoInput"
            value={stakeholderInfo}
            onChange={(e) => setStakeholderInfo(e.target.value)}
            placeholder="Napr. Marketingové oddelenie, Klient XYZ, Investori"
            aria-label="Informácie o stakeholderovi"
          />
        </div>
      )}
      {projectManagementSubFunction === PM_SUB_FUNCTIONS.MEETING_MINUTES && (
        <>
            <div className="form-group conditional-field">
                <label htmlFor="meetingAttendeesInput">Účastníci stretnutia (oddelení čiarkou):</label>
                <input
                    type="text"
                    id="meetingAttendeesInput"
                    value={meetingAttendees}
                    onChange={(e) => setMeetingAttendees(e.target.value)}
                    placeholder="Napr. Ján Novák, Eva Malá, Projektový Tím"
                    aria-label="Účastníci stretnutia"
                />
            </div>
            <div className="form-group conditional-field">
                <label htmlFor="meetingDiscussionPointsInput">Kľúčové body diskusie / Rozhodnutia / Úlohy:</label>
                <textarea
                    id="meetingDiscussionPointsInput"
                    value={meetingDiscussionPoints}
                    onChange={(e) => setMeetingDiscussionPoints(e.target.value)}
                    placeholder="Stručne popíšte priebeh stretnutia, čo sa diskutovalo, aké rozhodnutia padli, aké úlohy boli pridelené..."
                    rows={5}
                    aria-label="Kľúčové body diskusie, rozhodnutia, úlohy"
                />
            </div>
        </>
      )}
      {projectManagementSubFunction === PM_SUB_FUNCTIONS.MEETING_AGENDA && (
        <div className="form-group conditional-field">
            <label htmlFor="meetingDurationEstimateInput">Odhadovaná dĺžka stretnutia:</label>
            <input
                type="text"
                id="meetingDurationEstimateInput"
                value={meetingDurationEstimate}
                onChange={(e) => setMeetingDurationEstimate(e.target.value)}
                placeholder="Napr. 30 minút, 1 hodina, 90 minút"
                aria-label="Odhadovaná dĺžka stretnutia"
            />
        </div>
      )}
       {projectManagementSubFunction === PM_SUB_FUNCTIONS.PRESENTATION_PREP && (
        <div className="form-group conditional-field">
            <label htmlFor="presentationAudienceContextInput">Cieľová skupina prezentácie / Kontext (nepovinné):</label>
            <textarea
                id="presentationAudienceContextInput"
                value={presentationAudienceContext}
                onChange={(e) => setPresentationAudienceContext(e.target.value)}
                placeholder="Napr. Vedenie firmy, Potenciálni investori, Technický tím, Verejnosť na konferencii..."
                rows={2}
                aria-label="Cieľová skupina prezentácie alebo kontext"
            />
        </div>
      )}
      {projectManagementSubFunction === PM_SUB_FUNCTIONS.TASK_DELEGATION && (
         <div className="form-group conditional-field">
            <label htmlFor="teamMembersInput">Členovia tímu (uveďte mená, voliteľne rolu/zručnosti, každý na nový riadok):</label>
            <textarea
                id="teamMembersInput"
                value={teamMembersInput}
                onChange={(e) => setTeamMembersInput(e.target.value)}
                placeholder="Napr.\nJana Kováčová - Frontend Developer\nPeter Malý - Marketingový špecialista\nLucia Veľká - UX Dizajnérka"
                rows={4}
                aria-label="Členovia tímu pre delegovanie úloh"
            />
        </div>
      )}
      {projectManagementSubFunction === PM_SUB_FUNCTIONS.COMMUNICATION_PLAN && (
         <div className="form-group conditional-field">
            <label htmlFor="keyStakeholdersInput">Kľúčoví stakeholderi (nepovinné, uveďte mená/skupiny, každý na nový riadok):</label>
            <textarea
                id="keyStakeholdersInput"
                value={keyStakeholdersInput}
                onChange={(e) => setKeyStakeholdersInput(e.target.value)}
                placeholder="Napr.\nInterný tím (Vývoj, Marketing)\nExterní klienti\nInvestori\nVerejnosť"
                rows={4}
                aria-label="Kľúčoví stakeholderi pre komunikačný plán"
            />
        </div>
      )}
       {projectManagementSubFunction === PM_SUB_FUNCTIONS.POST_MORTEM_ANALYSIS && (
        <div className="form-group conditional-field">
          <label htmlFor="projectPostMortemSummaryInput">Stručné zhrnutie priebehu projektu (úspechy, problémy, ponaučenia):</label>
          <textarea
            id="projectPostMortemSummaryInput"
            value={projectPostMortemSummary}
            onChange={(e) => setProjectPostMortemSummary(e.target.value)}
            placeholder="Napr. Projekt bol dokončený načas a v rámci rozpočtu. Kľúčové úspechy zahŕňali... Výzvy sa objavili v oblasti... Naučili sme sa, že..."
            rows={5}
            aria-label="Stručné zhrnutie priebehu projektu pre post-mortem analýzu"
          />
        </div>
      )}

      <div className="action-buttons">
        <button onClick={handlePMGenerate} disabled={isLoading} aria-live="polite" className="button-primary">
          {isLoading ? 'Generujem...' : 'Vygenerovať'}
        </button>
        {pmOutput && <button onClick={() => setPmOutput('')} className="button-secondary clear-button" aria-label="Vymazať výstup projektového manažmentu">Vymazať výstup</button>}
        {pmOutput && <button onClick={() => handleCopyToClipboard(pmOutput, MODULES.PROJECT_MANAGEMENT)} className="button-secondary copy-button" aria-label="Kopírovať výstup projektového manažmentu">Kopírovať</button>}
      </div>
      {renderOutput(pmOutput)}
    </div>
  )};

  const renderAssetGeneration = () => {
    const assetOptions = [
        { value: "corporateIdentityConcept", label: "Firemná Identita (základný koncept)", placeholder: "Napr. Ekologická kaviareň..." },
        { value: "nameSuggestions", label: "Návrhy Názvov (produkt/firma/projekt)", placeholder: "Napr. 'Nová aplikácia na učenie jazykov'..." },
        { value: "websiteStructure", label: "Návrh Štruktúry Webstránky (textový)", placeholder: "Napr. 'Online obchod s remeselnými výrobkami'..." },
        { value: "pressReleaseOutline", label: "Tlačová Správa (osnova/návrh)", placeholder: "Napr. Uvedenie nového produktu 'EcoInovátor 3000'..." },
        { value: "shortVideoScript", label: "Scenár pre Krátke Reklamné Video", placeholder: "Napr. 'Naša nová mobilná aplikácia X uľahčuje...'"},
        { value: "productDescription", label: "Popis Produktu (pre e-shop)", placeholder: "Napr. 'Ručne vyrábané mydlo s levanduľou'..." },
        { value: "faqSection", label: "FAQ Sekcia (pre web)", placeholder: "Napr. 'Naša nová online služba pre freelancerov'..." },
        { value: "metaDescriptions", label: "Meta Popisy (SEO)", placeholder: "Stručne popíšte obsah vašej webstránky..." },
        { value: "blogPostOutline", label: "Blog Post Osnova", placeholder: "Napr. 'Výhody organickej stravy'..." },
        { value: "linkedinArticleOutline", label: "Osnova Článku pre LinkedIn", placeholder: "Napr. 'Budúcnosť práce na diaľku'..." },
        { value: "newsletter", label: "Newsletter - Návrh Úvodníka a Kľúčových Tém", placeholder: "Napr. 'Novinky z oblasti digitálneho marketingu'..." },
        { value: "tweetXPost", label: "Tweet / Príspevok pre X", placeholder: "Napr. 'Nová funkcia našej aplikácie!'..." },
        { value: "caseStudyOutline", label: "Case Study / Prípadová Štúdia (osnova)", placeholder: "Napr. Implementácia nášho CRM systému u klienta XYZ..." },
        { value: "logoConcept", label: "Koncept Loga (textový popis)", placeholder: "Popíšte vašu značku alebo produkt..." },
        { value: "slogan", label: "Firemný Slogan", placeholder: "Popíšte vašu značku alebo produkt..." },
        { value: "websiteHeadline", label: "Nadpis pre Web", placeholder: "Popíšte vašu značku alebo produkt..." },
        { value: "businessCard", label: "Obsah pre Vizitku", placeholder: "Popíšte vašu firmu alebo osobu..." },
        { value: "emailSignature", label: "Obsah pre Emailový Podpis", placeholder: "Popíšte vašu firmu alebo osobu..." },
        { value: "socialMediaPost", label: "Príspevok na Sociálne Siete", placeholder: "Popíšte váš produkt alebo službu..." }
    ];
    
    const currentAssetDetails = assetOptions.find(opt => opt.value === assetType) || { label: "Popíšte vašu značku, produkt, službu, projekt alebo osobu:", placeholder: "Napr. Ekologická kaviareň..." };
    let brandDescriptionLabel = currentAssetDetails.label.startsWith("Popis") || currentAssetDetails.label.startsWith("Téma") || currentAssetDetails.label.startsWith("Kľúčové") || currentAssetDetails.label.startsWith("Hlavná") ? currentAssetDetails.label : `Popis pre generovanie "${currentAssetDetails.label}":`;
    let brandDescriptionPlaceholder = currentAssetDetails.placeholder;

    return (
    <div className="module-content">
      <h2>Generovanie Kreatívnych Aktív</h2>
      <p className="module-description">Získajte nápady pre vašu značku – od loga až po štruktúru webu.</p>
      <div className="form-group">
        <label htmlFor="assetTypeSelect">Typ aktíva:</label>
        <select id="assetTypeSelect" value={assetType} onChange={(e) => handleAssetTypeChange(e.target.value)} aria-label="Typ aktíva">
          {assetOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="brandDescriptionInputAsset">{brandDescriptionLabel}</label>
        <textarea
            id="brandDescriptionInputAsset"
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            placeholder={brandDescriptionPlaceholder}
            rows={4}
            aria-label={brandDescriptionLabel}
        />
      </div>
      {assetType === 'productDescription' && (
        <div className="form-group conditional-field">
          <label htmlFor="productKeyFeaturesInput">Kľúčové vlastnosti produktu (nepovinné, každá na nový riadok):</label>
          <textarea
            id="productKeyFeaturesInput"
            value={productKeyFeatures}
            onChange={(e) => setProductKeyFeatures(e.target.value)}
            placeholder="Napr. Dlhá výdrž batérie\nVodeodolný dizajn\nIntegrovaný GPS modul"
            rows={3}
            aria-label="Kľúčové vlastnosti produktu"
          />
        </div>
      )}
      {assetType === 'faqSection' && (
        <div className="form-group conditional-field">
          <label htmlFor="faqKeyQuestionsInput">Kľúčové otázky pre FAQ (nepovinné, každá otázka na nový riadok):</label>
          <textarea
            id="faqKeyQuestionsInput"
            value={faqKeyQuestions}
            onChange={(e) => setFaqKeyQuestions(e.target.value)}
            placeholder="Napr. Aká je dodacia doba?\nPonúkate zľavy pre študentov?\nJe produkt vhodný pre začiatočníkov?"
            rows={3}
            aria-label="Kľúčové otázky pre FAQ"
          />
        </div>
      )}
      {assetType === 'nameSuggestions' && (
        <div className="form-group conditional-field">
          <label htmlFor="nameKeywordsStyleInput">Kľúčové slová / Požadovaný štýl názvu (nepovinné):</label>
          <textarea
            id="nameKeywordsStyleInput"
            value={nameKeywordsStyle}
            onChange={(e) => setNameKeywordsStyle(e.target.value)}
            placeholder="Napr. Inovatívny, ekologický, pre mladých, luxusný, jednoduchý, slovenské slovo..."
            rows={3}
            aria-label="Kľúčové slová alebo požadovaný štýl pre návrhy názvov"
          />
        </div>
      )}
      {assetType === 'shortVideoScript' && (
        <div className="form-group conditional-field">
          <label htmlFor="videoTargetAudienceInput">Cieľová skupina pre video (nepovinné):</label>
          <textarea
            id="videoTargetAudienceInput"
            value={videoTargetAudience}
            onChange={(e) => setVideoTargetAudience(e.target.value)}
            placeholder="Napr. Mladí profesionáli (25-35 rokov) so záujmom o technológie, Rodiny s malými deťmi, Seniori hľadajúci jednoduché riešenia..."
            rows={3}
            aria-label="Cieľová skupina pre video"
          />
        </div>
      )}
      {assetType === 'newsletter' && (
        <div className="form-group conditional-field">
          <label htmlFor="newsletterKeyPointsCTAInput">Kľúčové body / CTA pre newsletter (nepovinné):</label>
          <textarea
            id="newsletterKeyPointsCTAInput"
            value={newsletterKeyPointsCTA}
            onChange={(e) => setNewsletterKeyPointsCTA(e.target.value)}
            placeholder="Napr. 'Predstavenie novej funkcie X', 'Zľava 15% na prvý nákup', 'Prečítajte si náš najnovší článok o Y'"
            rows={3}
            aria-label="Kľúčové body alebo CTA pre newsletter"
          />
        </div>
      )}
      {assetType === 'caseStudyOutline' && (
        <div className="form-group conditional-field">
          <label htmlFor="caseStudyResultsInput">Kľúčové dosiahnuté výsledky / metriky (nepovinné, uveďte konkrétne dáta ak je možné):</label>
          <textarea
            id="caseStudyResultsInput"
            value={caseStudyResults}
            onChange={(e) => setCaseStudyResults(e.target.value)}
            placeholder="Napr. Zvýšenie konverzií o 25%, Úspora času o 10 hodín týždenne, Zlepšenie spokojnosti zákazníkov o 15%..."
            rows={3}
            aria-label="Kľúčové dosiahnuté výsledky alebo metriky pre prípadovú štúdiu"
          />
        </div>
      )}
      {assetType === 'linkedinArticleOutline' && (
        <div className="form-group conditional-field">
          <label htmlFor="linkedinAudienceMessageInput">Cieľová profesionálna skupina / Hlavný odkaz článku (nepovinné):</label>
          <textarea
            id="linkedinAudienceMessageInput"
            value={linkedinAudienceMessage}
            onChange={(e) => setLinkedinAudienceMessage(e.target.value)}
            placeholder="Napr. Marketingoví manažéri, HR špecialisti, Softvéroví inžinieri. Odkaz: Chcem inšpirovať k inováciám v oblasti..."
            rows={3}
            aria-label="Cieľová profesionálna skupina alebo hlavný odkaz článku pre LinkedIn"
          />
        </div>
      )}
      <div className="action-buttons">
        <button onClick={handleGenerateAsset} disabled={isLoading} aria-live="polite" className="button-primary">
          {isLoading ? 'Generujem návrh...' : 'Vygenerovať Návrh'}
        </button>
        {generatedAsset && <button onClick={() => setGeneratedAsset('')} className="button-secondary clear-button" aria-label="Vymazať výstup generovania aktív">Vymazať výstup</button>}
        {generatedAsset && <button onClick={() => handleCopyToClipboard(generatedAsset, MODULES.ASSET_GENERATION)} className="button-secondary copy-button" aria-label="Kopírovať výstup generovania aktív">Kopírovať</button>}
      </div>
      {renderOutput(generatedAsset)}
    </div>
  )};

  const renderAppConceptGenerator = () => {
    const appConceptCheckboxes = [
      { state: generateUserStories, setState: setGenerateUserStories, label: "Generovať aj Používateľské Príbehy (User Stories)", id: "UserStories" },
      { state: generateElevatorPitch, setState: setGenerateElevatorPitch, label: "Generovať aj Elevator Pitch", id: "ElevatorPitch" },
      { state: generateUIStructure, setState: setGenerateUIStructure, label: "Generovať aj Návrh Štruktúry UI (textový popis)", id: "UIStructure" },
      { state: generateProblemsSolutions, setState: setGenerateProblemsSolutions, label: "Generovať aj Možné Problémy a Riešenia", id: "ProblemsSolutions" },
      { state: generateKPIs, setState: setGenerateKPIs, label: "Generovať aj Návrh Kľúčových Metrík (KPIs)", id: "KPIs" },
      { state: generateLandingPageConcept, setState: setGenerateLandingPageConcept, label: "Generovať aj Návrh Cieľovej Stránky (textový koncept)", id: "LandingPage" },
      { state: generateCompetitorAnalysis, setState: setGenerateCompetitorAnalysis, label: "Generovať aj Analýzu Konkurencie (stručný prehľad)", id: "CompetitorAnalysis" },
      { state: generateMarketingChannels, setState: setGenerateMarketingChannels, label: "Generovať aj Návrh Marketingových Kanálov a Stratégií", id: "MarketingChannels" },
      { state: generateMVPFeatures, setState: setGenerateMVPFeatures, label: "Generovať aj Návrh MVP Funkcií", id: "MVPFeatures" },
      { state: generateUserPersona, setState: setGenerateUserPersona, label: "Generovať aj Personu Používateľa (základný návrh)", id: "UserPersona" },
      { state: generateAboutAppText, setState: setGenerateAboutAppText, label: "Generovať aj 'O Aplikácii' text (pre app store/web)", id: "AboutAppText" },
      { state: generateOnboardingFlow, setState: setGenerateOnboardingFlow, label: "Generovať aj Používateľský Onboarding (konceptuálne kroky)", id: "OnboardingFlow" },
      { state: generateASOKeywords, setState: setGenerateASOKeywords, label: "Generovať aj Kľúčové Slová pre ASO", id: "ASOKeywords" },
    ];

    return (
        <div className="module-content">
        <h2>Generátor Konceptov Mini-Aplikácií</h2>
        <p className="module-description">Máte nápad na mini-aplikáciu? Pomôžeme vám ho rozvinúť do konkrétneho konceptu.</p>
        <div className="form-group">
            <label htmlFor="appIdeaInput">Vaša myšlienka pre mini-aplikáciu:</label>
            <textarea
                id="appIdeaInput"
                value={appIdea}
                onChange={(e) => setAppIdea(e.target.value)}
                placeholder="Popíšte vašu myšlienku pre mini-aplikáciu... Napr. Jednoduchý nástroj na sledovanie denných návykov, kvízová hra o filmoch, generátor náhodných farebných paliet."
                rows={5}
                aria-label="Vaša myšlienka pre mini-aplikáciu"
            />
        </div>
        <div className="checkbox-grid">
            {appConceptCheckboxes.map(cb => (
            <div className="form-group checkbox-group" key={cb.id}>
                <label htmlFor={`generate${cb.id}Checkbox`}>
                <input 
                    type="checkbox" 
                    id={`generate${cb.id}Checkbox`}
                    checked={cb.state} 
                    onChange={(e) => cb.setState(e.target.checked)} 
                />
                {cb.label}
                </label>
            </div>
            ))}
        </div>
        <div className="action-buttons">
            <button onClick={handleGenerateAppConcept} disabled={isLoading} aria-live="polite" className="button-primary">
            {isLoading ? 'Generujem koncept...' : 'Vygenerovať Koncept Aplikácie'}
            </button>
            {generatedAppConcept && <button onClick={() => setGeneratedAppConcept('')} className="button-secondary clear-button" aria-label="Vymazať výstup konceptu aplikácie">Vymazať výstup</button>}
            {generatedAppConcept && <button onClick={() => handleCopyToClipboard(generatedAppConcept, MODULES.APP_CONCEPT_GENERATOR)} className="button-secondary copy-button" aria-label="Kopírovať výstup konceptu aplikácie">Kopírovať</button>}
        </div>
        {renderOutput(generatedAppConcept)}
        </div>
    );
  };

  const renderDevPromptGeneratorModule = () => {
    return (
      <div className="module-content">
        <h2>Generátor Vývojárskych Promptov</h2>
        <p className="module-description">
          Zadajte vašu hlavnú myšlienku pre aplikáciu. Na jej základe bude vygenerovaný detailný prompt pre AI vývojára,
          ktorý pomôže túto myšlienku transformovať na funkčnú aplikáciu.
        </p>
        <div className="form-group">
          <label htmlFor="devPromptAppIdeaInput">Hlavná myšlienka pre aplikáciu:</label>
          <textarea
            id="devPromptAppIdeaInput"
            value={devPromptAppIdeaInput}
            onChange={(e) => setDevPromptAppIdeaInput(e.target.value)}
            placeholder="Napr. Aplikácia na správu osobných financií s gamifikáciou, Platforma pre lokálnych umelcov na predaj ich diel, Nástroj na automatické generovanie testovacích dát pre softvér..."
            rows={5}
            aria-label="Hlavná myšlienka pre aplikáciu"
          />
        </div>
        <div className="action-buttons">
          <button onClick={handleGenerateDeveloperPrompt} disabled={isLoading} aria-live="polite" className="button-primary">
            {isLoading ? 'Generujem...' : 'Generovať Vývojársky Prompt'}
          </button>
          {devPromptOutput && <button onClick={() => setDevPromptOutput('')} className="button-secondary clear-button" aria-label="Vymazať výstup vývojárskeho promptu">Vymazať výstup</button>}
          {devPromptOutput && <button onClick={() => handleCopyToClipboard(devPromptOutput, MODULES.DEV_PROMPT_GENERATOR)} className="button-secondary copy-button" aria-label="Kopírovať výstup vývojárskeho promptu">Kopírovať</button>}
        </div>
        {renderOutput(devPromptOutput)}
      </div>
    );
  };

   const renderVipModule = () => {
    const isDirectAnalysis = vipSubFunction === VIP_SUB_FUNCTIONS.DIRECT_DESIGN_ANALYSIS;
    const isAppDevPromptNoInput = vipSubFunction === VIP_SUB_FUNCTIONS.APP_DEV_PROMPT_GENERATOR;
    const isCraftPrompt = vipSubFunction === VIP_SUB_FUNCTIONS.CRAFT_PROMPT_GENERATOR;
    const isCustomAppDevPrompt = vipSubFunction === VIP_SUB_FUNCTIONS.CUSTOM_APP_DEV_PROMPT_GENERATOR;


    let buttonText = 'Vygenerovať';
    if (isDirectAnalysis) buttonText = isLoading ? 'Analyzujem...' : 'Analyzovať Dizajn Webstránky';
    if (isAppDevPromptNoInput) buttonText = isLoading ? 'Generujem...' : 'Generovať Prompt pre AI Vývojára (AI Koncept)';
    if (isCraftPrompt) buttonText = isLoading ? 'Generujem...' : 'Generovať C.R.A.F.T. Prompt';
    if (isCustomAppDevPrompt) buttonText = isLoading ? 'Generujem...' : 'Generovať Vývojársky Prompt (Vlastná Myšlienka)';
    
    return (
    <div className="module-content">
      <h2>VIP Nástroje</h2>
      <p className="module-description">Pokročilé nástroje pre analýzu a generovanie komplexných promptov.</p>

      <div className="form-group">
        <label>Vyberte VIP funkciu:</label>
        <div className="radio-group">
          <label htmlFor="vip_direct_analysis">
            <input 
              type="radio" 
              id="vip_direct_analysis" 
              name="vipSubFunction" 
              value={VIP_SUB_FUNCTIONS.DIRECT_DESIGN_ANALYSIS} 
              checked={isDirectAnalysis} 
              onChange={(e) => handleVipSubFunctionChange(e.target.value)} 
            />
            Priama Dizajnová Analýza Webstránky
          </label>
          <label htmlFor="vip_app_dev_prompt_no_input">
            <input 
              type="radio" 
              id="vip_app_dev_prompt_no_input" 
              name="vipSubFunction" 
              value={VIP_SUB_FUNCTIONS.APP_DEV_PROMPT_GENERATOR} 
              checked={isAppDevPromptNoInput} 
              onChange={(e) => handleVipSubFunctionChange(e.target.value)} 
            />
            Generátor Promptu pre AI Vývojára (AI Koncept)
          </label>
          <label htmlFor="vip_craft_prompt">
            <input 
              type="radio" 
              id="vip_craft_prompt" 
              name="vipSubFunction" 
              value={VIP_SUB_FUNCTIONS.CRAFT_PROMPT_GENERATOR} 
              checked={isCraftPrompt} 
              onChange={(e) => handleVipSubFunctionChange(e.target.value)} 
            />
            C.R.A.F.T. Prompt Generátor
          </label>
           <label htmlFor="vip_custom_app_dev_prompt">
            <input 
              type="radio" 
              id="vip_custom_app_dev_prompt" 
              name="vipSubFunction" 
              value={VIP_SUB_FUNCTIONS.CUSTOM_APP_DEV_PROMPT_GENERATOR} 
              checked={isCustomAppDevPrompt} 
              onChange={(e) => handleVipSubFunctionChange(e.target.value)} 
            />
            Generátor Vývojárskeho Promptu (Vlastná Myšlienka)
          </label>
        </div>
      </div>
      
      {isDirectAnalysis && (
        <>
          <p className="module-description">Zadajte URL adresu webovej aplikácie pre hĺbkovú analýzu dizajnu. 
            <br/><strong>Upozornenie:</strong> Generatívny model nemusí mať priamy prístup na internet na prehliadanie URL adries v reálnom čase. Kvalita analýzy môže závisieť od jeho tréningových dát a schopnosti interpretovať štruktúru URL.
          </p>
          <div className="form-group">
            <label htmlFor="vipUrlInput">URL Adresa pre analýzu:</label>
            <input
              type="url"
              id="vipUrlInput"
              value={vipUrlInput}
              onChange={(e) => setVipUrlInput(e.target.value)}
              placeholder="https://vasa-aplikacia.com"
              aria-label="URL Adresa pre analýzu"
            />
          </div>
        </>
      )}

      {isAppDevPromptNoInput && (
        <p className="module-description">
          Táto funkcia najprv AI sama navrhne koncept pre revolučnú webovú aplikáciu a následne vytvorí detailný, akčný prompt pre senior AI vývojára na jej implementáciu.
          Nevyžaduje žiadny ďalší vstup.
        </p>
      )}

      {isCraftPrompt && (
        <>
          <p className="module-description">
            Zadajte tému alebo kľúčovú myšlienku. Na základe toho bude vygenerovaný detailný prompt podľa C.R.A.F.T. metodológie, pripravený na použitie s pokročilými LLM ako ChatGPT.
          </p>
          <div className="form-group">
            <label htmlFor="vipCraftTopicInput">Téma pre C.R.A.F.T. prompt:</label>
            <textarea
              id="vipCraftTopicInput"
              value={vipCraftTopicInput}
              onChange={(e) => setVipCraftTopicInput(e.target.value)}
              placeholder="Napr. Vytvorenie marketingovej stratégie pre nový produkt, Analýza dopadov klimatických zmien na poľnohospodárstvo, Návrh edukačného programu pre digitálnu gramotnosť..."
              rows={3}
              aria-label="Téma pre C.R.A.F.T. prompt"
            />
          </div>
        </>
      )}

       {isCustomAppDevPrompt && (
        <>
          <p className="module-description">
            Zadajte vašu hlavnú myšlienku pre aplikáciu. AI ju najprv rozpracuje na komplexný koncept a potom vygeneruje detailný prompt pre AI vývojára na jej implementáciu.
          </p>
          <div className="form-group">
            <label htmlFor="vipCustomAppIdeaInput">Hlavná myšlienka pre aplikáciu:</label>
            <textarea
              id="vipCustomAppIdeaInput"
              value={vipCustomAppIdeaInput}
              onChange={(e) => setVipCustomAppIdeaInput(e.target.value)}
              placeholder="Napr. Platforma pre zdieľanie susedských služieb, Aplikácia na personalizované cvičebné plány, Nástroj na vizualizáciu historických dát..."
              rows={4}
              aria-label="Hlavná myšlienka pre aplikáciu pre VIP generátor vývojárskeho promptu"
            />
          </div>
        </>
      )}


      <div className="action-buttons">
        <button onClick={handleVipAction} disabled={isLoading} aria-live="polite" className="button-primary">
          {buttonText}
        </button>
        {vipOutput && <button onClick={() => setVipOutput('')} className="button-secondary clear-button" aria-label="Vymazať VIP výstup">Vymazať výstup</button>}
        {vipOutput && <button onClick={() => handleCopyToClipboard(vipOutput, MODULES.VIP_TOOLS)} className="button-secondary copy-button" aria-label="Kopírovať VIP výstup">Kopírovať</button>}
      </div>
      {renderOutput(vipOutput)}
    </div>
  )};


  return (
    <div className="app-layout">
      <nav className="app-sidebar">
        <div className="sidebar-header">
          <h1>Creative Project Suite</h1>
        </div>
        <ul className="sidebar-nav-list">
          {Object.entries(MODULES).map(([key, value]) => (
            <li key={value}>
              <button
                onClick={() => setActiveModule(value)}
                className={activeModule === value ? 'active' : ''}
                aria-pressed={activeModule === value}
              >
                <span className="nav-icon" aria-hidden="true">
                  {value === MODULES.PROJECT_MANAGEMENT && '📊'}
                  {value === MODULES.ASSET_GENERATION && '🎨'}
                  {value === MODULES.APP_CONCEPT_GENERATOR && '💡'}
                  {value === MODULES.DEV_PROMPT_GENERATOR && '🧑‍💻'} 
                  {value === MODULES.VIP_TOOLS && '⭐'}
                </span>
                {getModuleName(value)}
              </button>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
            <p>&copy; {new Date().getFullYear()} CPS</p>
        </div>
      </nav>

      <div className="main-content-wrapper">
        <header className="main-content-module-header">
          {/* Module title is rendered inside module content for better context */}
        </header>
        <main className="app-main-content-area">
          {error && <div className="message-container"><p className="error-message" role="alert">{error}</p></div>}
          {copySuccessMessage && <div className="message-container"><p className="success-message" role="status">{copySuccessMessage}</p></div>}
          
          {activeModule === MODULES.PROJECT_MANAGEMENT && renderProjectManagement()}
          {activeModule === MODULES.ASSET_GENERATION && renderAssetGeneration()}
          {activeModule === MODULES.APP_CONCEPT_GENERATOR && renderAppConceptGenerator()}
          {activeModule === MODULES.DEV_PROMPT_GENERATOR && renderDevPromptGeneratorModule()}
          {activeModule === MODULES.VIP_TOOLS && renderVipModule()}
        </main>
        <footer className="app-footer-main">
            <p>&copy; {new Date().getFullYear()} AI Powered Creative Project Suite. Všetky práva vyhradené.</p>
        </footer>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
