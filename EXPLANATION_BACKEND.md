# Complete Backend Code Explanation (Django)

This guide explains the "motor" of your application—the Backend. It handles the database, security, and API routes.

---

## 1. models.py (The Database Blueprint)
This file defines what your database "tables" look like.

- **`Category`**: Stores categories like "Breakfast" or "Lunch".
- **`MenuItem`**: Each specific food item. It links to a `Category` using a `ForeignKey`.
- **`HeroSlide`**: Stores the images and text for the big sliding banner at the top of the homepage.
- **`Reservation`**: Stores details when someone books a table (Name, date, time, guests).
- **`Order` & `OrderItem`**: 
    - `Order` stores the overall customer info (Address, Total).
    - `OrderItem` stores the specific items inside that order. One `Order` can have many `OrderItems`.
- **`SiteSettings`**: A special table to store your phone number (0701126433), WhatsApp message, and restaurant name so you can change them in one place.

---

## 2. views.py (The Logic)
Views are functions that "do things" when a URL is visited.

- **`CategoryListView`**: Fetches all categories from the database and sends them to the frontend.
- **`MenuItemListView`**: Fetches the food items.
- **`ReservationCreateView`**: Takes the data from the booking form and saves it to the database.
- **`OrderCreateView`**: A complex function that:
    1. Validates the customer's cart.
    2. Calculates the total price.
    3. Saves the `Order`.
    4. Saves each `OrderItem` inside that order.
- **`SiteSettingsView`**: Sends your contact info (like your phone number) to the frontend.

---

## 3. serializers.py (The Translator)
Computers like "JSON" data, but Django works with "Python Objects". Serializers translate between the two.
- It takes a `MenuItem` from the database and turns it into text that the website can read.

---

## 4. settings.py (The Brain/Config)
This file configures the whole project.

- **`INSTALLED_APPS`**: A list of all modules we are using (including `rest_framework` for the API and `corsheaders` for security).
- **`DATABASES`**: Tells Django where your PostgreSQL database is located.
- **`CORS_ALLOWED_ORIGINS`**: This is a security guard. It tells the backend only to allow your website (localhost:5173) to talk to it.
- **`SECRET_KEY`**: A password that keeps your database safe.
- **`STATIC_URL` & `MEDIA_URL`**: Settings that tell Django where to find your images and CSS files.

---

## 5. urls.py (The Road Map)
This file links web addresses to the views.
- `path('api/menu/', ...)` → Links to the list of food items.
- `path('api/orders/', ...)` → Links to the checkout process.
