# TripWale Backend API

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone/extract the backend folder
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your settings:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tripwale
   JWT_SECRET=your-super-secret-key-change-this
   ADMIN_EMAIL=admin@tripwale.in
   ADMIN_PASSWORD=Admin@123
   FRONTEND_URL=http://localhost:5173
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Seed the database (optional - adds sample tours):
   ```bash
   npm run seed
   ```

6. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

Server runs on: `http://localhost:5000`

## 🔑 Default Admin Credentials
- Email: `admin@tripwale.in`
- Password: `Admin@123`

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Tours (Public + Admin)
- `GET /api/tours` - Get all tours (filters: pageType, category, search, active)
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (Admin only)
- `PUT /api/tours/:id` - Update tour (Admin only)
- `DELETE /api/tours/:id` - Delete tour (Admin only)
- `POST /api/tours/bulk-import` - Import multiple tours (Admin)

### Content (Admin)
- `GET /api/content/:page` - Get page content
- `PUT /api/content/:page` - Update page content (Admin)

### Settings (Admin)
- `GET /api/settings` - Get all settings
- `PUT /api/settings/:category` - Update settings by category

### Reviews
- `GET /api/reviews` - Get reviews (filter: approved)
- `POST /api/reviews` - Submit review (Public)
- `PATCH /api/reviews/:id/approve` - Approve review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Media (Admin)
- `GET /api/media` - List uploaded files
- `POST /api/media/upload` - Upload image
- `DELETE /api/media/:id` - Delete file

### Contact
- `POST /api/contact` - Submit contact form (Public)
- `GET /api/contact` - Get all submissions (Admin)

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats (Admin)

## 🌐 Deploy to Render.com (Free)

1. Push backend to GitHub
2. Create a new Web Service on Render
3. Set environment variables
4. Deploy!

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT secret (make it long & random) |
| `JWT_EXPIRE` | No | Token expiry (default: 7d) |
| `ADMIN_EMAIL` | Yes | Default admin email |
| `ADMIN_PASSWORD` | Yes | Default admin password |
| `FRONTEND_URL` | Yes | Frontend URL for CORS |
| `NODE_ENV` | No | development/production |
