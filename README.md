# Portafolio JGC · Consola interactiva

Portafolio de una sola página orientado a **reclutadores y clientes**, presentado como una **consola minimalista al estilo SOC** (centro de operaciones de seguridad). No pretende ser un producto de ciberseguridad real: es una **metáfora visual** para navegar por proyectos, experiencia, laboratorios, certificaciones y contacto de forma guiada y clara.

## Qué se hizo aquí (resumen)

1. **Intro tipo terminal** (`TerminalIntro`): pantalla inicial con secuencia de arranque; el visitante escribe `start` o pulsa **START** y pasa a la vista principal.
2. **Mapa topológico en SVG** (`ThreatMap` + `MapNode`): un **núcleo central** enlazado con **nodos satélite** (proyectos, laboratorios de seguridad, aplicaciones, experiencia, certificaciones, competencias, contacto). Las aristas y animaciones refuerzan la idea de “red” sin usar librerías 3D ni mapas pesados.
3. **Panel de detalle por nodo** (`NodeModal`): al elegir un nodo se abre una ficha con resumen, bullets, stack, consideraciones de seguridad, enlaces (demo, GitHub, CV, etc.) y textos alineados con un tono **profesional y en español**.
4. **Barra de navegación superior (HUD)** (`HUDTabs`): atajos a las mismas áreas que el mapa, útil en escritorio y como apoyo táctil.
5. **Recorrido guiado** (`GuidedTour`): recorre automáticamente las secciones en orden (~1 min), coordinado con los pasos definidos en datos.
6. **Registro de actividad** (`LiveLogs`): mensajes contextuales en la parte inferior que refuerzan la idea de consola y documentan la última navegación.
7. **Accesos rápidos** (`QuickAccess`): enlaces persistentes a CV, GitHub, LinkedIn, correo y WhatsApp.
8. **Contenido centralizado**: textos del perfil, proyectos, laboratorios, experiencia y tour en **`lib/data.ts`**; topología del grafo, fichas por nodo (“case files”) y pestañas del HUD en **`lib/mapData.ts`**.

En **móvil**, el mapa complejo se sustituye por una **lista de tarjetas** con la misma información, para no forzar interacciones difíciles en pantalla pequeña.

## Stack técnico

| Tecnología     | Uso principal                          |
| -------------- | -------------------------------------- |
| **Next.js 15** | App Router, página principal en `app/` |
| **React 19**   | Componentes cliente interactivos       |
| **TypeScript** | Tipado en datos y componentes          |
| **Tailwind CSS** | Estilos y tema visual                |
| **Framer Motion** | Animaciones (mapa, modal, HUD)     |
| **Lucide React** | Iconografía                            |

No se usa Three.js, audio, ni SDKs de mapas: el “mapa” es **SVG + estado de React**.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # comprobar build de producción
npm start       # servir el build generado
npm run lint    # ESLint (Next.js)
```

## Despliegue (p. ej. Vercel + jancarlogallon.com)

1. Sube el repositorio a GitHub (u otro proveedor compatible).
2. Importa el proyecto en [Vercel](https://vercel.com) con el preset de Next.js.
3. Comando de build: `npm run build`; salida: `.next`.
4. En **Settings → Environment Variables** define al menos:
   - **`NEXT_PUBLIC_SITE_URL`** = `https://jancarlogallon.com` (canonical, Open Graph, `sitemap.xml`, `robots.txt`)
   - Opcional: **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** (código de Search Console)
   - Si usas **`/admin`**: **`CMS_ADMIN_SECRET`** y **`CMS_ADMIN_PASSWORD_HASH`** (ver **`.env.example`**)
5. En **Domains** de Vercel, enlaza **`jancarlogallon.com`** (y `www` si lo usas) al proyecto.

El SEO incluye metadatos enriquecidos, JSON-LD (`Person` + `WebSite`), `robots.ts`, `sitemap.ts` e imagen Open Graph en `/opengraph-image`.

### Panel CMS **`/admin`**

Puedes editar desde el navegador proyectos (incl. **sitio https opcional**), experiencias y texto “about”, además del perfil resumido:

