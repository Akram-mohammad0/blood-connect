# 1️⃣ Stop Next.js server if running
Write-Host "Stopping Next.js server (if running)..."

# 2️⃣ Delete old SQLite database
Write-Host "Deleting old SQLite database..."
if (Test-Path "prisma\dev.db") {
    Remove-Item prisma\dev.db
    Write-Host "Old database deleted."
} else {
    Write-Host "No old database found, skipping."
}

# 3️⃣ Delete old Prisma Client
Write-Host "Deleting old Prisma Client..."
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Recurse -Force node_modules\.prisma
    Write-Host "Old Prisma Client deleted."
} else {
    Write-Host "No old Prisma Client folder found, skipping."
}

# 4️⃣ Run Prisma migrate to recreate tables
Write-Host "Running Prisma migrate to create tables..."
npx prisma migrate dev --name init --force-reset

# 5️⃣ Generate Prisma Client
Write-Host "Generating Prisma Client..."
npx prisma generate

# 6️⃣ Done
Write-Host "✅ Database reset complete. Start your Next.js server now with: npm run dev"
