#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../icons');
const LOGOS_DIR = path.join(__dirname, '../logos');
const DATA_DIR = path.join(__dirname, '../data');

// Función para obtener dimensiones del SVG
function getSvgDimensions(svgContent) {
  const widthMatch = svgContent.match(/width="(\d+)"/);
  const heightMatch = svgContent.match(/height="(\d+)"/);
  
  const width = widthMatch ? widthMatch[1] : 'auto';
  const height = heightMatch ? heightMatch[1] : 'auto';
  
  return `${width}x${height}`;
}

// Función para extraer colores de gradientes
function extractColors(svgContent) {
  const colors = [];
  const stopMatches = svgContent.matchAll(/stop-color:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})/g);
  
  for (const match of stopMatches) {
    colors.push(match[1]);
  }
  
  // También buscar fills directos
  const fillMatches = svgContent.matchAll(/fill="(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})"/g);
  for (const match of fillMatches) {
    if (!colors.includes(match[1])) {
      colors.push(match[1]);
    }
  }
  
  return [...new Set(colors)]; // Eliminar duplicados
}

// Función para procesar archivos SVG de un directorio
function processSvgFiles(directory, type) {
  const files = fs.readdirSync(directory).filter(file => file.endsWith('.svg'));
  const assets = {};
  const dataUris = {};
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const base64 = Buffer.from(content).toString('base64');
    const name = path.basename(file, '.svg');
    
    // Para el manifest
    assets[name] = {
      path: `${type}/${file}`,
      description: getDescription(name, type),
      size: getSvgDimensions(content),
      colors: extractColors(content)
    };
    
    // Para data URIs
    dataUris[name] = `data:image/svg+xml;base64,${base64}`;
  });
  
  return { assets, dataUris };
}

// Función para obtener descripción basada en el nombre
function getDescription(name, type) {
  const descriptions = {
    home: 'Icono de casa/inicio',
    search: 'Icono de búsqueda',
    user: 'Icono de usuario',
    settings: 'Icono de configuración',
    heart: 'Icono de corazón/favoritos',
    star: 'Icono de estrella/destacado',
    mail: 'Icono de correo',
    bell: 'Icono de notificaciones',
    logo: 'Logo principal {gis}',
    main: 'Logo principal {gis}'
  };
  
  return descriptions[name] || `${type === 'icons' ? 'Icono' : 'Logo'} ${name}`;
}

// Generar manifest.json
function generateManifest() {
  const icons = processSvgFiles(ICONS_DIR, 'icons');
  const logos = processSvgFiles(LOGOS_DIR, 'logos');
  
  const manifest = {
    version: '1.0.0',
    description: 'Mapa de assets disponibles con sus rutas relativas',
    baseUrl: 'https://cdn.jsdelivr.net/gh/tu-usuario/my-assets@main',
    assets: {
      icons: icons.assets,
      logos: logos.assets
    }
  };
  
  // Crear directorio data si no existe
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ manifest.json generado correctamente');
}

// Generar data-uri.json
function generateDataUri() {
  const icons = processSvgFiles(ICONS_DIR, 'icons');
  const logos = processSvgFiles(LOGOS_DIR, 'logos');
  
  const dataUri = {
    version: '1.0.0',
    description: 'Data URIs en Base64 para usar sin peticiones HTTP externas',
    assets: {
      icons: icons.dataUris,
      logos: logos.dataUris
    },
    usage: {
      html: '<img src="data:image/svg+xml;base64,..." alt="Icon">',
      css: 'background-image: url(\'data:image/svg+xml;base64,...\');',
      javascript: 'const icon = \'data:image/svg+xml;base64,...\';'
    }
  };
  
  // Crear directorio data si no existe
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'data-uri.json'),
    JSON.stringify(dataUri, null, 2)
  );
  
  console.log('✅ data-uri.json generado correctamente');
}

// Ejecutar generadores
try {
  console.log('🚀 Generando archivos de datos...\n');
  generateManifest();
  generateDataUri();
  console.log('\n✨ Proceso completado exitosamente!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
