(function() {
    // Select DOM elements
    const nameInput = document.getElementById('profileName');
    const ageInput = document.getElementById('profileAge');
    const hometownInput = document.getElementById('profileHometown');
    const bioInput = document.getElementById('profileBio');
    
    // New travel details DOM elements
    const destinationInput = document.getElementById('profileDestination');
    const startDateInput = document.getElementById('profileStartDate');
    const endDateInput = document.getElementById('profileEndDate');
    const interestsInput = document.getElementById('profileInterests');
    const languagesInput = document.getElementById('profileLanguages');
    
    const mainAvatarImg = document.getElementById('mainProfileAvatar');
    const sidebarAvatarImg = document.getElementById('sidebarAvatar');
    const sidebarNameText = document.getElementById('sidebarUserName');
    const sidebarProgress = document.getElementById('sidebarProgress');
    const sidebarProgressText = document.getElementById('sidebarProgressText');
    const pageProgress = document.getElementById('pageProgress');
    const pageProgressText = document.getElementById('pageProgressText');
    
    const matchedStyleBadge = document.getElementById('matchedStyleBadge');
    
    // Preferences selectors
    const prefStyleSelect = document.getElementById('prefTravelStyle');
    const prefBudgetSelect = document.getElementById('prefBudget');
    const prefCompanionSelect = document.getElementById('prefCompanion');

    // Preview DOM elements
    const headerBanner = document.getElementById('profileHeaderBanner');
    const editContainer = document.getElementById('profileEditMode');
    const previewContainer = document.getElementById('profilePreviewMode');
    
    const prevNameText = document.getElementById('prevName');
    const prevAgeText = document.getElementById('prevAge');
    const prevHometownText = document.getElementById('prevHometown');
    const prevBioHeader = document.getElementById('prevBioHeader');
    const prevBioDetail = document.getElementById('prevBioDetail');
    const prevAvatarImg = document.getElementById('prevAvatar');
    const prevStyleBadge = document.getElementById('prevStyleBadge');
    const prevDetailDest = document.getElementById('prevDetailDest');
    const prevDetailDates = document.getElementById('prevDetailDates');
    const prevDetailBudget = document.getElementById('prevDetailBudget');
    const prevDetailLanguages = document.getElementById('prevDetailLanguages');
    const prevInterestPills = document.getElementById('prevInterestPills');
    
    // Toast
    const toastEl = document.getElementById('saveSuccessToast');
    const toastInstance = toastEl ? new bootstrap.Toast(toastEl, { delay: 3000 }) : null;

    // Load initial values from localStorage or set defaults
    let userName = localStorage.getItem('user_name') || 'Viajero Mate';
    let userAge = localStorage.getItem('user_age') || '26';
    let userHometown = localStorage.getItem('user_hometown') || 'Buenos Aires, Argentina';
    let userBio = localStorage.getItem('user_bio') || '¡Listo para compartir mates y emprender nuevas rutas!';
    let userAvatar = localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=12';
    let matchedProfile = localStorage.getItem('user_travel_style') || 'Aventurero Indómito';
    
    let prefStyle = localStorage.getItem('user_travel_style_key') || 'mochilero';
    let prefBudget = localStorage.getItem('user_budget') || 'economico';
    let prefCompanion = localStorage.getItem('user_companion_style') || 'aventura';
    
    // Load new travel detail values from localStorage or set defaults
    let userDestination = localStorage.getItem('user_destination') || 'Tailandia';
    let userStartDate = localStorage.getItem('user_start_date') || '2026-06-01';
    let userEndDate = localStorage.getItem('user_end_date') || '2026-06-20';
    let userInterests = localStorage.getItem('user_interests') || 'Trekking, Fotografía, Comida local';
    let userLanguages = localStorage.getItem('user_languages') || 'Español, Inglés';
    
    let favoriteRegions = [];
    try {
        favoriteRegions = JSON.parse(localStorage.getItem('user_regions')) || ['pampeana'];
    } catch(e) {
        favoriteRegions = ['pampeana'];
    }

    // Populate fields
    if (nameInput) nameInput.value = userName;
    if (ageInput) ageInput.value = userAge;
    if (hometownInput) hometownInput.value = userHometown;
    if (bioInput) bioInput.value = userBio;
    if (mainAvatarImg) mainAvatarImg.src = userAvatar;
    if (matchedStyleBadge) matchedStyleBadge.innerText = matchedProfile;
    
    if (prefStyleSelect) prefStyleSelect.value = prefStyle;
    if (prefBudgetSelect) prefBudgetSelect.value = prefBudget;
    if (prefCompanionSelect) prefCompanionSelect.value = prefCompanion;
    
    // Populate new travel fields
    if (destinationInput) destinationInput.value = userDestination;
    if (startDateInput) startDateInput.value = userStartDate;
    if (endDateInput) endDateInput.value = userEndDate;
    if (interestsInput) interestsInput.value = userInterests;
    if (languagesInput) languagesInput.value = userLanguages;
    
    // Check region checkboxes
    favoriteRegions.forEach(region => {
        const checkbox = document.getElementById(`region_${region}`);
        if (checkbox) checkbox.checked = true;
    });

    // Setup avatar gallery clicks
    document.querySelectorAll('.avatar-selector-img').forEach(img => {
        // Highlight active avatar
        if (img.src === userAvatar) {
            img.classList.add('selected');
        }
        
        img.addEventListener('click', function() {
            document.querySelectorAll('.avatar-selector-img').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            userAvatar = this.src;
            if (mainAvatarImg) mainAvatarImg.src = userAvatar;
            updateProfileProgress();
        });
    });

    // Helper to format dates like "01 Jun - 20 Jun"
    function formatTravelDates(startDateStr, endDateStr) {
        if (!startDateStr || !endDateStr) {
            return "Fechas a definir";
        }
        
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const startParts = startDateStr.split('-');
        const endParts = endDateStr.split('-');
        
        if (startParts.length !== 3 || endParts.length !== 3) {
            return "Fechas a definir";
        }
        
        const startDay = parseInt(startParts[2], 10);
        const startMonthIndex = parseInt(startParts[1], 10) - 1;
        
        const endDay = parseInt(endParts[2], 10);
        const endMonthIndex = parseInt(endParts[1], 10) - 1;
        
        const startMonth = months[startMonthIndex] || '';
        const endMonth = months[endMonthIndex] || '';
        
        if (startMonthIndex === endMonthIndex) {
            return `${String(startDay).padStart(2, '0')} - ${String(endDay).padStart(2, '0')} ${startMonth}`;
        } else {
            return `${String(startDay).padStart(2, '0')} ${startMonth} - ${String(endDay).padStart(2, '0')} ${endMonth}`;
        }
    }

    // Helper to determine traveler style text dynamically
    function getTravelerStyle(styleKey, companionKey) {
        if (styleKey === 'mochilero') {
            if (companionKey === 'fiesta') return 'Social Festivo';
            return 'Aventurero Indómito';
        } else if (styleKey === 'hotel') {
            return 'Confort Gourmet';
        } else {
            return 'Explorador Cultural';
        }
    }

    // Maps for type of traveler progress lines
    const travelStyleMap = {
        mochilero: { text: 'Mochilero', percent: 90 },
        hotel: { text: 'Lujo / Confort', percent: 30 },
        organizado: { text: 'Planificado', percent: 60 }
    };

    const budgetMap = {
        economico: { text: 'Económico', percent: 20 },
        medio: { text: 'Moderado', percent: 60 },
        premium: { text: 'Premium', percent: 95 }
    };

    const companionMap = {
        aventura: { text: 'Aventura & Naturaleza', percent: 85 },
        fiesta: { text: 'Social & Fiesta', percent: 90 },
        confort: { text: 'Relajado & Cultural', percent: 50 }
    };

    // Keyword mapping to Bootstrap icons for interests
    const iconMap = [
        { keywords: ['trekking', 'senderismo', 'hiking', 'montaña', 'naturaleza', 'nature', 'camping', 'bosque', 'outdoor'], icon: 'bi-tree-fill' },
        { keywords: ['fotografia', 'photography', 'fotos', 'foto', 'camera', 'camara'], icon: 'bi-camera-fill' },
        { keywords: ['comida', 'gastronomia', 'food', 'restaurant', 'cocina', 'comer', 'culinario', 'chef'], icon: 'bi-egg-fried' },
        { keywords: ['cafe', 'coffee', 'mate', 'te', 'barista'], icon: 'bi-cup-hot-fill' },
        { keywords: ['musica', 'music', 'conciertos', 'bandas', 'cantar', 'guitarra'], icon: 'bi-music-note-beamed' },
        { keywords: ['libros', 'lectura', 'leer', 'books', 'novelas', 'escritura'], icon: 'bi-book-fill' },
        { keywords: ['playa', 'beach', 'mar', 'sea', 'sol', 'arena', 'verano'], icon: 'bi-sun-fill' },
        { keywords: ['historia', 'cultura', 'museos', 'art', 'arte', 'galeria'], icon: 'bi-bank' },
        { keywords: ['idiomas', 'lenguas', 'languages', 'ingles', 'hablar'], icon: 'bi-translate' },
        { keywords: ['deportes', 'sport', 'futbol', 'running', 'gimnasio', 'gym', 'bici', 'ciclismo'], icon: 'bi-activity' },
        { keywords: ['fiesta', 'party', 'cerveza', 'beer', 'tragos', 'bar', 'boliche', 'club', 'baile', 'bailar'], icon: 'bi-glass-cocktail' },
        { keywords: ['cine', 'peliculas', 'movies', 'teatro'], icon: 'bi-film' },
        { keywords: ['viajar', 'viajes', 'travel', 'avión', 'mochila', 'aventura'], icon: 'bi-compass-fill' }
    ];

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // Calculate and update completion progress
    function updateProfileProgress() {
        let score = 0;
        
        // Form field values
        const currentName = nameInput ? nameInput.value.trim() : '';
        const currentAge = ageInput ? ageInput.value.trim() : '';
        const currentHometown = hometownInput ? hometownInput.value.trim() : '';
        const currentBio = bioInput ? bioInput.value.trim() : '';
        
        if (currentName !== '' && currentName !== 'Viajero Mate') score += 10;
        if (currentAge !== '') score += 10;
        if (currentHometown !== '') score += 10;
        if (currentBio !== '' && currentBio !== '¡Listo para compartir mates y emprender nuevas rutas!') score += 15;
        if (userAvatar !== 'https://i.pravatar.cc/150?img=12') score += 15;
        
        // Preferences
        if (prefStyleSelect && prefStyleSelect.value !== '') score += 10;
        if (prefCompanionSelect && prefCompanionSelect.value !== '') score += 10;
        if (prefBudgetSelect && prefBudgetSelect.value !== '') score += 5;
        
        // Regions
        let selectedRegionsCount = 0;
        document.querySelectorAll('.region-checkbox').forEach(cb => {
            if (cb.checked) selectedRegionsCount++;
        });
        if (selectedRegionsCount > 0) score += 5;

        // New Travel Details Progress
        const currentDest = destinationInput ? destinationInput.value.trim() : '';
        const currentStart = startDateInput ? startDateInput.value : '';
        const currentEnd = endDateInput ? endDateInput.value : '';
        const currentInterests = interestsInput ? interestsInput.value.trim() : '';
        const currentLang = languagesInput ? languagesInput.value.trim() : '';

        if (currentDest !== '') score += 5;
        if (currentStart !== '' && currentEnd !== '') score += 5;
        if (currentInterests !== '') score += 5;
        if (currentLang !== '') score += 5;

        // Caps at 100
        const percentage = Math.min(score, 100);

        // Update progress displays
        if (pageProgress) pageProgress.style.width = percentage + '%';
        if (pageProgressText) pageProgressText.innerText = percentage + '% de completitud';
        
        const previewPageProgress = document.getElementById('previewPageProgress');
        const previewPageProgressText = document.getElementById('previewPageProgressText');
        if (previewPageProgress) previewPageProgress.style.width = percentage + '%';
        if (previewPageProgressText) previewPageProgressText.innerText = percentage + '% completado';
        
        if (sidebarProgress) sidebarProgress.style.width = percentage + '%';
        if (sidebarProgressText) sidebarProgressText.innerText = percentage + '% completado';
        
        // Set dynamic names
        if (sidebarNameText) {
            sidebarNameText.innerText = currentName || 'Viajero Mate';
        }
        if (sidebarAvatarImg) {
            sidebarAvatarImg.src = userAvatar;
        }

        return percentage;
    }

    // Helper to populate the preview card layout
    function populatePreview() {
        const currentName = nameInput ? nameInput.value.trim() : 'Viajero Mate';
        const currentAge = ageInput ? ageInput.value.trim() : '26';
        const currentHometown = hometownInput ? hometownInput.value.trim() : 'Buenos Aires, Argentina';
        const currentBio = bioInput ? bioInput.value.trim() : '¡Listo para compartir mates y emprender nuevas rutas!';
        
        if (prevNameText) prevNameText.innerText = currentName;
        if (prevAgeText) prevAgeText.innerText = `${currentAge} años`;
        if (prevHometownText) prevHometownText.innerText = currentHometown;
        
        if (prevBioHeader) prevBioHeader.innerText = currentBio;
        if (prevBioDetail) prevBioDetail.innerText = currentBio;
        if (prevAvatarImg) prevAvatarImg.src = userAvatar;
        
        // Calculate traveler style badge dynamically
        const styleVal = prefStyleSelect ? prefStyleSelect.value : 'mochilero';
        const companionVal = prefCompanionSelect ? prefCompanionSelect.value : 'aventura';
        matchedProfile = getTravelerStyle(styleVal, companionVal);
        
        if (prevStyleBadge) prevStyleBadge.innerText = matchedProfile;
        if (matchedStyleBadge) matchedStyleBadge.innerText = matchedProfile;
        
        // Populate next trip details
        const destVal = destinationInput ? destinationInput.value.trim() : '';
        if (prevDetailDest) prevDetailDest.innerText = destVal || 'A definir';
        
        const startVal = startDateInput ? startDateInput.value : '';
        const endVal = endDateInput ? endDateInput.value : '';
        const formattedDates = formatTravelDates(startVal, endVal);
        if (prevDetailDates) prevDetailDates.innerText = formattedDates;
        
        const budgetVal = prefBudgetSelect ? prefBudgetSelect.value : 'economico';
        const budgetText = {
            economico: 'Económico (USD 500 - 1000)',
            medio: 'Moderado (USD 1000 - 1800)',
            premium: 'Premium (USD 2000+)'
        }[budgetVal] || 'A definir';
        if (prevDetailBudget) prevDetailBudget.innerText = budgetText;
        
        const languagesVal = languagesInput ? languagesInput.value.trim() : 'Español';
        if (prevDetailLanguages) prevDetailLanguages.innerText = languagesVal || 'A definir';
        
        // Generate dynamic interest pills
        if (prevInterestPills) {
            prevInterestPills.innerHTML = '';
            const interestsVal = interestsInput ? interestsInput.value.trim() : '';
            if (interestsVal) {
                const interestList = interestsVal.split(',').map(i => i.trim()).filter(i => i !== '');
                interestList.forEach(interest => {
                    const normalized = normalizeText(interest);
                    let iconClass = 'bi-tag-fill'; // default icon
                    
                    for (const group of iconMap) {
                        if (group.keywords.some(kw => normalized.includes(kw))) {
                            iconClass = group.icon;
                            break;
                        }
                    }
                    
                    const pill = document.createElement('span');
                    pill.className = 'badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10 me-1 mb-1';
                    pill.innerHTML = `<i class="bi ${iconClass} me-1"></i> ${interest}`;
                    prevInterestPills.appendChild(pill);
                });
            } else {
                const noInterests = document.createElement('span');
                noInterests.className = 'text-muted small italic';
                noInterests.innerText = 'No se cargaron intereses';
                prevInterestPills.appendChild(noInterests);
            }
        }
        
        // Update traveler type progress lines
        const travelStyleData = travelStyleMap[styleVal] || { text: 'Mochilero', percent: 90 };
        const barTravelStyleText = document.getElementById('barTravelStyleText');
        const barTravelStyleFill = document.getElementById('barTravelStyleFill');
        if (barTravelStyleText) barTravelStyleText.innerText = travelStyleData.text;
        if (barTravelStyleFill) barTravelStyleFill.style.width = travelStyleData.percent + '%';
        
        const budgetPrefData = budgetMap[budgetVal] || { text: 'Moderado', percent: 60 };
        const barBudgetText = document.getElementById('barBudgetText');
        const barBudgetFill = document.getElementById('barBudgetFill');
        if (barBudgetText) barBudgetText.innerText = budgetPrefData.text;
        if (barBudgetFill) barBudgetFill.style.width = budgetPrefData.percent + '%';
        
        const companionData = companionMap[companionVal] || { text: 'Social', percent: 90 };
        const barCompanionText = document.getElementById('barCompanionText');
        const barCompanionFill = document.getElementById('barCompanionFill');
        if (barCompanionText) barCompanionText.innerText = companionData.text;
        if (barCompanionFill) barCompanionFill.style.width = companionData.percent + '%';
    }

    // Trigger initial progress calculate and populate preview card
    updateProfileProgress();
    populatePreview();

    // Listeners for real-time progress calculations
    const trackingInputs = [nameInput, ageInput, hometownInput, bioInput, destinationInput, startDateInput, endDateInput, interestsInput, languagesInput];
    trackingInputs.forEach(input => {
        if (input) input.addEventListener('input', updateProfileProgress);
    });
    
    if (prefStyleSelect) prefStyleSelect.addEventListener('change', updateProfileProgress);
    if (prefCompanionSelect) prefCompanionSelect.addEventListener('change', updateProfileProgress);
    if (prefBudgetSelect) prefBudgetSelect.addEventListener('change', updateProfileProgress);
    
    document.querySelectorAll('.region-checkbox').forEach(cb => {
        cb.addEventListener('change', updateProfileProgress);
    });

    // Save Changes button
    const saveBtn = document.getElementById('btnSaveProfile');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Save values
            const finalName = nameInput ? nameInput.value.trim() : 'Viajero Mate';
            const finalAge = ageInput ? ageInput.value.trim() : '26';
            const finalHometown = hometownInput ? hometownInput.value.trim() : 'Buenos Aires, Argentina';
            const finalBio = bioInput ? bioInput.value.trim() : '¡Listo para compartir mates y emprender nuevas rutas!';
            
            localStorage.setItem('user_name', finalName);
            localStorage.setItem('user_age', finalAge);
            localStorage.setItem('user_hometown', finalHometown);
            localStorage.setItem('user_bio', finalBio);
            localStorage.setItem('user_avatar', userAvatar);
            
            const styleVal = prefStyleSelect ? prefStyleSelect.value : 'mochilero';
            const companionVal = prefCompanionSelect ? prefCompanionSelect.value : 'aventura';
            const calculatedStyle = getTravelerStyle(styleVal, companionVal);
            localStorage.setItem('user_travel_style', calculatedStyle);
            
            if (prefStyleSelect) localStorage.setItem('user_travel_style_key', styleVal);
            if (prefBudgetSelect) localStorage.setItem('user_budget', prefBudgetSelect.value);
            if (prefCompanionSelect) localStorage.setItem('user_companion_style', companionVal);
            
            // Save new travel fields
            localStorage.setItem('user_destination', destinationInput ? destinationInput.value.trim() : '');
            localStorage.setItem('user_start_date', startDateInput ? startDateInput.value : '');
            localStorage.setItem('user_end_date', endDateInput ? endDateInput.value : '');
            localStorage.setItem('user_interests', interestsInput ? interestsInput.value.trim() : '');
            localStorage.setItem('user_languages', languagesInput ? languagesInput.value.trim() : '');
            
            // Save checked regions
            const savedRegions = [];
            document.querySelectorAll('.region-checkbox').forEach(cb => {
                if (cb.checked) {
                    savedRegions.push(cb.id.replace('region_', ''));
                }
            });
            localStorage.setItem('user_regions', JSON.stringify(savedRegions));
            
            // Update progress
            const finalPct = updateProfileProgress();
            localStorage.setItem('user_profile_progress', finalPct);
            
            // Update preview card values
            populatePreview();
            
            // Toggle screens back to preview card and hide header banner
            if (editContainer && previewContainer) {
                editContainer.classList.add('d-none');
                previewContainer.classList.remove('d-none');
                if (headerBanner) headerBanner.classList.add('d-none');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Show Success Toast
            if (toastInstance) {
                toastInstance.show();
            } else {
                alert('¡Perfil guardado con éxito! 🧉');
            }
        });
    }

    // Toggle Edit Mode from Preview Card (Editar Perfil click listener)
    const btnGoToEdit = document.getElementById('btnGoToEdit');
    if (btnGoToEdit) {
        btnGoToEdit.addEventListener('click', function(e) {
            e.preventDefault();
            if (editContainer && previewContainer) {
                previewContainer.classList.add('d-none');
                editContainer.classList.remove('d-none');
                if (headerBanner) headerBanner.classList.remove('d-none');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Cancel Edit Mode and restore original values
    const btnCancelEdit = document.getElementById('btnCancelEdit');
    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Restore form values from localStorage
            if (nameInput) nameInput.value = localStorage.getItem('user_name') || 'Viajero Mate';
            if (ageInput) ageInput.value = localStorage.getItem('user_age') || '26';
            if (hometownInput) hometownInput.value = localStorage.getItem('user_hometown') || 'Buenos Aires, Argentina';
            if (bioInput) bioInput.value = localStorage.getItem('user_bio') || '¡Listo para compartir mates y emprender nuevas rutas!';
            
            userAvatar = localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=12';
            if (mainAvatarImg) mainAvatarImg.src = userAvatar;
            document.querySelectorAll('.avatar-selector-img').forEach(img => {
                img.classList.toggle('selected', img.src === userAvatar);
            });
            
            if (prefStyleSelect) prefStyleSelect.value = localStorage.getItem('user_travel_style_key') || 'mochilero';
            if (prefBudgetSelect) prefBudgetSelect.value = localStorage.getItem('user_budget') || 'economico';
            if (prefCompanionSelect) prefCompanionSelect.value = localStorage.getItem('user_companion_style') || 'aventura';
            
            if (destinationInput) destinationInput.value = localStorage.getItem('user_destination') || 'Tailandia';
            if (startDateInput) startDateInput.value = localStorage.getItem('user_start_date') || '2026-06-01';
            if (endDateInput) endDateInput.value = localStorage.getItem('user_end_date') || '2026-06-20';
            if (interestsInput) interestsInput.value = localStorage.getItem('user_interests') || 'Trekking, Fotografía, Comida local';
            if (languagesInput) languagesInput.value = localStorage.getItem('user_languages') || 'Español, Inglés';
            
            let storedRegions = [];
            try {
                storedRegions = JSON.parse(localStorage.getItem('user_regions')) || ['pampeana'];
            } catch(e) {
                storedRegions = ['pampeana'];
            }
            document.querySelectorAll('.region-checkbox').forEach(cb => {
                const regKey = cb.id.replace('region_', '');
                cb.checked = storedRegions.includes(regKey);
            });

            // Recalculate progress and populate preview
            updateProfileProgress();
            populatePreview();

            // Toggle screens back to preview card and hide header banner
            if (editContainer && previewContainer) {
                editContainer.classList.add('d-none');
                previewContainer.classList.remove('d-none');
                if (headerBanner) headerBanner.classList.add('d-none');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Logout trigger
    const logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '../index.html';
        });
    }

})();
