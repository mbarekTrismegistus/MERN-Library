FROM node

WORKDIR /usr/app/comment

COPY ./backend/comment /usr/app/comment


RUN npm install


ENV AUTH_SECRET = "ihwGyBcpT7IHUdz1YO2AA5ErPP9nIyYY2J9xOb1qR1o="

EXPOSE 8001

CMD ["npm", "start"]