FROM node:13-alpine

RUN mkdir -p /home/dBlog

COPY . /home/dBlog

# set default dir so that next commands executes in /home/dBlog dir
WORKDIR /home/dBlog

# will execute npm install in /home/dBlog because of WORKDIR
RUN npm install

# no need for /home/dBlog because of WORKDIR
CMD ["npm", "start"]

