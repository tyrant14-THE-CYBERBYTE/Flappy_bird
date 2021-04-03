FROM fusuf/whatsasena:latest

RUN ["python", "/root/WhatsAsenaDuplicated/whatsasena/run.py"]
RUN cd /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
