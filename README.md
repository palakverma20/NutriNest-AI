# NutriNest AI 🌿

NutriNest AI is an advanced, AI-powered smart kitchen inventory and personalized recipe generator ecosystem. Built on top of **Next.js (App Router)** and **MongoDB**, it leverages the state-of-the-art **Google Gemini 2.5 Flash** model via the official `@google/genai` SDK to dynamically construct delicious, context-aware recipes using the ingredients currently available in your pantry, while matching your family's specific dietary profiles, allergies, and health conditions.

---

## ✨ Features

- **Inventory Pantry Management**: Log, update, and manage your kitchen inventory in real-time. Features automated stock level calculations ("Low Stock", "Good Stock") and expiration tracking ("Expiring Soon", "Expired").
- **AI Recipe Generation**: Instantly generate recipes tailored to your ingredients using Gemini 2.5 Flash, returning ingredients used, missing components, prep times, difficulty levels, and step-by-step instructions.
- **Family Profiles & Health Considerations**: Add multiple family members with individual dietary restrictions (e.g., Vegetarian, Vegan, Keto), allergies, and health conditions (e.g., Diabetes, Thyroid, High Cholesterol, Hypertension) to customize recommendations.
- **Next-Auth Security**: Robust OAuth authentication with Google, automatically provisioning user profile storage inside MongoDB.
- **Automated Alerts & Dashboard**: An intuitive user interface displaying pantry summary alerts, quick navigation cards, and dynamic UI micro-animations powered by Lordicon animations.
- **Contact & Feedback Interface**: Direct email dispatching for user feedback powered securely via Nodemailer SMTP.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Programming Language**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (MongoClient database driver)
- **AI Integration**: [Google Gemini 2.5 Flash](https://ai.google.dev/) via `@google/genai`
- **Authentication**: [Next-Auth (Auth.js v5 Beta)](https://authjs.dev/)
- **Mailing**: [Nodemailer](https://nodemailer.com/)

---

## 📂 Key Files & Code Reference

| Component / Utility | File Path | Purpose |
| :--- | :--- | :--- |
| **Home Page** | [app/page.js](file:///c:/Webdev/Exercises/nutri-nest/app/page.js) | Landing page featuring `Hero` and `Features` elements. |
| **Authentication Flow** | [auth.js](file:///c:/Webdev/Exercises/nutri-nest/auth.js) | Configures Next Auth v5 Google OAuth provider and MongoDB user provisioning callbacks. |
| **Auth Middleware** | [proxy.js](file:///c:/Webdev/Exercises/nutri-nest/proxy.js) | Handles route protection and redirecting unauthenticated users away from restricted paths. |
| **Gemini Client** | [lib/gemini.js](file:///c:/Webdev/Exercises/nutri-nest/lib/gemini.js) | Initializes the `@google/genai` client using the official Google Gemini SDK. |
| **MongoDB Client** | [lib/mongodb.js](file:///c:/Webdev/Exercises/nutri-nest/lib/mongodb.js) | Configures the shared MongoClient connection pool promise for database efficiency. |
| **Dashboard Interface** | [app/dashboard/page.js](file:///c:/Webdev/Exercises/nutri-nest/app/dashboard/page.js) | Provides an overview of pantry warnings, low stock items, and navigation cards. |
| **Pantry UI** | [app/pantry/page.js](file:///c:/Webdev/Exercises/nutri-nest/app/pantry/page.js) | Main portal for viewing, adding, updating, and deleting pantry items. |
| **Recipe UI** | [app/recipes/page.js](file:///c:/Webdev/Exercises/nutri-nest/app/recipes/page.js) | UI for submitting recipe ingredients or fetching existing pantry lists for AI processing. |
| **Profile & Family UI** | [app/profile/page.js](file:///c:/Webdev/Exercises/nutri-nest/app/profile/page.js) | Manages personal preferences and family health details. |
| **Recipe API Endpoint** | [app/api/recipes/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/recipes/route.js) | Connects to Google Gemini 2.5 Flash to parse ingredients into structured recipe JSON. |
| **Pantry APIs** | [app/api/pantry/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/pantry/route.js) & [[id]/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/pantry/[id]/route.js) | Handles standard CRUD operations for pantry items in MongoDB. |
| **Family APIs** | [app/api/family/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/family/route.js) & [[id]/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/family/[id]/route.js) | Handles CRUD operations for family members and their medical profiles. |
| **Contact API** | [app/api/contact/route.js](file:///c:/Webdev/Exercises/nutri-nest/app/api/contact/route.js) | Uses SMTP and Nodemailer to securely email contact form queries. |

---

## ⚙️ Setup & Installation

Follow these instructions to set up NutriNest AI locally:

### 1. Prerequisites
- **Node.js**: v18 or later is recommended.
- **MongoDB**: A running MongoDB instance (e.g. MongoDB Atlas cluster).
- **Gemini API Key**: A valid Google Gemini API Key from Google AI Studio.
- **Google OAuth Client Credentials**: Client ID and Client Secret created in the Google Cloud Console for authentication.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd nutri-nest
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env.local` in the root of the project and add the following keys:

```env
# Email configurations (Nodemailer SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_specific_password

# Authentication (Next Auth / Auth.js)
AUTH_GOOGLE_ID=your_google_oauth_client_id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_URL=http://localhost:3000
AUTH_SECRET=your_next_auth_secret_hash # Generate using 'npx auth secret'

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/nutrinest?retryWrites=true&w=majority

# AI Engine
GEMINI_API_KEY=your_gemini_api_key
```

### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience NutriNest AI!

---

## 🔒 Authentication & API Route Protection
- Route security checks are executed dynamically inside [proxy.js](file:///c:/Webdev/Exercises/nutri-nest/proxy.js).
- Any attempt to access `/dashboard`, `/pantry`, `/recipes`, `/family`, `/profile`, or `/meal-advisor` routes without an active Google session redirects the client back to the landing page (`/`).

---

## 🤖 AI Recipe Generation Prompt
The generator leverages **Gemini 2.5 Flash** with the following structured instructions, ensuring the model yields parseable, pure-JSON outputs:
```javascript
const prompt = `
You are NutriNest AI.
The user has these ingredients: ${ingredients}

Generate exactly ONE recipe.
Rules:
- Use the given ingredients as much as possible.
- If an ingredient is missing, list it separately.
- Recipes should be simple and practical.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not write explanations.
`;
```

---

## 📄 License
This project is private and proprietary. All rights reserved.
