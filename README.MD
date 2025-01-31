# Install dependencies

npm install

# Migrate .eslintrc to eslint.config

npx @eslint/migrate-config .eslintrc.json

# Generate Prisma migrations

npx prisma migrate dev --name init

# Generate Prisma database without migrations

npx prisma db push

# generate client for prisma

npx prisma generate
