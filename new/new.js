// Add to your pages object
pages.sharedAlbum = document.getElementById('sharedAlbumPage');
pages.guestUpload = document.getElementById('guestUploadPage');
pages.viewAlbum = document.getElementById('viewAlbumPage');

// Add to your nav object
nav.createSharedAlbumBtn = document.getElementById('createSharedAlbumBtn');
nav.backToDashboardBtn2 = document.getElementById('backToDashboardBtn2');
nav.printQrBtn = document.getElementById('printQrBtn');
nav.copyLinkBtn = document.getElementById('copyLinkBtn');

// Shared Album State
const sharedAlbum = {
    currentAlbum: null,
    photos: [],
    guestUploads: {}
};

// Initialize QR Code library
const QRCode = window.QRCode;

// Add to your setupEventListeners()
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
    
    // Shared Album
    nav.createSharedAlbumBtn.addEventListener('click', createSharedAlbum);
    nav.backToDashboardBtn2.addEventListener('click', () => showPage('confirm'));
    nav.printQrBtn.addEventListener('click', printQrCode);
    nav.copyLinkBtn.addEventListener('click', copyAlbumLink);
    
    // Guest Upload
    document.getElementById('takePhotoBtn').addEventListener('click', startCamera);
    document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    document.getElementById('captureBtn').addEventListener('click', capturePhoto);
    document.getElementById('cancelCameraBtn').addEventListener('click', stopCamera);
    document.getElementById('submitPhotosBtn').addEventListener('click', submitPhotos);
    document.getElementById('cancelUploadBtn').addEventListener('click', cancelUpload);
    document.getElementById('viewAlbumBtn').addEventListener('click', viewAlbumAsGuest);
    
    // View Album
    document.getElementById('downloadAlbumBtn').addEventListener('click', downloadAlbum);
    document.getElementById('backToEventBtn').addEventListener('click', () => {
        if (sharedAlbum.currentAlbum && sharedAlbum.currentAlbum.isHost) {
            showPage('sharedAlbum');
        } else {
            showPage('home');
        }
    });
    
    // Check URL for album ID
    checkForAlbumInUrl();
}

// Create Shared Album
function createSharedAlbum() {
    if (!currentEvent) {
        alert('No event data found');
        return;
    }
    
    const albumId = generateAlbumId();
    const albumUrl = `${window.location.origin}${window.location.pathname}?album=${albumId}`;
    
    sharedAlbum.currentAlbum = {
        id: albumId,
        eventId: currentEvent.name,
        name: `${currentEvent.name} Photos`,
        date: currentEvent.date,
        location: currentEvent.location,
        url: albumUrl,
        isHost: true,
        created: new Date().toISOString()
    };
    
    // Update UI
    document.getElementById('albumEventName').textContent = currentEvent.name;
    document.getElementById('albumEventDate').textContent = `Date: ${formatDate(currentEvent.date)}`;
    document.getElementById('albumEventLocation').textContent = `Location: ${currentEvent.location}`;
    document.getElementById('albumLink').textContent = albumUrl;
    
    // Generate QR Code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: albumUrl,
        width: 200,
        height: 200,
        colorDark: "#3B82F6",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    showPage('sharedAlbum');
}

// Generate unique album ID
function generateAlbumId() {
    return 'album_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Print QR Code
function printQrCode() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${sharedAlbum.currentAlbum.name} QR Code</title>
                <style>
                    body { text-align: center; padding: 20px; font-family: Arial; }
                    h1 { margin-bottom: 10px; }
                    p { margin-top: 0; color: #666; }
                    img { margin: 20px auto; display: block; }
                </style>
            </head>
            <body>
                <h1>${sharedAlbum.currentAlbum.name}</h1>
                <p>Scan to add photos to the album</p>
                <img src="${document.getElementById('qrcode').querySelector('img').src}" width="300" height="300">
                <p>Event Date: ${formatDate(sharedAlbum.currentAlbum.date)}</p>
                <p>Location: ${sharedAlbum.currentAlbum.location}</p>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Copy Album Link
function copyAlbumLink() {
    navigator.clipboard.writeText(sharedAlbum.currentAlbum.url)
        .then(() => {
            const btn = document.getElementById('copyLinkBtn');
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy';
            }, 2000);
        });
}

// Check URL for album ID
function checkForAlbumInUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('album');
    
    if (albumId) {
        // In a real app, you would fetch album details from your backend
        // For demo purposes, we'll simulate loading an album
        loadAlbumAsGuest(albumId);
    }
}

// Load Album as Guest
function loadAlbumAsGuest(albumId) {
    // Simulate loading album data
    // In a real app, this would come from your backend
    const albumData = {
        id: albumId,
        name: "Sample Event Photos",
        date: "2023-12-25",
        location: "Event Venue",
        isHost: false
    };
    
    sharedAlbum.currentAlbum = albumData;
    
    // Update UI
    document.getElementById('guestAlbumName').textContent = albumData.name;
    document.getElementById('photosRemaining').textContent = 5; // Reset counter
    
    showPage('guestUpload');
}

