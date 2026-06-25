const PROVINCES_DATA = [
    { name: "Misiones", region: "nea", featured: true, image: "images/misiones.png", desc: "Las majestuosas Cataratas del Iguazú, una de las 7 maravillas naturales, tierra colorada y selva paranaense." },
    { name: "Mendoza", region: "cuyo", featured: true, image: "images/mendoza.png", desc: "La capital internacional del vino al pie del Aconcagua. Viñedos de Malbec y turismo de aventura." },
    { name: "Río Negro", region: "patagonia", featured: true, image: "images/rio_negro.png", desc: "Bariloche y el lago Nahuel Huapi, chocolates artesanales, y las playas atlánticas en Las Grutas." },
    { name: "Jujuy", region: "noa", featured: true, image: "images/jujuy.png", desc: "El Cerro de los Siete Colores en Purmamarca, la Quebrada de Humahuaca y tradiciones andinas ancestrales." },
    { name: "Salta", region: "noa", image: "images/salta.png", desc: "Arquitectura colonial, peñas folclóricas, el Tren a las Nubes y las bodegas boutique en Cafayate." },
    { name: "Tucumán", region: "noa", image: "images/tucuman.png", desc: "La Cuna de la Independencia, los hermosos valles Calchaquíes y las Ruinas de Quilmes." },
    { name: "Catamarca", region: "noa", image: "images/catamarca.png", desc: "Dunas de Tatón, el Campo de Piedra Pómez y la majestuosa Ruta del Adobe." },
    { name: "La Rioja", region: "noa", image: "images/la_rioja.png", desc: "El Parque Nacional Talampaya con sus paredones rojos, olivos centenarios y vinos riojanos." },
    { name: "Santiago del Estero", region: "noa", image: "images/santiago_del_estero.png", desc: "Las termas de Río Hondo y la capital más antigua de Argentina, cuna del folklore nacional." },
    { name: "Chaco", region: "nea", image: "images/chaco.jpg", desc: "El Parque Nacional El Impenetrable, la Isla del Cerrito y el meteorito de Campo del Cielo." },
    { name: "Corrientes", region: "nea", image: "images/corrientes.png", desc: "Los Esteros del Iberá, uno de los mayores humedales del mundo, tradición del chamamé y carnaval." },
    { name: "Formosa", region: "nea", image: "images/formosa.png", desc: "El Bañado La Estrella, tercer humedal más grande de Sudamérica, ideal para safari fotográfico." },
    { name: "San Juan", region: "cuyo", image: "images/san_juan.png", desc: "El imponente Parque Provincial Ischigualasto o Valle de la Luna, fósiles de dinosaurios y cielo estrellado." },
    { name: "San Luis", region: "cuyo", image: "images/san_luis.png", desc: "Sierras y valles de Merlo con su microclima, Potrero de los Funes y la mina de oro La Carolina." },
    { name: "Buenos Aires", region: "pampeana", image: "images/buenos_aires.jpg", desc: "Sierras en Tandil, lagunas en Chascomús y extensas playas atlánticas como Mar del Plata y Pinamar." },
    { name: "CABA", region: "pampeana", image: "images/caba.jpg", desc: "La Ciudad Autónoma de Buenos Aires, cuna del tango, teatros en Av. Corrientes, San Telmo y Palermo Soho." },
    { name: "Córdoba", region: "pampeana", image: "images/cordoba.png", desc: "Ríos serranos, Villa General Belgrano, Carlos Paz, el Cerro Champaquí y estancias jesuíticas históricas." },
    { name: "Santa Fe", region: "pampeana", image: "images/santa_fe.png", desc: "El Monumento a la Bandera en Rosario, costanera junto al río Paraná y paseos históricos de Santa Fe La Vieja." },
    { name: "Entre Ríos", region: "pampeana", image: "images/entre_rios.png", desc: "Complejos termales de Colón y Federación, playas fluviales e históricos carnavales de Gualeguaychú." },
    { name: "La Pampa", region: "pampeana", image: "images/la_pampa.jpg", desc: "Parque Nacional Lihué Calel, estancias pampeanas, avistaje de ciervos en la Reserva Parque Luro." },
    { name: "Neuquén", region: "patagonia", image: "images/neuquen.jpg", desc: "Villa La Angostura, San Martín de los Andes y la Ruta de los Siete Lagos. Centros de esquí de nivel mundial." },
    { name: "Chubut", region: "patagonia", image: "images/chubut.jpg", desc: "Avistaje de ballenas francas en Península Valdés, pingüinos en Punta Tombo y colonias galesas en Gaiman." },
    { name: "Santa Cruz", region: "patagonia", image: "images/santa_cruz.jpg", desc: "El imponente Glaciar Perito Moreno en El Calafate y senderos de trekking en El Chaltén al pie del Fitz Roy." },
    { name: "Tierra del Fuego", title: "Tierra del Fuego, Antártida e I.A.S.", region: "patagonia", image: "images/tierra_del_fuego.jpg", desc: "Ushuaia, la ciudad del Fin del Mundo, navegación por el Canal Beagle y el Parque Nacional Tierra del Fuego." }
];

(function () {
    const searchInput = document.getElementById('searchProvince');
    const tabButtons = document.querySelectorAll('.region-tab');
    const gridContainer = document.getElementById('provincesGrid');
    let activeRegion = 'destacados';
    let cards = [];

    // Renderizar tarjetas dinámicamente
    function renderProvinces() {
        if (!gridContainer) return;

        gridContainer.innerHTML = '';
        PROVINCES_DATA.forEach(prov => {
            const displayTitle = prov.title || prov.name;
            const col = document.createElement('div');
            col.className = 'col province-card';
            col.setAttribute('data-name', prov.name);
            col.setAttribute('data-region', prov.region);
            if (prov.featured) col.setAttribute('data-featured', 'true');

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-body">
                    <img src="${prov.image}" alt="${prov.name}" class="w-100 object-fit-cover" height="130">
                    <div class="card-body d-flex flex-column p-3">
                        <h5 class="card-title fw-bold text-body-emphasis mb-2">${displayTitle}</h5>
                        <p class="card-text text-body-secondary small mb-3 flex-grow-1 lh-sm">${prov.desc}</p>
                    </div>
                </div>
            `;
            gridContainer.appendChild(col);
        });

        // Actualizar referencia de las tarjetas creadas
        cards = document.querySelectorAll('.province-card');
        updateVisibility();
    }

    // Filtrar tarjetas
    function updateVisibility() {
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const normalizedTerm = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (normalizedTerm !== "") {
            document.getElementById('regionTabs')?.classList.add('d-none');
            cards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (normalized.includes(normalizedTerm)) {
                    card.classList.remove('d-none');
                } else {
                    card.classList.add('d-none');
                }
            });
        } else {
            document.getElementById('regionTabs')?.classList.remove('d-none');
            cards.forEach(card => {
                const region = card.getAttribute('data-region');
                const isFeatured = card.getAttribute('data-featured') === 'true';

                if (activeRegion === 'destacados' && isFeatured) {
                    card.classList.remove('d-none');
                } else if (activeRegion === region) {
                    card.classList.remove('d-none');
                } else {
                    card.classList.add('d-none');
                }
            });
        }
    }

    if (gridContainer) {
        renderProvinces();
    }

    if (searchInput) {
        searchInput.addEventListener('input', updateVisibility);
    }

    if (tabButtons) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                activeRegion = this.getAttribute('data-target');
                updateVisibility();
            });
        });
    }
})();
