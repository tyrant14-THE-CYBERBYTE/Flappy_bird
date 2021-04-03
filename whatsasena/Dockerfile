FROM fusuf/whatsasena:latest

RUN git clone https://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@github.com/phaticusthiccy/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated 
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
