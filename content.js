/*
 * Central editable content for the VITAL website.
 * Update values here without changing the page structure.
 */
window.VITAL_CONTENT = {
  hero: {
    intro:
      "VITAL (Verification & Intelligence Tool for Accurate Health Literacy) investigates how health claims are presented in news media, how well they align with evidence, and how useful context can be communicated to different users."
  },

  problem: {
    intro:
      "Health claims are everywhere—from food and fitness stories to body image, treatments and public-health advice.",
    detail:
      "They are not always inaccurate, but they may be simplified, stripped of important limitations, presented through advertorial content, or based on limited, misunderstood or untrustworthy sources."
  },

  approach: {
    intro:
      "VITAL combines large-scale news analysis, claim mining, evidence alignment and human-centred communication to help readers find additional context and alternative sources."
  },

  stats: {
    engineCorpus: "3M",
    rawCorpus: "~4M",
    modelAccuracy: "~90%"
  },

  links: {
    website: "https://www.vital.mediafutures.no",
    mediafutures: "https://www.mediafutures.no",
    github: "https://github.com/sfimediafutures"
  },

  /*
   * Add publications here when they are ready. The publications section stays
   * hidden while this array is empty. Supported fields: title, authors, venue,
   * year, type, url and summary.
   */
  publications: [],

  team: [
    {
      name: "Alain Dominique Starke",
      email: "Alain.Starke@uib.no",
      initials: "AS",
      image: "images/Alain.jpg"
    },
    {
      name: "Yelyzaveta Lysova",
      email: "Y.Lysova@student.uib.no",
      initials: "YL",
      image: "images/Liza.jpg"
    },
    {
      name: "Tobias Jovall Wessel",
      email: "Tobias.Wessel@student.uib.no",
      initials: "TW",
      image: "images/Tobias.jpg"
    },
    {
      name: "Christoph Trattner",
      email: "Christoph.Trattner@uib.no",
      initials: "CT",
      image: "images/Christoph.jpg"
    }
  ]
};
