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

En mi caso:

```
https://cdn.jsdelivr.net/gh/0gis0/my-assets/icons/heart.svg
```

### Ejemplos de uso directo

#### Usando una versión específica (recomendado)
```html
<!-- Icono -->
<img src="https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@1.0.0/icons/home.svg" alt="Home">

<!-- Logo -->
<img src="https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@1.0.0/logos/logo.svg" alt="Logo">
```

#### Usando la última versión del branch main
```html
<img src="https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main/icons/search.svg" alt="Search">
```

### Uso dinámico con manifest.json

Carga el manifest para acceder a todos los assets programáticamente:

```javascript
// Cargar el manifest
const response = await fetch('https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main/data/manifest.json');
const manifest = await response.json();

// Construir URL completa
const iconPath = manifest.assets.icons.home.path;
const iconUrl = `${manifest.baseUrl}/${iconPath}`;

// Usar en tu aplicación
document.querySelector('img').src = iconUrl;
```

### Uso con Data URIs (sin peticiones HTTP)

Para evitar peticiones HTTP externas, usa los Data URIs del archivo `data-uri.json`:

```javascript
// Cargar el archivo de Data URIs
const response = await fetch('https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main/data/data-uri.json');
const dataUris = await response.json();

// Usar directamente sin peticiones adicionales
document.querySelector('img').src = dataUris.assets.icons.home;

// O en CSS
const style = document.createElement('style');
style.textContent = `.home-icon { background-image: url('${dataUris.assets.icons.home}'); }`;
document.head.appendChild(style);
```

#### En CSS
```css
.home-icon {
  background-image: url('https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main/icons/home.svg');
}
```

#### En JavaScript
```javascript
const iconUrl = 'https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main/icons/user.svg';
```


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
