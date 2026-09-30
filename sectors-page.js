const sectorDetails = {
  healthcare: {
    index: '01 / HEALTHCARE',
    mark: 'CARE',
    title: 'Protect the loads that cannot wait.',
    summary: 'Healthcare sites can have a mix of critical clinical equipment and general facility loads. Planning begins by identifying what must stay powered and how those loads behave when supply changes.',
    priorities: ['Prioritise essential circuits and critical equipment.', 'Review motor starts and simultaneous demand.', 'Coordinate transfer and connection requirements with the site team.'],
    next: 'Load assessment & specification'
  },
  industry: {
    index: '02 / INDUSTRY',
    mark: 'RUN',
    title: 'Keep production moving with a considered load plan.',
    summary: 'Industrial sites may combine large motors, process equipment and auxiliary loads. Understanding start-up sequences and the cost of an interruption helps frame the right standby or prime-power discussion.',
    priorities: ['Identify process-critical equipment and restart order.', 'Review motor starting currents and duty cycles.', 'Account for the operating environment and installation space.'],
    next: 'Generator sizing & configuration'
  },
  corporate: {
    index: '03 / CORPORATE',
    mark: 'WORK',
    title: 'Keep the working day connected.',
    summary: 'Offices and commercial properties rely on a range of systems to keep people, communications and building services operating. The first step is separating essential loads from those that can wait.',
    priorities: ['Prioritise IT, communications and essential building services.', 'Consider occupancy patterns and operating hours.', 'Review noise, location and access constraints.'],
    next: 'Standby power planning'
  },
  government: {
    index: '04 / GOVERNMENT',
    mark: 'SERVE',
    title: 'Plan around the public services people depend on.',
    summary: 'Public facilities differ in function and demand. A site-specific load list and a clear operating priority help define a practical power system for the services that need continuity.',
    priorities: ['List public-facing and mission-essential functions.', 'Establish the required runtime and duty profile.', 'Plan equipment access, installation and service requirements.'],
    next: 'Site assessment & project planning'
  },
  ngo: {
    index: '05 / NGOs & FIELD WORK',
    mark: 'FIELD',
    title: 'Make power practical beyond the main site.',
    summary: 'Field operations can involve changing locations, limited infrastructure or equipment that must travel. Planning should consider where power is needed and how often the setup will move.',
    priorities: ['Map each operating location and available supply.', 'Consider mobile power for changing site requirements.', 'Plan fuel access, transport and service support.'],
    next: 'Mobile and tailored power solutions'
  },
  academic: {
    index: '06 / EDUCATION',
    mark: 'LEARN',
    title: 'Keep learning and campus operations on track.',
    summary: 'Education sites can include classrooms, administration, ICT and specialist spaces. Mapping the loads and periods of highest activity helps define which systems need backup first.',
    priorities: ['Identify ICT, safety and essential campus loads.', 'Account for term schedules and peak-use periods.', 'Review noise, placement and access for maintenance.'],
    next: 'Load assessment & specification'
  },
  domestic: {
    index: '07 / DOMESTIC',
    mark: 'HOME',
    title: 'Back up the essentials that matter at home.',
    summary: 'A residential setup starts with a clear list of essential circuits and appliances. That keeps the system focused on actual household needs rather than an oversized guess.',
    priorities: ['List essential circuits and appliances.', 'Note appliances with motors or high starting demand.', 'Consider available space, noise and preferred runtime.'],
    next: 'Residential generator recommendation'
  }
};

const sectorTabs = [...document.querySelectorAll('.sx-sector-tab')];
const sectorPanel = document.querySelector('#sx-panel');

function selectSector(key, moveFocus = false) {
  const detail = sectorDetails[key];
  if (!detail || !sectorPanel) return;

  sectorTabs.forEach((tab) => {
    const selected = tab.dataset.sector === key;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) {
      sectorPanel.setAttribute('aria-labelledby', tab.id);
      if (moveFocus) tab.focus();
    }
  });

  sectorPanel.innerHTML = `<div class="sx-panel-top"><p class="sx-panel-kicker">${detail.index}</p><span class="sx-panel-mark">${detail.mark}</span></div><h3>${detail.title}</h3><p>${detail.summary}</p><div class="sx-priorities">${detail.priorities.map((priority, index) => `<div><b>${String(index + 1).padStart(2, '0')}</b><span>${priority}</span></div>`).join('')}</div><div class="sx-panel-footer"><span>Useful next step <b>${detail.next}</b></span><a href="services.html#assess">Plan this application <b aria-hidden="true">↗</b></a></div>`;

  if (history.replaceState) history.replaceState(null, '', `#${key}`);
}

sectorTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSector(tab.dataset.sector));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % sectorTabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + sectorTabs.length) % sectorTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = sectorTabs.length - 1;
    else return;
    event.preventDefault();
    selectSector(sectorTabs[nextIndex].dataset.sector, true);
  });
});

const requestedSector = location.hash.slice(1);
if (sectorDetails[requestedSector]) selectSector(requestedSector);
else sectorTabs.forEach((tab, index) => { tab.tabIndex = index === 0 ? 0 : -1; });
