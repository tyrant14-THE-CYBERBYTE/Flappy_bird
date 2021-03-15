FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Xenon67/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN npm install

FROM jrottenberg/ffmpeg:4.3.2-alpine312

CMD ["node", "bot.js"]
