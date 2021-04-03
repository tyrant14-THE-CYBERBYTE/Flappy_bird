FROM fusuf/whatsasena:latest

RUN https://{{MY_TOKEN}}@github.com/phaticusthiccy/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
