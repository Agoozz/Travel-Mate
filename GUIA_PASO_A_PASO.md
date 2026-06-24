# 📋 GUÍA PASO A PASO - IMPLEMENTACIÓN DE CAMBIOS

## PASO 1: DESCARGAR Y EXTRAER ⬇️

```bash
# 1. Descarga el archivo: travel-mate-v6-actualizado.zip
# 2. Descomprime en tu carpeta de proyecto
unzip travel-mate-v6-actualizado.zip

# Tu estructura quedará:
# travel-mate-v6/
# ├── pantallas/
# ├── js/
# ├── styles.css
# └── index.html
```

## PASO 2: REEMPLAZAR ARCHIVOS HTML 🔄

### Archivos a reemplazar completamente:

| Archivo Nuevo | Archivo Antiguo | Acción |
|---|---|---|
| `pantallas/mis-lugares.html` | N/A | **COPIAR** (nuevo archivo) |
| `pantallas/inicio.html` | `pantallas/inicio.html` | **REEMPLAZAR** |
| `pantallas/perfil.html` | `pantallas/perfil.html` | **REEMPLAZAR** |
| `pantallas/mis_companeres.html` | `pantallas/mis_companeres.html` | **REEMPLAZAR** |
| `pantallas/mensajes.html` | `pantallas/mensajes.html` | **REEMPLAZAR** |
| `pantallas/mis_viajes.html` | `pantallas/mis_viajes.html` | **REEMPLAZAR** |

### Archivos que ya NO se usan (opcional eliminar):
```bash
# Estos archivos quedan obsoletos:
rm pantallas/favoritos.html
rm pantallas/guardados.html
```

## PASO 3: VERIFICAR LA ESTRUCTURA 📁

Asegúrate de tener esto:

```
travel-mate-v6/
├── pantallas/
│   ├── mis-lugares.html          ← NUEVO ✨
│   ├── inicio.html
│   ├── perfil.html
│   ├── mis_companeres.html
│   ├── mensajes.html
│   ├── mis_viajes.html
│   ├── lugares.html
│   ├── mateando.html
│   ├── onboarding.html
│   └── iniciar_sesion.html
├── js/
│   ├── dashboard.js
│   ├── auth.js
│   ├── perfil.js
│   ├── chat.js
│   ├── mensajes.js
│   ├── theme.js
│   ├── traveler-test.js
│   ├── main.js
│   └── provinces.js
├── images/
│   └── [todas tus imágenes]
├── styles.css
└── index.html
```

## PASO 4: PROBAR LOCALMENTE 🧪

### Opción 1: Con Python
```bash
cd travel-mate-v6
python -m http.server 8000
# Luego abre: http://localhost:8000
```

### Opción 2: Con Node.js
```bash
npm install -g http-server
http-server travel-mate-v6
# Luego abre: http://localhost:8080
```

### Opción 3: Con VSCode
- Instala "Live Server" extension
- Click derecho en `index.html` → "Open with Live Server"

## PASO 5: PROBAR FUNCIONALIDADES 🎯

### En la página "Mis Lugares":

```
✅ PESTAÑA 1: "Compañeres Favoritos"
   □ Se cargan las tarjetas de Tomás, Sofía, Martín
   □ El icono 🧉 es visible y clickeable
   □ Al hacer click en 🧉, cambia a 🧉✓
   □ El botón "Eliminar" funciona
   □ El botón "Ver perfil" redirige a inicio.html

✅ PESTAÑA 2: "Destinos Guardados"
   □ Se cargan las imágenes de destinos
   □ El mapa aparece y es interactivo
   □ Los contadores 🧉 24 se muestran correctamente
   □ El botón "Eliminar" funciona
   □ Se ve "5 destinos" en el contador del mapa
```

### En todas las páginas:

```
✅ Navegación
   □ El link "Mis Lugares" existe en el sidebar
   □ Lleva a la página correcta (mis-lugares.html)
   □ El icono es un bookmark 🔖 (no una estrella)
   □ Está marcado como "active" en la página mis-lugares

✅ Tema
   □ El modo oscuro funciona
   □ Dark mode aplica a la página mis-lugares.html
   □ Los colores son consistentes

✅ Responsive
   □ Se ve bien en mobile (< 768px)
   □ Se ve bien en tablet (768px - 1200px)
   □ Se ve bien en desktop (> 1200px)
```

## PASO 6: INTEGRACIÓN CON BACKEND 🔗

Si tienes backend/API, necesitas:

### 1. Actualizar endpoints para "mates"
```javascript
// En lugar de /api/likes
// Usar: /api/mates

// POST - Dar mate
POST /api/mates/{placeId}
Body: { userId: "..." }

// DELETE - Quitar mate
DELETE /api/mates/{placeId}
Body: { userId: "..." }

// GET - Obtener matesCount
GET /api/places/{placeId}/matesCount
Response: { count: 42 }
```

### 2. Actualizar en JavaScript
```javascript
// En mis-lugares.html, reemplaza el script al final:

// Para cargar datos reales:
async function loadCompaneres() {
    const response = await fetch('/api/user/favoritos');
    const data = await response.json();
    // Renderiza dinamicamente
}

async function loadDestinos() {
    const response = await fetch('/api/user/lugares-guardados');
    const data = await response.json();
    // Renderiza dinamicamente
}

// Para dar mate:
async function darMate(placeId) {
    const response = await fetch(`/api/mates/${placeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getCurrentUserId() })
    });
    return response.json();
}
```

## PASO 7: PERSONALIZACIÓN 🎨

### Cambiar colores
En `mis-lugares.html`, sección `<style>`:
```css
/* Cambiar verde a otro color */
/* Busca: #198754 (verde) */
/* Reemplaza con tu color: #FF6B6B (rojo), #4ECDC4 (turquesa), etc. */

