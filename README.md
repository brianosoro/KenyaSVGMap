# Clickable Kenyan SVG Map

An interactive, **clickable SVG map of Kenya** that can be easily integrated into websites, dashboards, or web apps. Each county is selectable, making it ideal for **data visualization**, **geographic analysis**, or **location-based presentations**.

---

## Features

- **High-quality SVG map of Kenya**  
- **Clickable counties** with custom actions i.e open a county specific report  
- **Lightweight and responsive**  
- **Customizable CSS**  
- **Easy integration**

---

## Use Cases

- Interactive dashboards for analytics  
- Data visualization for Kenyan counties  

---

## Installation

Clone the repository and include the SVG file in your project:
```bash
git clone https://github.com/brianosoro/kenya-clickable-map.git
```

---

## Screenshot

![Clickable Kenya Map](https://github.com/user-attachments/assets/395d5b3c-b5bd-44ff-ad3d-410153541f85)

---

## Usage

## Customization

### Change County Colors
```css
  /* County styling */
    svg .county {
      fill: #4aa832;
      stroke: #4aa832;
      stroke-width: 1.2px;
      transition: fill 150ms ease, stroke 150ms ease, stroke-width 120ms ease;
      cursor: pointer;
      /* FIXED: Changed from 'stroke' to 'all' to make entire county clickable */
      pointer-events: all;
    }

    /* Hover state */
    svg .county:hover {
      stroke: #da251c;
      stroke-width: 2.4px;
      fill: rgba(218,37,28,0.15);
    }

    /* Selected county (clicked) */
    svg .county.selected {
      fill: rgba(218,37,28,0.3);
      stroke: #da251c;
      stroke-width: 2.6px;
    }

    /* Focus (keyboard) */
    svg .county:focus {
      outline: none;
      stroke: #ff9800;
      stroke-width: 2.6px;
      fill: rgba(255,152,0,0.2);
    }

```

---

## Contributing

Contributions are welcome! Anyone should be able to initiate a pull request.

---

## License

MIT License - feel free to use in your projects!

---

## Contact

For questions or suggestions, please open an issue on GitHub.

---

## SVG Map

I got the map from: https://mapsvg.com/maps/kenya