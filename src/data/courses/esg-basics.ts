// ============================================================================
// HESTIYA UNIVERSITY — COURSE 1 MASTER CONTENT
// ESG Basics for Fashion & Manufacturing Supply Chains
// Reviewed and corrected — Hestiya-owned master copy
// ============================================================================

export interface CourseLesson {
  id: number;
  ref: string; // e.g., "1.1", "2.1", "7.3"
  moduleId: number;
  moduleOrder: number;
  moduleTitle: string;
  title: string;
  duration: string;
  hook: string;
  summary: string;
  content: string[];
  subsections?: {
    heading: string;
    paragraphs: string[];
    callout?: {
      type: 'info' | 'context' | 'warning' | 'case';
      title: string;
      text: string;
    };
  }[];
  caseStudy?: {
    title: string;
    situation?: string;
    breakdown?: string;
    resolution?: string;
    lesson: string;
  };
  takeaways: string[];
  referenceIds: number[];
}

export interface CourseModule {
  id: number;
  order: number;
  title: string;
  summary: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface AssessmentQuestion {
  id: number;
  type: 'mcq' | 'short_answer';
  stem: string;
  options?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer?: 'a' | 'b' | 'c' | 'd';
  explanation?: string;
  rubric?: string;
}

export interface CourseMaster {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  hook: string;
  description: string;
  duration: string;
  totalModules: number;
  totalLessons: number;
  passMark: string;
  ilos: string[];
  audience: string[];
  courseDetails: {
    duration: string;
    modules: number;
    lessons: number;
    assessment: string;
    certificate: string;
    format: string;
    prerequisites: string;
  };
  summaryPoints: string[];
  references: { [key: number]: { text: string; url?: string } };
  assessmentQuestions: AssessmentQuestion[];
  modules: CourseModule[];
}

export const ESG_COURSE_DATA: CourseMaster = {
  slug: 'esg-basics-supply-chains',
  title: 'ESG Basics for Fashion & Manufacturing Supply Chains',
  shortTitle: 'ESG Supply Chain Basics',
  category: 'Supply Chain Audits & Compliance',
  hook: 'A company can look perfect on every financial document and still be sitting on a risk nobody was tracking. This course teaches you what that risk is, and where it is actually hiding.',
  description: `ABC looked great on paper. Revenue growing, documents clean, contracts signed. Then a scandal broke: the material it had been calling "sustainable" wasn't. The problem wasn't in ABC's own factory; it was three supplier tiers down, in a part of the chain nobody had ever visited.

That gap is where this course lives. For most fashion and manufacturing companies, the majority of both emissions and labour risk sit outside the walls a company actually controls — in dye houses, cotton farms, and factories several tiers removed from head office. This course walks through how that risk builds quietly, one unflagged operational decision at a time, and what it actually takes to close the gap before an auditor or a journalist finds it first.

You'll follow ABC's full arc: from the scandal, through mapping its real emissions footprint (Scope 1, 2 and 3), into the tools companies use to prove progress (carbon credits and I-RECs), through the labour and governance failures that were sitting alongside the environmental ones the whole time, and into the structural fix — because "it's not our job to audit" isn't a personality problem, it's what happens when no framework assigns that job to anyone.`,
  duration: '4.5 to 6 Hours',
  totalModules: 7,
  totalLessons: 22,
  passMark: '80% Benchmark',
  ilos: [
    'Define ESG and explain why it functions as a risk-management lens rather than a compliance checkbox.',
    'Identify where ESG risk concentrates in a manufacturing or fashion supply chain, distinguishing what a brand directly controls from what it remains responsible for several supplier tiers away.',
    'Classify emissions sources correctly into Scope 1, Scope 2 and Scope 3, and justify why Scope 3 typically dominates a fashion or manufacturing company\'s total footprint.',
    'Trace a product\'s full lifecycle from raw material through end of life, and assign the correct emissions scope to each stage.',
    'Differentiate carbon credits from I-RECs, and evaluate when offsetting is an appropriate response versus when it substitutes improperly for actual reduction.',
    'Explain the five core labour principles underpinning most global social audits.',
    'Analyse why governance is the pillar that determines whether environmental and social claims can be independently verified, and identify the failure pattern when one pillar is weak despite strength in the other two.',
    'Evaluate real-world case evidence, including regulatory findings against major retailers, to distinguish legitimate sustainability claims from greenwashing.',
    'Describe how fast fashion and e-commerce growth compound ESG risk simultaneously, with reference to India\'s dual role as a production and consumption hub.',
    'Apply the Three Lines Model to explain how accountability for ESG risk should be structurally assigned rather than assumed.',
    'Distinguish voluntary certificate systems from mandatory government compliance schemes, and determine which applies to a given operational scenario.',
    'Apply course concepts to a novel scenario by recommending a specific structural or reporting change a company should make to reduce ESG exposure.'
  ],
  audience: [
    'Sustainability and procurement teams at fashion and manufacturing brands, and the suppliers working within their chains.',
    'Business executives and senior managers who need to understand where ESG exposure sits without becoming specialists.',
    'College and university students, and school students in senior years, studying business, commerce, environmental science, fashion technology or supply chain management.',
    'Early-career professionals moving into sustainability, compliance, audit or responsible sourcing roles.',
    'ESG stakeholders more broadly — investors, analysts, journalists, NGO staff and consultants — who need to judge whether a company\'s public claims hold up.',
    'Anyone responsible for understanding where ESG risk actually sits, and for building the reporting and accountability structure that keeps a company\'s public claims defensible.'
  ],
  courseDetails: {
    duration: '4.5 to 6 hours',
    modules: 7,
    lessons: 22,
    assessment: '20 questions (19 multiple-choice, 1 applied short answer).',
    certificate: 'Certificate of Completion, issued on passing the assessment.',
    format: 'Scenario-based throughout, following one company from an unverified sustainability claim to a structurally accountable ESG programme.',
    prerequisites: 'None. All foundational concepts are introduced from first principles.'
  },
  summaryPoints: [
    'ESG is a risk-management lens, not a side project. Environmental, social and governance aren\'t three separate checkboxes. They are the categories where risk was always hiding — invisible on a balance sheet, but very visible the moment something goes wrong.',
    'The biggest risk usually isn\'t in your own building. For most manufacturing and fashion companies, the majority of both emissions and labour risk sit several supplier tiers away, in places a company doesn\'t directly control but is still responsible for.',
    'Reducing and offsetting are not the same thing. Carbon credits and I-RECs are legitimate tools, but they are meant to cover what genuinely can\'t be reduced yet.',
    'Governance is what makes the other two pillars believable. Without transparent, honest reporting none of it can be verified — and unverified claims are just statements.',
    'Fast fashion concentrates every ESG risk at scale, and India sits at the centre of that picture, carrying both production-side and, increasingly, consumption-side impact.',
    'Accountability has to be structurally assigned, not assumed. "It\'s not our job to audit" is what happens by default when no framework clearly assigns responsibility.',
    'Trust in the certificate market comes from independent verification. A chain of generators, verifiers and registries exists specifically so that no single party can fake the result.',
    'ABC\'s journey points to the same conclusion: none of this is easy to do alone, in-house, from scratch — which is exactly why platforms like Hestiya exist, running the GHG audits and carbon market access most companies can\'t easily build for themselves.'
  ],
  references: {
    1: { text: 'IBM. What is environmental, social and governance (ESG)?', url: 'https://www.ibm.com/think/topics/environmental-social-and-governance' },
    2: { text: 'CarbonNeutral. Scope 1, 2 and 3 emissions explained.', url: 'https://www.carbonneutral.com/news/scope-1-2-3-emissions-explained' },
    3: { text: 'CDP Worldwide (2024, September 25). Strengthening the chain.', url: 'https://www.cdp.net/en/insights/strengthening-the-chain' },
    4: { text: 'International Labour Organization (1998/2022). Declaration on Fundamental Principles and Rights at Work.', url: 'https://www.ilo.org/ilo-declaration-fundamental-principles-and-rights-work/about-declaration' },
    5: { text: 'Government of India. India Code: labour and employment legislation.', url: 'https://indiacode.gov.in' },
    6: { text: 'Maiti, R. (2026, February 3). The environmental impact of fast fashion, explained. Earth.Org.', url: 'https://earth.org/fast-fashions-detrimental-effect-on-the-environment/' },
    7: { text: 'Earth.Org (2024, December 17). The truth about online shopping and its environmental impact.', url: 'https://earth.org/online-shopping-and-its-environmental-impact/' },
    8: { text: 'Industry reporting on India\'s e-commerce and online fashion market, 2026. Figures are indicative of market scale and should be refreshed annually.' },
    9: { text: 'International Labour Organization. Child labour in South Asia.', url: 'https://www.ilo.org/resource/child-labour-south-asia' },
    10: { text: 'Data for India (2025, July 30). Women in manufacturing.', url: 'https://www.dataforindia.com/women-in-manufacturing/' },
    11: { text: 'SOMO. Bonded (child) labour in the Indian garment industry draws global attention.', url: 'https://www.somo.nl/bonded-child-labour-in-indian-garment-industry-draws-global-attention/' },
    12: { text: 'Reserved. The source naming the companies in the Lesson 5.3 case study has been deliberately omitted; the case is taught without attribution. See the QA & Change Log.' },
    13: { text: 'Greenhouse Gas Protocol (2004). A corporate accounting and reporting standard. WRI & WBCSD.', url: 'https://ghgprotocol.org/corporate-standard' },
    14: { text: 'Verra.', url: 'https://verra.org/' },
    15: { text: 'Gold Standard.', url: 'https://www.goldstandard.org/' },
    16: { text: 'Evident.', url: 'https://evident.app/' },
    17: { text: 'Xpansiv (2025, November 2). Xpansiv announces acquisition of Evident.', url: 'https://www.xpansiv.com/news/xpansiv-announces-acquisition-of-evident-to-strengthen-global-renewable-energy-markets' }
  },

  modules: [
    // ========================================================================
    // MODULE 1 — ESG FUNDAMENTALS
    // ========================================================================
    {
      id: 1,
      order: 1,
      title: 'ESG Fundamentals: Definitions and Industry Applications',
      summary: 'Learn what ESG really measures in manufacturing and fashion, why risk concentrates in indirect supplier tiers, and why global regulations are moving fast.',
      duration: '45 mins',
      lessons: [
        {
          id: 1,
          ref: '1.1',
          moduleId: 1,
          moduleOrder: 1,
          moduleTitle: 'ESG Fundamentals: Definitions and Industry Applications',
          title: 'What is ESG, and Why Should We Care?',
          duration: '14 mins',
          hook: 'An organisation can look perfect on every single financial statement and still hold a major risk no one was monitoring.',
          summary: 'Discover how ESG functions as an operational risk-management framework rather than a compliance checkbox, using the story of ABC.',
          content: [
            'Picture a company, ABC, doing absolutely everything right according to all records. Revenue is increasing, documents are spotless, contracts have been signed. Then, by the end of the year, a huge scandal breaks: what ABC had called "sustainable" turns out not to be so after all.',
            'An organisation can look perfect on every single financial statement and still hold a major risk no one was monitoring. ESG is precisely this: the part of your business that won\'t appear on a regular balance sheet, but will show itself very clearly the moment problems arise.',
            'ESG stands for three interconnected pillars:'
          ],
          subsections: [
            {
              heading: 'The Three Pillars of ESG Defined',
              paragraphs: [
                'Environmental: ABC\'s physical footprint — emissions, energy, waste, water, and how its raw materials are sourced. In manufacturing and fashion this is rarely one factory; it is spread across dye houses, cotton farms and shipping routes, pieces that are easy to lose track of individually. [1]',
                'Social: How ABC treats people across its chain — workers, factories, communities. Fair wages, safe conditions, no forced or child labour. This is also the hardest pillar to verify, because the people most affected are usually several supplier tiers away from ABC\'s own office. [1]',
                'Governance: How ABC actually runs itself — transparent reporting, ethical decisions, no quiet cover-ups. Governance is the pillar that decides whether the other two claims are even true. [1]'
              ]
            },
            {
              heading: 'Why This Matters for a Company Like Yours',
              paragraphs: [
                '1. Regulatory requirements are becoming much stricter — more markets will soon demand disclosure of both supply chain emissions and labour practices.',
                '2. Buyers and investors ask questions first, before making an order or investment decision, rather than afterwards.',
                '3. It helps you identify issues promptly — a well-monitored supply chain tends to detect inefficiencies and potential risks long before they turn into a major scandal.'
              ],
              callout: {
                type: 'warning',
                title: 'The Hidden Blind Spot',
                text: 'ABC\'s blunder wasn\'t deliberately hiding information. They had never actually checked their data — and that gap is exactly where ESG risk hides, with each department assuming someone else was keeping watch.'
              }
            }
          ],
          takeaways: [
            'ESG is not a PR exercise; it is an operational risk-management lens.',
            'A company can be spotless on financial balance sheets while harboring catastrophic operational risks.',
            'Governance is the anchor pillar: it dictates whether environmental and social claims can be proven true.'
          ],
          referenceIds: [1]
        },
        {
          id: 2,
          ref: '1.2',
          moduleId: 1,
          moduleOrder: 1,
          moduleTitle: 'ESG Fundamentals: Definitions and Industry Applications',
          title: 'ESG in the Supply Chain: Why It Starts Here',
          duration: '15 mins',
          hook: 'ABC\'s biggest ESG risk was never sitting in its own building; it was sitting in a part of the chain it didn\'t control.',
          summary: 'Why for fashion and manufacturing companies, supply chain risk is not a side topic — it is the entire story.',
          content: [
            'Let\'s go back to ABC. When the sustainability claim collapsed, ABC\'s own head office had nothing to do with it — no factory there, no dye house, nothing. The material in question came from a supplier three tiers down the chain, someone ABC\'s own team had never visited.',
            'ABC\'s biggest ESG risk was never sitting in its own building; it was sitting in a part of the chain it didn\'t control. This is true almost everywhere. A brand might directly employ a few hundred or a few thousand people, but its supply chain — raw material farms, mills, dye houses, factories, logistics — can involve tens of thousands of workers across facilities the brand doesn\'t own.',
            'That gap between what a brand controls and what a brand is responsible for is where ESG risk collects.'
          ],
          subsections: [
            {
              heading: 'Where Risk Collects Across Supplier Tiers',
              paragraphs: [
                'Environmental risk — a dye house discharging untreated wastewater, a supplier burning coal to cut costs.',
                'Social risk — underpaid workers, unsafe conditions, forced or child labour in the worst cases.',
                'Governance risk — a supplier hiding a failed audit, or a brand that never asked the hard question.'
              ],
              callout: {
                type: 'info',
                title: 'Control vs. Responsibility',
                text: 'ABC didn\'t have a governance problem in its office. It had one three tiers down — and that is exactly why "ESG in the supply chain" isn\'t a side topic. For most companies it is the whole story, and it touches whichever department eventually has to answer for it.'
              }
            }
          ],
          takeaways: [
            'A brand\'s physical footprint sits primarily outside the walls of its corporate headquarters.',
            'The gap between what a brand owns and what it remains accountable for is where risks compound.',
            'Suppliers 2 to 4 tiers removed create real legal and reputational exposures for retail brands.'
          ],
          referenceIds: [1]
        },
        {
          id: 3,
          ref: '1.3',
          moduleId: 1,
          moduleOrder: 1,
          moduleTitle: 'ESG Fundamentals: Definitions and Industry Applications',
          title: 'Why Industries Are Switching to ESG Now',
          duration: '16 mins',
          hook: 'Claiming sustainability and practising it are two different things. Audits are the moment that difference gets exposed.',
          summary: 'Examine the four powerful external forces driving global brands to transition from glossy statements to verified ESG practice.',
          content: [
            'Months after ABC\'s scandal, real auditors show up — not internal reviewers, but external ones, checking emissions and labour claims line by line. This is where the story gets uncomfortable for ABC: documents that looked fine to a customer looked very different to an auditor with the right questions.',
            'Claiming sustainability and practising it are two different things. Audits are the moment that difference gets exposed. This is exactly why industries are moving toward ESG faster than ever, driven by four forces:'
          ],
          subsections: [
            {
              heading: 'The Four Drivers of the Global Shift',
              paragraphs: [
                '1. Regulation — more markets now require real disclosure of emissions and labour practices, with penalties for staying quiet.',
                '2. Investor pressure — investors increasingly screen ESG data before allocating capital; weak data can mean exclusion from funds or a higher cost of borrowing.',
                '3. Buyer and consumer expectations — retail buyers ask for ESG documentation before placing an order; consumers factor it into what they buy.',
                '4. Risk and cost reduction — the one companies underestimate. Tracking closely enough usually reveals waste. Auditing early usually catches a problem before it becomes a scandal.'
              ]
            },
            {
              heading: 'From Ambition to Operational Practice',
              paragraphs: [
                'ABC\'s failure wasn\'t a lack of ambition — it was a lack of practice behind the claim. A company doesn\'t just run on finances; it runs on operations, and operations is where things quietly slip through.',
                'That is exactly where we go next: Scope 1, 2 and 3 emissions, the framework that closes the gap ABC didn\'t know it had. Whatever your role, understanding these three categories is what lets you spot which decisions in your own work — a shipping choice, a packaging call, a supplier switch — quietly add to a footprint nobody flagged as "environmental".'
              ]
            }
          ],
          takeaways: [
            'Audits turn unverified PR statements into legal and financial liabilities.',
            'Regulatory penalties and investor capital screening make ESG compliance a competitive necessity.',
            'Early operational auditing reveals systemic inefficiencies and prevents brand-damaging scandals.'
          ],
          referenceIds: [1, 2]
        }
      ]
    },

    // ========================================================================
    // MODULE 2 — WHERE THE FOOTPRINT IS ACTUALLY GENERATED
    // ========================================================================
    {
      id: 2,
      order: 2,
      title: 'Where the Footprint is Actually Generated',
      summary: 'Deconstruct Scope 1, 2, and 3 emissions, trace a garment lifecycle from cotton farm to disposal, and understand why value chains represent 26x direct emissions.',
      duration: '50 mins',
      lessons: [
        {
          id: 4,
          ref: '2.1',
          moduleId: 2,
          moduleOrder: 2,
          moduleTitle: 'Where the Footprint is Actually Generated',
          title: 'Meet Scope 1, 2 and 3',
          duration: '16 mins',
          hook: 'A company can be financially spotless and operationally blind at the same time.',
          summary: 'Learn the Greenhouse Gas Protocol scope framework and why Scope 3 makes up over 90% of a manufacturing brand\'s true footprint.',
          content: [
            'Every number on ABC\'s financial sheet was accurate. Revenue, cost, margin — all tracked, all clean. The problem had nothing to do with any of those numbers. It had to do with something nobody was tracking at all: where its emissions actually came from, and whose responsibility they actually were.',
            'A company can be financially spotless and operationally blind at the same time. Scope 1, 2 and 3 exist to close exactly that blind spot.'
          ],
          subsections: [
            {
              heading: 'The Three Scopes Defined',
              paragraphs: [
                'Scope 1 — direct emissions. Anything ABC owns and burns itself: a factory furnace, a company-owned delivery truck, a generator on site. If ABC owns it and it emits, it is Scope 1. [2]',
                'Scope 2 — purchased energy. The emissions created on ABC\'s behalf by the electricity or steam it buys. ABC didn\'t burn the coal, but the power plant lighting its factory did. [2]',
                'Scope 3 — everything else. Every emission connected to ABC\'s product that happens outside its own walls: a cotton farm\'s water use, a supplier\'s dye house, a shipping container crossing an ocean, even a customer washing the garment at home. This is the piece ABC never mapped, and exactly where its scandal came from. [2]'
              ]
            },
            {
              heading: 'The 26x Ratio: Why Scope 3 Dominates',
              paragraphs: [
                'For companies in manufacturing and apparel, supply chain emissions dominate: value chain footprints average roughly 26 times greater than direct operational emissions. [3]',
                'Yet while corporate finances face tight scrutiny, a large gap remains in supply chain risk management — only around 15% of businesses have set upstream emission reduction targets, despite the scale of the exposure. [3]'
              ],
              callout: {
                type: 'info',
                title: 'Key Industry Metric',
                text: 'Value chain emissions average 26x greater than direct operations in apparel. Managing Scope 1 & 2 alone leaves 95%+ of your real impact unmanaged.'
              }
            }
          ],
          takeaways: [
            'Scope 1 = Owned and directly burned; Scope 2 = Purchased electricity & steam; Scope 3 = Entire external value chain.',
            'Scope 3 averages roughly 26 times greater than direct operational emissions in fashion.',
            'Only ~15% of businesses currently set upstream targets, representing a massive industry vulnerability.'
          ],
          referenceIds: [2, 3]
        },
        {
          id: 5,
          ref: '2.2',
          moduleId: 2,
          moduleOrder: 2,
          moduleTitle: 'Where the Footprint is Actually Generated',
          title: 'How the Footprint Builds Without Anyone Noticing',
          duration: '16 mins',
          hook: 'Nobody at ABC ever sat in a meeting and decided to create a large footprint. It built up quietly, one ordinary operational decision at a time.',
          summary: 'Understand how cost-cutting, packaging tolerances, and shipping logistics quietly multiply emissions without triggering financial alarms.',
          content: [
            'Here is the part of ABC\'s story that stings. Nobody at ABC ever sat in a meeting and decided to create a large footprint. It built up quietly, one ordinary operational decision at a time: a supplier switched to a cheaper fabric that happened to need more water to dye, a shipment got split into two smaller loads instead of one full one, packaging got made slightly oversized "to be safe".',
            'None of these looked like an environmental decision when they were made. They looked like cost decisions, scheduling choices and packaging calls — the kind of everyday operational calls that never cross a finance team\'s desk. A footprint rarely shows up as one big decision. It shows up as dozens of small ones nobody flagged as environmental.',
            'This is exactly why ABC\'s finance team saw nothing wrong: the risk was never a finance problem to begin with. And it is exactly why the scopes matter in practice. Once a decision can be labelled Scope 1, 2 or 3, it can be seen. A footprint you can see is one you can start to reduce.'
          ],
          takeaways: [
            'Footprints accumulate through decentralized operational choices, not single boardroom directives.',
            'Decisions labelled "cost saving" or "packaging safety" often carry major invisible carbon impacts.',
            'Classifying activities by Scope is the first step to making operational emissions visible and manageable.'
          ],
          referenceIds: [2]
        },
        {
          id: 6,
          ref: '2.3',
          moduleId: 2,
          moduleOrder: 2,
          moduleTitle: 'Where the Footprint is Actually Generated',
          title: 'From Raw Material to Final Product: Tracing the Journey',
          duration: '18 mins',
          hook: 'Let\'s walk ABC\'s product through its full life, the way an auditor eventually did, and tag each stage with its scope.',
          summary: 'Trace a garment through agricultural farming, spinning, wet processing, assembly, shipping, and consumer end of life.',
          content: [
            'Let\'s walk ABC\'s product through its full life, the way an auditor eventually did, and tag each stage with its scope.'
          ],
          subsections: [
            {
              heading: 'Lifecycle Stage Tagging',
              paragraphs: [
                'Raw material, a cotton farm — water use, fertiliser, land use. The farm\'s own Scope 1; from ABC\'s side, Scope 3.',
                'Spinning and dyeing — energy-intensive, often water-heavy. Scope 3.',
                'Garment assembly — Scope 1 and 2 if it is ABC\'s own factory; Scope 3 if outsourced.',
                'Packaging and shipping — Scope 1 if ABC\'s own trucks; Scope 3 if third-party freight.',
                'Retail and use — store electricity, and the customer washing the product at home. Scope 3.',
                'End of life — disposal or recycling. Scope 3, and the least tracked stage of all.'
              ]
            },
            {
              heading: 'The Auditor\'s Perspective',
              paragraphs: [
                'Mapping this on paper is one thing. Tracking it continuously, across dozens of suppliers ABC has never visited, is another problem entirely. Almost every stage after ABC\'s own factory door was Scope 3 — the operational side of the business finance never touches, and exactly where auditors found what ABC had missed.',
                'Now that everything is counted and tracked, does it end here? No. Next comes how companies prove they are acting on what they found: carbon credits and I-RECs. These instruments aren\'t just a sustainability team\'s paperwork — a mishandled credit purchase becomes a finance liability, a legal exposure and a communications crisis, all at once.'
              ]
            }
          ],
          takeaways: [
            'Almost every stage outside the brand\'s owned facilities falls under Scope 3.',
            'End of life and consumer washing represent significant but widely unmonitored emission stages.',
            'Tracking raw materials to end of life requires multi-tier supplier visibility and continuous auditing.'
          ],
          referenceIds: [2, 3]
        }
      ]
    },

    // ========================================================================
    // MODULE 3 — TURNING EMISSIONS INTO REWARDS
    // ========================================================================
    {
      id: 3,
      order: 3,
      title: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
      summary: 'Differentiate Carbon Credits from I-RECs, evaluate the crucial difference between reducing and offsetting, and see why certificates act as financial shields.',
      duration: '60 mins',
      lessons: [
        {
          id: 7,
          ref: '3.1',
          moduleId: 3,
          moduleOrder: 3,
          moduleTitle: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
          title: 'What Are Carbon Credits and I-RECs?',
          duration: '15 mins',
          hook: 'Once emissions are converted into a number, that number can be traded, proven and rewarded.',
          summary: 'Understand how market instruments convert environmental performance into verifiable tradable units.',
          content: [
            'After the scandal, ABC couldn\'t just patch things up quietly. It wanted proof, on paper, that it was doing something about its emissions. That is when its team ran into two terms they had heard before but never fully understood.',
            'Once emissions are converted into a number, that number can be traded, proven and rewarded. That is exactly what these two instruments do.'
          ],
          subsections: [
            {
              heading: 'Carbon Credits vs. I-RECs',
              paragraphs: [
                'Carbon credits: one credit represents one tonne of carbon dioxide equivalent, either prevented from entering the atmosphere or removed from it. 1 carbon credit = 1 tonne of CO2e prevented or removed. Generated by projects such as forest planting, clean cookstoves or landfill methane capture. A company like ABC buys these to counterbalance emissions it hasn\'t eliminated yet.',
                'I-RECs (International Renewable Energy Certificates): prove that a unit of electricity was generated from a renewable source — solar, wind or hydro. 1 I-REC = 1 MWh of electricity from a renewable source. They do not cover emissions broadly, only electricity sourcing, which means Scope 2. If ABC buys an I-REC it is saying: this much of our electricity use is backed by renewable generation, and here is the certificate to prove it.'
              ],
              callout: {
                type: 'info',
                title: 'Quick Mathematical Definition',
                text: '1 Carbon Credit = 1 Tonne CO2e prevented or removed anywhere.\n1 I-REC = 1 MWh of renewable electricity generated and fed into the grid.'
              }
            },
            {
              heading: 'Summary Comparison',
              paragraphs: [
                'In short: carbon credits reward preventing or removing emissions anywhere in the world; I-RECs reward proving clean electricity use specifically. Both turn an invisible environmental action into something a company can hold, trade and show an auditor.'
              ]
            }
          ],
          takeaways: [
            'Carbon credits address broad emissions (Scope 1, 2, or 3) on a 1 tonne CO2e basis.',
            'I-RECs address Scope 2 purchased electricity on a 1 MWh basis.',
            'Both instruments transform environmental actions into independently verified financial certificates.'
          ],
          referenceIds: [14, 15, 16]
        },
        {
          id: 8,
          ref: '3.2',
          moduleId: 3,
          moduleOrder: 3,
          moduleTitle: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
          title: 'The Thin Line Between Reducing and Offsetting',
          duration: '15 mins',
          hook: 'Someone on ABC\'s team suggested: "Let\'s just buy enough carbon credits to cover everything, and we\'re done." That is not quite how this works.',
          summary: 'Why substituting offsets for operational reduction creates catastrophic greenwashing risks.',
          content: [
            'Someone on ABC\'s team suggested: "Let\'s just buy enough carbon credits to cover everything, and we\'re done." That is not quite how this works.'
          ],
          subsections: [
            {
              heading: 'Reducing vs. Offsetting Defined',
              paragraphs: [
                'Reducing means cutting greenhouse gas emissions at the source. It includes improving energy efficiency, switching to lower-carbon or renewable energy inputs, and redesigning products or processes to use fewer resources. Reduction usually requires higher upfront investment and longer timelines, but it produces a durable, structural decrease in the company\'s emissions baseline.',
                'Offsetting means compensating for unabated emissions by investing in external reduction or removal projects, rather than changing your own operations. Offsetting is comparatively fast and cheap to implement, but it does not alter the emissions profile of the buying organisation at all.'
              ]
            },
            {
              heading: 'The Greenwashing Trap',
              paragraphs: [
                'Offsetting without reducing is exactly the kind of shortcut that turns into another scandal. If ABC bought credits to "cover" its footprint while changing nothing operationally, an auditor — or a journalist — would eventually notice the gap. Offsetting is meant to cover what genuinely can\'t be reduced yet, not to replace the effort of reducing at all.'
              ],
              callout: {
                type: 'warning',
                title: 'The Golden Rule of Offsetting',
                text: 'Offsets are designed to neutralize unavoidable residual emissions after aggressive source reduction — never as a paper substitute for fixing factory operations.'
              }
            }
          ],
          takeaways: [
            'Reduction permanently lowers the organizational emissions baseline; offsetting leaves the operational baseline unchanged.',
            'Buying offsets to claim carbon neutrality while operational emissions rise is a primary trigger of regulatory scrutiny.',
            'Best practice prioritizes energy efficiency and renewable switching first, with verified offsets reserved for residual emissions.'
          ],
          referenceIds: [13, 14]
        },
        {
          id: 9,
          ref: '3.3',
          moduleId: 3,
          moduleOrder: 3,
          moduleTitle: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
          title: 'Why These Certificates Are a Real Asset Now',
          duration: '15 mins',
          hook: 'In the current environment, a certificate is worth more than a statement. ABC could always say it cared about the environment. Now it needs something it can actually show.',
          summary: 'How verified environmental certificates act as balance sheet shields, loan enablers, and procurement prerequisites.',
          content: [
            'ABC\'s team also discovered something they hadn\'t expected: these certificates aren\'t just a compliance checkbox. They are becoming a genuine business asset, and a shield.',
            'Investors increasingly look for proof, not promises, before putting money into a company. Buyers increasingly ask for documentation before placing an order. If a scandal breaks again, a verified carbon credit or I-REC gives ABC something concrete to hand over — not a defensive statement, but a certificate backed by an external standard.',
            'In the current environment, a certificate is worth more than a statement. ABC could always say it cared about the environment. Now it needs something it can actually show.'
          ],
          takeaways: [
            'Third-party verified certificates replace corporate claims with auditable evidence.',
            'Institutional lenders and investors use certificate ledgers to evaluate corporate borrowing costs.',
            'Major retail buyers increasingly require certificates before issuing purchase contracts.'
          ],
          referenceIds: [14, 16]
        },
        {
          id: 10,
          ref: '3.4',
          moduleId: 3,
          moduleOrder: 3,
          moduleTitle: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
          title: 'Why Changes Made Today Matter Tomorrow',
          duration: '14 mins',
          hook: 'Sustainability isn\'t a one-time repair; it is a compounding shield.',
          summary: 'Understand the compounding advantage of early emissions tracking and baseline management.',
          content: [
            'By the time ABC sorted through all of this, one thing became clear: none of it fixes yesterday\'s scandal. But it changes what next year\'s audit finds.',
            'Sustainability isn\'t a one-time repair; it is a compounding shield. Every tonne reduced today lowers the baseline the company is measured against going forward. Every I-REC purchased today builds a track record that gets harder to challenge tomorrow. The company that starts now isn\'t scrambling when the next round of auditors, or the next public scandal, comes looking.',
            'ABC\'s mistake wasn\'t that it started slowly. It is that it never started at all, until it was forced to. Fixing the carbon maths was step one. What came next was the part nobody at ABC had prepared for: proving it treated its people right, and proving it was honest about all of it.',
            'That next module isn\'t only relevant to HR or legal. A weak social or governance record is what turns an environmental win into a half-story nobody trusts, which affects how every department\'s work is perceived.'
          ],
          takeaways: [
            'Early action permanently lowers future regulatory baselines.',
            'Waiting until an audit investigation forces action results in compounding crisis costs.',
            'Environmental performance cannot stand alone without social and governance integrity.'
          ],
          referenceIds: [1, 2]
        }
      ]
    },

    // ========================================================================
    // MODULE 4 — PEOPLE AND PRINCIPLES
    // ========================================================================
    {
      id: 4,
      order: 4,
      title: 'The Foundation of Our Environment: People and Principles',
      summary: 'Master the 5 ILO fundamental labour principles, analyze the Indian statutory context, and understand why Governance is the anchor that validates E and S claims.',
      duration: '45 mins',
      lessons: [
        {
          id: 11,
          ref: '4.1',
          moduleId: 4,
          moduleOrder: 4,
          moduleTitle: 'The Foundation of Our Environment: People and Principles',
          title: 'The Social Pillar: Why People Decide the Result',
          duration: '16 mins',
          hook: 'When auditors examined ABC\'s supplier three tiers down, their review extended beyond emissions data to working conditions, wage structures and hours of labour.',
          summary: 'Examine the 5 core ILO labor principles and their interaction with Indian domestic labor statutes.',
          content: [
            'When auditors examined ABC\'s supplier three tiers down, their review extended beyond emissions data to working conditions, wage structures and hours of labour. This dimension of ESG is unrelated to carbon accounting and is concerned entirely with the treatment of people across the value chain.',
            'The social pillar is anchored in five core principles, drawn from the International Labour Organization\'s Declaration on Fundamental Principles and Rights at Work. [4]'
          ],
          subsections: [
            {
              heading: 'The Five Core ILO Labour Principles',
              paragraphs: [
                '1. Freedom of association and the effective recognition of the right to collective bargaining — workers retain the right to organise and negotiate collectively without risk of retaliation.',
                '2. The elimination of all forms of forced or compulsory labour — no worker may be coerced through threats, debt bondage, or the withholding of identity documents or wages.',
                '3. The effective abolition of child labour — prohibits employment below the legal working age, and prohibits employing minors in hazardous conditions.',
                '4. The elimination of discrimination in respect of employment and occupation — prohibits discrimination in hiring, pay, treatment or advancement on grounds such as gender, religion or ethnicity.',
                '5. A safe and healthy working environment — guarantees physical safety and occupational health, including protection from hazardous conditions, adequate safety equipment and safe facility standards.'
              ],
              callout: {
                type: 'info',
                title: 'Worth Knowing (2022 Update)',
                text: 'The fifth principle, a safe and healthy working environment, was added to the ILO Declaration in 2022. Older training material and some supplier codes still refer to four fundamental principles. If you see that number, it is out of date rather than wrong in substance.'
              }
            },
            {
              heading: 'The Indian Statutory Context',
              paragraphs: [
                'These international principles are mirrored, though not always uniformly enforced, in Indian domestic law. Freedom of association is protected under the Trade Unions Act, 1926; prohibitions on forced labour are codified in the Bonded Labour System (Abolition) Act, 1976; child labour is addressed under the Child Labour (Prohibition and Regulation) Act, 1986, as amended in 2016, which bans employment of children in hazardous occupations. Occupational safety and health standards are consolidated under the Occupational Safety, Health and Working Conditions Code, 2020. [5]',
                'Enforcement, however, remains uneven, particularly in the unorganised and home-based textile sector, which falls largely outside the direct regulatory reach of these statutes.',
                'The practical consequence: for a company sourcing from India, compliance with international ILO principles does not automatically guarantee compliance with the specific mechanics of Indian labour law, and vice versa. Both frameworks need to be checked independently against a given supplier.',
                'ABC\'s environmental remediation carried limited value if the same supplier tier was concurrently non-compliant on wage, safety or health standards. Social risk occupies the same structural blind spot as Scope 3 emissions: several tiers removed from direct oversight, infrequently audited, and often assumed compliant in the absence of evidence to the contrary.'
              ]
            }
          ],
          takeaways: [
            'The ILO Declaration comprises five fundamental principles (the 5th was added in 2022).',
            'International ILO compliance does not guarantee compliance with Indian statutory nuances (and vice versa); both must be audited independently.',
            'Social risk sits in the exact same blind spot as Scope 3: tiers removed and assumed compliant until a crisis hits.'
          ],
          referenceIds: [4, 5]
        },
        {
          id: 12,
          ref: '4.2',
          moduleId: 4,
          moduleOrder: 4,
          moduleTitle: 'The Foundation of Our Environment: People and Principles',
          title: 'The Governance Pillar: How Transparency Builds Trust',
          duration: '14 mins',
          hook: 'Here is the uncomfortable question ABC\'s leadership faced after the scandal: even if every fix is real, why should anyone believe them now?',
          summary: 'Discover why Governance is the operating system of sustainability, without which E and S claims cannot be believed.',
          content: [
            'Here is the uncomfortable question ABC\'s leadership faced after the scandal: even if every fix is real, why should anyone believe them now? That question is what governance exists to answer.',
            'Governance covers transparent reporting — publishing real numbers, not just favourable ones. Ethical leadership — decisions made with accountability, not just convenience. Anti-corruption practices — no bribery, no falsified paperwork, no looking away from a supplier\'s failed audit. And follow-through — doing what the company said it would do, not just announcing it.',
            'A customer or investor can\'t verify a company\'s internal operations directly; they rely on what the company chooses to disclose. Trust, once broken by a governance failure, doesn\'t return just because the underlying problem gets fixed. It returns when the company proves, repeatedly, that its reporting can be relied on.',
            'ABC\'s scandal was ultimately a governance failure before it was anything else. Nobody asked the hard question, and nobody was made to answer for not asking.'
          ],
          takeaways: [
            'Governance covers reporting transparency, ethical management, anti-bribery, and accountability.',
            'Broken trust is restored only through sustained, verifiable reporting, not public apologies.',
            'Most supply chain crises stem from governance failures: failing to ask the hard question or assign audit ownership.'
          ],
          referenceIds: [1]
        },
        {
          id: 13,
          ref: '4.3',
          moduleId: 4,
          moduleOrder: 4,
          moduleTitle: 'The Foundation of Our Environment: People and Principles',
          title: 'Three Pillars, One Trustworthy Picture',
          duration: '15 mins',
          hook: 'E, S and G were never three separate boxes to tick. They hold each other up.',
          summary: 'Why an organization cannot be "halfway sustainable" if one pillar fails, and why Governance anchors everything.',
          content: [
            'Here is the part ABC\'s team understood last, and probably should have understood first: E, S and G were never three separate boxes to tick. They hold each other up.',
            'Environmental claims without governance are just statements nobody can verify. Social conditions without governance are just conditions nobody is reporting honestly. Governance without environmental or social substance behind it is a well-written policy document with nothing real underneath.',
            'A simple way to see it: governance is the mechanism that proves whether environmental and social claims are true. If governance fails, it doesn\'t matter how good the environmental or social practices actually are, because nobody has reason to believe they are real.',
            'If one pillar is violated, a company can\'t be considered to be practising ESG. A company that pollutes responsibly but mistreats workers isn\'t halfway sustainable — it has a serious problem. A company with clean labour practices but no honest reporting isn\'t trustworthy; it is unverifiable. A company strong in two pillars and weak in the third is still exposed exactly where the weak pillar is.',
            'Up to this point ABC has been a single cautionary example. But ABC isn\'t unusual; it is representative. The next module zooms out from one company\'s mistake to an entire industry\'s pattern, with India at the centre of the picture, since India is the world\'s second-largest textile and garment manufacturer.'
          ],
          takeaways: [
            'E, S, and G are interdependent; strength in two cannot compensate for failure in the third.',
            'Governance is the verification mechanism that renders Environmental and Social performance credible.',
            'Unverified claims are merely marketing statements in the eyes of regulators and institutional investors.'
          ],
          referenceIds: [1]
        }
      ]
    },

    // ========================================================================
    // MODULE 5 — REAL-LIFE CHALLENGES
    // ========================================================================
    {
      id: 5,
      order: 5,
      title: 'Real-Life Challenges That Hurt Our Efficiency',
      summary: 'Analyze fast fashion and e-commerce emissions, examine dyeing effluent, Sumangali labor dynamics, and study an anonymized European regulatory greenwashing case.',
      duration: '50 mins',
      lessons: [
        {
          id: 14,
          ref: '5.1',
          moduleId: 5,
          moduleOrder: 5,
          moduleTitle: 'Real-Life Challenges That Hurt Our Efficiency',
          title: 'Fast Fashion: A Bane to Sustainability',
          duration: '18 mins',
          hook: 'Fast fashion runs on getting new styles to shelves or screens as quickly and cheaply as possible. Speed creates pressure, and pressure is where ESG problems grow.',
          summary: 'Examine the global emissions profile of fast fashion, online return logistics, and India\'s dual role as producer and consumer.',
          content: [
            'As ABC starts mapping its supplier network more carefully, it notices a pattern repeating across the industry: fast fashion runs on getting new styles to shelves or screens as quickly and cheaply as possible. That speed creates pressure at every stage of the supply chain, and pressure is where ESG problems grow.',
            'Speed pushes sourcing toward the cheapest, fastest supplier rather than the most responsible one. Cheap, fast production usually means cutting corners somewhere: material quality, wages or environmental controls. High turnover of styles means high turnover of waste, in both production scraps and quickly discarded garments.'
          ],
          subsections: [
            {
              heading: 'The Global Scale of the Challenge',
              paragraphs: [
                'Fast fashion is the second-biggest consumer of water and responsible for roughly 10% of global carbon emissions — more than all international flights and maritime shipping combined. [6]',
                'An estimated 85% of all textiles produced end up in dumps each year, and emissions from textile manufacturing are projected to rise 60% by 2030. [6]',
                'Online shopping compounds this: shipping and returns together account for roughly 37% of total e-commerce-related emissions, and fashion items see return rates exceeding 30%, meaning much of what is shipped is shipped again. Fast delivery options generate more emissions than standard shipping, since delivery vehicles often go out half-full to meet tight windows. An estimated 86 million tonnes of plastic packaging is produced yearly for e-commerce, with less than 14% recycled. [7]'
              ]
            },
            {
              heading: 'The Indian Picture',
              paragraphs: [
                'India\'s online fashion market has grown rapidly alongside the global e-commerce boom. The same packaging and returns pressure applies here, which means India isn\'t just a production hub for fast fashion — it is becoming a major consumption hub too, carrying both ends of the environmental cost. [8]',
                'These aren\'t abstract statistics happening somewhere else. They describe exactly the kind of fast, cheap, high-volume decisions that led to ABC\'s scandal in the first place, repeated across an entire industry and amplified by online shopping habits.'
              ]
            }
          ],
          takeaways: [
            'Fashion generates ~10% of global emissions and 85% of manufactured textiles end up dumped annually.',
            'E-commerce return rates exceeding 30% significantly amplify Scope 3 transport footprints.',
            'India carries dual impact as both the world\'s second-largest producer and an exploding domestic consumer market.'
          ],
          referenceIds: [6, 7, 8]
        },
        {
          id: 15,
          ref: '5.2',
          moduleId: 5,
          moduleOrder: 5,
          moduleTitle: 'Real-Life Challenges That Hurt Our Efficiency',
          title: 'How Sourcing, Dyeing, Labour and Greenwashing Quietly Erode Trust',
          duration: '16 mins',
          hook: 'Fabric sourcing, dyeing pollution, labour conditions and greenwashing aren\'t four separate problems. They are four symptoms of the same root cause.',
          summary: 'Real metrics on textile dyeing effluent, female workforce participation, Sumangali labour schemes, and greenwashing patterns.',
          content: [
            'Fabric sourcing, dyeing pollution, labour conditions and greenwashing aren\'t four separate problems. They are four symptoms of the same root cause: a business model that moves faster than its own ability to verify what it is doing.'
          ],
          subsections: [
            {
              heading: 'Environmental: Fabric Sourcing and Dyeing',
              paragraphs: [
                'Producing one cotton shirt requires about 700 gallons of water; one pair of jeans requires roughly 2,000 gallons. [6]',
                'Textile dyeing is considered the world\'s second-largest polluter of water, since leftover dye water is often discharged into ditches, streams or rivers.',
                'Dyeing and finishing account for 36% of the industry\'s total pollution impact, yarn preparation 28%, and fibre production 15%.',
                'India\'s textile hubs, including major dyeing and processing clusters, contribute directly to this global dyeing-pollution figure given the country\'s scale of production.'
              ]
            },
            {
              heading: 'Social: Labour Conditions and Vulnerabilities',
              paragraphs: [
                'India\'s textile and apparel industry employs over 45 million workers. Official data puts women\'s share at roughly 65% in apparel manufacturing specifically and close to half in textiles overall, with broader estimates running higher, in the 60 to 70% range, when informal and home-based segments are included. [10]',
                'The ILO estimates around 5.8 million children between ages 5 and 17 work under poor conditions in India, the highest number in South Asia. [9]',
                'A specific documented pattern in South India: the "Sumangali" scheme in Tamil Nadu\'s spinning mills, where young women and girls, often recruited between ages 14 and 18, work under arrangements researchers have flagged as exploitative. Estimates range from roughly 100,000 to as many as 300,000 girls and young women under Sumangali-type schemes in Tamil Nadu. [11]'
              ]
            },
            {
              heading: 'Governance: The Greenwashing Trap',
              paragraphs: [
                'Greenwashing happens when a company\'s public sustainability claims outpace what it can actually prove.',
                'This isn\'t limited to small or obscure companies. It happens at some of the largest, most well-known global brands, several of which also source heavily from India.',
                'India has real laws protecting workers, as most countries do. The gap isn\'t the law itself — it is enforcement, especially in the unorganised sector, and that enforcement gap is exactly the kind of governance blind spot ABC\'s story has been building toward.'
              ]
            }
          ],
          takeaways: [
            'Dyeing and wet finishing drive over a third of textile pollution impact worldwide.',
            'Apparel assembly relies heavily on female labour (60-70%), requiring dedicated gender and safety auditing.',
            'The core risk in major sourcing nations is an enforcement gap in informal sub-tiers, not an absence of law.'
          ],
          referenceIds: [6, 9, 10, 11]
        },
        {
          id: 16,
          ref: '5.3',
          moduleId: 5,
          moduleOrder: 5,
          moduleTitle: 'Real-Life Challenges That Hurt Our Efficiency',
          title: 'Case Study: When Sustainability Claims Met a Regulator',
          duration: '16 mins',
          hook: 'The companies were not accused of lying about their factories — they were investigated over claims consumers could not check.',
          summary: 'Examine an anonymized European regulatory enforcement case where unverified retail sustainability claims met consumer protection law.',
          content: [
            'HOW TO READ THIS CASE: The companies involved are not named here. The point of the case is the pattern and the regulatory outcome, not the identity of the brands. Naming them adds nothing to what you are meant to learn, and invites you to treat this as a story about two bad companies rather than a structural risk that applies to almost every large retailer.'
          ],
          caseStudy: {
            title: 'European National Regulator Investigation (2021)',
            situation: 'In 2021, a European national consumer-protection regulator opened an investigation into potentially misleading sustainability claims across the clothing sector. The investigation examined two major international clothing retailers, both of which source significant production from Asia, including India. The regulator\'s concern was that both companies were making sustainability claims consumers could not easily verify, or that overstated the actual environmental benefit.',
            breakdown: 'Both retailers used broad, reassuring terminology on consumer tags ("conscious", "responsible") without clear methodological proof or independent third-party certification accessible to buyers.',
            resolution: 'Both companies committed to communicating their sustainability claims more clearly going forward. Both agreed to make substantial donations to sustainability-related causes, in the mid-six-figure euro range each. Because of these commitments the regulator chose not to impose formal sanctions, but continued monitoring compliance for two years afterwards.',
            lesson: 'Environmental and social claims mean very little without strong governance behind them. The failure was in verifiability, not necessarily in intent. Furthermore, a brand\'s public claims are only as trustworthy as its weakest, least-audited supplier tier, wherever that tier happens to be.'
          },
          takeaways: [
            'Regulators enforce against unverifiable claims just as strictly as intentional fraud.',
            'Corporate commitments and six-figure settlements are the direct consequence of premature marketing claims.',
            'A global brand\'s reputation is dictated by its least-audited, most obscure supplier tier.'
          ],
          referenceIds: [12]
        }
      ]
    },

    // ========================================================================
    // MODULE 6 — FROM PAPERS TO PEERS
    // ========================================================================
    {
      id: 6,
      order: 6,
      title: 'From Papers to Peers: Changing Reality in Real Time',
      summary: 'Implement the Three Lines Model of governance, align Procurement, Compliance, and Audit, and apply the GHG Protocol\'s 5 core accounting principles.',
      duration: '45 mins',
      lessons: [
        {
          id: 17,
          ref: '6.1',
          moduleId: 6,
          moduleOrder: 6,
          moduleTitle: 'From Papers to Peers: Changing Reality in Real Time',
          title: 'The "It\'s Not Our Job to Audit" Mindset',
          duration: '15 mins',
          hook: '"It\'s not our job to audit" isn\'t a personality flaw; it is what happens by default when no framework assigns that job to anyone clearly.',
          summary: 'Apply the Institute of Internal Auditors\' Three Lines Model to eliminate the corporate accountability gap.',
          content: [
            'This module answers the question the whole course has been building toward: whose job is this? The short answer is that it is structurally everyone\'s — and here is exactly how that gets assigned so it doesn\'t quietly become no one\'s.',
            'When ABC\'s scandal first broke, one detail stood out during the internal review: several people across different departments had noticed small red flags over the years — an odd invoice, a supplier that was oddly difficult to reach, a report that didn\'t quite add up. Nobody acted. Every person assumed someone else, somewhere else in the company, was responsible for catching it.',
            'This isn\'t just an ABC problem. It is a well-documented organisational failure pattern, and it has a name in corporate governance: the accountability gap that appears when risk management responsibilities aren\'t clearly assigned.'
          ],
          subsections: [
            {
              heading: 'The Three Lines Model Explained',
              paragraphs: [
                'Developed by the Institute of Internal Auditors, this model assigns distinct, complementary responsibilities:',
                'First line — the people running day-to-day operations (procurement, factory managers, logistics), who actually manage and own risk as part of their regular job.',
                'Second line — risk, compliance and control functions that set policy, provide guidance and monitor whether the first line is actually following it.',
                'Third line — internal audit, an independent function reporting directly to the top governing body of the organisation, which checks whether the whole system is working.',
                'The model works because it removes ambiguity. Instead of everyone assuming someone else is watching, each line has a specific, assigned responsibility, so a coverage gap becomes visible instead of invisible.'
              ]
            }
          ],
          takeaways: [
            'Unassigned risk management inevitably defaults to nobody taking action.',
            'First line owns risk; Second line sets policies & monitors; Third line independently audits.',
            'The Three Lines Model removes ambiguity by making risk identification an explicit structural duty.'
          ],
          referenceIds: [1]
        },
        {
          id: 18,
          ref: '6.2',
          moduleId: 6,
          moduleOrder: 6,
          moduleTitle: 'From Papers to Peers: Changing Reality in Real Time',
          title: 'Different Departments, One Goal',
          duration: '15 mins',
          hook: 'A procurement team chasing the cheapest supplier and a compliance team chasing the safest supplier are working against each other unless both understand they serve the same goal.',
          summary: 'How to dismantle departmental silos between commercial buyers, HR, compliance, and executive leadership.',
          content: [
            'Fixing ABC\'s accountability gap didn\'t mean hiring one new ESG department and calling it solved. It meant getting departments that never used to talk to each other — procurement, HR, finance, operations — working from the same shared goal.',
            'First-line departments such as procurement and factory operations are the ones actually making sourcing and production decisions day to day. Second-line departments such as compliance and sustainability set the policies those first-line teams follow, and check in regularly. Third line, internal audit, independently verifies that both are functioning, without being managed by either.',
            'A procurement team chasing the cheapest supplier and a compliance team chasing the safest supplier are working against each other unless both understand they are serving the same underlying goal: a supply chain that doesn\'t blow up into a scandal.',
            'A safe environment isn\'t just physical safety on a factory floor. It includes environmental safety, fair labour practices and honest reporting — the same three pillars this course has been building since Module 1.',
            'ABC\'s departments weren\'t fighting each other on purpose. They had no shared framework connecting their separate jobs to one outcome. Once that framework exists, "not my department" stops being a valid excuse, because every department can see how its part connects to the whole.'
          ],
          takeaways: [
            'Commercial buying pressure is the root cause of supplier non-compliance.',
            'Sustainability cannot succeed as a siloed standalone department.',
            'Aligning procurement metrics with compliance standards prevents structural audit failures.'
          ],
          referenceIds: [1]
        },
        {
          id: 19,
          ref: '6.3',
          moduleId: 6,
          moduleOrder: 6,
          moduleTitle: 'From Papers to Peers: Changing Reality in Real Time',
          title: 'Learning How to Track Everyday Emissions',
          duration: '15 mins',
          hook: 'Applying the same rigour to completeness, consistency and accuracy that a finance team applies to a balance sheet is what closes the carbon gap.',
          summary: 'Master the 5 core accounting principles of the GHG Protocol Corporate Standard (Relevance, Completeness, Consistency, Transparency, Accuracy).',
          content: [
            'None of the accountability structure in the previous two lessons means much without an actual, consistent way to measure emissions day to day. This is where most companies, including ABC before its scandal, either skip the hard part or do it inconsistently.',
            'The global standard most companies use is the GHG Protocol Corporate Accounting and Reporting Standard. It is not a minor or obscure framework: in 2016, 92% of Fortune 500 companies responding to CDP used the GHG Protocol directly or indirectly through a programme based on it. [13]'
          ],
          subsections: [
            {
              heading: 'The Five GHG Protocol Principles',
              paragraphs: [
                '1. Relevance — the data should reflect the company\'s actual emissions and serve real decision-making.',
                '2. Completeness — all sources within the chosen boundary must be counted; a company cannot selectively leave out inconvenient numbers.',
                '3. Consistency — the same methods should be used over time, so year-to-year comparisons are meaningful.',
                '4. Transparency — assumptions and methods must be clearly disclosed, not buried or left vague.',
                '5. Accuracy — emissions should never be systematically over- or understated in either direction.'
              ],
              callout: {
                type: 'info',
                title: 'Accounting Analogy',
                text: 'Carbon accounting must mirror financial accounting: leaving out Scope 3 emissions is identical to leaving out supplier invoices from a corporate balance sheet.'
              }
            },
            {
              heading: 'Daily Operational Tracking',
              paragraphs: [
                'Tracking everyday emissions means these five principles get applied continuously, not stitched together once a year for a report. A factory manager logging fuel use, a logistics team logging shipment routes, a procurement team logging supplier energy sources — all of it feeds the same system.',
                'ABC\'s finances were tracked daily, consistently and accurately. Its emissions weren\'t, until it was forced to. Applying the same rigour to completeness, consistency and accuracy closes that exact gap.',
                'One question remains: when ABC actually buys a carbon credit or an I-REC, who is on the other side of that transaction, and how does anyone know the certificate is real?'
              ]
            }
          ],
          takeaways: [
            'Over 90% of Fortune 500 companies reporting emissions use the GHG Protocol standard.',
            'The five principles are: Relevance, Completeness, Consistency, Transparency, and Accuracy.',
            'Continuous daily logging across operations replaces inaccurate annual guesswork.'
          ],
          referenceIds: [13]
        }
      ]
    },

    // ========================================================================
    // MODULE 7 — TRACES TO CAPITAL
    // ========================================================================
    {
      id: 7,
      order: 7,
      title: 'Traces to Capital: What Actual Market Players Ask For',
      summary: 'Navigate the complete carbon credit and I-REC market transaction chain, understand retirement registries, and contrast voluntary markets with India\'s mandatory CCTS.',
      duration: '45 mins',
      lessons: [
        {
          id: 20,
          ref: '7.1',
          moduleId: 7,
          moduleOrder: 7,
          moduleTitle: 'Traces to Capital: What Actual Market Players Ask For',
          title: 'Who Generates, Who Buys, and How These Certificates Are Sold',
          duration: '16 mins',
          hook: 'Carbon credits don\'t appear out of nowhere. There is a specific chain of players behind every single one.',
          summary: 'Walk step-by-step through the 5-stage lifecycle of carbon credits and I-RECs from project generator to permanent retirement.',
          content: [
            'Carbon credits don\'t appear out of nowhere. There is a specific chain of players behind every single one, and understanding this chain is what lets a company like ABC actually trust what it is buying.'
          ],
          subsections: [
            {
              heading: 'The Carbon Credit Transaction Chain',
              paragraphs: [
                '1. Generator (project developer) — an organisation running an actual emissions-reducing project: a mangrove restoration site, a clean cookstove programme, a landfill methane capture system.',
                '2. Verifier (independent auditor) — a third party who checks the project\'s claims before any credit is issued, so a generator can\'t simply assert a reduction happened without proof.',
                '3. Registry (standard-setter) — organisations such as Verra and Gold Standard, which don\'t buy or sell credits themselves but set the rules, issue the credits, and maintain a public ledger tracking every credit from issuance to final use. [14] [15]',
                '4. Buyer — a company like ABC, purchasing either directly from a project developer or through a broker, marketplace or exchange.',
                '5. Retirement — once a buyer uses a credit to offset emissions, the registry marks it retired, permanently removing it from circulation so it can never be resold or counted twice.'
              ]
            },
            {
              heading: 'The I-REC Chain in Parallel',
              paragraphs: [
                '1. Generator — a renewable power producer: a solar farm, wind installation or hydro plant registering its output.',
                '2. Issuer — a local body accredited under the I-REC Standard, responsible for issuing certificates in a given country or region.',
                '3. Registry — Evident, now operating under Xpansiv, administers the I-REC Standard, maintaining the ledger of issuance, transfer and use across markets. [16] [17]',
                '4. Buyer — a company purchasing I-RECs to back its electricity use with a renewable-source guarantee.',
                '5. Redemption — the I-REC equivalent of retirement: once used, a certificate is redeemed and can\'t be reused or resold.'
              ],
              callout: {
                type: 'info',
                title: 'Why Structural Separation Matters',
                text: 'The Verified Carbon Standard run by Verra has issued over 1 billion credits and strictly does NOT buy, sell or trade credits. Maintaining financial distance between rule-makers and market traders is what gives the registry credibility.'
              }
            }
          ],
          takeaways: [
            'Both markets rely on a 5-step chain: Generator → Verifier/Issuer → Registry → Buyer → Retirement/Redemption.',
            'Retirement (carbon credits) and Redemption (I-RECs) permanently cancel the certificate to prevent double counting.',
            'Standard-setting registries (Verra, Gold Standard, Evident) remain independent from commercial trading to protect integrity.'
          ],
          referenceIds: [14, 15, 16, 17]
        },
        {
          id: 21,
          ref: '7.2',
          moduleId: 7,
          moduleOrder: 7,
          moduleTitle: 'Traces to Capital: What Actual Market Players Ask For',
          title: 'The Relevance of These Certificates',
          duration: '14 mins',
          hook: 'Verification replaces trust with evidence.',
          summary: 'Why independent public ledgers replace empty claims with auditable assets and why certificate prices vary.',
          content: [
            'By now ABC understands what a certificate is and where it comes from. But why does the market demand these, instead of just trusting a company\'s word?',
            'Verification replaces trust with evidence. A company can state that it decreased its emissions. With a retired carbon credit or a redeemed I-REC, that statement means an independent auditor confirmed it, the registry recorded it, and no other organisation can claim the same tonne again. This is the same point Module 4 made about governance: a claim without independent verification is only a statement; a claim supported by a certificate is verifiable.',
            'A buyer needs to be sure they are buying something genuinely valuable, not just paper. Researching each project individually would take enormous time, so buyers effectively delegate that work to the independent organisations that have already carried out verification — Verra, Gold Standard and Evident. This also explains why credit prices differ so widely, from a few euros to hundreds per tonne: better verification quality and stronger co-benefits, such as community health or biodiversity gains, command a higher price.',
            'ABC\'s scandal happened because there was no independent verification before the company announced its claim. The entire carbon credit and I-REC market is built to prevent exactly that mistake.'
          ],
          takeaways: [
            'A claim without independent verification is merely a marketing statement; with a retired certificate, it is auditable proof.',
            'Buyers delegate due diligence to accredited registries (Verra, Gold Standard, Evident).',
            'Credit pricing reflects audit rigor, permanence, and high-integrity co-benefits.'
          ],
          referenceIds: [14, 15, 16]
        },
        {
          id: 22,
          ref: '7.3',
          moduleId: 7,
          moduleOrder: 7,
          moduleTitle: 'Traces to Capital: What Actual Market Players Ask For',
          title: 'Government-Established Bodies Versus Private Market Players',
          duration: '15 mins',
          hook: 'Voluntary market credits are about choice — a company buys them because it wants to. Compliance market certificates are about law.',
          summary: 'Distinguish voluntary standards (Verra, Gold Standard) from mandatory compliance mechanisms, with a deep dive into India\'s Carbon Credit Trading Scheme (CCTS).',
          content: [
            'Not every certificate in this market comes from the same kind of authority. Some are run by governments as mandatory compliance systems. Others are run by private, non-profit standard-setters as voluntary systems. ABC needs to understand both, because they work differently.'
          ],
          subsections: [
            {
              heading: 'Private Players (Voluntary Carbon Market)',
              paragraphs: [
                'Verra, Gold Standard and the American Carbon Registry are independent, non-profit organisations. They set methodological rules, accredit auditors and maintain registries, but participation is voluntary.',
                'Companies use these because they choose to, often to meet self-set climate or ESG commitments, not because a law requires it.'
              ]
            },
            {
              heading: 'Government Compliance Schemes: India\'s CCTS',
              paragraphs: [
                'India operates its own government-run system, the Carbon Credit Trading Scheme (CCTS), replacing the earlier Perform, Achieve and Trade (PAT) energy efficiency programme.',
                'Under CCTS, the Bureau of Energy Efficiency (BEE) acts as administrator, the Grid Controller of India operates the registry, and the Central Electricity Regulatory Commission (CERC) provides market oversight.',
                'This is a mandatory compliance mechanism: the government sets emission intensity targets for energy-intensive sectors. Companies that beat their targets earn tradable Carbon Credit Certificates; companies that miss them must buy certificates to cover the shortfall.',
                'Textiles is one of the sectors directly included under CCTS, alongside iron and steel, aluminium and cement.',
                'India also runs a voluntary offset mechanism under the same scheme, open to companies not otherwise required to participate, covering projects such as renewable energy, green hydrogen and afforestation.'
              ],
              callout: {
                type: 'context',
                title: 'Mandatory Compliance vs. Voluntary Choice',
                text: 'Under CCTS, exceeding emission caps is a statutory violation requiring certificate purchases. Understanding whether a policy is mandatory or voluntary is critical for manufacturing operations.'
              }
            }
          ],
          takeaways: [
            'Voluntary markets (Verra, Gold Standard) serve self-set corporate climate targets.',
            'Compliance schemes (India CCTS) are legally binding intensity caps administered by statutory bodies (BEE, Grid-India, CERC).',
            'Textile manufacturing in India is directly governed under mandatory CCTS obligations.'
          ],
          referenceIds: [5, 14, 15]
        }
      ]
    }
  ],

  // ==========================================================================
  // FINAL CERTIFICATION ASSESSMENT (Q1 - Q20)
  // ==========================================================================
  assessmentQuestions: [
    {
      id: 1,
      type: 'mcq',
      stem: "A company's finance team reports zero irregularities for three straight years. Then, at year end, a supplier scandal breaks. What does this most likely tell you?",
      options: {
        a: "ESG risk only affects companies with weak financial performance",
        b: "The scandal had nothing to do with the company's actual operations",
        c: "Financial tracking and ESG/operational risk are tracked through entirely separate systems",
        d: "The finance team was incompetent"
      },
      correctAnswer: 'c',
      explanation: "Financial balance sheets track monetary revenue and cost, whereas ESG risks concentrate in operational supplier tiers that traditional financial audits never inspect."
    },
    {
      id: 2,
      type: 'mcq',
      stem: "A brand's own factory has excellent safety records and clean emissions data. Which of the following could still put the brand at serious ESG risk?",
      options: {
        a: "A rise in raw material prices",
        b: "A delay in the quarterly earnings report",
        c: "A competitor launching a similar product",
        d: "A dye house two supplier tiers away dumping untreated wastewater"
      },
      correctAnswer: 'd',
      explanation: "ESG accountability extends multi-tiers down the supply chain; an uninspected dye house dumping untreated effluent creates material liability for the retail brand."
    },
    {
      id: 3,
      type: 'mcq',
      stem: 'A company installs solar panels at its own factory and calls itself "green". What should you check before accepting this claim?',
      options: {
        a: "Whether solar energy is currently trending in the news",
        b: "How much the solar panels cost",
        c: "Whether a competitor made a similar claim first",
        d: "Whether the claim is independently verified and covers the full supply chain, not just one factory"
      },
      correctAnswer: 'd',
      explanation: "Solar panels on a corporate facility only impact a fraction of Scope 1/2; true sustainability requires third-party verification and addressing Scope 3 supply chain footprint."
    },
    {
      id: 4,
      type: 'mcq',
      stem: "A company owns a delivery truck. The truck burns fuel while transporting goods. Which scope does this fall under?",
      options: {
        a: "It isn't counted under any scope",
        b: "Scope 1",
        c: "Scope 3",
        d: "Scope 2"
      },
      correctAnswer: 'b',
      explanation: "Direct fuel combustion in vehicles owned or directly controlled by the reporting organization is classified strictly as Scope 1."
    },
    {
      id: 5,
      type: 'mcq',
      stem: "A factory buys electricity from the local grid to run its machines. Which scope does this fall under, from the factory's side?",
      options: {
        a: "Scope 1",
        b: "It isn't the factory's responsibility",
        c: "Scope 3",
        d: "Scope 2"
      },
      correctAnswer: 'd',
      explanation: "Indirect emissions from purchased electricity, steam, heating, or cooling consumed by the reporting company are classified as Scope 2."
    },
    {
      id: 6,
      type: 'mcq',
      stem: "A company sources cotton from a farm it does not own, several tiers back in its supply chain. Which scope does the farm's water and land use fall under, in the company's own accounting?",
      options: {
        a: "None, since the company doesn't own the farm",
        b: "Scope 1",
        c: "Scope 3",
        d: "Scope 2"
      },
      correctAnswer: 'c',
      explanation: "Emissions and environmental impacts from upstream raw agricultural production outside the company's direct ownership fall under Scope 3 (Category 1: Purchased Goods)."
    },
    {
      id: 7,
      type: 'mcq',
      stem: "Why do most fashion and manufacturing companies find Scope 3 makes up the largest share of their footprint?",
      options: {
        a: "Scope 3 is calculated in a different currency",
        b: "Scope 1 and 2 emissions don't legally count toward a footprint",
        c: "Most of a garment's impact happens outside the company's own factory, in sourcing, processing and shipping",
        d: "Scope 3 uses a stricter measurement standard"
      },
      correctAnswer: 'c',
      explanation: "In apparel and consumer goods, ~80-92% of footprint sits in raw agricultural extraction, chemical synthesis, wet processing, and transport across external supplier networks."
    },
    {
      id: 8,
      type: 'mcq',
      stem: "A company buys enough carbon credits to mathematically cancel out its entire footprint, but changes nothing about how it operates. What is the biggest long-term risk?",
      options: {
        a: "All sustainability standards require exactly this approach",
        b: "Carbon credits expire after one year, so this fixes itself",
        c: "None, since the maths balances out",
        d: "The gap between the certificate and actual practice is likely to be exposed eventually"
      },
      correctAnswer: 'd',
      explanation: "Offsetting without source reduction is viewed by regulators and auditors as greenwashing, leaving the organization vulnerable when operational realities are investigated."
    },
    {
      id: 9,
      type: 'mcq',
      stem: "What is the real difference between a carbon credit and an I-REC?",
      options: {
        a: "I-RECs can only be purchased by government agencies",
        b: "There is no real difference; they are interchangeable",
        c: "A carbon credit covers one tonne of CO2e reduced or removed anywhere; an I-REC certifies one MWh of renewable electricity specifically",
        d: "Carbon credits only apply to fashion companies"
      },
      correctAnswer: 'c',
      explanation: "1 Carbon Credit = 1 Tonne of CO2e prevented or sequestered; 1 I-REC = 1 MWh of renewable electricity produced and fed into the grid."
    },
    {
      id: 10,
      type: 'mcq',
      stem: 'A company calls its packaging "carbon neutral" using purchased offsets, but hasn\'t changed its packaging materials in three years. Is this a correct use of offsetting?',
      options: {
        a: "No, because carbon neutrality claims aren't allowed on packaging at all",
        b: "Yes, as long as the credits themselves are verified",
        c: "Yes, offsetting fully replaces the need to reduce",
        d: "No — offsetting should cover what can't yet be reduced, not replace the effort to reduce entirely"
      },
      correctAnswer: 'd',
      explanation: "Offsetting is intended to neutralize unavoidable residual emissions after technical reduction, not as a shortcut to avoid material substitution."
    },
    {
      id: 11,
      type: 'mcq',
      stem: "A company has strong environmental practices and pays workers fairly, but its sustainability report contains numbers nobody can independently verify. What does this mean for its ESG standing?",
      options: {
        a: "This has no real effect on its ESG standing",
        b: "It is still practising full ESG, since two of three pillars are strong",
        c: "Its claims can't be fully trusted, since governance is what proves whether the other two pillars are real",
        d: "It doesn't matter, since governance is the least important pillar"
      },
      correctAnswer: 'c',
      explanation: "Governance is the verification mechanism of ESG; without independent auditing and transparent reporting, environmental and social claims remain legally unverified statements."
    },
    {
      id: 12,
      type: 'mcq',
      stem: "Which of these is one of the five core labour principles that most global social audits are built on?",
      options: {
        a: "A mandatory four-day working week",
        b: "Free housing provided to every factory worker",
        c: "Guaranteed annual bonuses for all workers",
        d: "Elimination of forced or compulsory labour"
      },
      correctAnswer: 'd',
      explanation: "The ILO Declaration establishes 5 core principles: (1) Freedom of association, (2) Elimination of forced labour, (3) Abolition of child labour, (4) Non-discrimination, and (5) Safe and healthy working environments."
    },
    {
      id: 13,
      type: 'mcq',
      stem: "A supplier cuts corners on dyeing wastewater treatment to hit a tight production deadline. Which ESG pillar does this primarily violate?",
      options: {
        a: "Governance, because it involves a missed deadline",
        b: "Social, because it affects worker pay",
        c: "None, since tight deadlines are a normal business pressure",
        d: "Environmental, because it involves pollution from a production process"
      },
      correctAnswer: 'd',
      explanation: "Discharging untreated chemical effluent into municipal waterways directly violates the Environmental pillar by contaminating ecosystems."
    },
    {
      id: 14,
      type: 'mcq',
      stem: "What does official government labour survey data indicate about women's share of India's textile and apparel workforce?",
      options: {
        a: "The workforce is entirely male",
        b: "Under a quarter",
        c: "Less than 10%",
        d: "More than half, with informal-sector estimates running higher still"
      },
      correctAnswer: 'd',
      explanation: "Women account for approximately 65% of workforce in apparel manufacturing and close to half in textiles overall, rising to 60-70% in informal segments."
    },
    {
      id: 15,
      type: 'mcq',
      stem: "A regulator investigates a company over sustainability claims consumers couldn't easily verify. The company commits to clearer communication and makes a donation, without facing formal penalties. What does this case best illustrate?",
      options: {
        a: "Regulators never investigate large, well-known companies",
        b: "Reducing emissions is always cheaper than offsetting",
        c: "Sustainability claims can never legally be challenged",
        d: "Environmental and social claims mean little without strong governance and outside scrutiny behind them"
      },
      correctAnswer: 'd',
      explanation: "Unverifiable consumer claims trigger regulatory investigation under consumer protection statutes; sustainability requires external governance and methodological proof."
    },
    {
      id: 16,
      type: 'mcq',
      stem: "Several employees separately notice red flags about a supplier over the years, but nobody reports it, each assuming it is someone else's job. What fixes this?",
      options: {
        a: "A new company slogan emphasising teamwork",
        b: "Higher salaries for employees",
        c: "Clearly assigning risk-related roles across first, second and third lines of responsibility",
        d: "Hiring more staff overall"
      },
      correctAnswer: 'c',
      explanation: "The IIA Three Lines Model structurally assigns risk ownership to First Line (operations), monitoring to Second Line (compliance), and independent checking to Third Line (internal audit)."
    },
    {
      id: 17,
      type: 'mcq',
      stem: "A company wants its emissions numbers to be meaningful year over year, not just accurate once. Which GHG Protocol principle does this describe?",
      options: {
        a: "Profitability",
        b: "Relevance",
        c: "Popularity",
        d: "Consistency"
      },
      correctAnswer: 'd',
      explanation: "The GHG Protocol Consistency principle mandates using consistent accounting methodologies over time to enable meaningful multi-year emissions tracking."
    },
    {
      id: 18,
      type: 'mcq',
      stem: "A landfill methane capture project wants to generate carbon credits. What has to happen before those credits can be issued?",
      options: {
        a: "Nothing; credits are issued automatically once a project begins",
        b: "The project must appear in a news article",
        c: "The buyer must approve the project's marketing materials first",
        d: "An independent verifier must confirm the emissions reduction is real"
      },
      correctAnswer: 'd',
      explanation: "Accredited third-party verifiers must audit the project's additionality and baseline data against registry methodologies before credits are serialized."
    },
    {
      id: 19,
      type: 'mcq',
      stem: "A textile company in India beats its assigned emission intensity target under a government compliance scheme. What can it now do?",
      options: {
        a: "It becomes exempt from all future environmental regulation",
        b: "Nothing; beating a target has no consequence",
        c: "It must shut down operations immediately",
        d: "Earn tradable Carbon Credit Certificates it can sell to companies that missed their own targets"
      },
      correctAnswer: 'd',
      explanation: "Under India's Carbon Credit Trading Scheme (CCTS), industrial entities that outperform their emission intensity targets earn Carbon Credit Certificates tradable on the national power exchange."
    },
    {
      id: 20,
      type: 'short_answer',
      stem: "Looking back at ABC's story across this course: if ABC had made just one change at the very beginning, before any scandal occurred, which change do you think would have prevented the most damage, and why?",
      rubric: "Marked against the rubric: The learner must identify a specific structural or operational change (e.g., establishing a Three Lines Model, extending audit scope to Tier-3 wet processing, decoupling procurement quotas from unrealistic timelines, or implementing continuous ZDHC MRSL testing) and causally link it to preventing the public scandal or operational failure described in the curriculum."
    }
  ]
};
