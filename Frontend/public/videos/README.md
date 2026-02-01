# Video Setup Instructions

## How to Add Your Video

1. **Create the videos folder** (if it doesn't exist):
   ```
   public/videos/
   ```

2. **Add your video file**:
   - Place your video file in `public/videos/`
   - Recommended formats: `.mp4`, `.webm`, `.mov`
   - Recommended name: `restaurant-video.mp4`

3. **Update the video path** in `src/home/MainHeroBanner.jsx`:
   ```jsx
   const videoSrc = '/videos/your-video-filename.mp4';
   ```

## Video Specifications

- **Recommended resolution**: 1920x1080 (Full HD) or higher
- **Aspect ratio**: 16:9 (landscape)
- **File size**: Keep under 50MB for web performance
- **Format**: MP4 (H.264 codec) is most compatible

## Alternative: Use External Video URL

You can also use a video from YouTube, Vimeo, or your own hosting:

```jsx
const videoSrc = 'https://your-video-url.com/video.mp4';
```

## Testing

Once you've added your video:
1. Run `npm run dev`
2. Click the "Watch Our Story" button on the hero section
3. The video player should open with full controls
