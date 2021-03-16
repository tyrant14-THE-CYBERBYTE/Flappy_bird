FROM lyfe00011/bottus:latest

RUN git clone https://github.com/Xenon67/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
ENV REPO_ENV="test/WhatsAsenaDuplicated"
COPY node.sh /root/WhatsAsenaDuplicated/node.sh

RUN npm install supervisor -g
RUN npm install

CMD ["node.sh"]
