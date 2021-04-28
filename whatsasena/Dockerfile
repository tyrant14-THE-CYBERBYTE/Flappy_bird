FROM fusuf/whatsasena:latest

RUN git clone https://github.com/devf3lix/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV REPO="https://github.com/phaticusthiccy/WhatsAsenaDuplicated"
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["run.sh"]
