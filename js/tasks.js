// Phoenix Nest Training & Evaluation Guide - Task Data
// 38 MET-format task cards across 4 tiers

const TIERS = [
  {
    id: 'onboarding',
    label: 'Onboarding',
    title: 'New Hire Orientation',
    color: '#9C27B0',
    sections: [
      {
        name: 'Company & Culture',
        icon: '🔥',
        tasks: ['PN-001', 'PN-002', 'PN-003']
      },
      {
        name: 'Digital Tools',
        icon: '📱',
        tasks: ['PN-004', 'PN-005', 'PN-006', 'PN-009']
      },
      {
        name: 'Site Orientation',
        icon: '📍',
        tasks: ['PN-007', 'PN-008']
      }
    ]
  },
  {
    id: 'tier1to2',
    label: 'Tier 1 → 2',
    title: 'Trainee → Operator',
    color: '#4CAF50',
    sections: [
      {
        name: 'Safety & Basics',
        icon: '🛡️',
        tasks: ['PN-101', 'PN-102', 'PN-103']
      },
      {
        name: 'Splitter Operation',
        icon: '🪓',
        tasks: ['PN-104', 'PN-105', 'PN-106', 'PN-107']
      },
      {
        name: 'Stacking & Loading',
        icon: '📦',
        tasks: ['PN-108', 'PN-109', 'PN-110']
      },
      {
        name: 'Equipment Maintenance',
        icon: '🔧',
        tasks: ['PN-111', 'PN-112', 'PN-113']
      },
      {
        name: 'Production Standard',
        icon: '📊',
        tasks: ['PN-114']
      }
    ]
  },
  {
    id: 'tier2to3',
    label: 'Tier 2 → 3',
    title: 'Operator → Skilled Operator',
    color: '#2196F3',
    sections: [
      {
        name: 'Chainsaw Operation',
        icon: '⛓️',
        tasks: ['PN-201', 'PN-202', 'PN-203', 'PN-204']
      },
      {
        name: 'Tractor Operation',
        icon: '🚜',
        tasks: ['PN-205', 'PN-206', 'PN-207']
      },
      {
        name: 'Independent Operation',
        icon: '🏭',
        tasks: ['PN-208', 'PN-209', 'PN-210']
      },
      {
        name: 'Production Standard',
        icon: '📊',
        tasks: ['PN-211']
      }
    ]
  },
  {
    id: 'tier3to4',
    label: 'Tier 3 → 4',
    title: 'Skilled Operator → Lead',
    color: '#FF9800',
    sections: [
      {
        name: 'Maintenance, Repair & Leadership',
        icon: '⭐',
        tasks: ['PN-301', 'PN-302', 'PN-303', 'PN-304']
      }
    ]
  }
];

