# Immersive Portfolio Website

A modern, responsive portfolio website with immersive design elements, smooth animations, and interactive features.

## Features

- 🎨 **Immersive Design**: Modern gradient backgrounds, floating cards, and particle effects
- 📱 **Responsive**: Fully responsive design that works on all devices
- ✨ **Smooth Animations**: Scroll-triggered animations and hover effects
- 🎯 **Interactive Elements**: Form handling, smooth scrolling, and dynamic content
- 🌟 **Modern UI**: Clean, professional design with excellent UX
- ⚡ **Fast Performance**: Optimized code for smooth performance

## Sections

1. **Hero Section**: Eye-catching introduction with animated elements
2. **About Section**: Personal information with statistics
3. **Projects Section**: Showcase of your work with technology tags
4. **Skills Section**: Display of your technical skills
5. **Contact Section**: Contact form and social media links

## Customization Guide

### Personal Information

1. **Update your name and title** in `index.html`:
   ```html
   <span class="highlight">Your Name</span>
   <span>Creative Developer</span>
   ```

2. **Update contact information** in the contact section:
   ```html
   <p>your.email@example.com</p>
   <p>+1 (555) 123-4567</p>
   ```

3. **Update social media links**:
   ```html
   <a href="your-github-url"><i class="fab fa-github"></i></a>
   <a href="your-linkedin-url"><i class="fab fa-linkedin"></i></a>
   ```

### Projects

Replace the sample projects with your own:

1. **Update project titles and descriptions**
2. **Change technology tags** to match your project stack
3. **Add your project links** (live demo and source code)
4. **Replace icons** with relevant FontAwesome icons

### Skills

Update the skills section with your actual skills:

1. **Frontend skills**: HTML, CSS, JavaScript, React, etc.
2. **Backend skills**: Node.js, Python, databases, etc.
3. **Tools**: Git, Docker, AWS, etc.

### Colors and Styling

The website uses a modern color scheme. You can customize it in `styles.css`:

- **Primary Blue**: `#2563eb`
- **Gradient Colors**: `#667eea` to `#764ba2`
- **Accent Gold**: `#ffd700`

### Images

Replace placeholder elements with your actual images:

1. **Profile picture**: Replace the user icon in the about section
2. **Project screenshots**: Replace the icons in project cards
3. **Background images**: Add custom background images

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Download or clone** the files to your local machine
2. **Open `index.html`** in your web browser
3. **Customize** the content as described above
4. **Deploy** to your preferred hosting service

## Deployment Options

### GitHub Pages
1. Create a new repository on GitHub
2. Upload your files
3. Go to Settings > Pages
4. Select source branch and save

### Netlify
1. Drag and drop your folder to Netlify
2. Your site will be live instantly
3. Connect to your Git repository for automatic updates

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Optimize images** before adding them
2. **Minify CSS and JS** for production
3. **Use a CDN** for external resources
4. **Enable compression** on your hosting service

## Customization Examples

### Adding a New Section

```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">New Section</h2>
        <!-- Your content here -->
    </div>
</section>
```

### Adding Custom Animations

```css
.custom-animation {
    animation: customKeyframe 2s ease-in-out infinite;
}

@keyframes customKeyframe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
```

### Adding New Skills

```html
<div class="skill-item">
    <i class="fab fa-your-icon"></i>
    <span>Your Skill</span>
</div>
```

## Support

If you need help customizing your portfolio:

1. Check the comments in the code files
2. Refer to the customization guide above
3. Look up FontAwesome icons for new skill icons
4. Use browser developer tools to experiment with styles

## License

This portfolio template is free to use for personal and commercial projects.

---

**Happy coding! 🚀** 

<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div> 

<form class="contact-form" id="contact-form">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <input type="text" name="subject" placeholder="Subject" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
  <button type="submit">Send Message</button>
</form> 

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script src="script.js"></script>
</body>
</html> 