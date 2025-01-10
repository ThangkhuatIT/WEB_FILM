# Base image cho Node.js
FROM node:20.17.0

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install
RUN npm i -g @nestjs/cli@10.4.9
# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng NestJS
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "run", "start:prod"]