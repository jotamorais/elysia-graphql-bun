FROM jarredsumner/bun:edge as builder

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN ["bun", "install", "--production"]

# ? -------------------------
FROM jarredsumner/bun:edge

WORKDIR /app

COPY --from=builder /app/node_modules node_modules

COPY src src
# COPY public public
COPY tsconfig.json .

ENV ENV production

# CMD ["bun", "src/main.ts"]
CMD ["bun", "run", "dev"]

EXPOSE 3000