class StegoCloud {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.initializePage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('upload.html')) return 'upload';
        if (path.includes('access.html')) return 'access';
        return 'home';
    }

    initializePage() {
        switch (this.currentPage) {
            case 'upload':
                this.initializeUploadPage();
                break;
            case 'access':
                this.initializeAccessPage();
                break;
            case 'home':
                this.initializeHomePage();
                break;
        }
    }

    initializeHomePage() {
        console.log('Initializing home page...');
        window.EventListeners.setupNavigationEventListeners();
        window.EventListeners.setupFeatureCardHoverEffects();
        window.EventListeners.setupButtonClickEffects();
        window.EventListeners.setupSimpleStepAnimations();
        window.EventListeners.setupShieldAnimation();
        console.log('StegoCloud Home Page initialized with interactive features');
    }

    initializeUploadPage() {
        this.setupUploadEventListeners();
        this.setupDragAndDrop();
        this.setupNavigationEventListeners();
        this.setupButtonClickEffects();
        this.enhanceUploadInteractions();
        this.enhanceFormValidation();
        this.setupKeyboardNavigation();
        this.setupTooltips();
        console.log('StegoCloud Upload Page initialized');
    }

    initializeAccessPage() {
        this.setupAccessEventListeners();
        this.setupImagePreview();
        this.setupNavigationEventListeners();
        this.setupButtonClickEffects();
        this.enhanceAccessInteractions();
        this.enhanceFormValidation();
        this.setupKeyboardNavigation();
        this.setupTooltips();
        console.log('StegoCloud Access Page initialized');
    }

    // Upload Page Methods
    setupUploadEventListeners() {
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const uploadBtn = document.getElementById('uploadBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        const downloadStegoBtn = document.getElementById('downloadStegoBtn');
        const uploadAnotherBtn = document.getElementById('uploadAnotherBtn');

        if (uploadArea) {
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e.target.files[0]);
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                this.handleUpload();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.resetUploadForm();
            });
        }

        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                this.copyToClipboard();
            });
        }

        if (downloadStegoBtn) {
            downloadStegoBtn.addEventListener('click', () => {
                this.downloadStegoImage();
            });
        }

        if (uploadAnotherBtn) {
            uploadAnotherBtn.addEventListener('click', () => {
                this.resetUploadForm();
            });
        }

        // Browse link click
        const browseLink = document.querySelector('.browse-link');
        if (browseLink) {
            browseLink.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });
        }
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        if (!uploadArea) return;

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];

        if (!allowedTypes.includes(file.type)) {
            this.showToast('Please select a valid file type (PDF, DOC, DOCX, TXT, JPG, PNG)', 'error');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }

        // Display file info
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const uploadDetails = document.getElementById('uploadDetails');

        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = this.formatFileSize(file.size);
        if (uploadDetails) uploadDetails.style.display = 'block';

        // Store file for upload
        this.selectedFile = file;
    }

    async handleUpload() {
        if (!this.selectedFile) {
            this.showToast('Please select a file to upload', 'error');
            return;
        }

        this.showLoading(true);

        try {
            // Simulate upload process
            await this.simulateUpload();

            // Generate mock results
            const documentLink = this.generateDocumentLink();
            const stegoImageData = this.generateMockStegoImage();

            // Display results
            this.showUploadResults(documentLink, stegoImageData);

            this.showToast('Document uploaded and encrypted successfully!', 'success');

        } catch (error) {
            this.showToast('Upload failed. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    showUploadResults(documentLink, stegoImageData) {
        // Hide upload section
        const uploadSection = document.querySelector('.upload-section');
        if (uploadSection) uploadSection.style.display = 'none';
        
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }

        // Set the generated link
        const generatedLink = document.getElementById('generatedLink');
        if (generatedLink) {
            generatedLink.value = documentLink;
        }

        // Store stego image data for download
        this.stegoImageData = stegoImageData;
    }

    resetUploadForm() {
        const uploadSection = document.querySelector('.upload-section');
        const resultsSection = document.getElementById('resultsSection');
        const uploadDetails = document.getElementById('uploadDetails');
        const fileInput = document.getElementById('fileInput');

        if (uploadSection) uploadSection.style.display = 'block';
        if (resultsSection) resultsSection.style.display = 'none';
        if (uploadDetails) uploadDetails.style.display = 'none';
        if (fileInput) fileInput.value = '';

        this.selectedFile = null;
        this.stegoImageData = null;
    }

    // Access Page Methods
    setupAccessEventListeners() {
        const accessBtn = document.getElementById('accessBtn');
        const clearFormBtn = document.getElementById('clearFormBtn');
        const changeImageBtn = document.getElementById('changeImageBtn');
        const downloadDecryptedBtn = document.getElementById('downloadDecryptedBtn');
        const accessAnotherBtn = document.getElementById('accessAnotherBtn');

        if (accessBtn) {
            accessBtn.addEventListener('click', () => {
                this.handleAccess();
            });
        }

        if (clearFormBtn) {
            clearFormBtn.addEventListener('click', () => {
                this.clearAccessForm();
            });
        }

        if (changeImageBtn) {
            changeImageBtn.addEventListener('click', () => {
                this.changeStegoImage();
            });
        }

        if (downloadDecryptedBtn) {
            downloadDecryptedBtn.addEventListener('click', () => {
                this.downloadDecryptedFile();
            });
        }

        if (accessAnotherBtn) {
            accessAnotherBtn.addEventListener('click', () => {
                this.resetAccessForm();
            });
        }

        // Image upload area
        const imageUploadArea = document.getElementById('imageUploadArea');
        const stegoImageInput = document.getElementById('stegoImageInput');

        if (imageUploadArea) {
            imageUploadArea.addEventListener('click', () => {
                stegoImageInput.click();
            });
        }

        if (stegoImageInput) {
            stegoImageInput.addEventListener('change', (e) => {
                this.handleStegoImageSelect(e.target.files[0]);
            });
        }
    }

    setupImagePreview() {
        // Add drag and drop for image upload area
        const imageUploadArea = document.getElementById('imageUploadArea');
        if (!imageUploadArea) return;

        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.classList.add('dragover');
        });

        imageUploadArea.addEventListener('dragleave', () => {
            imageUploadArea.classList.remove('dragover');
        });

        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleStegoImageSelect(files[0]);
            }
        });
    }

    handleStegoImageSelect(file) {
        if (!file) return;

        // Validate image type
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedImageTypes.includes(file.type)) {
            this.showToast('Please select a valid image file (JPG, PNG)', 'error');
            return;
        }

        this.selectedStegoImage = file;
        this.showImagePreview(file);
        this.showToast('Stego-image selected successfully', 'success');
    }

    showImagePreview(file) {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        const imageName = document.getElementById('imageName');
        const imageSize = document.getElementById('imageSize');

        if (imageUploadArea) imageUploadArea.style.display = 'none';
        if (imagePreview) imagePreview.style.display = 'block';

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            if (previewImage) previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        if (imageName) imageName.textContent = file.name;
        if (imageSize) imageSize.textContent = this.formatFileSize(file.size);
    }

    changeStegoImage() {
        const stegoImageInput = document.getElementById('stegoImageInput');
        if (stegoImageInput) {
            stegoImageInput.click();
        }
    }

    async handleAccess() {
        const documentLink = document.getElementById('documentLink');
        const stegoImage = this.selectedStegoImage;

        if (!documentLink || !documentLink.value.trim()) {
            this.showToast('Please enter a document link', 'error');
            return;
        }

        if (!stegoImage) {
            this.showToast('Please upload the stego-image', 'error');
            return;
        }

        this.showLoading(true);

        try {
            // Simulate decryption process
            await this.simulateDecryption();

            // Mock successful access
            this.showAccessResults();
            this.showToast('Document decrypted successfully!', 'success');

        } catch (error) {
            this.showToast('Failed to decrypt document. Please check your link and stego-image.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    showAccessResults() {
        // Hide access section
        const accessSection = document.querySelector('.access-section');
        if (accessSection) accessSection.style.display = 'none';
        
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }

        // Set mock file info
        const decryptedFileName = document.getElementById('decryptedFileName');
        const decryptedFileSize = document.getElementById('decryptedFileSize');

        if (decryptedFileName) {
            decryptedFileName.textContent = this.selectedFile ? this.selectedFile.name : 'document.pdf';
        }
        if (decryptedFileSize) {
            decryptedFileSize.textContent = this.selectedFile ? this.formatFileSize(this.selectedFile.size) : '2.5 MB';
        }
    }

    clearAccessForm() {
        const documentLink = document.getElementById('documentLink');
        const stegoImageInput = document.getElementById('stegoImageInput');
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');

        if (documentLink) documentLink.value = '';
        if (stegoImageInput) stegoImageInput.value = '';
        if (imageUploadArea) imageUploadArea.style.display = 'block';
        if (imagePreview) imagePreview.style.display = 'none';

        this.selectedStegoImage = null;
    }

    resetAccessForm() {
        this.clearAccessForm();
        
        const accessSection = document.querySelector('.access-section');
        const resultsSection = document.getElementById('resultsSection');

        if (accessSection) accessSection.style.display = 'block';
        if (resultsSection) resultsSection.style.display = 'none';
    }

    downloadDecryptedFile() {
        // Create a mock file download
        const fileName = this.selectedFile ? this.selectedFile.name : 'decrypted_document.pdf';
        const blob = new Blob(['Mock decrypted file content'], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        this.showToast('Document downloaded successfully!', 'success');
    }

    // Utility Methods
    async simulateUpload() {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    async simulateDecryption() {
        // Simulate decryption delay
        return new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
    }

    generateDocumentLink() {
        // Generate a mock document link
        const randomId = Math.random().toString(36).substring(2, 15);
        return `https://stegocloud.com/document/${randomId}`;
    }

    generateMockStegoImage() {
        // Create a mock stego-image (in real implementation, this would be generated server-side)
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 300);

        // Add some text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('StegoCloud', 200, 140);
        ctx.font = '16px Inter';
        ctx.fillText('Encryption Key Embedded', 200, 170);
        ctx.font = '12px Inter';
        ctx.fillText('Keep this image safe!', 200, 190);

        // Add some decorative elements
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(200, 150, 80, 0, 2 * Math.PI);
        ctx.stroke();

        return canvas.toDataURL('image/png');
    }

    copyToClipboard() {
        const linkInput = document.getElementById('generatedLink');
        if (!linkInput) return;

        linkInput.select();
        linkInput.setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand('copy');
            this.showToast('Link copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(linkInput.value).then(() => {
                this.showToast('Link copied to clipboard!', 'success');
            }).catch(() => {
                this.showToast('Failed to copy link', 'error');
            });
        }
    }

    downloadStegoImage() {
        if (!this.stegoImageData) {
            this.showToast('No stego-image available', 'error');
            return;
        }

        // Create download link
        const link = document.createElement('a');
        link.href = this.stegoImageData;
        link.download = 'stego-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showToast('Stego-image downloaded!', 'success');
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = show ? 'flex' : 'none';
        }
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add class to enable CSS animations
    document.body.classList.add('js-loaded');
    
    new StegoCloud();
});

// Add some additional utility functions for development/testing
window.StegoCloudUtils = {
    // Function to reset forms (useful for testing)
    resetAllForms: () => {
        const app = new StegoCloud();
        if (app.currentPage === 'upload') {
            app.resetUploadForm();
        } else if (app.currentPage === 'access') {
            app.resetAccessForm();
        }
    },

    // Function to simulate different scenarios
    simulateError: () => {
        const app = new StegoCloud();
        app.showToast('This is a simulated error message', 'error');
    },

    // Function to show demo data
    loadDemoData: () => {
        const documentLink = document.getElementById('documentLink');
        if (documentLink) {
            documentLink.value = 'https://stegocloud.com/document/demo123';
        }
    },

    // Function to get current page
    getCurrentPage: () => {
        const app = new StegoCloud();
        return app.currentPage;
    }
};