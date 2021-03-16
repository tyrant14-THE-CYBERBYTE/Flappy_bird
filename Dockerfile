FROM lyfe00011/bottus:latest

RUN git clone https://github.com/Xenon67/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
ENV REPO_ENV="test/WhatsAsenaDuplicated"
COPY whatsasena/node.sh /usr/local/bin/node.sh

RUN npm install supervisor -g
RUN npm install

CMD ["/usr/local/bin/node.sh"]
