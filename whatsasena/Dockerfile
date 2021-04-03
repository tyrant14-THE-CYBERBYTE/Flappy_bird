FROM fusuf/whatsasena:latest

RUN https://{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}@github.com/Xenon67/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
