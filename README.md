# 🚒 Bomberos Voluntarios de San Andrés de Giles
### 👉 [HACER CLIC AQUÍ PARA VER LA PÁGINA WEB (http://localhost:8000)](http://localhost:8000)

---

## 📖 Descripción General del Proyecto
Sitio web institucional oficial de alto impacto visual y rendimiento para la **Asociación de Bomberos Voluntarios de San Andrés de Giles** (Provincia de Buenos Aires, Argentina), conmemorando sus **58 años de servicio ininterrumpido (1968 - 2026)**.

El desarrollo está construido al 100% con tecnologías nativas del navegador (**Vanilla HTML5, CSS3 y JavaScript ES6+**), sin frameworks pesados, garantizando máxima velocidad de carga, accesibilidad y facilidad de mantenimiento.

---

## ⚡ Comando de Encendido Rápido
Para levantar el servidor local y visualizar la página en cualquier momento:

1. Abrí una terminal o consola de comandos (PowerShell, CMD o Git Bash) en esta carpeta (`c:\Users\lilia\OneDrive\Escritorio\bomberos-web`).
2. Ejecutá el siguiente comando:
```bash
python -m http.server 8000
```
> *(Nota: En sistemas Windows donde Python esté asociado al lanzador oficial, también podés ejecutar `py -m http.server 8000`)*.
3. Abrí tu navegador e ingresá a: **[http://localhost:8000](http://localhost:8000)**.

---

## 📁 Estructura de Archivos del Proyecto

El proyecto está organizado en 3 archivos principales y limpios en la raíz:

- **[`index.html`](file:///c:/Users/lilia/OneDrive/Escritorio/bomberos-web/index.html)**:
  - **Topbar de Emergencia 24/7**: Líneas directas de auxilio (**100**, **(02325) 442020** y **440143**) con enlaces `tel:` clicables.
  - **Navbar Fijo (Sticky)**: Escudo heráldico, enlaces de navegación suave y botón destacado *"Asociate / Colaborá"*.
  - **Hero Section**: Homenaje a los 58 años de valor, llamados a la acción y barra de estadísticas animadas.
  - **Sostenimiento Económico**: Tarjetas para *Socios Protectores*, *Rifa Anual Oficial* (destacada en dorado/ámbar) y *Donaciones/Empresas*, junto con los datos bancarios oficiales (CUIT y Alias copiable).
  - **Nuestro Cuartel**: Grilla con las especialidades operativas (Rescate vehicular en Rutas 7 y 41, Incendios estructurales, Incendios forestales/rurales y Parque automotor pesado).
  - **Escuela de Cadetes y Aspirantes**: Sección dedicada a la formación de jóvenes (12 a 17 años) y futuros aspirantes (18+).
  - **Prevención para la Comunidad**: Sistema de pestañas con consejos para el hogar, el campo y la conducción en ruta.
  - **Archivo Histórico**: Línea de tiempo 1968–2026 y convocatoria comunitaria *"Digitalicemos Nuestra Historia"*.
  - **Pie de Página y Contacto**: Dirección en San Martín Nº 80 / Moreno 338, horarios de secretaría y mapa interactivo de Google Maps.

- **[`styles.css`](file:///c:/Users/lilia/OneDrive/Escritorio/bomberos-web/styles.css)**:
  - **Sistema de diseño en `:root`**: Paleta oficial de colores:
    - Rojo Bombero: `#B71C1C` y `#D32F2F`
    - Oscuro Institucional: `#0B0F19`, `#111827` y `#1F2937`
    - Acento Dorado/Ámbar: `#F59E0B` y `#FBBF24`
    - Fondos Limpios: `#F9FAFB` y `#FFFFFF`
  - **Tipografías de Google Fonts**: *Montserrat* (títulos de gran peso) e *Inter* (cuerpo de texto ultra legible).
  - **Mobile-First & Micro-animaciones**: 100% responsivo para celulares, tablets y computadoras, con sombras suaves, efectos glow y transiciones refinadas.

- **[`script.js`](file:///c:/Users/lilia/OneDrive/Escritorio/bomberos-web/script.js)**:
  - **Menú Móvil Hamburguesa**: Apertura y cierre fluido y accesible.
  - **Contadores con IntersectionObserver**: Números animados automáticos al hacer scroll hasta la sección de estadísticas.
  - **Pestañas de Prevención**: Alternancia instantánea entre los paneles de prevención con soporte de navegación por teclado.
  - **Generador Inteligente de WhatsApp**: Modal interactivo que pre-configura el mensaje según la acción elegida (*Socio*, *Rifa*, *Cadetes*, *Donación*, *Historia* o *Consulta General*) y abre el chat directamente con la Secretaría del cuartel.
  - **Copiado de Alias Bancario**: Copia de un clic al portapapeles con notificación Toast.

---

## 🛠️ Guía de Configuración Rápida

### 1. ¿Cómo cambiar el número de WhatsApp oficial?
El número telefónico al cual se envían los mensajes desde el modal está centralizado en una única constante.
- Abrí el archivo **[`script.js`](file:///c:/Users/lilia/OneDrive/Escritorio/bomberos-web/script.js)**.
- Andá exactamente a la **Línea 241**:
  ```javascript
  const WHATSAPP_PHONE = '5492325442020';
  ```
- Reemplazá `'5492325442020'` por el número de WhatsApp que desees (en formato internacional, sin signos `+` ni guiones. Por ejemplo: `5492325123456`).

---

### 2. Integración de Fotografías Reales del Cuartel y la Ciudad
El sitio utiliza al 100% las fotografías reales y de archivo institucional ubicadas en la carpeta local [`./img/`](file:///c:/Users/lilia/OneDrive/Escritorio/bomberos-web/img):
- **Banner Panorámico Ciudad**: `image_1.png` (Palacio Municipal) y `image_2.png` (Monumento Plaza San Martín).
- **Hero Card (Postal Principal)**: `image_3.png` (Fachada nocturna de Guardia Central 112 iluminada).
- **Parque Automotor**: Móvil 32 Cisterna Volvo (`480310899...`), Móvil 30 Ranger 4x4 (`481024490...`), ataque a incendio estructural (`71469050...`) y despliegue forestal masivo (`475189871...`).
- **Escuela de Cadetes "Cdte. Mayor Rubén Denari"**: Escudo oficial Nº 112 (`496544702...`), prácticas con manguera (`481313802...`) y dotación en hangar (`6e68f406...`).
- **Archivo Histórico (1968 - 2026)**: Fundadores de 1968 (`03d3d2f3...`), primera autobomba Mercedes-Benz (`ee2bbe7c...`), festejo 25º Aniversario (`fb64d457...`) y Cuerpo Activo actual BVSAG (`483742743...`).

---

## 📞 Datos Institucionales Verificados (Relevamiento Oficial)
- **Asociación de Bomberos Voluntarios de San Andrés de Giles**
- **Fundación:** 19 de Julio de 1968 (Impulsado por el Club de Leones, escribano Luca y padrinazgo de Bomberos de Luján).
- **Jefatura del Cuerpo Activo:** Darío Boveri (Jefe del Cuerpo Activo, ingresó en 1981 a los 12 años) y Diego (Segundo Jefe).
- **Lema Doctrinario:** *"Primero el bombero, segundo el bombero y tercero el bombero: trabajar con frialdad técnica y seguridad extrema para poder salvar vidas."*
- **Dotación:** 58 Efectivos en Cuerpo Activo, 4 Aspirantes y 15 Cadetes.
- **Flota Operativa:** 12 Unidades (+1 forestal en arribo).
- **Cuartel Central:** San Martín Nº 80 / Moreno 338, San Andrés de Giles (CP 6720), Buenos Aires.
- **Emergencias 24/7:** Línea **100** | **911** | **(02325) 442020** | **(02325) 440143**
- **Gestión Dual:** Socios Activos (Cuerpo Activo operativo) y Socios Protectores (Consejo Directivo administración PyME y Rifa Anual con sorteo Auto 0 km).

