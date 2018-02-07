const fs = require('fs');
const icons = require('./icons.json');

const ANDROID_DRAWABLES_PATH = './android/src/main/res/drawables/';

function updateAndroidDrawables() {
    const height = icons.height;
    return icons.icons.forEach((icon) => {
        const width = icon.icon.width || height;
        const drawable = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
\tandroid:width="${width / 20}dp"
\tandroid:height="${height / 20}dp"
\tandroid:viewportWidth="${width}"
\tandroid:viewportHeight="${height}">
${icon.icon.paths
        .map((path) => `\t<path
\t\tandroid:fillColor="#ffffffff"
\t\tandroid:pathData="${path}" />`)
        .join('\n')
    }
</vector>`;

        fs.writeFileSync(`${ANDROID_DRAWABLES_PATH}${icon.properties.name}.xml`, drawable);
    });
}

updateAndroidDrawables();
