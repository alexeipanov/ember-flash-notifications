FROM node:18.19.1-bookworm
ARG UID
ARG GID
RUN groupmod -g ${GID} node && usermod -u ${UID} -g ${GID} node
RUN yarn global add pnpm ember-cli@5.4
RUN apt-get update && apt-get install -y exa neovim
USER ${UID}:${GID}
EXPOSE 4200 7200
CMD ["/bin/bash"]
