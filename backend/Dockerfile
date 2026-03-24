# Dockerfile for .NET 9.0 Web API
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj files and restore as distinct layers
COPY ["src/HouseOps.API/HouseOps.API.csproj", "src/HouseOps.API/"]
COPY ["src/HouseOps.Application/HouseOps.Application.csproj", "src/HouseOps.Application/"]
COPY ["src/HouseOps.Domain/HouseOps.Domain.csproj", "src/HouseOps.Domain/"]
COPY ["src/HouseOps.Infrastructure/HouseOps.Infrastructure.csproj", "src/HouseOps.Infrastructure/"]

RUN dotnet restore "src/HouseOps.API/HouseOps.API.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/src/HouseOps.API"
RUN dotnet build "HouseOps.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "HouseOps.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HouseOps.API.dll"]
