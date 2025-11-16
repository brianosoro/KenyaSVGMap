   // Path to your SVG file
    const SVG_FILE = 'kenya.svg';

    // Use the ID codes from your SVG (e.g., "KE-94" for Kilifi)
    const COUNTY_IDS = [
      'KE-39',  // Taita Taveta
      'KE-94',  // Kilifi
      'KE-23',  // Makueni
      'KE-25',  // Marsabit
      'KE-22',  // Machakos
      'KE-13',  // Kiambu
      'KE-16',  // Kisii
      'KE-33',  // Narok
      'KE-02',  // Bomet
      'KE-06',   // Embu
      'KE-15',  // Kirinyaga
      'KE-18',  // Kitui
      'KE-40',  // Tana River
      'KE-36',  // Nyeri
      'KE-17'   // Kisumu
      // Add more county IDs as you require
    ];

    const wrap = document.getElementById('svg-wrap');
    const tooltip = document.getElementById('tooltip');


    fetch(SVG_FILE)
      .then(r => {
        if (!r.ok) throw new Error('Could not load SVG: ' + r.status);
        return r.text();
      })
      .then(svgText => {
        wrap.innerHTML = svgText;

        const svg = wrap.querySelector('svg');
        if (!svg) throw new Error('SVG not found inside file');

        // Find all potential county elements
        const candidates = svg.querySelectorAll('path[id], polygon[id], rect[id], g[id], path.county, polygon.county, g.county');

        let counties = Array.from(candidates);
        if (counties.length === 0) {
          counties = Array.from(svg.querySelectorAll('path, polygon, rect, g'));
        }

        // Log all counties with their IDs and titles for reference
        console.log('=== All Counties with IDs as per the SVG file ===');
        counties.forEach((el, index) => {
          const id = el.id || 'no-id';
          const title = el.getAttribute('title') || 'no-title';
          console.log(`Index ${index}: ID="${id}" Title="${title}"`);
        });
        console.log('=============================');

        counties.forEach((el, index) => {
          const countyId = el.id;
          const title = el.getAttribute('title') || countyId || `County-${index}`;
          el.setAttribute('data-county-name', title);
          el.setAttribute('data-county-id', countyId);

          // Check if this county ID is in the selected list
          const isSelected = COUNTY_IDS.includes(countyId);

          if (!isSelected) {
            // Non-selected counties: not clickable, different styling
            el.style.cursor = 'default';
            el.style.pointerEvents = 'none';
            el.style.opacity = '0.6';
            return; // Skip adding interactive features
          }


          el.classList.add('county');
          el.setAttribute('tabindex', '0');

          el.setAttribute('data-county-name', name);

          // Get the county name for display
          const displayName = el.getAttribute('title') || countyId || `County-${index}`;
          
          // Tooltip on hover
          el.addEventListener('pointerenter', ev => {
            const rect = ev.target.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top) + 'px';
            tooltip.textContent = displayName;
            tooltip.style.display = 'block';
            tooltip.setAttribute('aria-hidden', 'false');
          });

          el.addEventListener('pointermove', ev => {
            tooltip.style.left = (ev.clientX) + 'px';
            tooltip.style.top = (ev.clientY - 12) + 'px';
          });

          el.addEventListener('pointerleave', () => {
            tooltip.style.display = 'none';
            tooltip.setAttribute('aria-hidden', 'true');
          });

          // Click handler
          el.addEventListener('click', e => {
            e.stopPropagation();
            
            // Single selection: clear other selections
            const svgCounties = svg.querySelectorAll('.county');
            svgCounties.forEach(c => c.classList.remove('selected'));

            el.classList.add('selected');


          });

          // Keyboard support
          el.addEventListener('keydown', ev => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              el.click();
            }
          });
        });

        // Log selection events
        window.addEventListener('county-selected', (ev) => {
          console.log('County selected:', ev.detail.name);
        });

      })
      .catch(err => {
        wrap.innerHTML = '<p style="color:crimson;">Failed to load map: ' + err.message + '</p>';
        console.error(err);
      });

    // Click outside to clear selection
    document.addEventListener('click', (e) => {

    });