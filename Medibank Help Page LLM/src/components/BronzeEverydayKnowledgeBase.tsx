// Knowledge base for Bronze Everyday Hospital Cover
export const bronzeEverydayKnowledge = {
  coverType: "Medibank Bronze Everyday",
  
  includedServices: [
    "Ambulance services",
    "Accident Cover Boost", 
    "Rehabilitation",
    "Hospital psychiatric services",
    "Palliative care",
    "Brain and nervous system",
    "Eye (not cataracts)",
    "Ear, nose and throat",
    "Tonsils, adenoids and grommets",
    "Bone, joint and muscle",
    "Joint reconstructions",
    "Kidney and bladder",
    "Male reproductive system",
    "Digestive system",
    "Hernia and appendix",
    "Gastrointestinal endoscopy",
    "Gynaecology",
    "Miscarriage and termination of pregnancy",
    "Chemotherapy, radiotherapy and immunotherapy for cancer",
    "Pain management",
    "Skin",
    "Breast surgery (medically necessary)",
    "Diabetes management (excluding insulin pumps)",
    "Heart and vascular system",
    "Lung and chest",
    "Blood"
  ],

  restrictedServices: [
    "Back, neck and spine",
    "Plastic and reconstructive surgery (medically necessary)"
  ],

  excludedServices: [
    "Dental surgery",
    "Podiatric surgery (provided by a registered podiatric surgeon)",
    "Implantation of hearing devices",
    "Cataracts",
    "Joint replacements",
    "Dialysis for chronic kidney failure",
    "Pregnancy and birth",
    "Assisted reproductive services",
    "Weight loss surgery",
    "Insulin pumps",
    "Sleep studies",
    "Pain management with device"
  ],

  waitingPeriods: {
    "1 day": ["Ambulance services"],
    "2 months": [
      "Hospital psychiatric services",
      "Rehabilitation",
      "Palliative care",
      "Hospital treatment for conditions requiring hospitalisation that are not deemed pre-existing conditions"
    ],
    "12 months": ["Pre-existing conditions"]
  },

  excess: {
    levels: ["$250", "$500", "$750"],
    description: "This is the amount you pay towards your hospital admission (same-day or overnight) before we pay any benefits.",
    applies: "The excess applies per member, per calendar year and it doesn't apply to Child, Student or Adult Dependants on a family membership.",
    hospitalPayment: "Some hospitals may require you to pay the excess at the time of admission."
  },

  accidentCoverBoost: {
    description: "Any Excluded or Restricted Service will be treated as if it is an Included Service, where you require hospital treatment as a result of injuries sustained in an Accident.",
    conditions: [
      "The Accident occurred after joining your cover",
      "The Accident occurred in Australia", 
      "Your cover was not suspended at the time of the Accident",
      "You sought treatment from a medical practitioner within seven (7) days of the Accident"
    ],
    timeLimit: "Only applies to hospital treatment received within twelve (12) months of the date of the Accident occurring"
  },

  definitions: {
    includedService: "We pay benefits towards overnight and same day hospital accommodation, intensive care and medical services where Medicare benefits is payable, Medibank has arrangements with most private hospitals and day surgeries in Australia.",
    restrictedService: "A Restricted Service is a service where we pay the minimum benefit set by the Australian Government towards hospital accommodation. If you're treated in a private hospital for a Restricted Service, you are likely to incur substantial out-of-pocket expenses because the minimum benefit will not be enough to cover all hospital costs.",
    excludedService: "An Excluded Service is a service that we won't pay any benefits towards for any hospital accommodation or medical services."
  },

  membersChoice: {
    description: "Medibank has arrangements with most private hospitals and day surgeries in Australia, so you generally get better value for Included Services if you go to one of these providers.",
    website: "medibank.com.au/memberschoice"
  },

  gapCover: {
    description: "Medibank's GapCover is designed to help eliminate or reduce your out-of-pocket expenses for in-hospital doctor's charges.",
    participation: "Doctors can choose to participate in GapCover on a claim-by-claim basis.",
    limitation: "It's important to know GapCover doesn't apply to diagnostic services."
  },

  contactInfo: {
    phone: "132 331",
    website: "medibank.com.au",
    myMedibank: "medibank.com.au/members"
  }
};

