FROM fusuf/whatsasena:latest

ADD repo-key /
RUN \
  chmod 600 /repo-key && \  
  echo "IdentityFile /repo-key" >> /etc/ssh/ssh_config && \  
  echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config && \  
  git clone https://github.com/phaticusthiccy/WhatsAsenaDuplicated

WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
