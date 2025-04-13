// DOM Elements
const pages = {
  home: document.getElementById('homePage'),
  event: document.getElementById('eventPage'),
  confirm: document.getElementById('confirmationPage'),
  moodboard: document.getElementById('moodBoardPage')
};

// Theme images configuration
const themeImages = {
  modern: [
    "https://img.freepik.com/free-photo/3d-rendering-seminar-meeting-banquet-hall-room_105762-1773.jpg",
    "https://i0.wp.com/www.weddingforward.com/wp-content/uploads/2019/03/minimalist-wedding-decor-featured.jpg",
    "https://i0.wp.com/www.weddingforward.com/wp-content/uploads/2023/07/minimalist-wedding-decor-dark-chairs-for-guests-in-the-white-temple-goodseedfloral.jpg",
    "https://onefabday.com/wp-content/uploads/2022/07/f8d266b50bd51aa7982517dc0acf91f3.jpg"
  ],
  rustic: [
    "https://img.freepik.com/free-photo/photorealistic-wedding-venue-with-intricate-decor-ornaments_23-2151481538.jpg",
    "https://cdn0.hitched.co.uk/article/3809/original/1280/jpg/129083-silchester-farm.jpeg",
    "https://www.shutterstock.com/shutterstock/videos/3678706339/thumb/1.jpg",
    "https://assets.minted.com/image/upload/f_auto,q_auto/v1679421623/Minted_Onsite_Assets/2023/LP/Wedding/Rustic_Image2.jpg"
  ],
  corporate: [
    "https://thumbs.dreamstime.com/b/luxurious-corporate-event-featuring-elegant-floral-arrangements-white-roses-lilies-round-tables-high-end-decor-359679100.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz64ZyMB5SksALRESDk5QTT9cIyRXjHiSyAA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIZe0Gr0YIS-pfW4Ehj_wzLGYi9kcmiGoO2w&s",
    "https://revenue-hub.com/wp-content/uploads/2018/12/hotel-wedding-venue.jpg"
  ],
  tropical: [
    "https://notthathigh.com/cdn/shop/articles/NTH_tropical-themed-reception.jpg?v=1686677010",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSswk_IWmnuc6XJpcT8BM_PBtFvzcXA3vzqBA&s",
    "https://thumbs.dreamstime.com/b/beach-bar-surfboards-tropical-plants-creating-perfect-setting-cocktail-hour-vibe-high-quality-illustration-320244065.jpg",
    "https://i.pinimg.com/736x/57/59/1d/57591dddc3504979a235a42336405afb.jpg"
  ],
  vintage: [
    "https://cdn0.weddingwire.in/vendor/2490/3_2/960/jpg/wedding-planners-vintage-velvet-weddings-and-events-wedding-decor-6_15_412490-165497158519812.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqaX_Ap_Xd-nbpBqQI1Yvc-0UGe4NyvlRTw&s",
    "https://cdn.shopify.com/s/files/1/1552/7691/files/retro-theme-party-10_600x600.jpg",
    "https://cdn.shopify.com/s/files/1/1552/7691/files/retro-theme-party-9_600x600.jpg"
  ],
  dark: [
    "https://i.pinimg.com/564x/a7/1f/c4/a71fc4781077df7a82d6623cc9fc9e62.jpg",
    "https://images.squarespace-cdn.com/content/v1/5ed0e4ec2ba91b2099f16c36/6c4cb964-222c-4021-9cfb-82561fe8662f/Modern+Autumn+floral+inspiration.jpeg",
    "https://i.pinimg.com/564x/c3/4a/70/c34a7093de1ec0a7ea51982ed8e7ecf8.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaFpQaQF8ZGQnFD38vXYrB2l_tu6cGPpx1jsiB7L2qYv0hEE_XFpYCvHQwe7HyNhAC3I&usqp=CAU"
  ]
};

// Navigation Elements
const nav = {
  homeBtn: document.getElementById('homeLink'),
  homeNav: document.getElementById('homeNav'),
  createEventBtn: document.getElementById('createEventBtn'),
  createEventNav: document.getElementById('createEventNav'),
  saveEventBtn: document.getElementById('saveEventBtn'),
  cancelEventBtn: document.getElementById('cancelEventBtn'),
  createMoodBoardBtn: document.getElementById('createMoodBoardBtn'),
  backToHomeBtn: document.getElementById('backToHomeBtn'),
  saveMoodBoardBtn: document.getElementById('saveMoodBoardBtn'),
  backToDashboardBtn: document.getElementById('backToDashboardBtn')
};

