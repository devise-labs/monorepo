FROM ubuntu:focal
ENV USER_HOME=/root
RUN apt-get update \
    && apt-get upgrade -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        make \
        unzip \
        build-essential \
        swig3.0 \
        moreutils \
        rsync \
        zip \
        libgdiplus \
        jq \
        sqlite3 \
        wget \
        curl \
        software-properties-common \
        git \
        sudo \
        tmux \
        vim \
    # This is the folder containing 'links' to benv and build script generator
    && apt-get update \
    && apt-get upgrade -y \
    && add-apt-repository main \
    && add-apt-repository restricted \
    && add-apt-repository universe \
    && add-apt-repository multiverse

RUN git config --global core.editor "vim"

# node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=$USER_HOME/.nvm
ENV NODE_VERSION=18.15.0
RUN . "$NVM_DIR/nvm.sh" && nvm install $NODE_VERSION
RUN . "$NVM_DIR/nvm.sh" && nvm use v$NODE_VERSION
ENV PATH="${USER_HOME}/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm i -g pnpm
RUN echo "alias x=\"pnpm cli\"" >> ~/.bash_aliases

# rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="${USER_HOME}/.cargo/bin:${PATH}"

# solana
RUN sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Tauri
# https://next--tauri.netlify.app/next/guides/getting-started/prerequisites/linux
RUN DEBIAN_FRONTEND=noninteractive apt install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
RUN rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
# Standalone install
RUN DEBIAN_FRONTEND=noninteractive apt install -y default-jdk
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -O cmdline-tools.zip
RUN unzip cmdline-tools.zip
ENV ANDROID_HOME="${USER_HOME}/.android"
RUN mkdir -p $ANDROID_HOME/cmdline-tools/latest
RUN mv cmdline-tools/* $ANDROID_HOME/cmdline-tools/latest
RUN rm -d cmdline-tools
RUN rm cmdline-tools.zip
ENV NDK_HOME="$ANDROID_HOME/ndk/25.0.8775105"
ENV PATH="$ANDROID_HOME/cmdline-tools/latest/bin/:${PATH}"
RUN ls $ANDROID_HOME/cmdline-tools/latest/bin/
RUN yes | sdkmanager --licenses
RUN sdkmanager "platforms;android-33" "platform-tools" "ndk;25.0.8775105" "build-tools;33.0.0"
# Cleanup
RUN rm -rf /var/lib/apt/lists/*
