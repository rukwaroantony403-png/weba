const serviceDetails = {
  assess: {
    index: '01 / BEFORE THE GENERATOR',
    heading: 'Start with the load, not a guess.',
    description: 'We help define the power requirement around the equipment you need to run, how it starts and how the site operates, creating a clearer basis for selecting a generator and its configuration.',
    points: ['Connected load & starting demand', 'Standby or continuous operating needs', 'Site conditions & equipment configuration'],
    action: 'Discuss a site assessment'
  },
  install: {
    index: '02 / FROM SPECIFICATION TO SITE',
    heading: 'Equipment configured for the job.',
    description: 'We help coordinate the right generator set and associated equipment for the project, then support installation and commissioning planning around the site requirements.',
    points: ['Diesel and petrol generator options', 'Cummins, Perkins and Doosan engine options', 'Installation and commissioning coordination'],
    action: 'Plan a generator installation'
  },
  maintain: {
    index: '03 / PROTECT PERFORMANCE',
    heading: 'Maintenance before the next demand.',
    description: 'A planned maintenance approach helps monitor equipment condition, support reliable operation and identify service needs before the next critical run.',
    points: ['Scheduled service visits', 'Preventive checks and condition review', 'Practical service recommendations'],
    action: 'Plan scheduled maintenance'
  },
  support: {
    index: '04 / HERE WHEN YOU NEED US',
    heading: 'Technical support, day or night.',
    description: 'When a power system needs attention, our technical team helps assess the issue and work through practical next steps to return the equipment to service.',
    points: ['24/7 technical support', 'Responsive troubleshooting', 'Support for generator systems across East Africa'],
    action: 'Contact technical support'
  },
  parts: {
    index: '05 / GENUINE PARTS',
    heading: 'The right parts for your equipment.',
    description: 'We help identify genuine parts and service items suited to your generator configuration, helping maintain quality and support the working life of the system.',
    points: ['Parts matched to equipment details', 'Quality components', 'Guidance on service requirements'],
    action: 'Ask about spare parts'
  },
  projects: {
    index: '06 / BUILT AROUND YOUR NEEDS',
    heading: 'A power project shaped around your site.',
    description: 'For requirements that need more than a standard set, we work through the site, load and operating needs to develop a tailored power-system configuration.',
    points: ['Site and load assessment', 'Generator and accessory configuration', 'Planning through installation support'],
    action: 'Discuss a power project'
  }
};

const serviceTabs = [...document.querySelectorAll('.sv-service-tab')];
const servicePanel = document.querySelector('#sv-panel');

function selectService(key, moveFocus = false) {
  const detail = serviceDetails[key];
  if (!detail || !servicePanel) return;

  serviceTabs.forEach((tab) => {
    const selected = tab.dataset.service === key;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) {
      servicePanel.setAttribute('aria-labelledby', tab.id);
      if (moveFocus) tab.focus();
    }
  });

  servicePanel.innerHTML = `<p class="sv-panel-index">${detail.index}</p><h3>${detail.heading}</h3><p>${detail.description}</p><div class="sv-panel-points">${detail.points.map((point) => `<span>${point}</span>`).join('')}</div><a class="sv-panel-link" href="contact.html">${detail.action} <b aria-hidden="true">↗</b></a>`;
  if (history.replaceState) history.replaceState(null, '', `#${key}`);
}

serviceTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectService(tab.dataset.service));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % serviceTabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = serviceTabs.length - 1;
    else return;
    event.preventDefault();
    selectService(serviceTabs[nextIndex].dataset.service, true);
  });
});

const initialService = location.hash.slice(1);
if (serviceDetails[initialService]) selectService(initialService);
else serviceTabs.forEach((tab, index) => { tab.tabIndex = index === 0 ? 0 : -1; });