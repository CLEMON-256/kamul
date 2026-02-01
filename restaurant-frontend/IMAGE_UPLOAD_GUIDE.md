# Image Upload Guide for Restaurant App

## 🎯 Overview
This guide shows how to upload images to your restaurant app's API for menu items, categories, and other content.

## 📋 Backend Setup (Django)

### Step 1: Configure Media Settings
```python
# settings.py
import os

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# For production with cloud storage
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

### Step 2: Update Models
```python
# models.py
from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='menu_items/', blank=True, null=True)
    # ... other fields

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    # ... other fields
```

### Step 3: Add Media URLs
```python
# urls.py
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your other URLs
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## 🚀 Frontend Image Upload

### Step 1: Create Image Upload Component
```javascript
// src/components/common/ImageUpload.js
import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, existingImage, label }) => {
    const [preview, setPreview] = useState(existingImage || null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageSelect(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-upload">
            <label className="upload-label">{label}</label>
            <div className="upload-container">
                {preview ? (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" />
                        <button
                            type="button"
                            className="remove-image"
                            onClick={() => {
                                setPreview(null);
                                onImageSelect(null);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="upload-placeholder">
                        <div className="upload-icon">📷</div>
                        <p>Click to upload image</p>
                        <small>JPG, PNG up to 5MB</small>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                />
            </div>
        </div>
    );
};

export default ImageUpload;
```

### Step 2: Image Upload CSS
```css
/* src/components/common/ImageUpload.css */
.image-upload {
    margin-bottom: 1.5rem;
}

.upload-label {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.upload-container {
    position: relative;
    width: 100%;
    max-width: 300px;
}

.file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.upload-placeholder {
    border: 2px dashed var(--border-color);
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    background: var(--bg-light);
    transition: all 0.3s ease;
}

.upload-placeholder:hover {
    border-color: var(--primary-color);
    background: rgba(128, 0, 0, 0.05);
}

.upload-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.upload-placeholder p {
    margin: 0.5rem 0;
    color: var(--text-dark);
}

.upload-placeholder small {
    color: var(--text-light);
}

.image-preview {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}

.image-preview img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}

.remove-image {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(220, 53, 69, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### Step 3: API Service for Image Upload
```javascript
// src/api/services.js
export const uploadAPI = {
    uploadImage: async (file, type = 'menu_item') => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', type);

        const response = await axiosInstance.post('/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    deleteImage: async (imageId) => {
        return axiosInstance.delete(`/upload/${imageId}/`);
    },
};
```

## 📱 Using Image Upload in Forms

### Menu Item Form Example
```javascript
// src/components/menu/MenuItemForm.js
import React, { useState } from 'react';
import ImageUpload from '../common/ImageUpload';
import { uploadAPI, menuAPI } from '../../api/services';

const MenuItemForm = ({ item, onSave }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        description: item?.description || '',
        price: item?.price || '',
        category: item?.category || '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = item?.image;

            // Upload new image if selected
            if (selectedImage) {
                const uploadResult = await uploadAPI.uploadImage(selectedImage, 'menu_item');
                imageUrl = uploadResult.url;
            }

            // Save menu item
            const itemData = {
                ...formData,
                image: imageUrl,
            };

            if (item) {
                await menuAPI.updateMenuItem(item.id, itemData);
            } else {
                await menuAPI.createMenuItem(itemData);
            }

            onSave();
        } catch (error) {
            console.error('Error saving menu item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Item Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
            </div>

            <ImageUpload
                onImageSelect={setSelectedImage}
                existingImage={item?.image}
                label="Item Image"
            />

            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Item'}
            </button>
        </form>
    );
};
```

## 🖼️ Image Display Component

```javascript
// src/components/common/DisplayImage.js
import React, { useState } from 'react';

const DisplayImage = ({ src, alt, className, fallback }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    if (imageError || !src) {
        return (
            <div className={`image-fallback ${className}`}>
                <img src={fallback || '/placeholder-food.jpg'} alt={alt} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={handleImageError}
            loading="lazy"
        />
    );
};

export default DisplayImage;
```

## 📋 Best Practices

### Image Requirements
- **Format**: JPG, PNG, WebP
- **Size**: Maximum 5MB per image
- **Dimensions**: Minimum 800x600px for quality
- **Optimization**: Compress before upload

### File Naming
- Use descriptive names: `grilled-chicken-breast.jpg`
- Avoid spaces: use hyphens instead
- Use lowercase: `chocolate-cake.jpg`

### SEO Optimization
```javascript
// Add alt text and title for SEO
<DisplayImage
    src={item.image}
    alt={`${item.name} - ${item.description}`}
    title={item.name}
    className="menu-item-image"
/>
```

## 🚀 Quick Start

1. **Set up backend** with media configuration
2. **Create upload component** using the provided code
3. **Add to forms** where images are needed
4. **Test upload** with different image types
5. **Optimize images** for better performance

Your restaurant app now has **professional image upload capabilities** for all your menu items and content!
