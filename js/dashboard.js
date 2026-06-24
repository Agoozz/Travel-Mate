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
    


    // Companion modal profiles data
    const companionProfiles = {
        tomas: {
            name: 'Tomás',
            age: 28,
            location: 'Córdoba, Argentina',
            type: 'Aventurero Mochilero',
            about: 'Me encanta conocer culturas, hacer trekking y descubrir nuevos destinos locales o internacionales. ¡Busco alguien activo para armar ruta!',
            destination: 'Jujuy, Argentina',
            dates: '01 Jun - 20 Jun',
            budget: '$800.000 - $1200.000 ARS',
            style: 'Mochilero',
            interests: ['Trekking', 'Fotografía', 'Comida local'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=11',
            photos: [
                { src: '../images/jujuy.png', caption: 'Quebrada de Humahuaca, Jujuy 🏔️' },
                { src: '../images/salta.png', caption: 'Valles Calchaquíes, Salta 🌄' },
                { src: '../images/santa_cruz.jpg', caption: 'El Calafate, Santa Cruz ❄️' }
            ]
        },
        sofia: {
            name: 'Sofía',
            age: 25,
            location: 'Buenos Aires, Argentina',
            type: 'Aventurera Confort',
            about: 'Busco relajarme en la Patagonia, conocer cafeterías de especialidad, hacer excursiones tranquilas y compartir buenas charlas con un rico mate de por medio.',
            destination: 'Bariloche',
            dates: '08 Jul - 18 Jul',
            budget: '$1000.000 - $1500.000 ARS',
            style: 'Confort',
            interests: ['Cultura', 'Café', 'Senderismo suave'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=32',
            photos: [
                { src: '../images/rio_negro.png', caption: 'Bariloche, Patagonia 🏔️' },
                { src: '../images/neuquen.jpg', caption: 'Villa La Angostura, Neuquén 🌲' }
            ]
        },
        martin: {
            name: 'Martín',
            age: 31,
            location: 'Mendoza, Argentina',
            type: 'Aventurero Gasolero',
            about: 'Fan de la naturaleza salvaje, peñas folclóricas, y acampar bajo las estrellas. Planeo un viaje gasolero para recorrer los Valles Calchaquíes en julio.',
            destination: 'Salta / NOA',
            dates: '10 Jun - 25 Jun',
            budget: '$600.000 - $900.000 ARS',
            style: 'Aventurero',
            interests: ['Camping', 'Folclore', 'Trekking'],
            languages: 'Español',
            avatar: 'https://i.pravatar.cc/150?img=60',
            photos: [
                { src: '../images/salta.png', caption: 'Cafayate, Salta 🎸' },
                { src: '../images/jujuy.png', caption: 'Purmamarca, Jujuy 🌈' },
                { src: '../images/mendoza.png', caption: 'Mendoza ⛰️' }
            ]
        },
        caro: {
            name: 'Caro',
            age: 27,
            location: 'Rosario, Argentina',
            type: 'Exploradora Cultural',
            about: 'Me encanta descubrir ruinas históricas, visitar museos locales y conocer la selva. Busco compañeros curiosos que les guste caminar mucho.',
            destination: 'Misiones',
            dates: '15 Ago - 25 Ago',
            budget: '$500.000 - $800.000 ARS',
            style: 'Cultural',
            interests: ['Historia', 'Caminatas', 'Museos'],
            languages: 'Español, Portugués',
            avatar: 'https://i.pravatar.cc/150?img=49',
            photos: [
                { src: '../images/misiones.png', caption: 'Cataratas del Iguazú 🌿' },
                { src: '../images/santa_cruz.jpg', caption: 'Glaciares patagónicos ❄️' }
            ]
        },
        juan: {
            name: 'Juan',
            age: 34,
            location: 'CABA, Argentina',
            type: 'Buscador de Confort',
            about: 'Priorizo el buen comer, el relax y los paseos organizados. Estoy planeando ir al Fin del Mundo para ver la nieve con todas las comodidades.',
            destination: 'Ushuaia',
            dates: '10 Jul - 20 Jul',
            budget: '$1500.000 - $2500.000 ARS',
            style: 'Confort',
            interests: ['Gastronomía', 'Esquí', 'Relax'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=12',
            photos: [
                { src: '../images/santa_cruz.jpg', caption: 'Ushuaia, Fin del Mundo 🌎' },
                { src: '../images/rio_negro.png', caption: 'Bariloche nevado ⛷️' }
            ]
        },
        lucia: {
            name: 'Lucía',
            age: 22,
            location: 'La Plata, Argentina',
            type: 'Exploradora Social',
            about: 'Lo mío es la playa, las rondas de mate en la arena, conocer gente nueva en hostels y salir de noche. ¡Amo improvisar planes grupales!',
            destination: 'Costa Atlántica',
            dates: '01 Ene - 15 Ene',
            budget: '$300.000 - $600.000 ARS',
            style: 'Social',
            interests: ['Playa', 'Fiesta', 'Amigos'],
            languages: 'Español',
            avatar: 'https://i.pravatar.cc/150?img=20',
            photos: [
                { src: '../images/misiones.png', caption: 'Costa atlántica en verano ☀️' }
            ]
        },
        nico: {
            name: 'Nico',
            age: 29,
            location: 'Neuquén, Argentina',
            type: 'Aventurero Extremo',
            about: 'Vivo para los deportes extremos y subir cerros. Voy al norte buscando senderos difíciles y paisajes agrestes. Necesito un compañero ágil.',
            destination: 'Jujuy',
            dates: '05 Sep - 15 Sep',
            budget: '$400.000 - $700.000 ARS',
            style: 'Aventurero',
            interests: ['Alpinismo', 'Trail Running', 'Camping'],
            languages: 'Español',
            avatar: 'https://i.pravatar.cc/150?img=59',
            photos: [
                { src: '../images/jujuy.png', caption: 'Cumbre en Jujuy 🧗' },
                { src: '../images/neuquen.jpg', caption: 'Sendero en Neuquén 🥾' },
                { src: '../images/santa_cruz.jpg', caption: 'Campo de Hielo Sur ❄️' }
            ]
        },
        valentina: {
            name: 'Valentina',
            age: 26,
            location: 'Salta, Argentina',
            type: 'Buscadora de Confort',
            about: 'Quiero conocer el Valle de Uco, degustar vinos de altura y hospedarme en lugares premium. Si te gusta el turismo gastronómico, ¡escribime!',
            destination: 'Mendoza',
            dates: '12 Oct - 20 Oct',
            budget: '$1200.000 - $1800.000 ARS',
            style: 'Confort / Enoturismo',
            interests: ['Vinos', 'Gourmet', 'Paisajes'],
            languages: 'Español, Inglés',
            avatar: 'https://i.pravatar.cc/150?img=47',
            photos: [
                { src: '../images/mendoza.png', caption: 'Valle de Uco, Mendoza 🍷' },
                { src: '../images/salta.png', caption: 'Bodega en Cafayate 🥂' }
            ]
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

    let companionItems = Array.from(document.querySelectorAll('.companion-item'));
    let activeItems = [...companionItems];
    const itemsPerPage = 3;
    let totalPages = Math.ceil(activeItems.length / itemsPerPage);
    let currentPage = 1;

    function removeCompanionByName(name) {
        const itemToRemove = companionItems.find(item => {
            const h4 = item.querySelector('h4');
            return h4 && h4.innerText.split('·')[0].trim() === name;
        });
        
        if (itemToRemove) {
            itemToRemove.remove(); // Remove from DOM
            
            // Remove from arrays
            companionItems = companionItems.filter(item => item !== itemToRemove);
            activeItems = activeItems.filter(item => item !== itemToRemove);
            
            // Adjust pagination and re-render
            totalPages = Math.ceil(activeItems.length / itemsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            } else if (totalPages === 0) {
                currentPage = 1;
            }
            renderCompanions();
        }
    }

    function renderCompanions() {
        // First hide all
        companionItems.forEach(item => item.classList.add('d-none'));

        // Determine slice to show
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;
        const pageItems = activeItems.slice(start, end);

        // Show them
        pageItems.forEach(item => item.classList.remove('d-none'));

        // Update pagination buttons visibility based on totalPages
        const paginationContainer = document.getElementById('companionsPagination');
        if (!paginationContainer) return;

        // Rebuild pagination numbers
        const prevBtnHtml = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}" id="prevPageBtn">
                                <button class="page-link border-success text-success fw-semibold shadow-none">Anterior</button>
                             </li>`;
        const nextBtnHtml = `<li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}" id="nextPageBtn">
                                <button class="page-link border-success text-success fw-semibold shadow-none">Siguiente</button>
                             </li>`;
        
        let pagesHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage;
            const btnClass = isActive ? 'bg-success text-white' : 'text-success';
            pagesHtml += `<li class="page-item ${isActive ? 'active' : ''}" data-page="${i}">
                            <button class="page-link border-success ${btnClass} shadow-none">${i}</button>
                          </li>`;
        }

        if (totalPages === 0) {
            pagesHtml = `<li class="page-item disabled"><button class="page-link border-success text-muted shadow-none">Sin resultados</button></li>`;
        }

        paginationContainer.innerHTML = prevBtnHtml + pagesHtml + nextBtnHtml;

        // Re-attach events
        paginationContainer.querySelectorAll('.page-item[data-page]').forEach(li => {
            li.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.getAttribute('data-page'));
                renderCompanions();
            });
        });

        const prevBtn = document.getElementById('prevPageBtn');
        if (prevBtn && currentPage > 1) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage--;
                renderCompanions();
            });
        }

        const nextBtn = document.getElementById('nextPageBtn');
        if (nextBtn && currentPage < totalPages) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage++;
                renderCompanions();
            });
        }
    }

    if (companionItems.length > 0) {
        renderCompanions();
    }

    // Search Logic
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function executeSearch() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            activeItems = [...companionItems];
        } else {
            activeItems = companionItems.filter(item => {
                const textContent = item.innerText.toLowerCase();
                return textContent.includes(query);
            });
        }
        
        currentPage = 1;
        totalPages = Math.ceil(activeItems.length / itemsPerPage);
        renderCompanions();
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', executeSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch();
            }
        });
    }
    // Quick Filter Logic
    document.querySelectorAll('.quick-filter').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchInput && searchBtn) {
                searchInput.value = this.getAttribute('data-filter');
                executeSearch();
            }
        });
    });



    // ==========================================
    // MATCH & CHAT SIMULATION LOGIC
    // ==========================================
    
    const matchOverlay = document.getElementById('matchOverlay');
    const matchTargetAvatar = document.getElementById('matchTargetAvatar');
    const matchSubtitle = document.getElementById('matchSubtitle');
    const chatOffcanvasEl = document.getElementById('chatOffcanvas');
    let chatOffcanvas;
    if (chatOffcanvasEl) {
        chatOffcanvas = new bootstrap.Offcanvas(chatOffcanvasEl);
    }
    
    const chatMessages = document.getElementById('chatMessages');
    const chatTypingIndicator = document.getElementById('chatTypingIndicator');
    const chatName = document.getElementById('chatName');
    const chatAvatar = document.getElementById('chatAvatar');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    
    let currentChatUserId = null;
    
    function loadChatHistory(userId) {
        if (!chatMessages) return;
        
        // Clear current messages
        Array.from(chatMessages.children).forEach(child => {
            if (!child.classList.contains('typing-indicator')) {
                child.remove();
            }
        });
        
        const history = ChatManager.getChatHistory(userId);
        if (history && history.messages.length > 0) {
            history.messages.forEach(msg => {
                appendMessage(msg.text, msg.sender, false);
            });
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return history && history.messages.length > 0;
    }

    function simulateMatchAndChat(targetName, targetAvatarSrc) {
        const targetId = targetName.toLowerCase().replace(/\s+/g, '');
        currentChatUserId = targetId;
        
        // Setup User Avatar
        const matchUserAvatar = document.getElementById('matchUserAvatar');
        const userAvatarSrc = localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=60';
        if (matchUserAvatar) matchUserAvatar.src = userAvatarSrc;

        // 1. Setup and Show Match Overlay
        if (matchTargetAvatar) matchTargetAvatar.src = targetAvatarSrc;
        const matchTargetNameLabel = document.getElementById('matchTargetNameLabel');
        if (matchTargetNameLabel) matchTargetNameLabel.innerText = targetName;
        const matchSubtitleArea = document.getElementById('matchSubtitleArea');
        if (matchSubtitleArea) matchSubtitleArea.classList.add('d-none');
        
        const matchModalEl = document.getElementById('matchModal');
        let bsMatchModal = null;
        if (matchModalEl) {
            bsMatchModal = new bootstrap.Modal(matchModalEl);
            bsMatchModal.show();
            setTimeout(() => {
                if (matchSubtitleArea) matchSubtitleArea.classList.remove('d-none');
                const matchSubtitleEl = document.getElementById('matchSubtitle');
                if (matchSubtitleEl) matchSubtitleEl.textContent = `¡Vos y ${targetName} quieren viajar juntos!`;
            }, 800);

            // === Conectar con panel de notificaciones ===
            setTimeout(() => {
                // 1. Agregar notif al panel
                const notifList = document.getElementById('notifList');
                if (notifList) {
                    const notifEl = document.createElement('div');
                    notifEl.className = 'notif-item d-flex gap-2 align-items-start p-2 rounded-3 bg-success bg-opacity-10 mb-1 new-match-notif';
                    notifEl.innerHTML = `
                        <img src="${targetAvatarSrc}" class="rounded-circle flex-shrink-0 object-fit-cover" width="32" height="32" alt="${targetName}">
                        <div>
                            <p class="mb-0 small fw-semibold">¡Match con ${targetName}! 🧉</p>
                            <p class="mb-0 text-body-secondary" style="font-size:0.7rem;">Chat desbloqueado · Ahora mismo</p>
                        </div>
                        <span class="ms-auto flex-shrink-0 rounded-circle bg-success d-inline-block flex-shrink-0" style="width:8px;height:8px;margin-top:6px;"></span>
                    `;
                    notifList.prepend(notifEl);
                }

                // 2. Actualizar contador de campana
                const notifCount = document.getElementById('notifCount');
                const notifSummary = document.getElementById('notifSummary');
                if (notifCount) {
                    const current = parseInt(notifCount.textContent) || 0;
                    const newCount = current + 1;
                    notifCount.textContent = newCount;
                    notifCount.classList.remove('d-none');
                    if (notifSummary) notifSummary.textContent = `${newCount} novedad${newCount > 1 ? 'es' : ''}`;
                }

                // 3. Hacer titilar la campana
                const bell = document.getElementById('notifBell');
                if (bell) {
                    bell.classList.add('bell-ring');
                    setTimeout(() => bell.classList.remove('bell-ring'), 1000);
                }

                // 4. Quitar burbuja "¡Nuevo!" del botón que se clickeó
                document.querySelectorAll('.pulse-badge').forEach(b => b.remove());
            }, 500);
        }
        
        // Setup Chat Headers
        if (chatName) chatName.innerText = targetName;
        if (chatAvatar) chatAvatar.src = targetAvatarSrc;
        
        const hasHistory = loadChatHistory(targetId);

        // 2. Hide Match Overlay and Show Chat after 2.5s
        setTimeout(() => {
            if (bsMatchModal) bsMatchModal.hide();
            
            // If the user clicked "Invitar un mate" from the modal, close the modal first
            if (typeof bsCompanionModal !== 'undefined' && bsCompanionModal) {
                bsCompanionModal.hide();
            }
            
            setTimeout(() => {
                if (chatOffcanvas) chatOffcanvas.show();
                
                if (!hasHistory) {
                    // 3. Simulate "typing..." for the first time
                    setTimeout(() => {
                        if (chatTypingIndicator) chatTypingIndicator.classList.add('active');
                        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
                        
                        // 4. Simulate receiving a message
                        setTimeout(() => {
                            if (chatTypingIndicator) chatTypingIndicator.classList.remove('active');
                            const userName = localStorage.getItem('user_name') || 'viajere'; const firstMsg = `¡Hola ${userName}! Qué bueno coincidir 😊 ¿Tenés fechas pensadas para el viaje? 🧉`;
                            ChatManager.addMessage(targetId, targetName, targetAvatarSrc, firstMsg, 'received');
                            appendMessage(firstMsg, 'received');
                        }, 2000);
                        
                    }, 800);
                }
            }, 300); // slight delay after match hides
            
        }, 3000);
    }
    
    function appendMessage(text, type, animate = true, time = null) {
        if (!chatMessages) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = type === 'sent' ? 'd-flex flex-column align-items-end mb-2' : 'd-flex flex-column align-items-start mb-2';
        
        const msgDiv = document.createElement('div');
        const typeClasses = type === 'sent' 
            ? "bg-success text-white rounded-4 rounded-end shadow-sm" 
            : "bg-body-secondary text-body-emphasis rounded-4 rounded-start border border-light-subtle shadow-sm";
        msgDiv.className = `p-2 px-3 ${typeClasses}`;
        msgDiv.style.maxWidth = '75%';
        if (!animate) msgDiv.style.animation = 'none';
        msgDiv.innerText = text;
        wrapper.appendChild(msgDiv);

        // Hora
        const now = new Date();
        const timeStr = time || now.toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'});
        const timeEl = document.createElement('small');
        timeEl.className = 'text-body-secondary mt-1 px-1';
        timeEl.style.fontSize = '0.7rem';
        timeEl.innerText = timeStr;
        wrapper.appendChild(timeEl);
        
        if (chatTypingIndicator) {
            chatMessages.insertBefore(wrapper, chatTypingIndicator);
        } else {
            chatMessages.appendChild(wrapper);
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text && currentChatUserId) {
                const targetName = chatName.innerText;
                const targetAvatarSrc = chatAvatar.src;
                
                ChatManager.addMessage(currentChatUserId, targetName, targetAvatarSrc, text, 'sent');
                appendMessage(text, 'sent');
                chatInput.value = '';
                
                // Simulate reply if the user says something
                setTimeout(() => {
                    if (chatTypingIndicator) chatTypingIndicator.classList.add('active');
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    setTimeout(() => {
                        if (chatTypingIndicator) chatTypingIndicator.classList.remove('active');
                        const reply = ChatManager.generateReply(text);
                        ChatManager.addMessage(currentChatUserId, targetName, targetAvatarSrc, reply, 'received');
                        appendMessage(reply, 'received');
                    }, 1500 + Math.random() * 1500); // random delay 1.5s - 3.0s
                }, 1000);
            }
        });
    }

    // Attach click events to "Invitar un mate" buttons
    function attachInviteEvents() {
        const sentMates = JSON.parse(localStorage.getItem('sentMates') || '[]');
        
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerText.includes('Invitar un mate')) {
                // To prevent multiple bindings
                if (btn.dataset.inviteBound) return;
                btn.dataset.inviteBound = "true";
                
                let targetName = "Viajero";
                let targetAvatarSrc = "https://i.pravatar.cc/150?img=11";
                
                // Try to find context (is it in the modal or in a card?)
                const card = btn.closest('.companion-item');
                if (card) {
                    const nameEl = card.querySelector('h4');
                    if (nameEl) targetName = nameEl.innerText.split('·')[0].trim();
                    const imgEl = card.querySelector('img');
                    if (imgEl) targetAvatarSrc = imgEl.src;
                } else {
                    // Modal context
                    const nameEl = document.getElementById('modalCompanionName');
                    if (nameEl) targetName = nameEl.innerText.split('·')[0].trim();
                    const imgEl = document.getElementById('modalCompanionAvatar');
                    if (imgEl) targetAvatarSrc = imgEl.src;
                }
                
                // Check if already sent
                if (sentMates.includes(targetName)) {
                    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                    btn.classList.remove('btn-success', 'btn-outline-success');
                    btn.classList.add('btn-secondary');
                    btn.disabled = true;
                    return; // skip adding click event
                }
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Save to localStorage
                    const currentSent = JSON.parse(localStorage.getItem('sentMates') || '[]');
                    if (!currentSent.includes(targetName)) {
                        currentSent.push(targetName);
                        localStorage.setItem('sentMates', JSON.stringify(currentSent));
                    }
                    
                    // Disable button
                    this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                    this.classList.remove('btn-success', 'btn-outline-success');
                    this.classList.add('btn-secondary');
                    this.disabled = true;

                    // Flying mate animation
                    const mateIcon = document.createElement('div');
                    mateIcon.innerText = '🧉';
                    mateIcon.style.position = 'fixed';
                    mateIcon.style.left = e.clientX + 'px';
                    mateIcon.style.top = e.clientY + 'px';
                    mateIcon.style.fontSize = '2rem';
                    mateIcon.style.pointerEvents = 'none';
                    mateIcon.style.zIndex = '9999';
                    mateIcon.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
                    document.body.appendChild(mateIcon);

                    // Trigger reflow
                    mateIcon.getBoundingClientRect();

                    // Animate up and fade out
                    mateIcon.style.transform = 'translateY(-100px) scale(1.5) rotate(15deg)';
                    mateIcon.style.opacity = '0';

                    setTimeout(() => mateIcon.remove(), 1000);

                    // 30% chance to actually match
                    if (Math.random() < 0.3) {
                        setTimeout(() => {
                            removeCompanionByName(targetName);
                            simulateMatchAndChat(targetName, targetAvatarSrc);
                        }, 1200);
                    }
                });
            }
        });
    }
    
    // Initial attach
    attachInviteEvents();

})();
