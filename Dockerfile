FROM mcr.microsoft.com/dotnet/sdk:10.0
ADD . /root
USER root
WORKDIR /root
RUN dotnet build /root/backend/CharterBackend.csproj
RUN apt-get -y update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_26.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean
RUN cd frontend && npm install
RUN echo nohup "dotnet /root/backend/bin/Debug/net10.0/CharterBackend.dll &" >> entrypoint.sh
RUN echo "cd frontend" >> entrypoint.sh &&\
    echo "nohup npm run dev &" >> entrypoint.sh &&\
    echo "sleep infinity" >> entrypoint.sh
RUN chmod +x entrypoint.sh