FROM fusuf/whatsasena:latest

RUN ["bash", "<(curl -L bit.ly/WhatsAsena)"]
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
