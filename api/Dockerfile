ARG PLATFORM=linux/amd64

FROM --platform=${PLATFORM} bitnami/ruby:3.2 AS fm-api-base

# add non-root user
RUN adduser --system --group bitnami

# install deps (root)
USER root
# build tools
RUN install_packages build-essential libpq-dev dh-autoreconf gcc g++ make libssl-dev zlib1g-dev
# app libs
RUN install_packages redis-tools
RUN install_packages postgresql-client

# non-root user
RUN chown -R bitnami:bitnami \
  /app \
  /home/bitnami \
  /opt/bitnami/ruby/lib/ruby/gems \
  /opt/bitnami/ruby/bin
USER bitnami

WORKDIR /app
COPY Gemfile Gemfile.lock ./

# install gems
RUN bundle install

# Development
FROM fm-api-base AS fm-api-dev

COPY . .

# non-root user
USER root
RUN chown -R bitnami:bitnami /app/config /app/db /app/tmp
USER bitnami

CMD ["bundle", "exec", "rails", "s", "-p", "3000", "-b", "0.0.0.0"]

# Production
FROM fm-api-base AS fm-api

COPY . .

# non-root user
USER root
RUN chown -R bitnami:bitnami /app/config /app/db /app/tmp
RUN chmod +x ./run.sh
USER bitnami

CMD ["/app/run.sh"]