const TASKS = {
  'PN-001': {
    id: 'PN-001',
    tier: 'onboarding',
    title: 'Company Overview & Expectations',
    conditions: [
      'New contractor is on-site for their first day or orientation session.',
      'Crew lead or owner is available to walk through company information.',
      'Contractor has received their independent contractor agreement.'
    ],
    standards: [
      'Contractor can explain what Phoenix Nest does, who the customers are, and what makes the product different.',
      'Contractor understands the independent contractor relationship, pay structure, and advancement tiers.',
      'Contractor knows how to contact the office and key personnel.'
    ],
    perfSteps: [
      { text: 'Phoenix Nest LLC is a firewood delivery and excavation business based in Flatwoods/Greenup, KY, serving a 60-mile radius around Ashland.' },
      { text: 'Our product: Premium seasoned hardwood (Oak, Hickory, Cherry) with verified moisture content below 20%. This is what sets us apart -- we test and guarantee quality.' },
      { text: 'Business address: 1217 Unity Circle, Flatwoods KY 41139. Production site: 1301 Pleasant Valley Rd, Greenup, KY.' },
      {
        text: 'Key contacts:',
        substeps: [
          'Alex Pennington (Owner) -- Cell: 606-923-7664',
          'Business phone: 606-644-9876',
          'Email: alex@firewood.ltd',
          'Website: firewood.ltd'
        ]
      },
      {
        text: 'Contractor tiers and advancement:',
        substeps: [
          'Tier 1 (Trainee): Learning basics -- splitting, stacking, safety.',
          'Tier 2 (Operator): Can run splitter independently, meets production standards.',
          'Tier 3 (Skilled Operator): Chainsaw qualified, tractor qualified, can run full production alone.',
          'Tier 4 (Lead): Can lead crew, handle maintenance, make operational decisions.'
        ]
      },
      { text: 'Pay is per-cord based on your tier. Higher tiers earn more per cord. Production is tracked daily.' },
      { text: 'You are an independent contractor (1099). You are responsible for your own taxes. Phoenix Nest provides equipment and PPE (except boots and gloves).' },
      { text: 'Work schedule is typically discussed weekly. Communicate early if you cannot make a scheduled day.' }
    ],
    goNoGo: [
      'Can state what Phoenix Nest produces and what makes it different (seasoned, moisture-tested hardwood)',
      'Knows production site address and how to get there',
      'Knows how to reach Alex by phone and email',
      'Can explain the tier system and which tier they are starting at',
      'Understands pay is per-cord and tracked daily',
      'Understands independent contractor status (1099, own taxes)',
      'Has signed contractor agreement'
    ],
    notes: [
      'This is a one-time orientation task. Can be evaluated through conversation.',
      'Give the contractor time to ask questions. First impressions matter.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest LLC Contractor Onboarding'
  },

  'PN-002': {
    id: 'PN-002',
    tier: 'onboarding',
    title: 'Quality Standards & Product Knowledge',
    conditions: [
      'Contractor is on-site during orientation or first week.',
      'Seasoned and unseasoned wood samples are available for demonstration.',
      'Moisture meter is available for hands-on practice.'
    ],
    standards: [
      'Contractor can identify acceptable vs unacceptable firewood by sight and moisture reading.',
      'Contractor understands the species we sell and their characteristics.',
      'Contractor can explain why moisture content matters to the customer.'
    ],
    perfSteps: [
      {
        text: 'Species we process and sell:',
        substeps: [
          'Oak (Red & White) -- Dense, long burn, our most common. Heavy to handle.',
          'Hickory -- Hottest burn, great for cooking. Very dense and heavy.',
          'Cherry -- Pleasant aroma, medium density. Popular for fire pits and smoking.',
          'Mixed hardwood -- Combination loads. Never include softwood (pine, cedar, poplar).'
        ]
      },
      { text: 'Moisture content target: BELOW 20%. We verify with a moisture meter. This is our quality guarantee to customers.' },
      {
        text: 'How to use the moisture meter:',
        substeps: [
          'Split a fresh face on the piece (do not test bark side or weathered surface).',
          'Press pins firmly into the fresh-split face, parallel to the grain.',
          'Take readings from at least 3 pieces per pallet or load.',
          'Record readings. If any piece is above 20%, the batch needs more seasoning.'
        ]
      },
      {
        text: 'What makes wood unacceptable (reject from finished pallets):',
        substeps: [
          'Moisture above 20% on fresh split face.',
          'Rot or punk -- soft, crumbly, discolored interior.',
          'Excessive bug damage or boring.',
          'Oversized pieces (will not fit standard firebox ~16-18 inches).',
          'Undersized pieces (slivers, chips, bark chunks).',
          'Softwood species mixed into hardwood pallets.'
        ]
      },
      { text: 'Seasoning takes 6-12 months depending on species, split size, airflow, and weather. Properly stacked and covered wood seasons faster.' },
      { text: 'Our reputation depends on consistent quality. Every pallet that leaves here represents Phoenix Nest.' }
    ],
    goNoGo: [
      'Can identify Oak, Hickory, and Cherry by sight (bark and grain)',
      'Can correctly operate moisture meter on a fresh-split face',
      'States correct moisture target (below 20%)',
      'Can identify at least 3 reject conditions (rot, oversize, softwood, etc.)',
      'Can explain why moisture content matters to the customer (burn quality, smoke, creosote)',
      'Understands seasoning timeline and factors'
    ],
    notes: [
      'Use actual wood samples for this evaluation. Book knowledge is not enough.',
      'Most new contractors will not know species identification -- teach it hands-on.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest LLC Quality Standards'
  },

  'PN-003': {
    id: 'PN-003',
    tier: 'onboarding',
    title: 'Conduct, Communication & Professionalism',
    conditions: [
      'Contractor has completed PN-001 (Company Overview).',
      'This can be evaluated through conversation and observation over the first week.'
    ],
    standards: [
      'Contractor communicates reliably about schedule, issues, and questions.',
      'Contractor treats equipment, site, coworkers, and customers with respect.',
      'Contractor understands how problems and conflicts are handled.'
    ],
    perfSteps: [
      {
        text: 'Communication expectations:',
        substeps: [
          'If you are going to be late or absent, text or call Alex BEFORE your shift start time. Not after.',
          'If you do not understand something, ask. There are no stupid questions during training.',
          'If something breaks or seems wrong with equipment, report it immediately. Do not try to hide it.',
          'If you have a conflict with another crew member, bring it to Alex. Do not let it fester.'
        ]
      },
      {
        text: 'Site conduct:',
        substeps: [
          'No alcohol or drugs on site. Zero tolerance. Impairment = immediate removal.',
          'No horseplay around equipment. This is a production environment with serious hazards.',
          'Clean up after yourself -- break area, work area, restroom.',
          'Personal phones: Keep on you for safety/communication but limit recreational use during production.'
        ]
      },
      {
        text: 'Customer interaction (if you encounter a customer on-site or during delivery):',
        substeps: [
          'Be polite and professional. You represent Phoenix Nest.',
          'If they have a question you cannot answer, take their name/number and tell them Alex will call.',
          'Never promise delivery dates, prices, or quantities -- that is office business.'
        ]
      },
      { text: 'Phoenix Nest conflict approach: We deal with problems directly and professionally. If something is not working, we talk about it. If you have ideas to improve operations, we want to hear them.' }
    ],
    goNoGo: [
      'Demonstrates reliable communication about schedule (notifies before shift if late/absent)',
      'Understands zero-tolerance substance policy',
      'Knows to report equipment issues immediately rather than hiding them',
      'Can describe how to handle a customer interaction on site',
      'Asks questions when unsure rather than guessing',
      'Understands the conflict resolution process (bring it to Alex)'
    ],
    notes: [
      'This is partially an observation task. Evaluate over the first week, not just a single conversation.',
      'Pay attention to reliability patterns early. They tend to continue.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest LLC Contractor Conduct Policy'
  },

  'PN-004': {
    id: 'PN-004',
    tier: 'onboarding',
    title: 'Mattermost Setup & Usage',
    conditions: [
      'Contractor has a smartphone with internet access.',
      'Mattermost server is accessible at chat.firewood.ltd.',
      'Contractor account has been created by admin.'
    ],
    standards: [
      'Contractor can log into Mattermost on their phone and access all required channels.',
      'Contractor understands the purpose of each channel and what gets posted where.',
      'Contractor can receive and respond to messages.'
    ],
    perfSteps: [
      {
        text: 'Install Mattermost app:',
        substeps: [
          'Download "Mattermost" from App Store (iPhone) or Google Play (Android).',
          'Open app and enter server URL: chat.firewood.ltd',
          'Log in with credentials provided by Alex.',
          'Enable notifications when prompted -- this is how you receive urgent updates.'
        ]
      },
      {
        text: 'Required channels and their purpose:',
        substeps: [
          '#town-square -- General announcements. Check daily.',
          '#ops-daily -- Daily operations logs and weekly checklists are posted here automatically from the METS app. This is the operational record.',
          '#training-mets -- MET evaluation results are posted here automatically. Your GO/NO-GO results will appear in this channel.',
          'Direct Messages -- Use for private communication with Alex or crew members.'
        ]
      },
      {
        text: 'Communication guidelines on Mattermost:',
        substeps: [
          'Check messages at start and end of each shift at minimum.',
          'Respond to direct messages within a reasonable time.',
          'Use channels for their intended purpose -- do not post personal chat in #ops-daily.',
          'If you see an automated log or evaluation post, you do not need to respond to it. Those are records.'
        ]
      },
      { text: 'Mattermost is the official communication platform for Phoenix Nest operations. Important schedule changes, weather calls, and operational updates are posted here.' }
    ],
    goNoGo: [
      'Mattermost app installed and logged in on personal device',
      'Can navigate to #town-square, #ops-daily, and #training-mets',
      'Notifications enabled for the app',
      'Can send a direct message to Alex',
      'Can explain what each channel is for',
      'Knows to check messages at start and end of each shift'
    ],
    notes: [
      'Create contractor account in Mattermost before their first day if possible.',
      'Walk through the app with them in person. Do not just send them instructions.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest LLC Digital Tools Setup'
  },

  'PN-005': {
    id: 'PN-005',
    tier: 'onboarding',
    title: 'METS Training App Setup & Navigation',
    conditions: [
      'Contractor has a smartphone with internet access.',
      'METS PWA is deployed and accessible.',
      'Contractor has been added to the Team list in the app.'
    ],
    standards: [
      'Contractor can install and navigate the METS app on their phone.',
      'Contractor understands what the app is for and how evaluations work.',
      'Contractor can access their own progress and review task cards.'
    ],
    perfSteps: [
      {
        text: 'Install the METS app:',
        substeps: [
          'Open browser on phone and go to: alex-pennington.github.io/phoenix-nest-mets/',
          'When the install banner appears, tap to install. Or use browser menu > Add to Home Screen.',
          'The app works offline once installed. No internet needed to read task cards or review progress.'
        ]
      },
      {
        text: 'App sections:',
        substeps: [
          'Home -- Quick access to all features.',
          'Guide -- All training task cards organized by tier. Read these to know what you will be evaluated on.',
          'Ops -- Daily operations log and weekly checklist. Your crew lead fills these out.',
          'Team -- Contractor profiles and progress tracking. You can see your own evaluations here.',
          'Logs -- History of all submitted forms. Send button pushes data to Mattermost.'
        ]
      },
      {
        text: 'How evaluations work:',
        substeps: [
          'Your evaluator (usually Alex or crew lead) opens a task card and selects your name.',
          'Each criterion is marked GO or NO-GO based on observed performance.',
          'All criteria must be GO for an overall GO result.',
          'Results save to the app and post to #training-mets in Mattermost.',
          'Once you GO all tasks in your current tier, you advance to the next tier (and pay rate).'
        ]
      },
      { text: 'You can browse any task card at any time to study what is expected. Use the Guide tab to review before an evaluation.' },
      { text: 'The app updates automatically. When you see a blue "Update available" banner, tap it to get the latest version.' }
    ],
    goNoGo: [
      'METS app installed on home screen of personal device',
      'Can navigate to all 5 tabs (Home, Guide, Ops, Team, Logs)',
      'Can find and open a task card in the Guide',
      'Can locate their own profile in the Team section',
      'Can explain how GO/NO-GO evaluations determine tier advancement',
      'Understands the app works offline'
    ],
    notes: [
      'Make sure the contractor is added to the Team list before this evaluation.',
      'Let them explore the app on their own for a few minutes before evaluating.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest METS App User Guide'
  },

  'PN-006': {
    id: 'PN-006',
    tier: 'onboarding',
    title: 'Daily Log & Weekly Checklist Procedures',
    conditions: [
      'Contractor has completed PN-005 (METS App Setup).',
      'Contractor is on-site during a normal production day.',
      'Crew lead can demonstrate the daily log process.'
    ],
    standards: [
      'Contractor understands the daily log workflow (start-of-shift and end-of-shift).',
      'Contractor can fill out the daily log independently if crew lead is unavailable.',
      'Contractor knows what data gets captured and why it matters.'
    ],
    perfSteps: [
      {
        text: 'Daily log workflow:',
        substeps: [
          'START OF SHIFT: Open METS app > Ops > Daily Log. Fill in date, crew lead, crew member.',
          'Complete Safety & Equipment Ready checks -- physically inspect each item.',
          'Complete PPE checks for each crew member.',
          'Verify work area, log inventory, and set daily production goal.',
          'Tap "Save Progress" -- this saves locally in case you lose signal.',
          'END OF SHIFT: Open the same log (it will show "Resume today\'s log").',
          'Switch to End of Shift tab. Enter production numbers, quality checks, equipment hours.',
          'Complete safety/incident section honestly. Near misses are important data, not punishment.',
          'Fill in tomorrow prep section.',
          'Tap "Submit Complete" to finalize and send to Mattermost.'
        ]
      },
      {
        text: 'Why this data matters:',
        substeps: [
          'Production numbers track cord output for pay calculation.',
          'Equipment hours trigger maintenance schedules.',
          'Safety data identifies patterns before someone gets hurt.',
          'The data exports to Mattermost as machine-readable JSON for compliance and business analytics.'
        ]
      },
      {
        text: 'Weekly checklist:',
        substeps: [
          'Completed every Friday or Saturday by the crew lead.',
          'Covers deep equipment maintenance, production review, inventory, safety, quality (moisture testing), and planning.',
          'Same process: fill out in Ops tab, submit when complete.'
        ]
      },
      { text: 'If the send fails (no signal), the log saves locally. Go to the Logs tab later and hit the Send button when you have signal.' }
    ],
    goNoGo: [
      'Can open a new daily log and fill in the start-of-shift section',
      'Can resume an in-progress daily log',
      'Can complete the end-of-shift section with production data',
      'Knows to Save Progress during shift and Submit Complete at end',
      'Can explain why production numbers and equipment hours are tracked',
      'Knows how to resend from the Logs tab if offline when submitting',
      'Understands near-miss reporting is for safety improvement, not punishment'
    ],
    notes: [
      'Walk through one complete daily log together on their first day.',
      'The crew lead typically fills out the log, but every crew member should know how.'
    ],
    safetyCritical: false,
    references: 'Phoenix Nest Daily Operations Log Procedures'
  },

  'PN-007': {
    id: 'PN-007',
    tier: 'onboarding',
    title: 'Production Site Layout & Zones',
    conditions: [
      'Contractor is physically on-site at 1301 Pleasant Valley Rd, Greenup, KY.',
      'Crew lead or owner walks the site with the contractor.',
      'All major areas are accessible for the walkthrough.'
    ],
    standards: [
      'Contractor can identify and navigate to all work zones on the production site.',
      'Contractor knows designated areas for parking, staging, production, seasoning, and waste.',
      'Contractor knows emergency assembly point and first aid locations.'
    ],
    perfSteps: [
      {
        text: 'Site zones (walk each one):',
        substeps: [
          'Parking area -- Where personal vehicles go. Never park in the production zone or delivery path.',
          'Log staging area -- Where raw logs are stored before processing. Equipment operates here.',
          'Splitting zone -- Where the hydraulic splitter operates. Primary production area.',
          'Stacking/palletizing area -- Where split wood is stacked onto pallets.',
          'Seasoning yard -- Where pallets are stored for drying. Organized by species and date.',
          'Loading zone -- Where delivery trucks are loaded. Vehicle traffic area.',
          'Waste/burn pile area -- Where bark, offcuts, and reject wood go.',
          'Equipment storage -- Where saws, tools, and equipment are stored end of day.'
        ]
      },
      {
        text: 'Emergency locations:',
        substeps: [
          'First aid kit location (verify and remember -- this changes if kit moves with crew).',
          'Fire extinguisher location.',
          'Emergency assembly point -- where to meet if evacuating.',
          'Cell coverage: Know where on site you can/cannot get signal for 911.'
        ]
      },
      { text: 'Traffic flow: Understand how delivery trucks enter and exit. Stay clear of the truck path during loading.' },
      { text: 'Nearest hospital: Know the route. In an emergency, do not wait for an ambulance if you can safely drive.' }
    ],
    goNoGo: [
      'Can point to and name all major site zones without prompting',
      'Knows where to park personal vehicle',
      'Can locate first aid kit and fire extinguisher',
      'Knows the emergency assembly point',
      'Understands delivery truck traffic flow and when to stay clear',
      'Knows where cell coverage works on site for emergency calls'
    ],
    notes: [
      'Do this evaluation as a physical walk-through, not a conversation at a desk.',
      'Update this task if site layout changes significantly.'
    ],
    safetyCritical: true,
    references: 'Phoenix Nest Production Site Safety Plan'
  },

  'PN-008': {
    id: 'PN-008',
    tier: 'onboarding',
    title: 'Emergency Procedures & First Response',
    conditions: [
      'Contractor has completed PN-007 (Site Layout).',
      'First aid kit, fire extinguisher, and emergency contact list are accessible.',
      'This evaluation can be done through scenario-based questioning.'
    ],
    standards: [
      'Contractor knows what to do in common emergency scenarios before help arrives.',
      'Contractor can locate and access emergency equipment.',
      'Contractor understands reporting requirements after any incident.'
    ],
    perfSteps: [
      {
        text: 'Injury response:',
        substeps: [
          'STOP all equipment immediately. Shut down splitter, kill chainsaw.',
          'Assess the situation. Do not move an injured person unless they are in immediate danger.',
          'Apply direct pressure to bleeding wounds. Use first aid kit supplies.',
          'Call 911 if injury is serious (deep cuts, broken bones, head injury, loss of consciousness).',
          'Call Alex immediately after calling 911.',
          'If the injured person can safely be transported and 911 is not needed, drive them to the nearest ER.'
        ]
      },
      {
        text: 'Equipment fire / hydraulic failure:',
        substeps: [
          'MOVE AWAY from the equipment immediately.',
          'Do not attempt to fight a hydraulic fluid fire with a standard extinguisher unless it is very small and contained.',
          'Call 911 for any fire that is not immediately controllable.',
          'Account for all personnel -- make sure no one is near the equipment.'
        ]
      },
      {
        text: 'Severe weather:',
        substeps: [
          'If lightning is visible or thunder is audible, stop all work and seek shelter immediately.',
          'Do not shelter under isolated trees or near metal equipment.',
          'Monitor weather alerts on phone. Alex will typically call weather days in advance.',
          'If a storm hits suddenly, get to a vehicle.'
        ]
      },
      {
        text: 'After any incident:',
        substeps: [
          'Report to Alex, even if it seems minor.',
          'Fill out the safety section of the daily log with full details.',
          'Near misses get reported too. A near miss today is an injury tomorrow.',
          'No one gets in trouble for reporting. You get in trouble for NOT reporting.'
        ]
      }
    ],
    goNoGo: [
      'Can describe step-by-step response to a bleeding injury (stop equipment, pressure, 911, call Alex)',
      'Can locate first aid kit and demonstrate opening it',
      'Knows when to call 911 vs drive to ER',
      'Can describe response to equipment fire (move away, 911, account for personnel)',
      'Knows lightning/severe weather protocol (stop work, seek shelter)',
      'Understands all incidents and near misses must be reported',
      'Knows reporting is for safety, not punishment'
    ],
    notes: [
      'Use "what would you do if..." scenarios for evaluation.',
      'This is safety-critical. A NO-GO means the contractor needs more training before working independently.',
      'Review this annually or after any incident.'
    ],
    safetyCritical: true,
    references: 'Phoenix Nest Emergency Response Procedures'
  },

  'PN-009': {
    id: 'PN-009',
    tier: 'onboarding',
    title: 'Kiosk Clock-In/Out & Hours Attribution',
    conditions: [
      'Contractor has been added as an employee in Odoo with a photo.',
      'Ratatoskr kiosk is powered on and accessible on the local network.',
      'Contractor is on-site at the start or end of a work session.',
      'Odoo projects and tasks have been configured for the contractor\'s role.'
    ],
    standards: [
      'Contractor can clock in and out using the kiosk without assistance.',
      'Contractor correctly allocates all worked hours to the appropriate tasks at clock-out.',
      'Contractor understands that unallocated hours are lost hours -- the system requires task attribution.',
      'Contractor can identify which project and tasks apply to their work.'
    ],
    perfSteps: [
      {
        text: 'What the kiosk is:',
        substeps: [
          'Ratatoskr is the tablet/computer running the Phoenix Nest payroll app.',
          'The kiosk page shows a grid of employee photos. You tap your photo to clock in or out.',
          'It connects to Odoo (our business system) to record your attendance and timesheets.',
          'Your hours, task attribution, and attendance all flow from this single system.'
        ]
      },
      {
        text: 'Clocking IN:',
        substeps: [
          'Walk up to the kiosk when you arrive on site.',
          'Find and tap your photo on the employee grid.',
          'The screen will show "Welcome [Your Name]" with the current time.',
          'You are now clocked in. Go to work.',
          'Clock in WHEN YOU ARRIVE. Do not wait until you start production.'
        ]
      },
      {
        text: 'Clocking OUT:',
        substeps: [
          'At the end of your shift, go to the kiosk and tap your photo again.',
          'The screen will show how long you were clocked in and present the Task Allocation form.',
          'THIS IS THE CRITICAL STEP: You MUST allocate your hours to tasks before you can clock out.',
          'The form shows available tasks from your assigned projects.',
          'Enter the hours you spent on each task. The total must account for your full shift.',
          'Example: If you worked 8 hours -- 6 hours splitting, 1 hour stacking, 1 hour cleanup -- enter those numbers next to each task.',
          'Tap "Submit & Clock Out" when your hours are allocated.',
          'The screen will show "Goodbye [Your Name]" confirming you are clocked out.'
        ]
      },
      {
        text: 'Projects and tasks you may see:',
        substeps: [
          'Your available projects depend on your role. Common ones include:',
          'Production -- Splitting, stacking, palletizing, log processing.',
          'Bunkhouse Operations -- Lawn mowing, cleaning, maintenance, repairs (if applicable).',
          'Marketing & Sales -- Customer calls, delivery, social media (if applicable).',
          'Administrative -- Meetings, training, inventory counts, equipment maintenance.',
          'If you do not see the right task for your work, tell Alex. Do NOT leave hours unallocated.'
        ]
      },
      {
        text: 'Why hours attribution matters:',
        substeps: [
          'Commission pay (per cord) is tracked separately from hourly tasks.',
          'Admin hours, bunkhouse hours, and other non-production work are paid based on what the kiosk records.',
          'If you do not allocate hours to tasks, the system cannot calculate what you are owed.',
          'Unallocated hours look like you were here but did nothing. That is not what we want.',
          'Hours data also helps us understand how long tasks actually take for future planning.'
        ]
      },
      {
        text: 'Common mistakes to avoid:',
        substeps: [
          'Forgetting to clock in -- you arrive, start working, and realize 2 hours later you never clocked in. Tell Alex so it can be corrected.',
          'Forgetting to clock out -- you leave without clocking out. Your attendance stays open. Tell Alex next day.',
          'Putting all hours on one task -- if you did 3 different things, split the hours accurately.',
          'Leaving hours unallocated -- the form is designed to prevent this, but if something goes wrong, report it.',
          'Clocking in/out for someone else -- never do this. Each person clocks themselves in and out.'
        ]
      },
      { text: 'If the kiosk is down or unresponsive, text Alex with your clock-in or clock-out time. It will be entered manually.' }
    ],
    goNoGo: [
      'Can locate the kiosk and identify their own photo on the employee grid',
      'Successfully clocks in by tapping their photo',
      'Successfully clocks out and completes the task allocation form',
      'Correctly splits hours across multiple tasks (not dumping all hours on one task)',
      'Can name at least 2 projects and 3 tasks relevant to their role',
      'Can explain why hours must be allocated to tasks (pay calculation, accountability)',
      'Knows what to do if kiosk is down (text Alex with times)',
      'Knows what to do if they forget to clock in or out (report to Alex for manual correction)'
    ],
    notes: [
      'Walk through one full clock-in and clock-out cycle with the contractor on their first day.',
      'Verify their photo is loaded in Odoo before this evaluation.',
      'If projects/tasks are not yet configured for their role, set that up first.',
      'Commission-based production pay is separate from the kiosk hours system. Make sure the contractor understands both.'
    ],
    safetyCritical: false,
    references: 'Greybeard Payroll App - Kiosk Module Documentation'
  },

  'PN-101': {
    id: 'PN-101',
    tier: 'tier1to2',
    title: 'PPE Compliance',
    conditions: [
      'Contractor is at the production site during a normal work shift.',
      'All required PPE is available: safety glasses, hearing protection, leather work gloves, steel-toe boots, high-visibility vest (if required).',
      'Chainsaw chaps and face shield are available if chainsaw work is in progress nearby.'
    ],
    standards: [
      'Contractor wears all required PPE for the specific task being performed, without prompting, for the duration of every observed shift over at least 5 consecutive workdays.',
      'Contractor corrects PPE deficiencies immediately when identified.',
      'No PPE-related safety violations observed during evaluation period.'
    ],
    perfSteps: [
      { text: 'Before beginning any work, inspect all personal PPE for damage or wear (cracked lenses, torn gloves, worn boot soles).' },
      { text: 'Don all required PPE for the assigned task before entering the work zone.' },
      {
        text: 'Match PPE to task requirements:',
        substeps: [
          'Splitting/stacking: Safety glasses, hearing protection, leather gloves, steel-toe boots.',
          'Chainsaw area (even as bystander within 30 feet): Add chaps and face shield.',
          'Loading trucks: Add high-visibility vest if working near vehicle traffic.',
          'Equipment maintenance: Add appropriate gloves (nitrile for fluids, leather for mechanical).'
        ]
      },
      { text: 'Replace any damaged or worn PPE before continuing work. Report the need for replacement items.' },
      { text: 'Maintain PPE throughout the shift. Do not remove hearing protection, glasses, or gloves during active production.' },
      { text: 'At end of shift, inspect PPE, clean as needed, and store properly.' }
    ],
    goNoGo: [
      'Arrives at worksite with all personal PPE in serviceable condition',
      'Dons correct PPE before entering work zone without being told',
      'Matches PPE to specific task (adds chaps near chainsaw work, vest near trucks)',
      'Keeps PPE on throughout active production (no removal during splits, loading, etc.)',
      'Identifies and reports worn/damaged PPE',
      'Observed over 5+ consecutive workdays with zero PPE violations'
    ],
    notes: [
      'This is a CONTINUOUS evaluation. One observed shift without proper PPE after initial training is a NO-GO.',
      'Company provides hearing protection, eye protection, and chaps. Contractor provides boots and gloves.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 1 → Tier 2'
  },

  'PN-102': {
    id: 'PN-102',
    tier: 'tier1to2',
    title: 'Worksite Safety Awareness',
    conditions: [
      'Contractor is working at the production site during normal operations.',
      'Multiple pieces of equipment may be operating simultaneously (splitter, chainsaw, tractor).',
      'Other workers are present in the production area.'
    ],
    standards: [
      'Contractor maintains a clean, organized personal work area throughout every shift.',
      'Contractor demonstrates awareness of surrounding hazards including moving equipment, falling wood, and other personnel.',
      'No safety incidents or near-misses attributed to contractor\'s lack of awareness during evaluation period.'
    ],
    perfSteps: [
      { text: 'Before starting work, conduct a brief visual scan of the work area for hazards: trip hazards, unstable stacks, equipment positions, overhead hazards.' },
      { text: 'Keep personal work area clear of debris, offcuts, bark, and tools not in active use.' },
      { text: 'Maintain minimum safe distances from operating equipment (10 feet from splitter, 30 feet from active chainsaw, clear of tractor swing radius).' },
      { text: 'Establish and maintain eye contact or verbal confirmation before approaching any operating equipment.' },
      { text: 'Position yourself so you are visible to equipment operators at all times. Never approach from blind spots.' },
      { text: 'When moving logs or splits, check footing before lifting. Clear path of travel before carrying loads.' },
      { text: 'Stack wood on stable, level ground. Do not create stacks that lean or exceed 4 feet in height unless supported.' },
      { text: 'Keep walkways and vehicle paths clear of wood, tools, and debris.' },
      { text: 'Report any observed hazards (hydraulic leaks, loose bolts, cracked handles, unstable stacks) to supervisor immediately.' }
    ],
    goNoGo: [
      'Work area remains organized throughout shift (not just at cleanup)',
      'Maintains safe distances from operating equipment without being reminded',
      'Makes eye contact/verbal contact before approaching equipment operators',
      'Checks footing and clear path before carrying loads',
      'Stacks wood safely (stable, not leaning, appropriate height)',
      'Reports observed hazards without being asked',
      'Keeps walkways and vehicle paths clear'
    ],
    notes: [
      'Evaluate by observation over multiple shifts. A pattern of leaving debris or approaching equipment unsafely is NO-GO.',
      'Near-misses count as NO-GO events even if no injury occurs.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 1 → Tier 2'
  },

  'PN-103': {
    id: 'PN-103',
    tier: 'tier1to2',
    title: 'Emergency Procedures',
    conditions: [
      'Contractor is at the production site.',
      'First aid kit, fire extinguisher, and emergency contact information are posted/available.',
      'Evaluator administers a verbal quiz and walk-through.'
    ],
    standards: [
      'Contractor correctly identifies the location and use of all emergency equipment.',
      'Contractor can describe the correct response to the three most likely emergencies: injury, fire, and equipment malfunction.',
      'Contractor knows how to contact emergency services and the business owner.'
    ],
    perfSteps: [
      {
        text: 'Locate and demonstrate knowledge of emergency equipment:',
        substeps: [
          'Walk evaluator to the first aid kit location. Open it and identify basic supplies.',
          'Walk evaluator to fire extinguisher location. Describe PASS technique: Pull pin, Aim at base, Squeeze handle, Sweep side to side.',
          'Identify location of emergency shutoff for splitter and any other powered equipment.',
          'Identify the location of posted emergency contact numbers.'
        ]
      },
      {
        text: 'Describe response to a worker injury:',
        substeps: [
          'Stop all equipment in the area.',
          'Assess the situation for ongoing danger before approaching.',
          'Apply direct pressure to bleeding. Do not move a person with potential spinal injury.',
          'Call 911 if injury is serious. Call owner/supervisor immediately.',
          'Stay with injured person until help arrives.'
        ]
      },
      {
        text: 'Describe response to a fire:',
        substeps: [
          'Alert all workers in the area.',
          'If small and contained, use fire extinguisher (PASS method).',
          'If fire is spreading or involves fuel/chemicals, evacuate area and call 911.',
          'Never re-enter a burning structure.',
          'Account for all personnel at the designated meeting point.'
        ]
      },
      {
        text: 'Describe response to equipment malfunction:',
        substeps: [
          'Immediately shut down the equipment using the emergency stop or kill switch.',
          'Step back and assess. Do not attempt to clear jams or make repairs with engine/hydraulics active.',
          'Notify supervisor. Do not restart until cleared by qualified person.',
          'If hydraulic fluid is spraying, do not attempt to plug or touch the leak — high-pressure hydraulic fluid can penetrate skin.'
        ]
      }
    ],
    goNoGo: [
      'Correctly identifies first aid kit location and basic contents',
      'Correctly identifies fire extinguisher location and describes PASS technique',
      'Knows location of emergency shutoff for all equipment in use',
      'Correctly describes injury response sequence (stop equipment, assess, treat, call)',
      'Correctly describes fire response (alert, extinguish or evacuate, call)',
      'Correctly describes equipment malfunction response (shut down, step back, notify)',
      'Knows how to contact 911 and the business owner',
      'Identifies the hydraulic injection hazard correctly'
    ],
    notes: [
      'This is a verbal quiz + physical walk-through. Contractor does not need to demonstrate first aid skills, only knowledge of procedures and locations.',
      'Re-evaluate if site layout changes or new equipment is added.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; OSHA 29 CFR 1910'
  },

  'PN-104': {
    id: 'PN-104',
    tier: 'tier1to2',
    title: 'Splitter Startup & Shutdown',
    conditions: [
      'Contractor is assigned to operate the log splitter.',
      'Splitter is in a normal maintenance state (fueled, fluid levels adequate).',
      'Operator\'s manual or quick-reference card is available.'
    ],
    standards: [
      'Contractor performs a complete pre-operation inspection, starts the splitter correctly, and shuts it down properly following the prescribed sequence.',
      'All steps completed without assistance.'
    ],
    perfSteps: [
      {
        text: 'Pre-operation inspection:',
        substeps: [
          'Check hydraulic fluid level — must be within marked range on reservoir.',
          'Inspect hydraulic hoses and fittings for leaks, cracks, bulges, or chafing.',
          'Check engine oil level (if engine-driven).',
          'Inspect splitting wedge for cracks, excessive wear, or damage.',
          'Check log cradle/beam for debris, bending, or damage.',
          'Verify all guards and safety features are in place.',
          'Ensure work area is clear of obstructions and bystanders.'
        ]
      },
      {
        text: 'Startup sequence:',
        substeps: [
          'Set throttle to START/IDLE position.',
          'Turn fuel valve to ON (if equipped).',
          'Engage choke (cold start only).',
          'Pull start cord or turn key with smooth, firm motion.',
          'Allow engine to warm up for 30-60 seconds at idle.',
          'Disengage choke gradually as engine warms.',
          'Cycle the ram once without a log to verify smooth hydraulic operation.',
          'Advance throttle to operating speed.'
        ]
      },
      {
        text: 'Shutdown sequence:',
        substeps: [
          'Return ram to fully retracted position.',
          'Reduce throttle to idle. Allow 30-second cool-down.',
          'Turn fuel valve to OFF (if equipped).',
          'Turn ignition/kill switch to OFF.',
          'Inspect splitter for any new leaks or damage that developed during operation.',
          'Clean any bark, debris, or wood chips from the beam and wedge area.'
        ]
      }
    ],
    goNoGo: [
      'Completes pre-operation inspection (checks fluids, hoses, wedge, guards)',
      'Starts engine using correct sequence without flooding or damage',
      'Allows warm-up before operating under load',
      'Cycles ram empty to verify hydraulic operation before splitting',
      'Shuts down in correct sequence (retract, idle, cool, off)',
      'Cleans equipment after shutdown',
      'Performs all steps without prompting or assistance'
    ],
    notes: [
      'Cold start and warm start procedures may differ. Test both if possible.',
      'If the splitter has an electric start option, contractor should demonstrate pull-start as backup.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Splitter manufacturer operator\'s manual'
  },

  'PN-105': {
    id: 'PN-105',
    tier: 'tier1to2',
    title: 'Safe Splitter Operation',
    conditions: [
      'Splitter is running and operational.',
      'Logs of varying sizes (6–18 inch diameter) are available for splitting.',
      'Contractor has proper PPE (glasses, hearing protection, gloves, steel-toe boots).',
      'Evaluator observes for a minimum of 1 continuous hour of production.'
    ],
    standards: [
      'Contractor splits logs safely with correct hand placement at all times, proper log positioning, and consistent rhythm for a minimum of 1 hour with zero safety violations.',
      'All splits meet size specifications (≤6 inch face diameter for finished splits).'
    ],
    perfSteps: [
      {
        text: 'Hand placement and body position:',
        substeps: [
          'NEVER place hands between the log and the wedge or between the log and the pusher plate.',
          'Hold logs on the sides only, guiding them onto the beam from the loading end.',
          'Once the log is positioned and the ram is advancing, remove both hands completely from the log.',
          'Stand to the side of the beam, never directly in line with the splitting direction.',
          'Keep feet planted and stable. Do not lean across the beam.'
        ]
      },
      {
        text: 'Log positioning and orientation:',
        substeps: [
          'Place log flat against the beam with a stable face against the pusher plate.',
          'For round logs, position the largest flat end against the pusher.',
          'For oversized rounds (>18 inches), split in halves first, then re-split to target size.',
          'For knotty or twisted grain, position the knot facing down/away from the wedge if possible.',
          'Never force a log that is too large for the splitter. Buck to shorter length first.'
        ]
      },
      {
        text: 'Splitting rhythm and production flow:',
        substeps: [
          'Develop a consistent load-split-clear rhythm.',
          'Clear split pieces away from the wedge area between cycles to prevent jams.',
          'Stack or toss finished splits to a designated area — do not let them pile at your feet.',
          'Maintain awareness of where splits are falling. Call out to nearby workers if splits are thrown.',
          'If a log does not split cleanly, retract the ram fully and reposition before re-engaging.'
        ]
      },
      { text: 'If the splitter stalls or bogs down under load, immediately release the control lever and reduce throttle. Do not force through.' },
      { text: 'Watch for flying bark and wood fragments. Ensure safety glasses are in place at all times.' }
    ],
    goNoGo: [
      'Hands NEVER between log and wedge or log and pusher (zero tolerance)',
      'Holds logs on sides only during positioning',
      'Removes hands before ram contacts log',
      'Stands to the side, never in line with splitting direction',
      'Positions logs correctly (flat, stable, correct orientation)',
      'Clears splits from wedge area between cycles',
      'Maintains consistent production rhythm for 1+ hours',
      'Responds correctly to stalls (release, reduce throttle)',
      'Finished splits meet size spec (≤6 inch face)'
    ],
    notes: [
      '⚠️ AUTOMATIC NO-GO: A single instance of hands between log and wedge requires full retraining.',
      'Observe without interruption for the full hour. Note any fatigue-related safety degradation.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; OSHA 29 CFR 1910.266'
  },

  'PN-106': {
    id: 'PN-106',
    tier: 'tier1to2',
    title: 'Splitter Troubleshooting',
    conditions: [
      'Splitter is available (may be running or shut down depending on scenario).',
      'Evaluator presents 3-5 scenarios verbally or by simulating common problems.',
      'Common replacement parts and tools are available.'
    ],
    standards: [
      'Contractor correctly identifies the likely cause and appropriate response for at least 4 of 5 common splitter problems.',
      'Contractor distinguishes between problems they can fix and problems requiring supervisor/mechanic.'
    ],
    perfSteps: [
      {
        text: 'Recognize and respond to hydraulic lag/slow cycle:',
        substeps: [
          'Symptom: Ram moves noticeably slower than normal.',
          'Check hydraulic fluid level first — most common cause is low fluid.',
          'Check for visible leaks at hoses, fittings, and cylinder.',
          'If fluid is adequate and no leaks visible, check engine RPM — may be running too low.',
          'If none of the above resolve it, stop work and report — may indicate pump wear or internal leak.'
        ]
      },
      {
        text: 'Recognize and respond to wedge jam (log stuck on wedge):',
        substeps: [
          'Retract the ram fully.',
          'Do NOT try to pull the log off with hands while hydraulics are active.',
          'Use a pry bar or wedge to free the stuck piece from the side.',
          'If log is pinched between wedge halves, try advancing the ram slightly to release pressure, then retract.',
          'For persistent jams: shut down the splitter before using hand tools to clear.'
        ]
      },
      {
        text: 'Recognize and respond to engine issues:',
        substeps: [
          'Won\'t start: Check fuel, choke position, kill switch, spark plug wire.',
          'Runs rough: Check air filter for debris/clogging. Check fuel quality (water in fuel).',
          'Overheating: Shut down immediately. Check coolant/oil. Check for debris blocking airflow.'
        ]
      },
      {
        text: 'Recognize and respond to hydraulic leak:',
        substeps: [
          'If you see or hear hydraulic fluid escaping, shut down immediately.',
          'Do NOT touch the leak area — high-pressure fluid can penetrate skin (injection injury).',
          'Mark the leak location. Report to supervisor.',
          'Clean up spilled hydraulic fluid to prevent slipping hazard.'
        ]
      },
      { text: 'Know the escalation rule: if you cannot identify the problem within 5 minutes or if it involves the hydraulic pump, cylinder seals, or engine internals, stop and call for help.' }
    ],
    goNoGo: [
      'Correctly diagnoses slow cycle (checks fluid, leaks, RPM in order)',
      'Clears wedge jam safely (retracts ram, uses pry bar, not hands)',
      'Identifies at least 2 engine troubleshooting steps',
      'Describes correct hydraulic leak response (shut down, don\'t touch, report)',
      'Identifies hydraulic injection hazard',
      'Knows when to escalate vs. self-fix (5-minute rule)'
    ],
    notes: [
      'Can be evaluated as a verbal quiz with physical demonstration of jam clearing.',
      'If contractor has not yet encountered all scenarios, use verbal "what would you do if" format.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0'
  },

  'PN-107': {
    id: 'PN-107',
    tier: 'tier1to2',
    title: 'Quality Output — Split Size & Standards',
    conditions: [
      'Contractor is operating the splitter during production.',
      'A measuring device (tape measure or pre-cut sizing gauge) is available.',
      'A sample batch of at least 20 finished splits is available for inspection.'
    ],
    standards: [
      '95% or more of finished splits meet specifications: ≤6" max face diameter, 14–18" length (targeting 16"), clean splits with minimal bark shredding, no excessive slab cuts or oversized rounds.'
    ],
    perfSteps: [
      { text: 'Before splitting, understand the target specifications: 16-inch length, ≤6-inch face, clean splits.' },
      { text: 'Position logs so the split produces pieces within spec. Re-split oversized pieces.' },
      { text: 'Do not pass rounds through that are under 4 inches diameter — these are waste/kindling, not sellable splits.' },
      { text: 'Identify and separate defective wood: punky/rotten sections, excessive bark damage, ant-infested pieces, fungus-affected wood.' },
      { text: 'Sort splits by species when required (oak pile, hickory pile, mixed pile).' },
      { text: 'Use the sizing gauge periodically (every 15-20 minutes) to verify split dimensions are not drifting.' },
      { text: 'When a run of logs produces oversized splits, slow down and make additional passes rather than shipping oversized product.' }
    ],
    goNoGo: [
      'Splits consistently ≤6 inches on the face',
      'Lengths within 14-18 inches (most at 16 inches)',
      'Identifies and separates rotten/defective wood',
      'Re-splits oversized pieces rather than passing them through',
      'Does not include undersized waste pieces in sellable product',
      'Sorts by species when instructed',
      'Self-checks dimensions periodically during production'
    ],
    notes: [
      'Inspect a random sample of 20+ splits from the contractor\'s production. Count pieces outside spec.',
      'Greater than 5% out of spec = NO-GO. Retrain on specific deficiency.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Phoenix Nest Quality Standards'
  },

  'PN-108': {
    id: 'PN-108',
    tier: 'tier1to2',
    title: 'Proper Stacking for Seasoning',
    conditions: [
      'Finished splits are available for stacking.',
      'Designated stacking area with pallets or rails as base is prepared.',
      'Row markers and zone designations are in place.'
    ],
    standards: [
      'Contractor builds stable stacks that maximize airflow for seasoning, maintain correct dimensions, and will not collapse under their own weight or in moderate wind.'
    ],
    perfSteps: [
      { text: 'Stack on pallets or rails — never directly on the ground. Minimum 4 inches of airflow under the bottom row.' },
      { text: 'Orient split faces outward (bark side up/out) to promote moisture evaporation from the cut faces.' },
      {
        text: 'Build stable stacks:',
        substeps: [
          'Alternate direction slightly between layers to create interlocking stability.',
          'Place larger, flatter pieces at the bottom. Rounder pieces go higher.',
          'Do not stack higher than 4 feet unless the stack has end support.',
          'End pieces should be placed cross-wise to create bookend stability.'
        ]
      },
      { text: 'Leave 3-4 inches between rows/columns for airflow through the stack.' },
      { text: 'Do not mix processing dates in the same stack. One batch per stack/row.' },
      { text: 'Stack in the designated zone for the wood\'s maturity stage (green zone, seasoning zone, or ready zone).' },
      { text: 'Place the date tag on the stack immediately after building. Do not leave untagged stacks.' }
    ],
    goNoGo: [
      'Stacks on elevated surface (pallets/rails), never ground',
      'Split faces oriented outward for drying',
      'Stack is stable (push test: gentle push does not cause movement)',
      'Height does not exceed 4 feet without end support',
      'Adequate airflow gaps between stacks (3-4 inches minimum)',
      'Correct zone placement (new wood in green zone)',
      'Date tag placed immediately'
    ],
    notes: [
      'Push test: evaluator gently pushes on the stack from the side at mid-height. Any shift or instability = NO-GO.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Operations Framework — FIFO section'
  },

  'PN-109': {
    id: 'PN-109',
    tier: 'tier1to2',
    title: 'Pallet Building to Spec',
    conditions: [
      'Finished, properly sized splits are available.',
      'Standard pallets (48×40 inch) are available.',
      'Pallet wrap and banding materials are available.',
      'Target pallet specifications are posted or communicated.'
    ],
    standards: [
      'Contractor builds 3 sellable pallets that meet dimensional specifications, are stable for forklift transport and truck loading, and present a professional appearance.'
    ],
    perfSteps: [
      { text: 'Inspect the pallet base for damage. Do not build on a broken or split pallet.' },
      {
        text: 'Build to specifications:',
        substeps: [
          'Place splits bark-side out on the visible faces for professional appearance.',
          'Fill the interior tightly. Gaps reduce wood per pallet and cause shifting.',
          'Build to the designated height (typically 4 feet of wood on the pallet).',
          'Keep the top surface reasonably flat — do not pyramid above the edges.',
          'Ensure wood does not extend past pallet edges by more than 1 inch on any side.'
        ]
      },
      {
        text: 'Secure the pallet:',
        substeps: [
          'Apply pallet wrap around the load starting at the base.',
          'Wrap a minimum of 3 full revolutions at the base, middle, and top.',
          'Pull wrap tight enough to compress the load slightly but not so tight it tears.',
          'Tuck or tie off the wrap end securely.'
        ]
      },
      { text: 'Verify the pallet can be lifted by forklift without pieces falling. Tilt test: slightly tilt — nothing should shift or fall.' },
      { text: 'Mark the pallet with species tag and processing date.' }
    ],
    goNoGo: [
      'Pallet base inspected before building (no broken pallets used)',
      'Splits packed tightly with minimal gaps',
      'Height meets specification (within 2 inches of target)',
      'Wood does not extend past pallet edges excessively',
      'Top surface is flat, not pyramided',
      'Wrap applied correctly (base, middle, top, tight, secured)',
      'Passes forklift tilt test (no shifting or falling pieces)',
      'Species and date tag applied',
      'All 3 pallets completed to standard'
    ],
    notes: [
      'A pallet that fails the tilt test must be rebuilt. This counts as a NO-GO for that pallet.',
      'All 3 pallets must pass — 2 of 3 is not sufficient.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0'
  },

  'PN-110': {
    id: 'PN-110',
    tier: 'tier1to2',
    title: 'Loading Trucks Safely',
    conditions: [
      'A delivery truck (F-550, F-450, or similar) is available and positioned for loading.',
      'Forklift is operational and operated by a qualified person.',
      'Finished pallets are available for loading.',
      'Straps, chains, or tie-downs are available.'
    ],
    standards: [
      'Contractor assists with or completes truck loading with proper weight distribution, secure tie-downs, and no safety violations. Load is road-ready.'
    ],
    perfSteps: [
      { text: 'Confirm the truck is in park with engine off and wheels chocked before loading begins.' },
      {
        text: 'Weight distribution:',
        substeps: [
          'Heaviest pallets go forward (closest to cab) for proper tongue weight/axle loading.',
          'Distribute weight evenly side to side.',
          'Verify total load does not exceed truck\'s rated payload capacity.'
        ]
      },
      { text: 'Guide forklift operator with clear hand signals. Stand where the operator can see you. Never stand between the forklift and the truck bed.' },
      {
        text: 'Secure the load:',
        substeps: [
          'Apply at least 2 tie-down straps per pallet.',
          'Straps should be routed over the top of the load, not just around the sides.',
          'Ratchet straps tight enough to prevent shifting but not crush the load.',
          'Check that strap hardware is not damaged (bent ratchets, frayed straps).'
        ]
      },
      { text: 'After loading, walk around the truck and visually inspect: nothing hanging off sides, all straps tight, tailgate/stakes secured.' },
      { text: 'For bulk (non-pallet) loads: build a stable load shape, do not exceed bed walls, use a tarp for loose pieces on top.' }
    ],
    goNoGo: [
      'Truck secured before loading begins (park, chocked)',
      'Weight distributed properly (heavy forward, balanced side-to-side)',
      'Stays visible to forklift operator, uses hand signals',
      'Never stands between forklift and truck during loading',
      'Applies adequate tie-downs (minimum 2 per pallet)',
      'Straps routed correctly and tightened properly',
      'Completes walk-around inspection after loading',
      'Total load does not exceed truck capacity'
    ],
    notes: [
      'If contractor will be driving, verify they understand the load\'s effect on braking distance and center of gravity.',
      'DOT requirements for securing loads vary by weight.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; FMCSA 49 CFR 393'
  },

  'PN-111': {
    id: 'PN-111',
    tier: 'tier1to2',
    title: 'Daily Equipment Checks',
    conditions: [
      'Equipment assigned for the day is available (splitter, chainsaw, tractor, truck, or hand tools).',
      'Fluid supplies (oil, hydraulic fluid, fuel, bar oil) are accessible.',
      'Equipment operator manual or daily check card is available.'
    ],
    standards: [
      'Contractor performs a complete daily pre-operation check on assigned equipment, identifies any deficiencies, and reports issues before beginning production.'
    ],
    perfSteps: [
      {
        text: 'Universal checks (all equipment):',
        substeps: [
          'Visual walk-around: look for leaks, damage, loose parts, debris buildup.',
          'Check all fluid levels: engine oil, hydraulic fluid, coolant, fuel.',
          'Inspect belts and hoses for cracks, wear, or looseness.',
          'Check tire pressure/condition (wheeled equipment).',
          'Verify all guards and safety devices are in place and functional.'
        ]
      },
      {
        text: 'Splitter-specific:',
        substeps: [
          'Check hydraulic fluid level and condition (milky = water contamination).',
          'Inspect wedge for cracks or chips.',
          'Verify ram extends and retracts smoothly.'
        ]
      },
      {
        text: 'Chainsaw-specific:',
        substeps: [
          'Check chain tension (slight slack, pull away ~1/4 inch).',
          'Verify chain sharpness (look for rounded cutters, damaged teeth).',
          'Check bar oil reservoir level.',
          'Inspect bar for wear, burrs, or bending.'
        ]
      },
      { text: 'Log any findings on the daily check sheet or report verbally to supervisor.' },
      { text: 'Do NOT operate equipment with identified safety deficiencies. Tag it out and report.' }
    ],
    goNoGo: [
      'Performs visual walk-around before starting any equipment',
      'Checks all relevant fluid levels correctly',
      'Inspects belts, hoses, and safety devices',
      'Performs equipment-specific checks (splitter: hydraulics/wedge; chainsaw: chain/bar)',
      'Reports findings before starting production',
      'Refuses to operate equipment with safety deficiencies'
    ],
    notes: [
      'This should become automatic daily habit. Evaluate by spot-checking: arrive before the contractor and observe whether they perform checks unprompted.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Equipment manufacturer maintenance schedules'
  },

  'PN-112': {
    id: 'PN-112',
    tier: 'tier1to2',
    title: 'End-of-Shift Cleaning',
    conditions: [
      'Production shift is ending.',
      'All equipment used during the shift needs cleaning and securing.',
      'Cleaning tools (brush, blower, rags) are available.'
    ],
    standards: [
      'Contractor properly cleans, inspects, and secures all equipment used during the shift within 15 minutes of production stopping.'
    ],
    perfSteps: [
      { text: 'Shut down all equipment following proper shutdown procedures.' },
      { text: 'Remove all bark, wood chips, and debris from equipment surfaces, especially around hydraulic fittings, air intakes, and the splitter beam.' },
      { text: 'Brush or blow off the chainsaw bar, chain, sprocket area, and air filter cover.' },
      { text: 'Wipe down tractor/equipment controls and seat area.' },
      { text: 'Inspect equipment for any new damage or issues that developed during the shift. Report findings.' },
      { text: 'Store hand tools in their designated locations. Do not leave tools on the ground or on equipment.' },
      { text: 'Secure equipment against theft/weather if applicable (lock fuel caps, lower loader bucket, engage parking brake).' },
      { text: 'Pick up any trash, empty containers, or waste materials from the work area.' }
    ],
    goNoGo: [
      'Equipment shut down using proper procedure',
      'Bark and debris removed from all equipment used',
      'Post-shift inspection completed and issues reported',
      'Hand tools stored in designated locations (none left loose)',
      'Equipment secured (brakes, locks, lowered attachments)',
      'Work area left clean',
      'Completed within 15 minutes of production stop'
    ],
    notes: [
      'Best evaluated by inspecting the site after the contractor has left.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0'
  },

  'PN-113': {
    id: 'PN-113',
    tier: 'tier1to2',
    title: 'Reporting Equipment Issues',
    conditions: [
      'Contractor has been working for at least 2 weeks.',
      'During that period, equipment issues have either occurred naturally or been introduced by the evaluator.',
      'Communication channel (text, verbal, written log) is established.'
    ],
    standards: [
      'Contractor identifies and reports equipment problems promptly with sufficient detail for the supervisor to take action. Reports include what equipment, what symptom, when it started, and severity assessment.'
    ],
    perfSteps: [
      { text: 'When you notice something wrong, assess: Is this a safety issue requiring immediate shutdown? Or a performance issue for next opportunity?' },
      {
        text: 'Report with the 4-W format:',
        substeps: [
          'WHAT equipment: "The splitter" or "The 5055E"',
          'WHAT symptom: "Hydraulic ram is cycling slower than normal"',
          'WHEN it started: "Started about an hour ago" or "First thing this morning"',
          'HOW BAD: "Still working but noticeably slower" or "Had to shut down"'
        ]
      },
      { text: 'For urgent/safety issues: Stop equipment immediately. Call or text supervisor right away.' },
      { text: 'For non-urgent issues: Note it and report at end of shift or at next break.' },
      { text: 'Never ignore an issue hoping it will go away. Small problems become expensive problems.' }
    ],
    goNoGo: [
      'Reports equipment issues within the same shift they are discovered',
      'Includes specific equipment identification in report',
      'Describes the symptom clearly (not just "it\'s broken")',
      'Assesses urgency correctly (safety stop vs. end-of-shift report)',
      'Uses the 4-W format or equivalent level of detail',
      'Does not attempt repairs beyond their training level',
      'Track record over 2+ weeks shows consistent reporting behavior'
    ],
    notes: [
      'Can be evaluated by introducing a minor issue (low fluid, loose bolt) and observing whether and how the contractor reports it.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0'
  },

  'PN-114': {
    id: 'PN-114',
    tier: 'tier1to2',
    title: 'Production Rate — 1+ Cord/Day',
    conditions: [
      'Contractor is working as a helper paired with a Tier 3 or Tier 4 worker.',
      'Standard production equipment is operational.',
      'Normal working conditions (not extreme weather, equipment downtime, or short shift).',
      'Production is tracked for a minimum of 5 consecutive full workdays.'
    ],
    standards: [
      'The paired crew produces at least 1 cord per day attributable to the helper\'s contribution over 5 consecutive workdays.',
      'Paired crew total output averages 3+ cords/day.'
    ],
    perfSteps: [
      { text: 'Maintain a steady work pace throughout the shift. Avoid extended breaks or idle periods.' },
      { text: 'Anticipate the skilled worker\'s needs: have the next log ready, clear splits promptly, keep the flow moving.' },
      { text: 'Perform assigned tasks (loading, stacking, clearing) efficiently so the skilled worker can focus on equipment operation.' },
      { text: 'Track your own output mentally. Know how many pallets you\'ve built or cords you\'ve contributed to.' },
      { text: 'If you fall behind, communicate with your partner rather than cutting corners on quality.' }
    ],
    goNoGo: [
      'Crew produces 3+ cords/day average over 5-day evaluation period',
      'Helper\'s contribution is measurable (pallets built, cords stacked)',
      'No quality issues traced to rushing or cutting corners',
      'Maintains consistent pace throughout shift',
      'Meets the standard for all 5 consecutive days (not 4 of 5)'
    ],
    notes: [
      'Ask the skilled worker: "Is this helper making you faster or slower?"',
      'Weather days and equipment breakdowns should be excluded and replaced with full-day evaluations.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Advancement Process'
  },

  // ═══ TIER 2 → 3 ═══

  'PN-201': {
    id: 'PN-201',
    tier: 'tier2to3',
    title: 'Chainsaw Safety Certification',
    conditions: [
      'Contractor has completed a formal chainsaw safety training (in-house or external).',
      'Training covers: reactive forces, kickback prevention, PPE requirements, maintenance, and emergency procedures.',
      'Written or verbal assessment is administered by the owner.'
    ],
    standards: [
      'Contractor demonstrates comprehensive knowledge of chainsaw safety principles and passes assessment with at least 80% correct responses.'
    ],
    perfSteps: [
      {
        text: 'Demonstrate knowledge of reactive forces:',
        substeps: [
          'Identify pushback (saw pushed back toward operator when bottom of bar contacts wood).',
          'Identify pull-in (saw pulled forward when top of bar contacts wood).',
          'Identify kickback (sudden upward rotation of bar when the tip contacts an object).',
          'Describe correct body and grip positioning to resist each reactive force.'
        ]
      },
      {
        text: 'Explain the kickback danger zone:',
        substeps: [
          'Identify the upper quadrant of the bar tip as the primary kickback zone.',
          'Describe how kickback occurs: chain at the tip catches and throws the bar upward.',
          'Identify situations that increase kickback risk: bar tip contact, pinched bar, dull chain.',
          'Describe the function of the chain brake and how to test it.'
        ]
      },
      {
        text: 'Describe required PPE for chainsaw operation:',
        substeps: [
          'Chainsaw chaps or chainsaw pants (cut-resistant).',
          'Face shield or safety glasses with side shields.',
          'Hearing protection.',
          'Steel-toe or logging boots with ankle support.',
          'Work gloves (not loose-fitting).',
          'Hard hat (when overhead hazards are present).'
        ]
      },
      { text: 'Explain the importance of maintaining a sharp chain (reduces kickback risk, operator fatigue, and improves cut quality).' },
      { text: 'Describe what to do if the saw becomes pinched in a cut (shut off engine, use a wedge to free bar, never pull forcefully).' }
    ],
    goNoGo: [
      'Correctly identifies all three reactive forces (pushback, pull-in, kickback)',
      'Identifies the kickback danger zone on the bar',
      'Describes at least 3 situations that increase kickback risk',
      'Knows how to test the chain brake',
      'Lists all required PPE correctly',
      'Explains pinched-bar response procedure',
      'Passes assessment at 80%+ correct'
    ],
    notes: [
      'This is a knowledge assessment. Physical demonstration is covered in subsequent tasks.',
      'Consider using an external chainsaw safety course (Game of Logging, Stihl dealer training).'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; OSHA 29 CFR 1910.266; ANSI Z133.1'
  },

  'PN-202': {
    id: 'PN-202',
    tier: 'tier2to3',
    title: 'Chainsaw Startup, Operation & Shutdown',
    conditions: [
      'A properly maintained chainsaw is available with full fuel and bar oil.',
      'Contractor has passed PN-201 (Safety Certification).',
      'Logs of varying diameter (6–24 inches) are available for bucking.',
      'Appropriate PPE is available and worn.'
    ],
    standards: [
      'Contractor performs correct cold start and warm start procedures, bucks 10 logs to 16-inch length within ±1 inch tolerance, and shuts down properly. All safety protocols followed.'
    ],
    perfSteps: [
      {
        text: 'Cold start procedure:',
        substeps: [
          'Place saw on flat ground. Engage chain brake.',
          'Set choke to FULL position. Set throttle lock/fast idle if equipped.',
          'Hold saw firmly: right foot in rear handle, left hand on front handle.',
          'Pull starter rope with smooth, firm strokes until saw fires (pops).',
          'Move choke to HALF/RUN position. Pull again until saw runs.',
          'Blip throttle to disengage fast idle. Allow 15-30 seconds warm-up.'
        ]
      },
      {
        text: 'Warm start procedure:',
        substeps: [
          'No choke needed. Engage chain brake.',
          'Set throttle lock if equipped.',
          'Pull starter — should start within 1-3 pulls.'
        ]
      },
      {
        text: 'Bucking logs to length:',
        substeps: [
          'Measure and mark 16-inch cut points (use a pre-cut stick as a gauge).',
          'Position body to the left of the saw, never directly behind the bar.',
          'Begin cut from the top (overbuck) if log is supported at both ends.',
          'If cantilever, cut from underneath first (underbuck) 1/3, then finish from the top.',
          'Let the saw do the work — do not force or push through the cut.',
          'Maintain firm two-handed grip at all times during cutting.'
        ]
      },
      {
        text: 'Shutdown procedure:',
        substeps: [
          'Release throttle. Allow chain to stop or engage chain brake.',
          'Set kill switch/ignition to OFF.',
          'Set saw on the ground in a safe location, bar away from walkways.',
          'Allow to cool before transport or storage.'
        ]
      }
    ],
    goNoGo: [
      'Performs cold start correctly (brake on, proper grip, correct choke sequence)',
      'Does NOT drop-start the saw (automatic NO-GO)',
      'Correct body position during cutting (left of saw, not behind bar)',
      'Uses proper cutting technique (overbuck/underbuck based on support)',
      '8 of 10 logs cut within ±1 inch of 16-inch target',
      'Maintains two-handed grip throughout all cuts',
      'Chain brake engaged during starts and when walking with running saw',
      'Proper shutdown sequence completed'
    ],
    notes: [
      '⚠️ DROP STARTING (holding saw in the air with one hand while pulling cord) is an AUTOMATIC NO-GO.',
      'Measure all 10 cuts. More than 2 outside ±1 inch tolerance = NO-GO.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; OSHA 29 CFR 1910.266'
  },

  'PN-203': {
    id: 'PN-203',
    tier: 'tier2to3',
    title: 'Bind Recognition & Cutting Technique',
    conditions: [
      'Contractor has passed PN-202 (Startup/Operation).',
      'Logs in various support configurations are available: supported at both ends, supported at one end, and ground-supported.',
      'Evaluator explains or demonstrates each scenario before testing.'
    ],
    standards: [
      'Contractor correctly identifies compression and tension forces in at least 3 different log support scenarios and applies the correct cutting technique for each to avoid bar pinch.'
    ],
    perfSteps: [
      {
        text: 'Understand compression vs. tension:',
        substeps: [
          'Compression side: The side being squeezed together. Cutting here first closes the kerf on the bar.',
          'Tension side: The side being pulled apart. Cutting here first opens the kerf.',
          'Rule: Always start the cut on the TENSION side, then finish on the COMPRESSION side.'
        ]
      },
      {
        text: 'Scenario 1 — Log supported at both ends (bridge):',
        substeps: [
          'Compression is on TOP, tension is on BOTTOM.',
          'Begin with an underbuck (cut from bottom) ~1/3 of the diameter.',
          'Finish with an overbuck (cut from top) to meet the underbuck.'
        ]
      },
      {
        text: 'Scenario 2 — Log supported at one end (cantilever):',
        substeps: [
          'Compression is on BOTTOM, tension is on TOP.',
          'Begin with an overbuck (cut from top) ~1/3 of the diameter.',
          'Finish with an underbuck to prevent bar pinch as the log drops.'
        ]
      },
      {
        text: 'Scenario 3 — Log resting on the ground:',
        substeps: [
          'Cut from the top (overbuck) stopping before the bar contacts the ground.',
          'Roll the log to access the uncut portion.',
          'NEVER cut into the ground — instantly dulls the chain and can cause kickback.'
        ]
      },
      { text: 'When in doubt about forces in a complex log pile, use a wedge to keep the kerf open.' },
      { text: 'If the bar begins to pinch at any point, STOP. Shut off saw. Use a wedge or pry bar to free it.' }
    ],
    goNoGo: [
      'Correctly identifies compression and tension sides in 3 different scenarios',
      'Applies correct cutting technique (tension first) in bridge scenario',
      'Applies correct technique in cantilever scenario',
      'Does not cut into the ground on ground-resting logs',
      'Knows to use a wedge when forces are unclear',
      'Correctly responds to bar pinch (stop, shut off, wedge/pry)'
    ],
    notes: [
      'This is one of the most important chainsaw skills. A pinched bar at full throttle can cause violent kickback.',
      'Use chalk or paint to mark the compression/tension sides during training.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; Game of Logging Level 1'
  },

  'PN-204': {
    id: 'PN-204',
    tier: 'tier2to3',
    title: 'Chain Maintenance',
    conditions: [
      'A chainsaw with a chain requiring sharpening is available.',
      'Round file, flat file, file guide/gauge, and depth gauge tool are available.',
      'Bar wrench and chain tension adjustment tool are available.'
    ],
    standards: [
      'Contractor correctly sharpens a chain to restore cutting performance, adjusts chain tension to specification, and identifies when a chain must be replaced.'
    ],
    perfSteps: [
      {
        text: 'Sharpening the chain:',
        substeps: [
          'Engage chain brake. Secure the saw in a vise or on a stable surface.',
          'Identify the correct file diameter for the chain.',
          'Set the file guide to the correct angle (typically 25-35 degrees).',
          'File each cutter with smooth forward strokes only (not on backstroke).',
          'Apply equal number of strokes to each cutter (typically 3-5 per tooth).',
          'Alternate sides: sharpen all cutters on one side, then rotate.',
          'Check depth gauges (rakers) with the gauge tool. File flat any that protrude.'
        ]
      },
      {
        text: 'Adjusting chain tension:',
        substeps: [
          'Loosen the bar mounting nuts (do not remove).',
          'Turn the tensioning screw: clockwise to tighten.',
          'Correct tension: chain pulls away ~1/4 inch and snaps back when released.',
          'Hold the bar tip up while tightening the mounting nuts.'
        ]
      },
      {
        text: 'Chain replacement criteria:',
        substeps: [
          'Cutters worn past the witness mark (below minimum length).',
          'Damaged or missing cutters (broken teeth, bent links).',
          'Cracked or stretched drive links.',
          'Chain does not hold tension after proper adjustment.'
        ]
      }
    ],
    goNoGo: [
      'Selects correct file diameter for the chain',
      'Files at correct angle using a guide',
      'Files forward strokes only, equal count per tooth',
      'Checks and files depth gauges',
      'Sets chain tension correctly (1/4-inch pull test with snap-back)',
      'Holds bar tip up during nut tightening',
      'Identifies at least 3 chain replacement criteria',
      'Sharpened chain cuts noticeably better (functional test)'
    ],
    notes: [
      'Functional test: cut before and after sharpening. Chain should produce chips not dust.',
      'If after sharpening the chain still produces dust = NO-GO on sharpening technique.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Stihl/Husqvarna maintenance guides'
  },

  'PN-205': {
    id: 'PN-205',
    tier: 'tier2to3',
    title: 'Tractor Startup, Maneuvering & Shutdown',
    conditions: [
      'JD 5055E (or assigned tractor) is available with loader attachment.',
      'Open work area with marked cones for maneuvering exercises.',
      'Contractor has received initial orientation on tractor controls.'
    ],
    standards: [
      'Contractor starts the tractor correctly, demonstrates controlled forward/reverse maneuvering including turns in a confined work area, and shuts down properly.'
    ],
    perfSteps: [
      {
        text: 'Pre-operation checks:',
        substeps: [
          'Walk-around inspection: tires, hydraulic hoses, loader pins, PTO shield, lights.',
          'Check engine oil, hydraulic fluid, coolant, fuel level.',
          'Adjust seat and mirrors. Verify ROPS is up and locked.',
          'Check that all controls are in neutral and PTO is disengaged.'
        ]
      },
      {
        text: 'Startup:',
        substeps: [
          'Sit in the seat. Fasten seat belt.',
          'Transmission in neutral. PTO disengaged. Parking brake set.',
          'Glow plugs (diesel): turn key to ON, wait for indicator to go out.',
          'Crank engine. Do not crank for more than 15 seconds continuously.',
          'Allow 1-2 minutes warm-up at low idle.'
        ]
      },
      {
        text: 'Maneuvering exercises:',
        substeps: [
          'Drive forward in a straight line at low speed, stop smoothly.',
          'Reverse in a straight line, looking over shoulder and using mirrors.',
          'Execute a 3-point turn in limited space.',
          'Navigate around 3 cones without contacting any.',
          'Demonstrate awareness of rear swing radius during turns.'
        ]
      },
      {
        text: 'Shutdown:',
        substeps: [
          'Lower loader bucket to the ground.',
          'Set parking brake.',
          'Disengage PTO if engaged.',
          'Reduce engine to low idle for 1-2 minutes.',
          'Turn key to OFF. Remove key.'
        ]
      }
    ],
    goNoGo: [
      'Completes pre-operation walk-around and fluid checks',
      'Fastens seat belt before starting (zero tolerance)',
      'Correct startup sequence (neutral, brake, glow plugs, crank)',
      'Drives forward and stops smoothly (no jerking or stalling)',
      'Reverses in a straight line with head turned to look',
      'Completes 3-point turn without hitting markers',
      'Demonstrates awareness of rear swing radius',
      'Correct shutdown (lower bucket, brake, idle down, off)'
    ],
    notes: [
      '⚠️ Seat belt use is non-negotiable. ROPS without seat belt = ejection risk during rollover.',
      'Initial training should be in an open area away from equipment, stacks, and people.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; JD 5055E Operator Manual; OSHA 29 CFR 1928.51'
  },

  'PN-206': {
    id: 'PN-206',
    tier: 'tier2to3',
    title: 'Tractor Loader Operation',
    conditions: [
      'Contractor has passed PN-205 (Startup/Maneuvering).',
      'Logs of varying size are available for moving.',
      'A truck or pallet loading area is designated.',
      'Work area has adequate space for tractor maneuvering with loaded bucket.'
    ],
    standards: [
      'Contractor uses the loader to pick up, transport, and place logs safely and efficiently for 1 hour with no safety violations and no dropped loads.'
    ],
    perfSteps: [
      {
        text: 'Picking up logs:',
        substeps: [
          'Approach the log pile slowly, bucket level and low (6-12 inches off ground).',
          'Tilt bucket forward slightly, drive under the load.',
          'Curl bucket back to cradle the load. Do not overfill.',
          'Lift smoothly. Do not jerk the loader arms.',
          'Check that the load is balanced before transporting.'
        ]
      },
      {
        text: 'Transporting logs:',
        substeps: [
          'Travel with the load LOW (12-18 inches off ground) for stability.',
          'Drive at controlled speed. Loaded tractor stops slower and turns wider.',
          'Watch for people, equipment, and obstacles.',
          'Sound horn before backing up or approaching blind corners.',
          'Never drive over uneven ground with a raised load.'
        ]
      },
      {
        text: 'Placing logs:',
        substeps: [
          'Approach the target area slowly.',
          'Position the bucket over the desired placement point.',
          'Lower the load gently. Tilt bucket forward to release.',
          'Back away slowly. Raise empty bucket to travel height.'
        ]
      },
      { text: 'Coordinate with ground crew. Wait for clear signals before approaching, lifting, or dumping.' },
      { text: 'If a load shifts or feels unbalanced, STOP. Lower to the ground and reposition.' }
    ],
    goNoGo: [
      'Approaches log pile at controlled speed with bucket low',
      'Picks up balanced loads (not overfilled)',
      'Transports with load low (12-18 inches)',
      'Maintains awareness of surroundings (people, equipment, obstacles)',
      'Sounds horn before reversing near people',
      'Places loads gently without dropping',
      'Coordinates with ground crew using signals',
      'No dropped loads during 1-hour evaluation',
      'Stops and addresses unbalanced loads'
    ],
    notes: [
      'Common mistake: carrying loads too high. Raises center of gravity, increases rollover risk.',
      'Evaluate during actual production, not just in an empty practice area.'
    ],
    safetyCritical: true,
    references: 'Skill & Compensation Framework v1.0; JD 5055E Operator Manual'
  },

  'PN-207': {
    id: 'PN-207',
    tier: 'tier2to3',
    title: 'Tractor Attachment Changes',
    conditions: [
      'Tractor is available with at least 2 different attachments.',
      'Proper pins, tools, and hydraulic quick-connect fittings are available.',
      'Area is flat and level for attachment work.'
    ],
    standards: [
      'Contractor safely removes one attachment and installs another within 15 minutes, with all pins seated, hydraulic connections secure, and safety clips in place.'
    ],
    perfSteps: [
      {
        text: 'Removing an attachment:',
        substeps: [
          'Park on level ground. Lower the attachment to the ground.',
          'Shut off the engine. Set parking brake.',
          'Relieve hydraulic pressure by moving control levers with engine off.',
          'Disconnect hydraulic lines: clean fittings first, then disconnect. Cap open lines.',
          'Remove retaining pins and safety clips. Keep hardware together.',
          'Back the tractor away from the detached attachment slowly.'
        ]
      },
      {
        text: 'Installing an attachment:',
        substeps: [
          'Align the tractor mounting points with the attachment.',
          'Drive forward slowly to engage mounting points.',
          'Shut off engine. Insert retaining pins and safety clips.',
          'Connect hydraulic lines: match colored tags/markings. Clean fittings first.',
          'Start engine. Test hydraulic function through full range of motion.',
          'Check for hydraulic leaks at all connection points.'
        ]
      },
      { text: 'Shake test: grab the attachment and attempt to move it — should have zero play at the mounting points.' }
    ],
    goNoGo: [
      'Shuts off engine and sets brake before working on attachments',
      'Relieves hydraulic pressure before disconnecting lines',
      'Caps open hydraulic lines to prevent contamination',
      'Keeps hardware organized (pins and clips not lost)',
      'Correctly matches hydraulic line connections',
      'Inserts all retaining pins AND safety clips',
      'Tests attachment through full range after installation',
      'Checks for hydraulic leaks at all connections',
      'Passes shake test (no play at mounting points)',
      'Completes within 15 minutes'
    ],
    notes: [
      'Safety clips are commonly forgotten. A pin without a clip can work loose during operation.',
      'Cross-connecting hydraulic lines reverses controls. Always test after connecting.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; JD 5055E Operator Manual'
  },

  'PN-208': {
    id: 'PN-208',
    tier: 'tier2to3',
    title: 'Complete Manufacturing Order — Solo',
    conditions: [
      'A manufacturing order (MO) has been created specifying: species, quantity (cords), cut length, quality requirements.',
      'Raw logs of the specified species are available.',
      'All production equipment is operational.',
      'Contractor works without supervision for the full MO.'
    ],
    standards: [
      'Contractor independently completes a manufacturing order from raw logs to wrapped, tagged, sellable pallets. Finished product meets all quality specs. Production rate: 1.5+ cords in an 8-hour shift.'
    ],
    perfSteps: [
      {
        text: 'Planning the work:',
        substeps: [
          'Review the MO: species, quantity, cut length, any special instructions.',
          'Assess raw log inventory. Confirm sufficient material is available.',
          'Plan your workflow: buck → split → stack/palletize.',
          'Estimate time required. Identify any potential bottlenecks.'
        ]
      },
      {
        text: 'Execute production:',
        substeps: [
          'Buck logs to specified length.',
          'Split to specification.',
          'Build pallets to spec.',
          'Maintain quality throughout: reject defective wood, check dimensions.'
        ]
      },
      {
        text: 'Quality verification:',
        substeps: [
          'Test moisture content on 3-5 random pieces per cord using the Lignomat meter.',
          'Verify pieces are within size specification.',
          'Confirm species is correct (no accidental mixing).',
          'Record moisture readings on the MO sheet.'
        ]
      },
      {
        text: 'Close out the MO:',
        substeps: [
          'Count and record total cords/pallets completed.',
          'Tag all pallets with species, date, and MO number.',
          'Place finished pallets in the correct zone.',
          'Clean up work area and equipment.',
          'Report MO completion to management.'
        ]
      }
    ],
    goNoGo: [
      'Reviews MO specs before starting (doesn\'t just start working)',
      'Correctly plans workflow and identifies material needs',
      'Completes all phases independently (buck, split, palletize)',
      'Finished product meets species, size, and quality specifications',
      'Performs moisture testing and records results',
      'Produces 1.5+ cords in an 8-hour shift',
      'Tags all pallets correctly and places in proper zone',
      'Cleans up and reports completion'
    ],
    notes: [
      'This is the capstone evaluation for Tier 3. Contractor must demonstrate they can run the entire operation alone.',
      'Do not intervene during evaluation unless there is a safety issue.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 2 → Tier 3'
  },

  'PN-209': {
    id: 'PN-209',
    tier: 'tier2to3',
    title: 'Quality Verification — Moisture Testing',
    conditions: [
      'Lignomat moisture meter with remote slide hammer probe is available.',
      'Seasoned and green wood samples are available for testing.',
      'Contractor has been shown the basic operation of the moisture meter.'
    ],
    standards: [
      'Contractor correctly operates the Lignomat meter, takes accurate moisture readings, and correctly interprets results against Phoenix Nest quality standards (<20% = seasoned, sellable).'
    ],
    perfSteps: [
      {
        text: 'Prepare the meter:',
        substeps: [
          'Turn on the Lignomat meter. Verify battery level is adequate.',
          'Select the correct wood species setting if required.',
          'Verify the slide hammer probe pins are clean and straight.'
        ]
      },
      {
        text: 'Take a reading:',
        substeps: [
          'Select a piece from the middle of the stack (not the outside).',
          'For most accurate reading, split the test piece and test the freshly exposed face.',
          'Drive the slide hammer probe pins into the end grain or freshly split face.',
          'Hold steady until the reading stabilizes (2-3 seconds).',
          'Record the reading.'
        ]
      },
      {
        text: 'Interpret results:',
        substeps: [
          'Below 20%: PASS — wood is seasoned and ready to sell.',
          '15-18%: IDEAL — optimal burning moisture content.',
          '20-25%: BORDERLINE — needs more seasoning time.',
          'Above 25%: GREEN — requires 3-6+ months additional drying.',
          'Above 35%: FRESHLY CUT — requires 6-12+ months.'
        ]
      },
      { text: 'Test a minimum of 3-5 pieces per cord or batch. Average the readings.' },
      { text: 'If any single piece reads above 25% in an otherwise sub-20% batch, investigate: may have been on the ground or poorly positioned.' },
      { text: 'Record all readings on the batch tag or MO sheet.' }
    ],
    goNoGo: [
      'Turns on meter and selects correct species setting',
      'Tests from the middle of the stack, not just outside pieces',
      'Splits a test piece for interior reading (not just surface)',
      'Drives probe correctly and waits for stable reading',
      'Correctly interprets readings against the 20% threshold',
      'Tests adequate sample size (3-5 pieces per cord)',
      'Records readings on the appropriate documentation',
      'Identifies and investigates outlier readings'
    ],
    notes: [
      'Common mistake: testing only the outside surface, which can be 5-10% lower than interior.',
      'The Lignomat meter is a professional-grade tool. Handle with care.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0; Lignomat operating manual'
  },

  'PN-210': {
    id: 'PN-210',
    tier: 'tier2to3',
    title: 'Equipment Troubleshooting — Diagnosis & Repair',
    conditions: [
      'Production equipment is available (splitter, chainsaw, tractor).',
      'Evaluator presents 3 real or simulated problems.',
      'Basic tools and spare parts are available.',
      'Contractor has at least 3 months of operational experience.'
    ],
    standards: [
      'Contractor correctly diagnoses 3 common equipment problems and performs at least 1 minor repair to restore equipment to operation.'
    ],
    perfSteps: [
      {
        text: 'Systematic diagnostic approach:',
        substeps: [
          'Identify the symptom: what is the equipment doing (or not doing)?',
          'Isolate the system: engine, hydraulic, mechanical, or electrical?',
          'Check the simple things first: fluid levels, loose connections, clogged filters.',
          'Use your senses: look (leaks), listen (unusual sounds), smell (burning), feel (vibration).'
        ]
      },
      {
        text: 'Common repairs a Tier 3 worker should be able to perform:',
        substeps: [
          'Replace or clean an air filter.',
          'Top off fluids (oil, hydraulic, coolant, bar oil).',
          'Replace a drive belt.',
          'Tighten loose bolts, fittings, and connections.',
          'Replace a hydraulic hose fitting (if a spare is available).',
          'Clean or replace a spark plug.',
          'Adjust chain tension and sharpen chain.'
        ]
      },
      {
        text: 'Know the escalation threshold:',
        substeps: [
          'STOP if: internal engine work, hydraulic pump/cylinder disassembly, electrical wiring, or structural damage.',
          'STOP if unsure after 15 minutes of diagnosis.',
          'STOP if the repair requires specialized tools you don\'t have.'
        ]
      }
    ],
    goNoGo: [
      'Uses systematic approach (symptom → system → simple checks first)',
      'Correctly diagnoses at least 3 of 3 presented problems',
      'Successfully completes at least 1 minor repair',
      'Correctly identifies problems that require escalation',
      'Does not make the problem worse during diagnosis or repair',
      'Uses tools correctly and safely'
    ],
    notes: [
      'Suggested scenarios: (1) Splitter with low hydraulic fluid, (2) Chainsaw with dull chain, (3) Tractor with clogged air filter.',
      'Bonus: present a scenario requiring escalation and verify correct identification.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0'
  },

  'PN-211': {
    id: 'PN-211',
    tier: 'tier2to3',
    title: 'Solo Production Rate — 1.5+ Cords/Day',
    conditions: [
      'Contractor is working independently (solo, not paired).',
      'Standard production equipment is operational.',
      'Raw material is available and staged.',
      'Evaluated over at least 5 full workdays.'
    ],
    standards: [
      'Contractor produces 1.5 or more cords per 8-hour shift, sustained over 5+ consecutive full workdays with less than 5% rejection rate.'
    ],
    perfSteps: [
      { text: 'Plan the day\'s work before touching equipment: species, quantity, equipment sequence.' },
      { text: 'Stage raw material near the production area before beginning.' },
      { text: 'Maintain a steady pace throughout the shift. Consistent effort beats sprinting then crashing.' },
      { text: 'Self-inspect quality periodically. Catching defects in real-time is faster than rework.' },
      { text: 'Track your own output. Know how many pallets you\'ve built by mid-shift.' },
      { text: 'Keep your work area clean as you go. A cluttered workspace slows production.' }
    ],
    goNoGo: [
      'Averages 1.5+ cords/day over the 5-day evaluation period',
      'No single day below 1.25 cords (consistency requirement)',
      'Rejection/rework rate below 5%',
      'Demonstrates self-direction (plans, stages, paces without instruction)',
      'Maintains quality standards throughout'
    ],
    notes: [
      'This is a sustained performance evaluation, not a one-day sprint.',
      'Exclude days with significant equipment downtime (>1 hour) or weather interruptions.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 2 → Tier 3'
  },

  // ═══ TIER 3 → 4 ═══

  'PN-301': {
    id: 'PN-301',
    tier: 'tier3to4',
    title: 'Preventive Maintenance Program',
    conditions: [
      'All production equipment is assigned to the contractor for maintenance.',
      'Maintenance schedule (daily, weekly, monthly, hourly intervals) is posted.',
      'Fluids, filters, and common replacement parts are stocked.',
      'Contractor has at least 6 months of Tier 3 experience.'
    ],
    standards: [
      'Contractor independently tracks and performs scheduled preventive maintenance on all assigned equipment with no overdue items for 30 consecutive calendar days.'
    ],
    perfSteps: [
      {
        text: 'Maintain the maintenance log:',
        substeps: [
          'Record hours/usage on each piece of equipment weekly.',
          'Check each item against its maintenance schedule.',
          'Mark completed maintenance with date and initials.',
          'Order or request parts before they are needed.'
        ]
      },
      {
        text: 'Perform scheduled maintenance items:',
        substeps: [
          'Engine oil and filter change at manufacturer-specified intervals.',
          'Hydraulic fluid inspection/change per schedule.',
          'Air filter cleaning (blow out) weekly; replace per schedule.',
          'Grease all zerk fittings at specified intervals.',
          'Inspect and replace drive belts showing wear.',
          'Check and adjust tire pressure monthly.',
          'Clean or replace spark plugs per schedule.'
        ]
      },
      { text: 'Maintain a clean, organized maintenance area. Waste oil in designated container, used filters disposed correctly.' },
      { text: 'Communicate upcoming needs to management: "The tractor is due for an oil change next week — I need 2 gallons of 15W-40 and a filter."' }
    ],
    goNoGo: [
      'Maintenance log is current and accurate for all equipment',
      'No overdue maintenance items during 30-day evaluation',
      'Correctly performs at least 3 different maintenance tasks',
      'Orders or requests parts proactively',
      'Maintenance area is clean and waste is properly handled',
      'Communicates upcoming needs to management'
    ],
    notes: [
      'Review the maintenance log weekly. One missed item caught within 48 hours is acceptable. Two or more = NO-GO.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 3 → Tier 4'
  },

  'PN-302': {
    id: 'PN-302',
    tier: 'tier3to4',
    title: 'Training & Mentorship',
    conditions: [
      'A Tier 1 trainee is assigned to the contractor for training.',
      'The contractor has been paired with the trainee for at least 2 weeks.',
      'The trainee is working toward Tier 2 advancement.'
    ],
    standards: [
      'Contractor demonstrates effective teaching by advancing at least one trainee from Tier 1 to Tier 2, with the trainee meeting all certification requirements. Teaching is observed to be clear, patient, and safety-focused.'
    ],
    perfSteps: [
      {
        text: 'Training approach:',
        substeps: [
          'Show → Explain → Watch → Correct.',
          'Start with safety. Ensure trainee passes PN-101 through PN-103 first.',
          'Progress from simple to complex: stacking → splitter loading → splitter operation.',
          'Explain the WHY, not just the WHAT.'
        ]
      },
      {
        text: 'Safety enforcement during training:',
        substeps: [
          'Stop work immediately for any safety violation. Correct on the spot.',
          'Never allow the trainee to bypass PPE, even briefly.',
          'Stay within arm\'s reach during first 3-5 hours on any new equipment.',
          'Be prepared to hit the kill switch if the trainee loses control.'
        ]
      },
      {
        text: 'Measuring progress:',
        substeps: [
          'Use the Skills Evaluation Checklist to track demonstrated skills.',
          'Provide daily feedback: one thing done well, one thing to improve.',
          'Set weekly goals.',
          'When ready, notify management to schedule Tier 2 certification.'
        ]
      }
    ],
    goNoGo: [
      'Uses Show-Explain-Watch-Correct method (observed)',
      'Trainee meets all Tier 2 certification requirements',
      'Maintains patience during training (does not take over out of frustration)',
      'Corrects safety violations immediately and directly',
      'Uses the Skills Evaluation Checklist to track progress',
      'Provides daily feedback to trainee',
      'Trainee confirms they understood the training and felt supported'
    ],
    notes: [
      'Interview the trainee separately: "Did they explain things clearly? Did you feel safe?"',
      'A trainee who fails Tier 2 is NOT automatically a NO-GO for the mentor — assess the training quality.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 3 → Tier 4; Mentoring Bonus'
  },

  'PN-303': {
    id: 'PN-303',
    tier: 'tier3to4',
    title: 'Crew Coordination & Production Planning',
    conditions: [
      'Contractor is assigned as shift lead for a 2-3 person crew.',
      'Manufacturing orders or production targets are assigned.',
      'Contractor must plan work, assign tasks, and manage crew for at least 5 shifts.'
    ],
    standards: [
      'Crew meets or exceeds production targets (4+ cords/day for 2-person crew) for 4 of 5 evaluated shifts, with no safety incidents and all quality standards maintained.'
    ],
    perfSteps: [
      {
        text: 'Pre-shift planning:',
        substeps: [
          'Review MOs or production targets for the day.',
          'Assess crew: who is available, skill levels, any limitations.',
          'Assign tasks based on skill level.',
          'Communicate the plan clearly to the crew.'
        ]
      },
      {
        text: 'During production:',
        substeps: [
          'Monitor pace. Identify bottlenecks and adjust.',
          'Check quality periodically.',
          'Manage breaks so production doesn\'t stop entirely.',
          'Handle problems: equipment issues, material shortages, weather.',
          'Keep the crew focused but not pressured.'
        ]
      },
      {
        text: 'End of shift:',
        substeps: [
          'Count and record production.',
          'Verify all equipment is cleaned and secured.',
          'Debrief crew: what went well, what to improve.',
          'Report production and issues to management.'
        ]
      },
      {
        text: 'Resource management:',
        substeps: [
          'Track fuel, oil, wrap, and supply levels.',
          'Identify when raw material is getting low.',
          'Schedule maintenance to minimize production impact.'
        ]
      }
    ],
    goNoGo: [
      'Communicates clear plan at start of each shift',
      'Assigns tasks matched to crew skill levels',
      'Crew meets production targets 4 of 5 evaluated shifts',
      'No safety incidents during evaluation period',
      'Quality standards maintained (random checks pass)',
      'Identifies and resolves bottlenecks during production',
      'Manages supplies proactively',
      'Reports production and issues to management daily',
      'Crew members report positive working experience'
    ],
    notes: [
      'Interview crew members about clarity of plan, problem resolution, and whether they\'d want this person as lead again.',
      'Technical metrics alone are not sufficient — leadership quality matters.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 3 → Tier 4'
  },

  'PN-304': {
    id: 'PN-304',
    tier: 'tier3to4',
    title: 'Solo Production Rate — 2+ Cords/Day',
    conditions: [
      'Contractor is working independently (solo, not paired).',
      'Standard production equipment is operational.',
      'Raw material is available and staged.',
      'Evaluated over at least 10 full workdays.'
    ],
    standards: [
      'Contractor produces 2 or more cords per 8-hour shift, sustained over 10+ consecutive full workdays with less than 2% rejection rate.'
    ],
    perfSteps: [
      { text: 'All performance steps from PN-211 apply at a higher level of efficiency.' },
      { text: 'Workflow optimization is critical. Minimize transitions between tasks — batch similar operations.' },
      { text: 'Pre-stage sufficient raw material for the full shift to avoid mid-day material runs.' },
      { text: 'Sharpen chains and perform minor maintenance during natural breaks (fueling, staging) to avoid dedicated downtime.' },
      { text: 'Self-monitor quality at the 2+ cord pace. Speed must not come at the expense of quality.' }
    ],
    goNoGo: [
      'Averages 2+ cords/day over the 10-day evaluation period',
      'No single day below 1.75 cords (consistency requirement)',
      'Rejection/rework rate below 2%',
      'Workflow is optimized (minimal wasted motion and transitions)',
      'Quality standards fully maintained at production pace',
      'Equipment maintenance integrated into workflow'
    ],
    notes: [
      '10 days is intentionally longer — Tier 4 represents sustained high performance, not occasional peaks.',
      'The 2% rejection rate is stricter than Tier 3\'s 5%. At Tier 4, you set the quality standard.'
    ],
    safetyCritical: false,
    references: 'Skill & Compensation Framework v1.0, Section: Tier 3 → Tier 4'
  }
};
