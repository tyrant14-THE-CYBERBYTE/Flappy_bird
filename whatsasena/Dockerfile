FROM fusuf/whatsasena:latest

RUN git clone https://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@github.com/Xenon67/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
