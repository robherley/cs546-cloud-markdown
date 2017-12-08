# The Over-Reactors Present: _[clever project name here]_

## The Team

* Robert Herley
* Jonathan Pavlik
* Albert Tang
* Aimal Wajihuddin

## Overview

The goal of this project is to create an online Markdown editor web service. The
concept of the site is to allow users to log in and view/edit their Markdown
files.We would make use of a MongoDB database to store users and which files
they own. This project would make use of free services such as Amazon S3 bucket
or a hook in with Google Drive API. Further down the line, some nice to have
features would be LaTeX support, and a PDF generator to download your files as a
PDF. The end goal would be a free service that allows a user to create and store
Markdown files online.

## Core Objectives

* Creating a user login/registration system.
* Allowing users custom use of CSS and Styling their Markdown documents.
* Some pre-set themes would be includes so development of those.
* A file editor and renderer, and a storage for the files done via third party
	technology.
* Side by side editor and renderer would be the ideal situation.
* Allowing the rendered document to be downloaded as a PDF.

## Stretch Objectives

* Multi-user editing with sockets.
* LaTeX support within Markdown.

## Usage

* `npm run dev`: Start the development server w/ hot reload (Webpack & Express)
* `npm run prod`: Builds the static files and runs in production mode

## Todo

* ~~Finish Adding Redux, React-Router and other boilerplate~~
* ~~Cleanup unnessary npm dependencies~~
* ~~Database Proposal~~
* Hook editor into redux
* Figure out heroku or aws or something else
* Get rid of this todo list and make a trello board to plan out everything