1. Copia **`.env.example`** a **`.env.local`** y define **`CMS_ADMIN_SECRET`** (mínimo **32 caracteres** aleatorios) y **`CMS_ADMIN_PASSWORD_HASH`** (hash **bcrypt** de tu contraseña; cost recomendado 12).
2. Ejecuta **`npm run dev`**, abre **`/admin/login`** y después **`/admin`**, guarda con **Guardar JSON**.
3. La API escribe **`content/cms-data.json`**, archivo **ignorado por git**. Cada máquina o servidor tiene los suyos.
4. En **hosting serverless** (por ejemplo algunos planes serverless típicos) el archivo en disco **no persiste entre despliegues** sin un volumen o servicio externo (**DB**, **Blob**, etc.).

Por seguridad adicional ante fuerza bruta conviene (**Cloudflare**, WAF o rate limit ante **`/admin`**) y **HTTPS** en producción (cookie marcada **`Secure`**).

## Personalizar tu contenido

Vía código sigues pudiendo tocar **`lib/data.ts`** y **`lib/mapData*.ts`**; cuando existe **`cms-data.json`** el sitio mezcla esos valores con tus overrides sólo para **perfil/about/proyectos/experiencias**.

### Enlaces y datos del perfil

Edita **`lib/data.ts`**:

- **`QUICK_LINKS`**: GitHub, LinkedIn, correo (`mailto:`), WhatsApp (`wa.me`), ruta del CV.
- **`PROFILE`**, **`EXPERIENCES`**, **`DEV_PROJECTS`**, **`SECURITY_LABS`**, certificaciones, competencias, etc., según las secciones exportadas en ese archivo.
- **`GUIDED_TOUR_STEPS`**: orden y mensajes del recorrido guiado (debe mantenerse alineado con el HUD donde aplique).

### Mapa, nodos y textos del panel

Edita **`lib/mapData.ts`**:

- **`TOPOLOGY_NODES`**: posición, etiquetas y subtítulos de cada nodo en el SVG.
- **`CASE_FILES`**: contenido mostrado en el modal por cada área (resumen, características, stack, consideraciones, evidencias, acciones).
- **`HUD_TAB_ORDER`**: texto de las pestañas superiores y correspondencia con cada `nodeId`.

### Curriculum en PDF

Coloca tu CV en:

- **`public/cv.pdf`**

Por defecto la barra de accesos apunta a **`/cv.pdf`** (`QUICK_LINKS.cvPath` en `data.ts`).

## Estructura relevante del código

```
app/
  layout.tsx          # layout raíz + bundles CMS resueltos para el cliente
  page.tsx            # intro + escritorio del portafolio (HUD, mapa, modal, tour, logs)
  admin/login/page.tsx # inicio sesión JWT + bcrypt
  admin/page.tsx       # panel CMS cliente
components/
  TerminalIntro.tsx   # pantalla inicial tipo terminal
  ThreatMap.tsx       # SVG del mapa + lista móvil
  MapNode.tsx         # nodo individual dentro del SVG
  NodeModal.tsx       # modal con ficha por área
  HUDTabs.tsx         # pestañas de navegación superior
  GuidedTour.tsx      # botón y lógica del recorrido guiado
  LiveLogs.tsx        # cinta de mensajes / logs
  QuickAccess.tsx     # accesos a CV y redes
lib/
  data.ts               # valores por defecto del perfil, proyectos, tour, contacto
  mapData.ts / mapData-en.ts
  portfolio-resolve.ts  # servidor: fusión código + cms-data.json
  cms-store.ts …        # lectura / escritura atómica de JSON · sesión JWT
  navDock.ts            # constantes de posicionamiento del dock / barra superior
```

## Licencia y reutilización

Plantilla de portafolio personal. Si reutilizas el enfoque o el código, se agradece **mencionar la procedencia** o adaptarlo con tu propia identidad y contenido.

---

*Documento pensado para quien quiera entender qué hay detrás del portafolio sin leer todo el código.*
