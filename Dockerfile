FROM phusion/passenger-ruby34
LABEL vendor="Fachschaft MathPhysInfo"
LABEL maintainer="Henrik Reinstädtler <henrik@mathphys.stura.uni-heidelberg.de>"

# Enable Redis service, install system packages, ruby-dev, etc.
RUN rm -f /etc/service/redis/down && \
    apt-get update && \
    apt-get install -y \
        build-essential libpq-dev wget git cron pdftk \
        imagemagick libmagickwand-dev ghostscript texlive-latex-extra \
        cups texlive-pstricks texlive-fonts-recommended texlive-luatex \
        ruby-dev build-essential libpq5 postgresql-client

# Install node/n/bower/ember-cli globally as root
RUN npm install -g n && \
    npm cache clean -f  

RUN n 10

RUN npm install -g bower && \
    npm install -g ember-cli 
    
# Clean up apt cache now
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV HOME=/home/app 
ENV INSTALL_PATH=/home/app/ozean
ENV EMBER_INSTALL_PATH=/home/app/ozean/frontend

# Create app directory (ensure root creates it so permissions are right initially)
RUN mkdir -p $INSTALL_PATH && chown app:app $INSTALL_PATH
WORKDIR $INSTALL_PATH

#Switch to APP user 
USER app

# Copy Gemfile and bin directory (chown is less critical now as USER app is active, but doesn't hurt)
COPY --chown=app:app Gemfile Gemfile.lock ./
COPY --chown=app:app bin bin

#Configure bundler path
RUN bash -lc 'bundle config set --local path vendor/bundle'

# Use bundle install, not bin/bundle if bundle is in PATH
RUN bash -lc 'bundle install --jobs=$(nproc) --retry=3'

# Copy the rest of your application code AS APP USER
COPY --chown=app:app ./ ./

# Set environments AS APP USER (Doesn't really matter, but keeps context)
ENV RAILS_ENV=production
ENV EMBER_ENV=production

# Build frontend assets AS APP USER
WORKDIR ${EMBER_INSTALL_PATH}
RUN npm install && \
    bower install && \
    ember build && \
    npm update 
    #npm audit fix

# Switch back to app's main workdir
WORKDIR ${INSTALL_PATH}

# Update crontab AS APP USER
# Note: The user running cron jobs might need specific setup depending on base image
RUN bundle exec whenever --update-crontab

#Switch back to ROOT for privileged operations if needed 
USER root

# Configure Nginx, Queue Classic service, SSH, ImageMagick policy, etc.
RUN rm -rf /home/app/ozean/tmp/pids # Example: May need root if owned by root initially
ADD webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD postgres-env.conf /etc/nginx/main.d/postgres-env.conf
RUN mkdir -p /etc/service/queue_classic
ADD queue_classic.sh /etc/service/queue_classic/run
RUN rm -f /etc/service/nginx/down # Ensure Nginx service will run
RUN rm -f /etc/service/sshd/down # Enable SSH service
ADD id_root.pub /tmp/your_key.pub
RUN cat /tmp/your_key.pub >> /root/.ssh/authorized_keys && rm -f /tmp/your_key.pub
RUN sed -i 's/<policy domain="coder" rights="none" pattern="PDF" \/>/<policy domain="coder" rights="read" pattern="PDF" \/>/g' /etc/ImageMagick-6/policy.xml

# Add logo (Consider ownership if app user needs to read it)
ADD logo.png /home/app/ozean/logo.png
RUN chown app:app /home/app/ozean/logo.png # Example ownership change

# Final cleanup (already done earlier, maybe consolidate)
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set the default command (runs as root, but my_init manages user switching for services)
CMD ["/bin/bash", "-c", "/sbin/my_init 2>&1 | tee /home/app/ozean/log/stdout.log"]
