module.exports = {
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        '\\.module.css$': "identity-obj-proxy-module",
    },
    testEnvironment: "jsdom",
};
