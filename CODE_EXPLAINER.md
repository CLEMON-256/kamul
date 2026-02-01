# Junior's Restaurant: Code Explainer & Architecture

This guide explains how the "Junior's Restaurant" app is built, focusing on key components and React patterns.

---

## 1. Project Architecture

The app is split into two main parts:
- **Frontend**: Built with **React** and **Vite**. It handles what the user sees (User Interface).
- **Backend**: Built with **Django** and **REST Framework**. It handles data like orders, reservations, and menus.

---

## 2. Component Deep Dive: VideoPlayer.jsx

The `VideoPlayer` is a "modal" (pop-up) component that plays video. Here’s a breakdown of how it works:

### State Management (`useState`)
We use React "Hooks" to track what’s happening in the player:
- `isPlaying`: Is the video playing or paused?
- `currentTime`: Exactly what second the video is at.
- `volume`: How loud the audio is.
- `isLoading`: Is the video still downloading?

### Effects (`useEffect`)
This is the "brain" of the component. It synchronizes the component with the browser.
- **Event Listeners**: It listens for when you click "Play" or "Mute" and tells the video element what to do.
- **Keyboard Shortcuts**: It listens for the 'Space' bar to play/pause or 'F' for fullscreen.
- **Auto-hide Controls**: It automatically hides the play button after 3 seconds of inactivity.

### Portals (`ReactDOM.createPortal`)
This is a professional React technique. Instead of putting the video inside the home page structure (where it might get "cut off" by other elements), we use a **Portal** to "transport" the player to the very top level of the website (`document.body`). This ensures the video always appears on top of everything.

---

## 3. Modular Thinking: HomeVideoSection.jsx

Why didn't we put all the video code inside the Homepage?
- **Reusability**: By making `VideoPlayer` a separate "Common Component," you can use it anywhere else in the app (like the About Us page) without writing the code again.
- **Cleanliness**: `HomeVideoSection` only cares about the "Experience Junior's" title and the preview image. It "delegates" the hard work of playing video to the `VideoPlayer`.

---

## 4. CSS Styling

We use **Vanilla CSS** with professional techniques:
- **Glassmorphism**: The `play-button` uses `backdrop-filter: blur(5px)` to give it that modern, frosted-glass look.
- **Transitions**: Every hover effect has a `transition: 0.3s` to make the animations feel smooth and premium.
- **Flexbox & Grid**: Used to keep the video controls perfectly aligned on all screen sizes (mobile vs. desktop).

---

## 5. Backend (Django) Logic

The backend uses **Django Models**. A "Model" is like a blueprint for a spreadsheet.
- When an order is placed, Django creates a record in the database.
- The **REST API** converts that database record into **JSON** format, which the React frontend can understand and display.

---

## Summary for Learning:
- **React** = The Building Blocks.
- **Props** = Passing data from one component to another (e.g., passing the `videoSrc` to the player).
- **State** = The memory of a component.
- **Django** = The engine that stores and serves data.
