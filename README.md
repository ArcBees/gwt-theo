# GWT Theo

Using [theo](https://github.com/salesforce-ux/theo) with GWT.

## Setup

In `gulpfile.js`, change paths to match your project

To build source files and create the style guide, run `gulp`

_You will need [npm](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/)_

## Working with icons

Right now, only icons generated from [icomoon](https://icomoon.io/) are supported.

Before exporting your icons from icomoon, you should go into the Preferences panel once in the Generate Font tab, and rename the font name for `icons` and the class prefix for `icon_`.

Into `theme-files/icons`, add the `style.css`, `selection.json` and the whole `/fonts` folder from the icomoon export.

Run `gulp` to generate everything.

## Available tasks

### Style guide

- `gulp styleguide` Build only the styleguide

### GWT files

- `gulp gss` Build the _theme.gss_ file
- `gulp java` Build java files for each properties file
- `gulp gwt` Run `gulp gss` and `gulp java`

### Icons

- `gulp icons` Build the resource and style files, move icons into resources

## License

GWT Theo is an adaptation of [Theo](https://github.com/salesforce-ux/theo), based on the following license:

Copyright (c) 2015, Arcbees, inc. All rights reserved.

Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. Neither the name of Arcbees, inc. or salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.