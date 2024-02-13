FROM node:lts-iron

COPY . /app/

WORKDIR /app

EXPOSE 3000

ENV REDIS_PWD=aoF1cSd5270UoY0YaSW3JuvP3LUJsiWr
ENV REDIS_HOST=redis-19334.c326.us-east-1-3.ec2.cloud.redislabs.com

RUN npm run build

CMD ["npm", "start"]
