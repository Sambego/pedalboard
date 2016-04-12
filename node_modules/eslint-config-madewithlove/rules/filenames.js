module.exports = {
    'plugins': ['filenames'],
    'rules': {
        'filenames/filenames': [2, "^[A-Za-z]+$", "match-exported-or-regex"],
    },
};
