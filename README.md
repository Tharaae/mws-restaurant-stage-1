# Front-End Nano-Degree - Restaurants Reviews Project - Stage 1
**By _Tharaa Elmorssi_**
---

## Project Requirements

The code for the provided restaurant reviews website has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. To meets requirements, the following updates have been implemented:

- The provided site has been converted to use a responsive design as follows:
    - No frameworks are used; all responsiveness done with CSS.
    - Appropriate document type declaration and viewport tags are used.
    - Grid-based layout using CSS is implemented.
    - Media queries are used to provide fluid breakpoints across different screen sizes.
    - Responsive images are used to adjust for the dimensions and resolution of any mobile device.

- Accessibility features are implemented.

- ServiceWorker script are added to cache requests to all of the site’s assets so that any page that has been visited by a user are accessible when the user is offline.


## How to run the website

- Clone the submitted project repository to a folder on your local machine.

- In this folder, start up a simple HTTP server to serve up the site files on your local computer via Python
    - In a terminal, check the version of Python you have: `python -V`.
    - If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.)
    - For Python 3.x, you can use `python3 -m http.server 8000`.
    - If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

- With your server running, visit the site: `http://localhost:8000` to check the site.


## Notes to the Reviewer

- MapBox has been used to display the maps and landmarks.
- ES6 JS specs have been used.
