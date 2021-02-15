# showflix

ShowFlix is a Single Page Application that displays information about your favorite shows.
On the home screen, you can see most popular shows based on their rating, according to their genres.
You can click on any show to know more information related to the show. Also, you can search for your favorite shows in this application.

# Framework

Though i have prior experience only in React JS, i have chosen to implement this in Vue JS as a challenge. My overall experience working with Vue JS is really good. This is an excellent framework which combines the some of the best features from different front end frameworks/libraries.

# Design

I chose a simple yet eye catchy design by using the show images with combination of flexbox and css grid layouts.

# Project structure

3 different pages/views - Home, Details and PageNotFound are implemented which further have multiple reusable components placed in them.
Except Search component, all other components in Components folder are dumb components, used only for UI render. Logic is completely written in Home and Details files.

# Project Dependencies and Plugins

    Vue JS (Vue cli and Vue 2) -- Framework
    Axios - HTTP Client
    Vue Router - For routing between pages
    Vue Closable - (source: https://github.com/TahaSh/vue-closable)
    Lodash - For debounce functionality in search component

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
