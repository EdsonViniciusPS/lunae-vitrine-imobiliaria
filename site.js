const properties = [
  {
    title: 'Apartamento Ipê', kind: 'Apartamento', purpose: 'Comprar', area: 'Vila Madalena',
    region: 'Zona Oeste', announced: '2026-10-28', popularity: 132,
    price: 1480000, specs: '118 m² · 3 quartos · 2 vagas', image: 'assets/imovel-1.jpg',
    alt: 'Sala com sofá claro, madeira e janelas voltadas para a varanda',
    description: 'A sala integrada à varanda recebe luz natural ao longo do dia. A planta tem três quartos, incluindo uma suíte, e espaço para home office.',
  },
  {
    title: 'Casa Jardim das Folhas', kind: 'Casa', purpose: 'Comprar', area: 'Alto de Pinheiros',
    region: 'Zona Oeste', announced: '2026-09-15', popularity: 96,
    price: 3250000, specs: '260 m² · 4 quartos · 3 vagas', image: 'assets/imovel-2.jpg',
    alt: 'Fachada contemporânea de madeira com jardim arborizado',
    description: 'Portas amplas conectam as áreas de convivência ao jardim. A casa tem quatro quartos e uma área externa para receber amigos e família.',
  },
  {
    title: 'Cobertura Horizonte', kind: 'Cobertura', purpose: 'Alugar', area: 'Itaim Bibi',
    region: 'Zona Oeste', announced: '2026-11-03', popularity: 168,
    price: 18500, specs: '212 m² · 3 quartos · 3 vagas', image: 'assets/imovel-3.jpg',
    alt: 'Terraço com piscina e vista panorâmica da cidade',
    description: 'O terraço com piscina privativa tem vista aberta para a cidade. No interior, a sala de estar e a sala de jantar compartilham um ambiente integrado.',
  },
  {
    title: 'Studio Aurora', kind: 'Apartamento', purpose: 'Alugar', area: 'Bela Vista',
    region: 'Centro', announced: '2026-11-06', popularity: 201,
    price: 3850, specs: '42 m² · 1 quarto · sem vaga', image: 'assets/imovel-4.jpg',
    alt: 'Apartamento compacto com cozinha integrada e luz natural',
    description: 'A planta integra a cozinha à área de estar e aproveita a varanda para ampliar a luz natural. Uma opção compacta para morar no centro.',
  },
  {
    title: 'Casa Jacarandá', kind: 'Casa', purpose: 'Comprar', area: 'Moema',
    region: 'Zona Sul', announced: '2026-10-12', popularity: 112,
    price: 2790000, specs: '196 m² · 3 quartos · 2 vagas', image: 'assets/imovel-5.jpg',
    alt: 'Casa contemporânea de tijolos com jardim tropical',
    description: 'A fachada de tijolos e o jardim dão personalidade à casa. As áreas sociais ficam no térreo, com três quartos no piso superior.',
  },
  {
    title: 'Apartamento Alameda', kind: 'Apartamento', purpose: 'Comprar', area: 'Tatuapé',
    region: 'Zona Leste', announced: '2026-11-08', popularity: 83,
    price: 895000, specs: '86 m² · 3 quartos · 2 vagas', image: 'assets/imovel-6.jpg',
    alt: 'Sala de jantar de apartamento com iluminação natural',
    description: 'A sala de jantar integrada à varanda dá espaço para refeições em família. São três quartos, incluindo uma suíte.',
  },
  {
    title: 'Casa Pátio Verde', kind: 'Casa', purpose: 'Alugar', area: 'Santana',
    region: 'Zona Norte', announced: '2026-08-22', popularity: 72,
    price: 8900, specs: '180 m² · 3 quartos · 2 vagas', image: 'assets/imovel-7.jpg',
    alt: 'Casa de madeira e concreto cercada por vegetação',
    description: 'A sala se abre para um pátio arborizado. A casa tem três quartos e uma área externa coberta para refeições.',
  },
  {
    title: 'Cobertura Terraço Pinheiros', kind: 'Cobertura', purpose: 'Comprar', area: 'Pinheiros',
    region: 'Zona Oeste', announced: '2026-10-21', popularity: 186,
    price: 4190000, specs: '238 m² · 3 quartos · 3 vagas', image: 'assets/imovel-8.jpg',
    alt: 'Terraço com plantas e vista ampla do horizonte de São Paulo',
    description: 'O terraço ajardinado oferece vista ampla de São Paulo. A área interna tem três quartos e uma sala que se abre para o terraço.',
  },
];