.mate-icon {
    color: #FF6B6B; /* Nuevo color */
}

.mate-count {
    background-color: #FFE5E5;
    color: #FF6B6B;
}
```

### Agregar más compañeres
En `mis-lugares.html`, dentro de `<div class="tab-pane" id="companeres">`:
```html
<!-- Copia este bloque y modifica -->
<div class="col-md-6">
    <div class="card rounded-4 shadow-sm border-0 h-100">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle overflow-hidden border border-2 border-success" style="width:56px; height:56px;">
                        <img src="https://i.pravatar.cc/150?img=ID" alt="Nombre">
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0">Nombre · Edad</h5>
                        <small class="text-body-secondary">Tipo de Viajero</small>
                    </div>
                </div>
                <span class="mate-icon" data-profile="id_unico">🧉</span>
            </div>
            <p class="text-body-secondary small mb-3">Descripción...</p>
            <div class="d-flex flex-wrap gap-2 mb-3">
                <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10">Destino</span>
            </div>
            <div class="d-flex gap-2">
                <a href="inicio.html" class="btn btn-outline-success rounded-pill flex-grow-1">Ver perfil</a>
                <button class="btn btn-danger rounded-pill px-4 eliminar-favorito" data-profile="id_unico">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
</div>
```

### Agregar más destinos
En `mis-lugares.html`, dentro del `<div class="tab-pane" id="destinos">`:
```html
<!-- Copia este bloque y modifica -->
<div class="col-md-4">
    <div class="card rounded-4 shadow-sm border-0 h-100 overflow-hidden">
        <img src="../images/nombre.png" alt="Destino" class="w-100 object-fit-cover" style="height:120px;">
        <div class="card-body text-center p-3">
            <h5 class="fw-bold mb-1">Nombre Destino</h5>
            <p class="text-body-secondary small mb-3">Descripción corta...</p>
            <div class="d-flex gap-2 justify-content-center flex-wrap mb-3">
                <span class="mate-count">🧉 XX</span>
                <span class="badge bg-success bg-opacity-10 text-success">Categoría</span>
            </div>
            <button class="btn btn-sm btn-danger w-100 eliminar-lugar" data-destino="id_unico">
                <i class="bi bi-trash me-1"></i> Eliminar
            </button>
        </div>
    </div>
</div>
```

## PASO 8: DEPLOY 🚀

### A un servidor web:
```bash
# 1. Comprime tu carpeta
zip -r travel-mate-v6.zip travel-mate-v6/

# 2. Sube a tu servidor (FTP, SSH, etc)
scp -r travel-mate-v6/ usuario@servidor.com:/var/www/

# 3. Abre en navegador
https://tudominio.com/travel-mate-v6/
```

### Con GitHub Pages:
```bash
# 1. Crea un repo en GitHub
# 2. Sube tus archivos
git add .
git commit -m "Travel-Mate v6 actualizado"
git push origin main

# 3. Ve a Settings > Pages
# 4. Selecciona "Deploy from a branch"
# 5. Tu sitio estará en: https://usuario.github.io/travel-mate-v6
```

## ✅ CHECKLIST FINAL

Antes de considerar "listo":

- [ ] Descargué el ZIP actualizado
- [ ] Descomprimí en mi carpeta de proyecto
- [ ] Copié `mis-lugares.html` a `/pantallas/`
- [ ] Reemplacé los archivos HTML necesarios
- [ ] Eliminé favoritos.html y guardados.html
- [ ] Probé "Mis Lugares" en navegador
- [ ] La pestaña de compañeres funciona
- [ ] La pestaña de destinos funciona
- [ ] El icono 🧉 es clickeable
- [ ] El mapa carga correctamente
- [ ] Todo se ve en responsive
- [ ] Dark mode funciona
- [ ] La navegación lleva a la página correcta
- [ ] Personalicé con mis datos (si es necesario)
- [ ] Subí a producción/servidor

## 🔍 TROUBLESHOOTING

### Problema: La página mis-lugares.html no carga
**Solución**: Verifica que el archivo esté en la carpeta `/pantallas/` y que el nombre sea exacto: `mis-lugares.html`

### Problema: El mate icon no es clickeable
**Solución**: Asegúrate de que el script al final de `mis-lugares.html` esté completo y no haya errores en la consola (F12 → Console)

### Problema: El mapa no aparece
**Solución**: Verifica que tengas conexión a internet (Leaflet se carga desde CDN). Si estás offline, necesitas descargar Leaflet localmente.

### Problema: Los estilos se ven mal
**Solución**: Limpia el cache del navegador (Ctrl+Shift+Del) o abre en incógnito

### Problema: Los links no funcionan
**Solución**: Si los archivos están en otra carpeta, actualiza los paths relativos en los links. Ejemplo:
```html
<!-- Si estás en /pantallas/mis-lugares.html -->
<a href="inicio.html">...</a>       ← Correcto
<a href="/pantallas/inicio.html">...</a> ← También funciona
```

---

**¿Necesitas ayuda?** Revisa la sección de Troubleshooting arriba o consulta la documentación. ¡Estamos aquí para ayudarte! 🎉
