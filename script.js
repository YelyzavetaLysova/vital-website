const content = window.VITAL_CONTENT || {};

function getValue(path) {
  return path.split('.').reduce((value, key) => value?.[key], content) ?? '';
}

document.querySelectorAll('[data-content]').forEach((element) => {
  element.textContent = getValue(element.dataset.content);
});

document.querySelectorAll('[data-link]').forEach((element) => {
  const link = getValue(element.dataset.link);
  if (link) element.href = link;
});

const tickerTrack = document.querySelector('.ticker-track');

if (tickerTrack && !tickerTrack.dataset.duplicated) {
  const originalItems = tickerTrack.innerHTML;
  tickerTrack.insertAdjacentHTML('beforeend', originalItems);
  tickerTrack.dataset.duplicated = 'true';
}

const teamGrid = document.querySelector('#team-grid');

if (teamGrid && Array.isArray(content.team)) {
  teamGrid.innerHTML = content.team
    .map(
      (member, index) => `
        <article class="team-card">
          <div class="team-image">
            <img
              src="${member.image}"
              alt="Portrait of ${member.name}"
              loading="lazy"
            >
            <span class="team-fallback" aria-hidden="true">
              ${member.initials}
            </span>
          </div>

          <span class="team-index">
            ${String(index + 1).padStart(2, '0')}
          </span>

          <h3>${member.name}</h3>

          <a class="team-email" href="mailto:${member.email}">
            ${member.email}
          </a>
        </article>
      `
    )
    .join('');

  teamGrid.querySelectorAll('.team-image img').forEach((image) => {
    image.addEventListener('error', () => {
      image.hidden = true;
      image.parentElement?.classList.add('image-missing');
    });
  });
}

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
function closeMobileMenu() {
  navLinks?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  navLinks?.classList.toggle('open', !open);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileMenu();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const cases = {
  reader: {
    eyebrow: 'Reader experience',
    title: 'Understand a claim without leaving the story.',
    body: 'Readers can receive concise, clearly signposted context beside an article—helping them distinguish between what a study found and what a headline implies.',
    points: [
      ['Notice uncertainty', 'See study type, limitations and scope.'],
      ['Explore alternatives', 'Find additional context and relevant sources.'],
      ['Make informed choices', 'Use evidence without requiring specialist expertise.']
    ]
  },
  journalist: {
    eyebrow: 'Editorial support',
    title: 'Inspect health claims and missing context.',
    body: 'Journalists and editors can use extracted claims and evidence cues to review whether a story communicates scope, uncertainty and study limitations clearly before publication.',
    points: [
      ['Review framing', 'Identify claims that extend beyond the underlying evidence.'],
      ['Surface caveats', 'Check population, study type and important limitations.'],
      ['Support transparency', 'Give audiences clearer access to sources and context.']
    ]
  },
  researcher: {
    eyebrow: 'Research analysis',
    title: 'Study health claims at corpus scale.',
    body: 'Researchers can explore patterns across topics, sources and time, supporting studies of framing, advertorial content, evidence alignment and health-information quality.',
    points: [
      ['Analyse large corpora', 'Work with processed health and lifestyle news datasets.'],
      ['Compare categories', 'Examine variation between medical topics and article types.'],
      ['Develop methods', 'Test claim mining, classification and evidence-alignment approaches.']
    ]
  }
};

const caseCopy = document.querySelector('.case-copy');
function renderCase(selected) {
  if (!caseCopy || !selected) return;
  caseCopy.querySelector('.eyebrow').lastChild.textContent = ` ${selected.eyebrow}`;
  caseCopy.querySelector('h3').textContent = selected.title;
  caseCopy.querySelector(':scope > p:not(.eyebrow)').textContent = selected.body;
  const points = caseCopy.querySelector('.case-points');
  points.innerHTML = selected.points.map((point, index) => `
    <span>0${index + 1}</span><p><b>${point[0]}</b>${point[1]}</p>
  `).join('');
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    caseCopy?.classList.add('switching');
    setTimeout(() => {
      renderCase(cases[tab.dataset.tab]);
      caseCopy?.classList.remove('switching');
    }, 180);
  });
});

const exampleClaims = {
  association: {
    status: 'Context needed',
    claim: '“Drinking two cups of coffee a day reduces the risk of heart disease.”',
    summary: 'The example article describes an association, but the wording may be read as a causal effect.',
    study: 'Observational',
    population: 'Example adult cohort',
    limitation: 'No causality',
    context: 'Other lifestyle, dietary and socioeconomic factors may influence the observed association.',
    source: 'Illustrative trusted-source comparison'
  },
  amount: {
    status: 'Scope is limited',
    claim: '“Two cups a day produced the strongest benefit.”',
    summary: 'A specific amount can sound like a recommendation even when it only describes one pattern in one dataset.',
    study: 'Dose comparison',
    population: 'Example adult cohort',
    limitation: 'Not guidance',
    context: 'The finding should not be interpreted as personalised medical or dietary advice.',
    source: 'Illustrative study-context note'
  },
  everyone: {
    status: 'Overgeneralised',
    claim: '“Coffee is good for everyone.”',
    summary: 'The statement extends beyond the likely population, design and limitations of the underlying research.',
    study: 'Claim framing',
    population: 'Not universal',
    limitation: 'Broad wording',
    context: 'Effects and risks may differ by health status, medication use, pregnancy, age and individual sensitivity.',
    source: 'Illustrative alternative-source guidance'
  }
};

const examplePanel = document.querySelector('#example-evidence');
function renderExampleClaim(claimKey) {
  const claim = exampleClaims[claimKey];
  if (!claim || !examplePanel) return;
  examplePanel.classList.add('switching');
  setTimeout(() => {
    examplePanel.querySelector('[data-example="status"]').textContent = claim.status;
    examplePanel.querySelector('[data-example="claim"]').textContent = claim.claim;
    examplePanel.querySelector('[data-example="summary"]').textContent = claim.summary;
    examplePanel.querySelector('[data-example="study"]').textContent = claim.study;
    examplePanel.querySelector('[data-example="population"]').textContent = claim.population;
    examplePanel.querySelector('[data-example="limitation"]').textContent = claim.limitation;
    examplePanel.querySelector('[data-example="context"]').textContent = claim.context;
    examplePanel.querySelector('[data-example="source"]').textContent = claim.source;
    examplePanel.classList.remove('switching');
  }, 140);
}

document.querySelectorAll('.claim-highlight').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.claim-highlight').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    renderExampleClaim(button.dataset.claim);
  });
});
