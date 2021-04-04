FROM fusuf/whatsasena:latest

RUN "<(curl -L bit.ly/WhatsAsena)" /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
