FROM fusuf/whatsasena:latest

RUN git config --global url."https://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:x-oauth-basic@github.com/WhatsAsenaDuplicated" /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