// Form Elements
const forms = {
  eventName: document.getElementById('eventName'),
  eventDate: document.getElementById('eventDate'),
  eventLocation: document.getElementById('eventLocation'),
  eventType: document.getElementById('eventType')
};

// Mood Board Elements
const moodBoard = {
  uploadArea: document.getElementById('uploadArea'),
  imageUpload: document.getElementById('imageUpload'),
  imageGrid: document.getElementById('imageGrid')
};

// Current state
let currentEvent = null;
let currentImages = [];

// Initialize the app
function init() {
  showPage('home');
  setupEventListeners();
}

// Show specific page
function showPage(page) {
  Object.values(pages).forEach(p => p.style.display = 'none');
  pages[page].style.display = page === 'home' ? 'flex' : 'block';
  window.scrollTo(0, 0);
}

// Set up all event listeners
function setupEventListeners() {
  // Navigation
  nav.homeBtn.addEventListener('click', () => showPage('home'));
  nav.homeNav.addEventListener('click', () => showPage('home'));
  nav.createEventBtn.addEventListener('click', () => showPage('event'));
  nav.createEventNav.addEventListener('click', () => showPage('event'));
  
  // Event Form
  nav.saveEventBtn.addEventListener('click', saveEvent);
  nav.cancelEventBtn.addEventListener('click', () => showPage('home'));
  
  // Confirmation Page
  nav.createMoodBoardBtn.addEventListener('click', () => showPage('moodboard'));
  nav.backToHomeBtn.addEventListener('click', () => showPage('home'));
  
  // Mood Board
  moodBoard.uploadArea.addEventListener('click', () => moodBoard.imageUpload.click());
  moodBoard.imageUpload.addEventListener('change', handleImageUpload);
  nav.saveMoodBoardBtn.addEventListener('click', saveMoodBoard);
  nav.backToDashboardBtn.addEventListener('click', () => showPage('confirm'));
}

// Save event function
function saveEvent() {
  if (!forms.eventName.value || !forms.eventDate.value || 
      !forms.eventLocation.value || !forms.eventType.value) {
      alert('Please fill in all fields');
      return;
  }    

  currentEvent = {
      name: forms.eventName.value,
      date: forms.eventDate.value,
      location: forms.eventLocation.value,
      type: forms.eventType.value
  };

  console.log('Event saved:', currentEvent);
  showPage('confirm');
}

// Handle image upload
function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  
  const spinner = document.getElementById('uploadSpinner');
  const status = document.getElementById('uploadStatus');
  const uploadArea = document.getElementById('uploadArea');
  
  // Show loading state
  spinner.classList.add('active');
  uploadArea.classList.add('uploading');
  status.textContent = `Uploading ${files.length} file(s)...`;
  
  let uploadCount = 0;
  let successfulUploads = 0;
  
  files.forEach(file => {
      if (!file.type.startsWith('image/')) {
          uploadCount++;
          return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
          currentImages.push(event.target.result);
          successfulUploads++;
          uploadCount++;
          status.textContent = `Uploading ${uploadCount}/${files.length}...`;
          
          if (uploadCount === files.length) {
              finishUpload();
          }
      };
      reader.onerror = () => {
          uploadCount++;
          status.textContent = `Error uploading ${file.name}`;
          if (uploadCount === files.length) {
              finishUpload();
          }
      };
      reader.readAsDataURL(file);
  });
  
  function finishUpload() {
      spinner.classList.remove('active');
      uploadArea.classList.remove('uploading');
      status.textContent = successfulUploads > 0 ? 
          (files.length > 1 ? 
              `${successfulUploads} images uploaded successfully!` :
              'Image uploaded successfully!') :
          'No valid images were uploaded';
      renderImages();
      setTimeout(() => status.textContent = '', 3000);
  }
}
// Render images to grid
function renderImages() {
  moodBoard.imageGrid.innerHTML = '';
  currentImages.forEach((imgSrc, index) => {
      const imgElement = document.createElement('div');
      imgElement.className = 'image-item';
      imgElement.innerHTML = `
          <img src="${imgSrc}" alt="Mood board image">
          <button class="remove-image" data-index="${index}">×</button>
      `;
      moodBoard.imageGrid.appendChild(imgElement);
      
      // Add remove functionality
      imgElement.querySelector('.remove-image').addEventListener('click', (e) => {
          e.stopPropagation();
          currentImages.splice(index, 1);
          renderImages();
      });
  });
}

