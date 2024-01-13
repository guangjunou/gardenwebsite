const i18n = require('i18n');
const express = require('express');
const path = require('path');

const app = express();

i18n.configure({
    locales: ['en', 'zh'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'language',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
});

app.use(i18n.init);

document.getElementById('output').innerHTML = res.redirect('back');