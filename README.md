<p align="center">
  <h1 align="center">Ainc</h1>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
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
        <li><a href="#launch">Launch</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!--About the project -->
## About The Project
 Inviting and following popular stars.

### Built With
 * [MaterialUI](https://material-ui.com/)
 * [JQuery](https://jquery.com)
 * [React](https://reactjs.org/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* yarn
  ```sh
  npm install -g yarn
  ```

### Installation

1. Locate project directory
2. Create Database
   ```sh
   php artisan migrate
   php artisan db:seed
   ```
3. Config connection info
   Edit database connection info in .env file
   ```config
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=inculDB
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   
### Launch
   ```sh
   php artisan serve
   yarn start
   ```

<!-- USAGE EXAMPLES -->
## Usage

This project is used to collect volunteers who have a rest time. Three type of users can use this project.
 1. Whom wants to collect volunteers
 2. Whom have personal information about volunteers
 3. Whom is volunteer 

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- CONTACT -->
## Contact

Shinagaw.Haruko: beauty.daughter0310@gamil.com

Project Link: [https://github.com/shinagawa-haruko/inCul](https://github.com/shinagawa-haruko/inCul)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Font Awesome](https://fontawesome.com)
* [Modash](https://www.modash.io/)
* [MaterialUI](https://material-ui.com/)