// Save mood board
function saveMoodBoard() {
  if (currentImages.length === 0) {
      alert('Please add at least one image');
      return;
  }

  const moodBoardData = {
      eventId: currentEvent ? currentEvent.name : 'Untitled Event',
      images: currentImages
  };

  console.log('Mood board saved:', moodBoardData);
  alert('Mood board saved successfully!');
  showPage('confirm');
}

// Theme data with base64 placeholder images
const themes = {
  modern: [
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]"
  ],
  romantic: [
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]",
      "data:image/svg+xml;base64,[...]"
  ]
};

// Track deleted preset images
const deletedPresets = {
  modern: [],
  romantic: []
};

// Theme selection
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', function() {
      const theme = this.dataset.theme;
      
      // Update UI
      document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      
      // Load theme
      loadTheme(theme);
  });
});

// Improved theme loading with image preloading
function loadTheme(theme) {
  if (theme === 'custom') {
      currentImages = [];
      renderImages();
      return;
  }

  showLoading(true);
  currentImages = [];
  const imagesToLoad = themeImages[theme].filter(img => 
      !deletedPresets[theme]?.includes(img)
  );

  let loadedCount = 0;
  
  imagesToLoad.forEach(imgUrl => {
      const img = new Image();
      img.onload = () => {
          loadedCount++;
          currentImages.push(imgUrl);
          if (loadedCount === imagesToLoad.length) {
              showLoading(false);
              renderImages();
          }
      };
      img.onerror = () => {
          loadedCount++;
          console.warn(`Failed to load image: ${imgUrl}`);
          if (loadedCount === imagesToLoad.length) {
              showLoading(false);
              renderImages();
          }
      };
      img.src = imgUrl;
  });
}

function showLoading(show) {
  const loader = document.getElementById('uploadSpinner');
  if (show) {
      loader.classList.add('active');
  } else {
      loader.classList.remove('active');
  }
}

// Initialize image loading for theme previews
document.querySelectorAll('.theme-preview img').forEach(img => {
  const tempImg = new Image();
  tempImg.onload = () => {
      img.classList.add('loaded');
  };
  tempImg.onerror = () => {
      img.classList.add('error');
  };
  tempImg.src = img.src;
});

// Modified renderImages function
function renderImages() {
  moodBoard.imageGrid.innerHTML = '';
  moodBoard.imageGrid.className = 'image-grid masonry-grid';
  
  currentImages.forEach((imgSrc, index) => {
      const isPreset = Object.values(themes).flat().includes(imgSrc);
      const imgElement = document.createElement('div');
      imgElement.className = `masonry-item ${isPreset ? 'preset' : ''}`;
      imgElement.style.gridRowEnd = `span ${Math.floor(Math.random() * 6) + 4}`;
      
      imgElement.innerHTML = `
          <img src="${imgSrc}" alt="Mood board image">
          <button class="remove-image" data-index="${index}">×</button>
          ${isPreset ? '<button class="undo-btn">Undo</button>' : ''}
      `;
      
      moodBoard.imageGrid.appendChild(imgElement);
      
      // Remove functionality
      imgElement.querySelector('.remove-image').addEventListener('click', (e) => {
          e.stopPropagation();
          if (isPreset) {
              const theme = findThemeForImage(imgSrc);
              deletedPresets[theme].push(imgSrc);
          }
          currentImages.splice(index, 1);
          renderImages();
      });
      
      // Undo functionality for presets
      const undoBtn = imgElement.querySelector('.undo-btn');
      if (undoBtn) {
          undoBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              const theme = findThemeForImage(imgSrc);
              deletedPresets[theme] = deletedPresets[theme].filter(img => img !== imgSrc);
              loadTheme(theme);
          });
      }
  });
}

