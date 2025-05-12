FROM node:22-alpine AS builder

WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package*.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn
COPY . .

# Tạo Prisma client và build ứng dụng
RUN npx prisma generate
RUN npx @nestjs/cli build

FROM node:18-alpine

WORKDIR /

# Sao chép các file cần thiết từ builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Biến môi trường
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Lệnh khởi động
CMD ["yarn", "start:prod"]