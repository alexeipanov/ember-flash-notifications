FROM node:18.19.1-bookworm
RUN yarn global add pnpm ember-cli@5.4
RUN apt-get update && apt-get install -y exa neovim
EXPOSE 4200 7200
CMD ["/bin/bash"]