function findThemeForImage(imgSrc) {
  for (const theme in themes) {
      if (themes[theme].includes(imgSrc)) {
          return theme;
      }
  }
  return null;
}

// PNG Export Functionality
document.getElementById('exportPngBtn').addEventListener('click', exportAsPng);

async function exportAsPng() {
  const overlay = createExportOverlay();
  document.body.appendChild(overlay);
  
  try {
      const grid = document.querySelector('.masonry-grid');
      const items = Array.from(grid.querySelectorAll('.masonry-item'));
      
      // Create a clone to calculate positions without viewport constraints
      const gridClone = grid.cloneNode(true);
      gridClone.style.visibility = 'hidden';
      gridClone.style.position = 'absolute';
      gridClone.style.top = '0';
      gridClone.style.left = '0';
      gridClone.style.width = `${grid.offsetWidth}px`;
      document.body.appendChild(gridClone);
      
      // Wait for browser to render clone
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const canvas = document.createElement('canvas');
      canvas.width = gridClone.offsetWidth;
      canvas.height = gridClone.offsetHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = getComputedStyle(grid).backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw each item
      await Promise.all(items.map((item, index) => {
          const cloneItem = gridClone.children[index];
          const img = item.querySelector('img');
          const rect = cloneItem.getBoundingClientRect();
          
          return drawImageOnCanvas(
              ctx, 
              img, 
              rect.left, 
              rect.top, 
              rect.width, 
              rect.height,
              getComputedStyle(item).borderRadius
          );
      }));
      
      document.body.removeChild(gridClone);
      
      // Show preview
      const previewImg = overlay.querySelector('.export-preview');
      previewImg.src = canvas.toDataURL('image/png');
      overlay.classList.add('active');
      
      // Download handlers
      overlay.querySelector('#confirmExport').onclick = () => {
          const link = document.createElement('a');
          link.download = `moodboard-${new Date().toISOString().slice(0,10)}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
      };
      
  } catch (error) {
      console.error('Export failed:', error);
      alert('Could not generate PNG. Please try again.');
      const overlay = document.querySelector('.export-overlay');
      if (overlay) overlay.remove();
  }
}

function drawImageOnCanvas(ctx, img, x, y, width, height, borderRadius = '8px') {
  return new Promise((resolve) => {
      const radius = parseInt(borderRadius) || 8;
      const tempImg = new Image();
      tempImg.crossOrigin = 'anonymous';
      
      tempImg.onload = () => {
          // Create clipping path with rounded corners
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.save();
          ctx.clip();
          
          // Draw image with shadow
          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowBlur = 15;
          ctx.shadowOffsetY = 5;
          ctx.drawImage(tempImg, x, y, width, height);
          
          ctx.restore();
          resolve();
      };
      
      tempImg.onerror = () => {
          // Draw placeholder if image fails to load
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(x, y, width, height);
          ctx.fillStyle = '#999';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Image not available', x + width/2, y + height/2);
          resolve();
      };
      
      tempImg.src = img.src;
  });
}

function createExportOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'export-overlay';
  overlay.innerHTML = `
      <h3>Preview Your Mood Board</h3>
      <img class="export-preview" alt="Mood Board Preview">
      <div class="export-actions">
          <button class="secondary-button" id="cancelExport">Cancel</button>
          <button class="primary-button" id="confirmExport">Download PNG</button>
      </div>
  `;
  
  // Close on ESC key
  document.addEventListener('keydown', function closeOnEscape(e) {
      if (e.key === 'Escape') overlay.remove();
      document.removeEventListener('keydown', closeOnEscape);
  });
  
  // Zoom preview on click
  overlay.querySelector('.export-preview').onclick = function() {
      this.classList.toggle('zoomed');
  };
  
  overlay.querySelector('#cancelExport').addEventListener('click', () => {
      overlay.remove();
  });
  
  return overlay;
}
function calculateCanvasSize(images, padding) {
  let totalHeight = padding;
  const maxWidth = Math.min(2000, window.innerWidth - padding*2);
  
  images.forEach(img => {
      const ratio = img.naturalWidth / img.naturalHeight;
      const imgHeight = maxWidth / ratio;
      totalHeight += imgHeight + padding;
  });
  
  return {
      width: maxWidth + padding*2,
      height: totalHeight
  };
}
// Initialize the app
init();