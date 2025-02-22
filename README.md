
<a id="readme-top"></a>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TyrellHaywood/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Philips Hue Web Application</h3>

  <p align="center">
    The best web application to manage your Philips Hue lights!
    <br />
    <a href="https://github.com/TyrellHaywood/philips-hue-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/TyrellHaywood/philips-hue-app">View Demo</a>
    ·
    <a href="https://github.com/TyrellHaywood/philips-hue-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/TyrellHaywood/philips-hue-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
### Built With

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![SASS][SASS]][SASS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation

1. Locate your bridge IP-address in the Philips Hue mobile app
2. Follow [Philips Hue Developer Docs](https://developers.meethue.com/develop/hue-api-v2/getting-started/) to generate a unique username that you will be using as an `id key`
3. Clone the repo
   ```sh
   git clone https://github.com/TyrellHaywood/philips-hue-app.git
   ```
4. Install Relative Packages
   ```sh
   npm install
   ```
   ```sh
   npm install sass --save-dev
   ```
   ```sh
   npm install typescript --save-dev
   ```
5. Run local host
   ```
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

*NOTE:*
Ensure you are running this on the same network as your Hue Bridge.

`ip address` and `id key` is where you will input your bridge ip address and unique generated username.
Submitting this information will send a `GET` request to your Hue Bridge to get your lights data, and give you access to the application.
_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
<!--
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/TyrellHaywood/philips-hue-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

-->
<!-- CONTACT -->
## Contact

Tyrell Haywood - [@tyrell.haywood](https://www.instagram.com/tyrell.haywood/) - tyrellchaywood@gmail.com

Project Link: [https://github.com/TyrellHaywood/philips-hue-app](https://github.com/TyrellHaywood/philips-hue-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Philips Hue Developer Documentation](https://developers.meethue.com/develop/hue-api-v2/getting-started/)
* [Ben Knight Hue RGB Converter](https://github.com/benknight/hue-python-rgb-converter)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[TypeScript-url]: https://www.typescriptlang.org/
[SASS]: https://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[SASS-url]: https://sass-lang.com/documentation/syntax/

