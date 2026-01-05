# Cómo servir contenido estático con Github y jsDelivr GRATIS

¡Hola developer 👋🏻! Este es un repositorio de ejemplo para servir contenido estático usando [jsDelivr](https://www.jsdelivr.com/).

## 📦 Contenido

### Icons
Iconos SVG optimizados para web (48x48px):
- `home.svg` - Icono de casa/inicio
- `search.svg` - Icono de búsqueda
- `user.svg` - Icono de usuario
- `settings.svg` - Icono de configuración
- `heart.svg` - Icono de corazón/favoritos
- `star.svg` - Icono de estrella/destacado
- `mail.svg` - Icono de correo
- `bell.svg` - Icono de notificaciones

### Logos
- `logo.svg` - Logo minimalista {gis} (110x80px)

### Data
- `manifest.json` - Mapa de assets con rutas relativas y metadatos
- `data-uri.json` - Data URIs en Base64 para uso sin peticiones HTTP

## 🚀 Uso con jsDelivr

Una vez que tu repositorio esté en GitHub, puedes acceder a los assets usando jsDelivr:

### Formato de URL
```
https://cdn.jsdelivr.net/gh/[usuario]/[repositorio]@[version]/[ruta]
```

**Nota**: Si no especificas `@[version]`, jsDelivr servirá automáticamente la versión más reciente del branch `main`.

En mi caso:

```
# Con versión específica
https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/heart.svg

# Sin versión (última versión disponible)
https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/heart.svg
```

### Ejemplos de uso directo

#### 🎨 Versiones disponibles

**v1.0.0** - Iconos coloridos con gradientes y fondos circulares
```html
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/icons/home.svg" alt="Home v1">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/icons/heart.svg" alt="Heart v1">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/logos/logo.svg" alt="Logo v1">
```

**v2.0.0** - Iconos planos y minimalistas
```html
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/home.svg" alt="Home v2">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/heart.svg" alt="Heart v2">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/logos/logo.svg" alt="Logo v2">
```

**Sin versión** - Última versión disponible (actualmente v2.0.0)
```html
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/home.svg" alt="Home latest">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/heart.svg" alt="Heart latest">
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets/logos/logo.svg" alt="Logo latest">
```

#### 💡 Comparación de versiones
```html
<!-- v1.0.0: Diseño con gradientes -->
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/icons/star.svg" width="48" alt="Star v1.0.0">

<!-- v2.0.0: Diseño plano -->
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/star.svg" width="48" alt="Star v2.0.0">

<!-- Sin versión: Siempre la más reciente -->
<img src="https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/star.svg" width="48" alt="Star latest">
```

### Uso dinámico con manifest.json

Carga el manifest para acceder a todos los assets programáticamente:

```javascript
// Cargar el manifest de una versión específica
const v1 = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/data/manifest.json');
const manifestV1 = await v1.json();

const v2 = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/data/manifest.json');
const manifestV2 = await v2.json();

// O la versión más reciente (sin especificar versión)
const latest = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets/data/manifest.json');
const latestManifest = await latest.json();

// Construir URL completa
const iconPath = manifestV2.assets.icons.home.path;
const iconUrl = `${manifestV2.baseUrl}/${iconPath}`;

// Usar en tu aplicación
document.querySelector('img').src = iconUrl;
```

### Uso con Data URIs (sin peticiones HTTP)

Para evitar peticiones HTTP externas, usa los Data URIs del archivo `data-uri.json`:

```javascript
// Cargar el archivo de Data URIs de una versión específica
const v1 = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/data/data-uri.json');
const dataUrisV1 = await v1.json();

const v2 = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/data/data-uri.json');
const dataUrisV2 = await v2.json();

// O la versión más reciente (sin especificar versión)
const latest = await fetch('https://cdn.jsdelivr.net/gh/0gis0/my-assets/data/data-uri.json');
const latestDataUris = await latest.json();

// Usar directamente sin peticiones adicionales
document.querySelector('img').src = dataUrisV2.assets.icons.home;

// O en CSS
const style = document.createElement('style');
style.textContent = `.home-icon { background-image: url('${dataUrisV2.assets.icons.home}'); }`;
document.head.appendChild(style);
```

#### En CSS
```css
/* v1.0.0 - Gradientes */
.home-icon-v1 {
  background-image: url('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/icons/home.svg');
}

/* v2.0.0 - Plano */
.home-icon-v2 {
  background-image: url('https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/home.svg');
}

/* Sin versión - Última versión */
.home-icon-latest {
  background-image: url('https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/home.svg');
}
```

#### En JavaScript
```javascript
// Versión específica (recomendado para producción)
const iconUrlV1 = 'https://cdn.jsdelivr.net/gh/0gis0/my-assets@v1.0.0/icons/user.svg';
const iconUrlV2 = 'https://cdn.jsdelivr.net/gh/0gis0/my-assets@v2.0.0/icons/user.svg';

// Sin versión - Última disponible (para desarrollo)
const iconUrlLatest = 'https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/user.svg';
```


## 🎨 Características de los iconos

### Versión v1.0.0 (Gradientes)
- Tamaño: 48x48 píxeles
- Colores vibrantes con gradientes
- Fondos circulares con colores suaves
- Estilo moderno y detallado

### Versión v2.0.0 (Plano)
- Tamaño: 48x48 píxeles
- Diseño plano y minimalista
- Colores sólidos sin gradientes
- Más ligero y simple

### Sin especificar versión
- Sirve automáticamente la versión más reciente disponible
- Ideal para desarrollo o cuando quieres actualizaciones automáticas
- ⚠️ **Advertencia**: En producción, usa versiones específicas para evitar cambios inesperados

💡 **Tip**: Usa `@v1.0.0` o `@v2.0.0` para mantener un diseño consistente en producción, omite la versión para obtener siempre la última.


## 🤖 Automatización

Este repositorio incluye una **GitHub Action** que automáticamente regenera los archivos `manifest.json` y `data-uri.json` cuando detecta cambios en los directorios `icons/` o `logos/`.

### ¿Cómo funciona?

1. **Detecta cambios**: Se activa cuando hay un push con cambios en `icons/` o `logos/`
2. **Genera archivos**: Ejecuta el script `scripts/generate-data-files.js`
3. **Commit automático**: Si hay cambios, hace commit y push automático

### Usar manualmente

También puedes regenerar los archivos localmente:

```bash
node scripts/generate-data-files.js
```

El script automáticamente:
- ✅ Escanea todos los SVG en `icons/` y `logos/`
- ✅ Extrae dimensiones y colores
- ✅ Genera Base64 para Data URIs
- ✅ Actualiza ambos archivos JSON

## 📝 Notas

- **jsDelivr cachea automáticamente** los archivos para mejor rendimiento
- **Usa tags de versión** (git tags) para versiones estables en producción
- Los archivos SVG son ligeros y escalan perfectamente
- El CDN es gratuito y tiene cobertura global
- **manifest.json** permite consumir assets dinámicamente
- **data-uri.json** evita peticiones HTTP adicionales (ideal para performance crítico)
- **GitHub Action** mantiene los datos sincronizados automáticamente

## 🔗 Enlaces útiles

- [Documentación de jsDelivr](https://www.jsdelivr.com/documentation)
- [GitHub Releases](https://docs.github.com/es/repositories/releasing-projects-on-github)
- [GitHub Actions](https://docs.github.com/es/actions)
