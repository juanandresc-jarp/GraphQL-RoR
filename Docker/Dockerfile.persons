FROM ruby:3.2

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs

WORKDIR /app

# Copy only Gemfile(s) to install dependencies early
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install || true

# Rest of the app is mounted via volume
CMD ["rails", "server", "-b", "0.0.0.0"]
