FROM fusuf/whatsasena:latest

RUN git clone https://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:x-oauth-basic@github.com/Xenon67/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
