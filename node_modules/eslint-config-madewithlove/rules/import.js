module.exports = {
    'plugins': ['import'],
    'rules': {
        'import/default': 2,
        'import/export': 2,
        'import/imports-first': 2,
        'import/named': 2,
        'import/namespace': 2,
        'import/no-amd': 2,
        'import/no-commonjs': 0,
        'import/no-deprecated': 2,
        'import/no-duplicates': 2,
        'import/no-named-as-default': 2,
        'import/no-unresolved': 2
    },
    'settings': {
        'import/ignore': ['node_modules', '.(json|scss|png|svg)'],
        'import/resolver': 'webpack',
    },
};
