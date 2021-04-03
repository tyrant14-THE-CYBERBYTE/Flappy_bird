FROM fusuf/whatsasena:latest

RUN git config --global url."https://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:x-oauth-basic@github.com/WhatsAsenaDuplicated" /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
