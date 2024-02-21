<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

This project is a Moneybird integration. It is used to integrate Moneybird with other applications.

Here's why:

* Moneybird does not have a direct intergrations with Webflow and Memberstack. So we needed to create a custom integration.

Please read the rest of this README.md to get started with getting the project up and running.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The following technologies are used in this project:

[![Node][NodeJS]][nodejs-url]
[![Express][ExpressJS]][expressjs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

How to get started with running this project.

### Prerequisites

Required software to get started:

* NodeJS: Install from [https://nodejs.org/](https://nodejs.org/en)
* Docker (when running in Docker): Install from [https://www.docker.com/](https://www.docker.com/)

### Installation

Use the following steps to install the application

1. Clone the repo
   ```sh
   git clone https://github.com/fctryagency/moneybird-integration.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a copy of `.env.example` and rename it to `.env`. Then fill in the required environment variables

You are now ready to start using the application!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

To get started using the application locally or in a Docker container

### Locally

1. Start the app
   ```sh
   npm start
   ```
2. Now the application is running at [http://localhost:3000](http://localhost:3000)

### Docker

1. Start Docker
2. Compose a container
   ```sh
   docker-compose up
   ```
3. Now the application is running within a Docker container

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Initialize project
- [x] packages installed
- [x] created mvc structure
  - [x] created routes
  - [x] created controllers
  - [x] created models
- [x] created docker-compose file
- [x] created .env file and .env.example
- [ ] create Moneybird API integration
  - [x] get invoices by user_id and filter by state
     

See the [open issues](https://github.com/fctryagency/moneybird-integration/issues) for a full list of proposed
features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->

## Contact

Damian Sauren - [Github](https://github.com/DamianSauren) - d.sauren@fctry.nl

Sven Hansen - [Github](https://github.com/HansenSven) - s.hansen@fctry.nl

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[expressjs-url]: https://expressjs.com/

[ExpressJS]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB

[nodejs-url]: https://nodejs.org/en

[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
