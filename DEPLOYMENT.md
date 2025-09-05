# Deployment Guide for Onboarding App

## Backend Deployment to Railway

### Prerequisites
1. Railway account (https://railway.app)
2. GitHub repository connected to Railway
3. MySQL database provisioned on Railway

### Step 1: Set up MySQL Database on Railway
1. Create a new project on Railway
2. Add MySQL service from the Railway dashboard
3. Note down the connection variables:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### Step 2: Deploy Backend
1. Create a new service in your Railway project
2. Connect your GitHub repository
3. Set the root directory to `/back-end`
4. Add the following environment variables in Railway:
   ```
   MYSQLHOST=<your-mysql-host>
   MYSQLPORT=3306
   MYSQLDATABASE=railway
   MYSQLUSER=root
   MYSQLPASSWORD=<your-mysql-password>
   FRONTEND_URL=https://onboarding-app-ashy.vercel.app
   CORS_ORIGINS=http://localhost:3000,https://onboarding-app-ashy.vercel.app
   ```

### Step 3: Deploy and Get Backend URL
1. Railway will automatically deploy your backend
2. Once deployed, get your backend URL from Railway (e.g., `https://your-app.railway.app`)

## Frontend Deployment to Vercel

### Step 1: Update Production Environment
1. Update `/front-end/.env.production`:
   ```
   REACT_APP_API_URL=https://your-railway-backend.railway.app/api
   ```

### Step 2: Deploy to Vercel
1. Push changes to your GitHub repository
2. Vercel will automatically redeploy with the new environment variables

## Local Development

### Backend
1. Create `/back-end/.env` file:
   ```
   MYSQLHOST=localhost
   MYSQLPORT=3306
   MYSQLDATABASE=onboarding_db
   MYSQLUSER=root
   MYSQLPASSWORD=your_local_password
   ```

2. Run the backend:
   ```bash
   cd back-end
   mvn spring-boot:run
   ```

### Frontend
1. Ensure `/front-end/.env` is set to:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

2. Run the frontend:
   ```bash
   cd front-end
   npm install
   npm start
   ```

## Important Notes

- **Security**: The backend now uses BCrypt for password hashing
- **Session Management**: Sessions are stored with UUID and tracked in the database
- **CORS**: Configured to allow both localhost and production URLs
- **Database**: Schema will be auto-created by Hibernate on first run

## Troubleshooting

### CORS Issues
- Ensure the `FRONTEND_URL` and `CORS_ORIGINS` environment variables are set correctly in Railway
- Check that the frontend is using the correct API URL

### Database Connection Issues
- Verify all MySQL environment variables are correctly set in Railway
- Check Railway logs for connection errors

### Build Failures
- Ensure Java 17 is specified in `system.properties`
- Check that all Maven dependencies are resolving correctly