// Camera Functions
function startCamera() {
    const cameraView = document.getElementById('cameraView');
    const cameraContainer = document.getElementById('cameraContainer');
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraView.srcObject = stream;
            cameraContainer.classList.remove('hidden');
        })
        .catch(err => {
            alert("Could not access camera: " + err.message);
        });
}

function stopCamera() {
    const cameraView = document.getElementById('cameraView');
    if (cameraView.srcObject) {
        cameraView.srcObject.getTracks().forEach(track => track.stop());
    }
    document.getElementById('cameraContainer').classList.add('hidden');
}

function capturePhoto() {
    const cameraView = document.getElementById('cameraView');
    const canvas = document.createElement('canvas');
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
    
    const photoData = canvas.toDataURL('image/jpeg');
    addPhotoToPreview(photoData);
    
    stopCamera();
}

// Handle File Uploads
document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = e.target.files;
    const remaining = parseInt(document.getElementById('photosRemaining').textContent);
    
    if (files.length > remaining) {
        alert(`You can only upload ${remaining} more photos.`);
        return;
    }
    
    Array.from(files).forEach(file => {
        if (!file.type.match('image.*')) {
            alert('Only image files are allowed');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            addPhotoToPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    });
});

// Add Photo to Preview
function addPhotoToPreview(photoData) {
    const remaining = parseInt(document.getElementById('photosRemaining').textContent);
    
    if (remaining <= 0) {
        alert('You have reached your upload limit of 5 photos');
        return;
    }
    
    if (!sharedAlbum.guestUploads[sharedAlbum.currentAlbum.id]) {
        sharedAlbum.guestUploads[sharedAlbum.currentAlbum.id] = [];
    }
    
    sharedAlbum.guestUploads[sharedAlbum.currentAlbum.id].push(photoData);
    
    // Update UI
    document.getElementById('photosRemaining').textContent = remaining - 1;
    
    // Show preview
    const previewContainer = document.getElementById('previewContainer');
    const previewDiv = document.createElement('div');
    previewDiv.className = 'preview-item';
    previewDiv.innerHTML = `
        <img src="${photoData}" alt="Preview">
        <button class="remove-preview">&times;</button>
    `;
    
    previewDiv.querySelector('.remove-preview').addEventListener('click', function() {
        previewDiv.remove();
        const index = sharedAlbum.guestUploads[sharedAlbum.currentAlbum.id].indexOf(photoData);
        if (index > -1) {
            sharedAlbum.guestUploads[sharedAlbum.currentAlbum.id].splice(index, 1);
            document.getElementById('photosRemaining').textContent = remaining;
        }
    });
    
    previewContainer.appendChild(previewDiv);
    document.getElementById('photoPreviews').classList.remove('hidden');
}

// Submit Photos
function submitPhotos() {
    const albumId = sharedAlbum.currentAlbum.id;
    const uploads = sharedAlbum.guestUploads[albumId] || [];
    
    if (uploads.length === 0) {
        alert('Please add at least one photo');
        return;
    }
    
    // In a real app, you would upload to your backend here
    // For demo, we'll just add to the shared album
    if (!sharedAlbum.photos[albumId]) {
        sharedAlbum.photos[albumId] = [];
    }
    
    sharedAlbum.photos[albumId] = sharedAlbum.photos[albumId].concat(uploads);
    sharedAlbum.guestUploads[albumId] = [];
    
    // Show success
    document.getElementById('photoPreviews').classList.add('hidden');
    document.getElementById('uploadSuccess').classList.remove('hidden');
}

// Cancel Upload
function cancelUpload() {
    const albumId = sharedAlbum.currentAlbum.id;
    const uploadCount = sharedAlbum.guestUploads[albumId]?.length || 0;
    
    sharedAlbum.guestUploads[albumId] = [];
    document.getElementById('photosRemaining').textContent = 5;
    document.getElementById('previewContainer').innerHTML = '';
    document.getElementById('photoPreviews').classList.add('hidden');
}

// View Album as Guest
function viewAlbumAsGuest() {
    const albumId = sharedAlbum.currentAlbum.id;
    
    // Update UI
    document.getElementById('viewAlbumTitle').textContent = sharedAlbum.currentAlbum.name;
    
    // Load photos
    const albumPhotos = document.getElementById('albumPhotos');
    albumPhotos.innerHTML = '';
    
    const photos = sharedAlbum.photos[albumId] || [];
    photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.innerHTML = `<img src="${photo}" alt="Album photo">`;
        albumPhotos.appendChild(photoDiv);
    });
    
    document.getElementById('uploadSuccess').classList.add('hidden');
    showPage('viewAlbum');
}

// Download Album
function downloadAlbum() {
    const albumId = sharedAlbum.currentAlbum.id;
    const photos = sharedAlbum.photos[albumId] || [];
    
    if (photos.length === 0) {
        alert('No photos to download');
        return;
    }
    
    // In a real app, you would create a ZIP or similar
    // For demo, we'll just download the first photo
    const link = document.createElement('a');
    link.download = `album_${albumId}_photo.jpg`;
    link.href = photos[0];
    link.click();
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}