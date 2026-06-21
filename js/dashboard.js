(function() {
    const userName = localStorage.getItem('user_name');
    const profileProgress = localStorage.getItem('user_profile_progress');
    const travelStyle = localStorage.getItem('user_travel_style');

    // Update welcome subtitle dynamically if name is stored
    const subtitleEl = document.getElementById('welcomeSubtitle');
    if (subtitleEl && userName) {
        if (travelStyle) {
            subtitleEl.innerHTML = `Hola, <strong>${userName}</strong> (${travelStyle}). Explorá perfiles compatibles con tu estilo de viaje.`;
        } else {
            subtitleEl.innerHTML = `Hola, <strong>${userName}</strong>. Explorá perfiles compatibles con tu estilo de viaje.`;
        }
    }

    // Update sidebar progress bar
    const progressLine = document.getElementById('sidebarProgressBar');
    const progressTitle = document.getElementById('sidebarProgressTitle');
    const progressDesc = document.getElementById('sidebarProgressDesc');
    
    if (progressLine) {
        const progressVal = parseInt(profileProgress) || 0;
        progressLine.style.width = `${progressVal}%`;
        
        if (progressTitle) {
            if (progressVal >= 100) {
                progressTitle.innerText = "¡Perfil completo! 🧉";
                if (progressDesc) progressDesc.innerText = "Tu perfil está listo para conectar al 100%.";
            } else if (progressVal > 0) {
                progressTitle.innerText = `Perfil al ${progressVal}%`;
                if (progressDesc) progressDesc.innerText = "Completalo para obtener mejores afinidades.";
            }
        }
    }
    
    // Simulate companion mate invite button
    document.querySelectorAll('.btn-success').forEach(btn => {
        if (btn.innerText.includes('Invitar un mate')) {
            btn.addEventListener('click', function() {
                const card = this.closest('.card');
                const name = card.querySelector('h4').innerText.split('·')[0].trim();
                alert(`¡Le enviaste una invitación para compartir mates a ${name}! 🧉`);
            });
        }
    });

    // Companion modal profiles data
    const companionProfiles = {
        tomas: {
            name: 'Tomás',
            age: 28,
            location: 'Córdoba, Argentina',
            type: 'Aventurero Mochilero',
            about: 'Me encanta conocer culturas, hacer trekking y descubrir nuevos destinos locales o internacionales. ¡Busco alguien activo para armar ruta!',
            destination: 'Tailandia',
            dates: '01 Jun - 20 Jun',
            budget: 'USD 800 - 1200',
            style: 'Mochilero',
            interests: ['Trekking', 'Fotografía', 'Comida local'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=11'
        },
        sofia: {
            name: 'Sofía',
            age: 25,
            location: 'Buenos Aires, Argentina',
            type: 'Aventurera Confort',
            about: 'Busco relajarme en la Patagonia, conocer cafeterías de especialidad, hacer excursiones tranquilas y compartir buenas charlas con un rico mate de por medio.',
            destination: 'Bariloche',
            dates: '08 Jul - 18 Jul',
            budget: 'USD 1000 - 1500',
            style: 'Confort',
            interests: ['Cultura', 'Café', 'Senderismo suave'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=32'
        },
        martin: {
            name: 'Martín',
            age: 31,
            location: 'Mendoza, Argentina',
            type: 'Aventurero Gasolero',
            about: 'Fan de la naturaleza salvaje, peñas folclóricas, y acampar bajo las estrellas. Planeo un viaje gasolero para recorrer los Valles Calchaquíes en julio.',
            destination: 'Salta / NOA',
            dates: '10 Jun - 25 Jun',
            budget: 'USD 600 - 900',
            style: 'Aventurero',
            interests: ['Camping', 'Folclore', 'Trekking'],
            languages: 'Español',
            avatar: 'https://i.pravatar.cc/150?img=60'
        }
    };

    const companionModal = document.getElementById('companionProfileModal');
    const bsCompanionModal = companionModal ? new bootstrap.Modal(companionModal) : null;

    function openCompanionModal(profileKey) {
        const profile = companionProfiles[profileKey] || companionProfiles.tomas;
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.innerText = value;
        };

        setText('modalCompanionName', `${profile.name} · ${profile.age}`);
        setText('modalCompanionLocation', profile.location);
        setText('modalCompanionType', profile.type);
        setText('modalCompanionAbout', profile.about);
        setText('modalCompanionDestination', profile.destination);
        setText('modalCompanionDates', profile.dates);
        setText('modalCompanionBudget', profile.budget);
        setText('modalCompanionStyle', profile.style);
        setText('modalCompanionLanguages', profile.languages);

        const avatarEl = document.getElementById('modalCompanionAvatar');
        if (avatarEl) avatarEl.src = profile.avatar;

        const tagsContainer = document.getElementById('modalCompanionTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            const createTag = (text, icon) => {
                const span = document.createElement('span');
                span.className = 'badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small';
                span.innerHTML = `<i class="bi ${icon} text-success"></i> ${text}`;
                return span;
            };
            tagsContainer.appendChild(createTag(profile.destination, 'bi-map-fill'));
            tagsContainer.appendChild(createTag(profile.style, 'bi-backpack-fill'));
            tagsContainer.appendChild(createTag(profile.budget, 'bi-cash-stack'));
        }

        const interestsContainer = document.getElementById('modalCompanionInterests');
        if (interestsContainer) {
            interestsContainer.innerHTML = '';
            profile.interests.forEach(item => {
                const span = document.createElement('span');
                span.className = 'badge bg-success bg-opacity-10 text-success rounded-pill py-2 px-3 small';
                span.innerText = item;
                interestsContainer.appendChild(span);
            });
        }

        if (bsCompanionModal) {
            bsCompanionModal.show();
        }
    }

    document.querySelectorAll('.btn-view-profile').forEach(btn => {
        btn.addEventListener('click', function() {
            openCompanionModal(this.dataset.user);
        });
    });

    // Logout button in the top bar
    document.querySelectorAll('.btn-logout-profile').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '../index.html';
        });
    });
})();
