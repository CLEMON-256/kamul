# Complete Frontend Code Explanation (React + Vite)

This guide explains the "face" of your application—the Frontend. It handles the images, buttons, and layouts you see on the screen.

---

## 1. App.jsx (The Root)
This is the main "entry point" of your website.
- **Routing**: It uses `react-router-dom` to decide which "Page" to show when you go to `/` (Home) or `/menu`.
- **Global Components**: It puts the `Navbar` at the top and the `Footer` at the bottom of every page automatically.

---

## 2. API Communication (axios.js)
Located in `src/api/axios.js`.
- It acts as a "Phone" that calls your Backend.
- It includes the `baseURL`, so instead of typing `https://yoursite.com/api/menu` every time, we just type `/menu`.

---

## 3. UI Components (The Building Blocks)

### `HomeVideoSection.jsx`
- **Purpose**: Shows the image thumbnail and the "Experience Junior's" title.
- **Logic**: It remembers if the video player should be open (`useState`). When you click the image, it tells the `VideoPlayer` to pop up.

### `VideoPlayer.jsx`
- **Purpose**: A professional video player.
- **`Portals`**: It uses `createPortal` to make sure the video appears on top of the whole website.
- **`Refs`**: Uses `useRef` to directly pause/play the video element.
- **`Effects`**: Uses `useEffect` to listen for keyboard keys like the Spacebar or the 'F' key.

### `Footer.jsx`
- **Purpose**: Shows your contact info and social media icons.
- **Logic**: It fetches your phone number from the database using `SiteSettings`.
- **Links**: We updated the TikTok/Insta icons to search for your number (`0701126433`) automatically.

---

## 4. State Management (Memory)
Almost every component uses `useState`. This is how the website "remembers" things:
- Is the cart empty?
- What food item did the user click on?
- Is the menu loading?

---

## 5. CSS Styling (The Look)
- **Glassmorphism**: We used `backdrop-filter` in the video buttons for a modern, frosted-glass look.
- **Flexbox**: We use this to keep items centered on mobile phones and desktop screens at the same time.
- **Transitions**: We add `transition: 0.3s` to buttons so they glow or change color smoothly when you hover over them.

---

## Summary for the Developer:
To understand this code well:
1. Start at **App.jsx** to see the map.
2. Look at **api/axios.js** to see how it talks to the backend.
3. Check the **components/** folder to see how each piece of the website is built.
