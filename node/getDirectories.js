const glob = require('glob');

glob('src/**/*.test.js', function (err, files) {
    if (err) {
        console.error(err);
        return;
    }
    
    const directories = Array.from(
        files.map(f => f.substr(0, f.lastIndexOf('/')))
            .reduce((accum, f) => accum.add(f), new Set())
    );
    console.log(directories);
});
