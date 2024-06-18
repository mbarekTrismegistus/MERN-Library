FROM node

WORKDIR /usr/app/auth

COPY ./backend/auth /usr/app/auth


RUN npm install


ENV AUTH_SECRET = "ihwGyBcpT7IHUdz1YO2AA5ErPP9nIyYY2J9xOb1qR1o="

EXPOSE 8000

CMD ["npm", "start"]