export interface ResponseWithReference {
  response: string;
  reference: {
    title: string;
    section: string;
    details: string[];
  } | null;
}

export function findRelevantInfo(query: string): ResponseWithReference {
  const queryLower = query.toLowerCase();
  
  // Check for specific service inquiries
  for (const service of bronzeEverydayKnowledge.includedServices) {
    if (queryLower.includes(service.toLowerCase().split(' ')[0]) || 
        queryLower.includes(service.toLowerCase())) {
      return {
        response: `${service} is an **Included Service** under your Bronze Everyday cover. This means we pay benefits towards overnight and same day hospital accommodation, intensive care and medical services where Medicare benefits is payable. You'll generally get better value if you go to a Members' Choice hospital.`,
        reference: {
          title: "Included Services",
          section: "Bronze Everyday Hospital Cover - What's Covered",
          details: [
            `${service} is listed as an Included Service`,
            "Included Services: We pay benefits towards overnight and same day hospital accommodation, intensive care and medical services where Medicare benefits is payable",
            "Medibank has arrangements with most private hospitals and day surgeries in Australia"
          ]
        }
      };
    }
  }

  for (const service of bronzeEverydayKnowledge.restrictedServices) {
    if (queryLower.includes(service.toLowerCase().split(' ')[0]) || 
        queryLower.includes(service.toLowerCase())) {
      return {
        response: `${service} is a **Restricted Service** under your Bronze Everyday cover. We pay the minimum benefit set by the Australian Government towards hospital accommodation. You're likely to incur substantial out-of-pocket expenses because the minimum benefit won't cover all hospital costs.`,
        reference: {
          title: "Restricted Services",
          section: "Bronze Everyday Hospital Cover - Service Classifications",
          details: [
            `${service} is listed as a Restricted Service`,
            "Restricted Service: A service where we pay the minimum benefit set by the Australian Government towards hospital accommodation",
            "You are likely to incur substantial out-of-pocket expenses because the minimum benefit will not be enough to cover all hospital costs"
          ]
        }
      };
    }
  }

  for (const service of bronzeEverydayKnowledge.excludedServices) {
    if (queryLower.includes(service.toLowerCase().split(' ')[0]) || 
        queryLower.includes(service.toLowerCase())) {
      return {
        response: `${service} is an **Excluded Service** under your Bronze Everyday cover. We won't pay any benefits towards hospital accommodation or medical services for this treatment.\n\nHowever, if you need this treatment due to an accident, it may be covered under your Accident Cover Boost - contact us on 132 331 to check.`,
        reference: {
          title: "Excluded Services",
          section: "Bronze Everyday Hospital Cover - What's Not Covered",
          details: [
            `${service} is listed as an Excluded Service`,
            "Excluded Service: A service that we won't pay any benefits towards for any hospital accommodation or medical services",
            "Accident Cover Boost may apply: Any Excluded or Restricted Service will be treated as if it is an Included Service where you require hospital treatment as a result of injuries sustained in an Accident"
          ]
        }
      };
    }
  }

  // Check for waiting period questions
  if (queryLower.includes('waiting period') || queryLower.includes('wait')) {
    return {
      response: `**Waiting Periods for Bronze Everyday:**\n\n• **1 day:** Ambulance services\n• **2 months:** Hospital psychiatric services, Rehabilitation, Palliative care, and new conditions\n• **12 months:** Pre-existing conditions\n\nIf you're switching from another health insurer within 2 months and have already served waiting periods, you may not need to re-serve them.`,
      reference: {
        title: "Waiting Periods",
        section: "Bronze Everyday Hospital Cover - Terms and Conditions",
        details: [
          "1 day waiting period: Ambulance services",
          "2 months waiting period: Hospital psychiatric services, Rehabilitation, Palliative care, and hospital treatment for conditions requiring hospitalisation that are not deemed pre-existing conditions",
          "12 months waiting period: Pre-existing conditions"
        ]
      }
    };
  }

  // Check for excess questions
  if (queryLower.includes('excess') || queryLower.includes('cost') || queryLower.includes('pay')) {
    return {
      response: `**Your Bronze Everyday excess options:**\n\nYou can choose from three excess levels: $250, $500, or $750.\n\nThis is the amount you pay towards each hospital admission before we pay benefits. The excess applies per member, per calendar year and doesn't apply to dependants on family cover.\n\nSome hospitals may require excess payment at admission time.`,
      reference: {
        title: "Excess",
        section: "Bronze Everyday Hospital Cover - Costs and Payments",
        details: [
          "Excess levels available: $250, $500, $750",
          "The excess is the amount you pay towards your hospital admission (same-day or overnight) before we pay any benefits",
          "The excess applies per member, per calendar year and it doesn't apply to Child, Student or Adult Dependants on a family membership",
          "Some hospitals may require you to pay the excess at the time of admission"
        ]
      }
    };
  }

  // Check for pregnancy/birth questions
  if (queryLower.includes('pregnan') || queryLower.includes('birth') || queryLower.includes('baby')) {
    return {
      response: `Pregnancy and birth services are **Excluded** from your Bronze Everyday cover. We won't pay benefits towards hospital accommodation or medical services for pregnancy and birth.\n\nThese services are typically covered by Medicare for public hospital treatment. You may want to consider upgrading to a higher level of cover if you're planning a family.`,
      reference: {
        title: "Pregnancy and Birth",
        section: "Bronze Everyday Hospital Cover - Excluded Services",
        details: [
          "Pregnancy and birth is listed as an Excluded Service",
          "Excluded Service: A service that we won't pay any benefits towards for any hospital accommodation or medical services",
          "These services are typically covered by Medicare for public hospital treatment"
        ]
      }
    };
  }

  // Check for dental questions
  if (queryLower.includes('dental') || queryLower.includes('teeth')) {
    return {
      response: `Dental surgery is **Excluded** from your Bronze Everyday hospital cover. However, if you need dental treatment due to an accident, it may be covered under your Accident Cover Boost.\n\nFor routine dental care, you'd need extras cover or pay privately.`,
      reference: {
        title: "Dental Surgery",
        section: "Bronze Everyday Hospital Cover - Excluded Services",
        details: [
          "Dental surgery is listed as an Excluded Service",
          "Excluded Service: A service that we won't pay any benefits towards for any hospital accommodation or medical services",
          "Accident Cover Boost: Any Excluded or Restricted Service will be treated as if it is an Included Service where you require hospital treatment as a result of injuries sustained in an Accident"
        ]
      }
    };
  }

  // Check for accident questions
  if (queryLower.includes('accident') || queryLower.includes('injury')) {
    return {
      response: `**Accident Cover Boost** is included with your Bronze Everyday cover!\n\nThis means any Excluded or Restricted service becomes an Included service if you need hospital treatment due to an accident, provided:\n• The accident happened in Australia after you joined\n• You weren't suspended at the time\n• You saw a doctor within 7 days\n• Treatment is within 12 months of the accident`,
      reference: {
        title: "Accident Cover Boost",
        section: "Bronze Everyday Hospital Cover - Additional Benefits",
        details: [
          "Any Excluded or Restricted Service will be treated as if it is an Included Service, where you require hospital treatment as a result of injuries sustained in an Accident",
          "Conditions: The Accident occurred after joining your cover, occurred in Australia, your cover was not suspended at the time",
          "You sought treatment from a medical practitioner within seven (7) days of the Accident",
          "Only applies to hospital treatment received within twelve (12) months of the date of the Accident occurring"
        ]
      }
    };
  }

  // Generic response for unmatched queries - trigger human agent transfer
  return {
    response: `I'm unable to answer this question. I suggest starting a conversation with a human agent.`,
    reference: null
  };
}