const find = (id) => document.getElementById(id);
const search = find('search');
const region = find('region');
const area = find('area');
const sort = find('sort');
const cards = find('cards');
const details = find('details');
const visit = find('visit');
const visitDate = find('visit-date');
const startVisit = find('start-visit');
const confirmation = find('confirmation');
const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
});
const price = (property) => currency.format(property.price) + (property.purpose === 'Alugar' ? '/mês' : '');
const dateFormat = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });
const sorting = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  popular: (a, b) => b.popularity - a.popularity,
  oldest: (a, b) => a.announced.localeCompare(b.announced),
  newest: (a, b) => b.announced.localeCompare(a.announced),
};

function setOptions(select, values) {
  const previous = select.value;
  const options = [...new Set(values)].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  select.replaceChildren(select.options[0], ...options.map((value) => new Option(value)));
  select.value = options.includes(previous) ? previous : '';
}

function updateAreas() {
  const available = properties.filter((property) => !region.value || property.region === region.value);
  setOptions(area, available.map((property) => property.area));
}

function showDetails(property) {
  const image = details.querySelector('.detail-image');
  image.src = property.image;
  image.alt = property.alt;
  find('detail-title').textContent = property.title;
  find('detail-type').textContent = property.kind + ' · ' + property.purpose;
  find('detail-location').textContent = property.area + ' · ' + property.region + ' · São Paulo, SP';
  find('detail-date').textContent = 'Anunciado em ' + dateFormat.format(new Date(property.announced));
  find('detail-description').textContent = property.description;
  find('detail-specs').textContent = property.specs;
  find('detail-price').textContent = price(property);
  visit.reset();
  visit.hidden = true;
  confirmation.hidden = true;
  startVisit.hidden = false;
  details.showModal();
}

let filtered = properties;

function applyFilters() {
  const purpose = find('purpose').value;
  const kind = find('kind').value;
  filtered = properties.filter((property) =>
    (!purpose || property.purpose === purpose) &&
    (!kind || property.kind === kind) &&
    (!region.value || property.region === region.value) &&
    (!area.value || property.area === area.value));
  render();
}

function render() {
  const matches = [...filtered];
  const compare = sorting[sort.value];
  if (compare) matches.sort(compare);
  cards.replaceChildren();
  for (const property of matches) {
    const card = document.createElement('article');
    card.className = 'card';
    // All listing data comes from the static demo catalog above.
    card.innerHTML = `
      <img src="${property.image}" alt="${property.alt}" loading="lazy">
      <span class="badge">${property.purpose === 'Alugar' ? 'Locação' : 'Venda'}</span>
      <div class="card-content">
        <p class="location">${property.area} · São Paulo, SP</p>
        <h3>${property.title}</h3>
        <p class="specs">${property.specs}</p>
        <div class="card-bottom">
          <strong>${price(property)}</strong>
          <button type="button" aria-label="Ver detalhes de ${property.title}">Ver detalhes <span aria-hidden="true">↗</span></button>
        </div>
      </div>`;
    card.querySelector('button').addEventListener('click', () => showDetails(property));
    cards.append(card);
  }
  find('results').textContent = matches.length === 1 ? '1 imóvel encontrado' : matches.length + ' imóveis encontrados';
  find('empty').hidden = matches.length > 0;
}

search.addEventListener('submit', (event) => {
  event.preventDefault();
  applyFilters();
  find('imoveis').scrollIntoView();
});
find('reset').addEventListener('click', () => {
  search.reset();
  updateAreas();
  applyFilters();
  find('purpose').focus();
});
region.addEventListener('change', updateAreas);
sort.addEventListener('change', render);
details.querySelector('.close').addEventListener('click', () => details.close());
startVisit.addEventListener('click', () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  visitDate.min = local.toISOString().slice(0, 10);
  startVisit.hidden = true;
  visit.hidden = false;
  visitDate.focus();
});
visit.addEventListener('submit', (event) => {
  event.preventDefault();
  visit.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
});
setOptions(region, properties.map((property) => property.region));
updateAreas();
render();
